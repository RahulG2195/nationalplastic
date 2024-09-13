import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { query } from '@/lib/db';
import { writeFile } from "fs/promises";
const fs = require("fs").promises;
const path = require("path");

export async function POST(request) {
  try {
    const data = await request.formData();

    const { category_name, seo_url, navshow, status, topPick = 0,header_position=null } = Object.fromEntries(
      data.entries()
    );

    const image = data.get('image');
    const uploadedImageName = image.name;
    const banner = data.get('banner');
    const bannerIMageName = banner?.name || null;
    console.log("image" + image);
    console.log("banner" + banner);

    if (!banner || !image ) {
      console.log("why its cming here")
      return new Response(
        JSON.stringify({ success: false, error: "Banner and category Image should be there" }),
        { status: 500 }
      );
    }

    if (image && image instanceof File || banner && banner instanceof File) {
      try {
        const imageDir = image && image instanceof File
        ? path.join(
            process.env.NEXT_PUBLIC_EXTERNAL_PATH_DIR,
            process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR
          )
        : banner && banner instanceof File
        ? path.join(
            process.env.NEXT_PUBLIC_EXTERNAL_PATH_DIR,
            process.env.NEXT_PUBLIC_BANNERS_PATH_DIR
          )
        : null;

        try {
          await fs.access(imageDir);
        } catch {
          await fs.mkdir(imageDir, { recursive: true });
        }
        if(uploadedImageName){
          const imageFilePath = path.join(imageDir, uploadedImageName);
          await fs.writeFile(imageFilePath, Buffer.from(await image.arrayBuffer()));
        }
        if(bannerIMageName){
          const imageFilePath = path.join(imageDir, bannerIMageName);
          await fs.writeFile(imageFilePath, Buffer.from(await banner.arrayBuffer()));
        }
        // Save the new image file


      } catch (uploadError) {
        return new Response(
          JSON.stringify({ success: false, error: uploadError.message }),
          { status: 400 }
        );
      }
    }

    const allCategories = await query({
      query: "SELECT * FROM categories WHERE category_name = ?",
      values: [category_name],
    });

    if (allCategories.length > 0) {
      return new Response(
        JSON.stringify({ success: false, error: "Category Name already exists" }),
        { status: 401 }
      );
    }

    // Manual validation
    const requiredFields = { category_name, seo_url, navshow, status };

    const missingFields = Object.entries(requiredFields)
      .filter(([key, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({ success: false, error: `The following fields are required: ${missingFields.join(', ')}` }),
        { status: 400 }
      );
    }

    // Insert the new category
    const result = await query({
      query: `
        INSERT INTO categories (category_name, seo_url, image_name, navshow, status, topPick,banner_image,header_position)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      values: [category_name, seo_url, uploadedImageName, navshow, status, topPick, bannerIMageName, header_position],
    });

    return new Response(
      JSON.stringify({ success: true, data: result }),
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating category:', error);

    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
export async function PUT(request) {
  try {
    const data = await request.formData();
    const { category_id, seo_url, category_name, image_name, navshow, status, image, topPick = 0, banner,header_position } = Object.fromEntries(
      data.entries()
    );
    
    // Initialize variables to store new image names
    let newImageName = null;
    let newBannerImageName = null;

    // Handle image uploads if present
    try {
      // Handle image upload
      if (image && image instanceof File) {
        const imageDir = path.join(
          process.env.NEXT_PUBLIC_EXTERNAL_PATH_DIR,
          process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR
        );
    
        try {
          await fs.access(imageDir);
        } catch {
          await fs.mkdir(imageDir, { recursive: true });
        }
    
        // Save the new image file
         newImageName = image.name; // Use the original file name
        const imageFilePath = path.join(imageDir, newImageName);
        await fs.writeFile(imageFilePath, Buffer.from(await image.arrayBuffer()));
      }
    
      // Handle banner upload
      if (banner && banner instanceof File) {
        const bannerDir = path.join(
          process.env.NEXT_PUBLIC_EXTERNAL_PATH_DIR,
          process.env.NEXT_PUBLIC_BANNERS_PATH_DIR
        );
    
        try {
          await fs.access(bannerDir);
        } catch {
          await fs.mkdir(bannerDir, { recursive: true });
        }
    
        // Save the new banner file
         newBannerImageName = banner.name; // Use the original file name
        const bannerFilePath = path.join(bannerDir, newBannerImageName);
        await fs.writeFile(bannerFilePath, Buffer.from(await banner.arrayBuffer()));
      }
    } catch (uploadError) {
      return new Response(
        JSON.stringify({ success: false, error: uploadError.message }),
        { status: 400 }
      );
    }
    

    // Manual validation
    const requiredFields = { category_id, seo_url, category_name, navshow, status,header_position };
    const missingFields = Object.entries(requiredFields).filter(([key, value]) => !value).map(([key]) => key);

    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({ success: false, error: `The following fields are required: ${missingFields.join(', ')}` }),
        { status: 400 }
      );
    }

    // Prepare the update query and values
    let updateQuery = `
      UPDATE categories 
      SET 
        category_name = ?,
        seo_url = ?,
        navshow = ?,
        status = ?,
        topPick = ?,
        header_position = ?
    `;
    let updateValues = [category_name, seo_url, navshow, status, topPick, header_position];

    // Add image_name to the update if a new image was uploaded
    if (newImageName) {
      updateQuery += `, image_name = ?`;
      updateValues.push(newImageName);
    }

    // Add banner_image to the update if a new banner was uploaded
    if (newBannerImageName) {
      updateQuery += `, banner_image = ?`;
      updateValues.push(newBannerImageName);
    }

    // Add the WHERE clause
    updateQuery += ` WHERE category_id = ?`;
    updateValues.push(category_id);

    // Update the category
    const result = await query({
      query: updateQuery,
      values: updateValues,
    });

    return new Response(
      JSON.stringify({ success: true, data: result }),
      { status: 201 }
    );

  } catch (error) {
    console.error('Error updating category:', error);

    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}






export async function GET(request) {
  try {
    const allCategories = await query({
      query: "SELECT * FROM categories",
      values: [],
    });

    return new Response(
      JSON.stringify({
        status: 200,
        allCategories: allCategories,
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching categories:', error);
    return new Response(
      JSON.stringify({
        status: 500,
        message: "Internal Server Error",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
export async function DELETE(request) {
  try {
    const requestBody = await request.json();
    const { category_id } = requestBody;

    if (!category_id) {
      return new Response(
        JSON.stringify({
          status: 400,
          message: "Category ID is required",
        }),
        { status: 400 }
      );
    }

    const result = await query({
      query: "DELETE FROM categories WHERE category_id = ?",
      values: [category_id],
    });

    if (result.affectedRows > 0) {
      return new Response(
        JSON.stringify({
          status: 204,
          message: `Category with ID ${category_id} deleted successfully`,
        }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({
          status: 404,
          message: `Category with ID ${category_id} not found`,
        }),
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error processing DELETE request:", error.message);
    return new Response(
      JSON.stringify({
        status: 500,
        message: "Internal Server Error",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const { category_id, field, value } = await request.json();

    // Validate inputs
    if (category_id === undefined || field === undefined || value === undefined) {
      return NextResponse.json(
        { success: false, error: 'category_id, field, and value are required' },
        { status: 400 }
      );
    }

    let queryField;
    switch (field) {
      case 'navshow':
      case 'status':
      case 'household':
      case 'topPick':
        queryField = field;
        break;
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid update field' },
          { status: 400 }
        );
    }

    // Update the category
    const result = await query({
      query: `
        UPDATE categories 
        SET ${queryField} = ?
        WHERE category_id = ?
      `,
      values: [value, category_id],
    });

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    // Revalidate the home page and any other pages that display categories
    revalidatePath('/', 'layout');

    return NextResponse.json(
      { success: true, data: { category_id, [field]: value } },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error updating category:', error);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}