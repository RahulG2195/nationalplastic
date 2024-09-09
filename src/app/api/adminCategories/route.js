import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { query } from '@/lib/db';
import { writeFile } from "fs/promises";
const fs = require("fs").promises;
const path = require("path");

export async function POST(request) {
  try {
    const data = await request.formData();

    const { category_name, seo_url, navshow, status, topPick = 0 } = Object.fromEntries(
      data.entries()
    );

    const image = data.get('image');
    const uploadedImageName = image.name;

    if (image && image instanceof File) {
      try {
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const path = `${process.env.NEXT_PUBLIC_EXTERNAL_PATH_DIR}${process.env.NEXT_PUBLIC_BANNERS_PATH_DIR}`;
        try {
          await fs.access(path);
        } catch {
          await fs.mkdir(path, { recursive: true });
        }
        await writeFile(path, buffer);

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
        INSERT INTO categories (category_name, seo_url, image_name, navshow, status, topPick)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
      values: [category_name, seo_url, uploadedImageName, navshow, status, topPick],
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
    const { category_id, seo_url, category_name, image_name, navshow, status, image , topPick=0} = Object.fromEntries(
      data.entries()
    );
    
    if (image) {
      try {

        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
    
        const path = `${process.env.NEXT_PUBLIC_EXTERNAL_PATH_DIR}${process.env.NEXT_PUBLIC_BANNERS_PATH_DIR}`;
        try {
          await fs.access(path);
        } catch {
          await fs.mkdir(path, { recursive: true });
        }
        await writeFile(path, buffer);
      } catch (uploadError) {
        return new Response(
          JSON.stringify({ success: false, error: uploadError.message }),
          { status: 400 }
        );
      }
    }

    // Manual validation
    const requiredFields = { category_id, seo_url, category_name, image_name, navshow, status };
    const missingFields = Object.entries(requiredFields).filter(([key, value]) => !value).map(([key]) => key);

    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({ success: false, error: `The following fields are required: ${missingFields.join(', ')}` }),
        { status: 400 }
      );
    }

    // Update the category
    const result = await query({
      query: `
        UPDATE categories 
        SET 
          category_name = ?,
          seo_url = ?,
          image_name = ?,
          navshow = ?,
          status = ?,
          topPick=?
        WHERE 
          category_id = ?
      `,
      values: [category_name, seo_url, image_name, navshow, status,topPick, category_id],
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