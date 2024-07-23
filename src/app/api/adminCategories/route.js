import { query } from '@/lib/db';
import { writeFile } from "fs/promises";
import { uploadFile } from "@/utils/fileUploader";
// import { query } from "@/lib/db";

export async function POST(request) {
  try {
    const data = await request.formData();

    const { category_name, navshow, status, topPick = 0 } = Object.fromEntries(
      data.entries()
    );

    const image = data.get('image');
    const uploadedImageName = image.name;
    console.log("its inside 1000 line "+image);


    if (image && image instanceof File) {
      try {
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
    
        const path = `./public/Assets/uploads/category_banner/${image.name}`;
        await writeFile(path, buffer);
      } catch (uploadError) {
        return new Response(
          JSON.stringify({ success: false, error: uploadError.message }),
          { status: 400 }
        );
      }
    }
    console.log("its inside 10003 line "+image);

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
    const requiredFields = { category_name, navshow, status };

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
        INSERT INTO categories (category_name, image_name, navshow, status, topPick)
        VALUES (?, ?, ?, ?, ?)
      `,
      values: [category_name, uploadedImageName, navshow, status, topPick],
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
    const { category_id, category_name, image_name, navshow, status, image , topPick=0} = Object.fromEntries(
      data.entries()
    );
    console.log("its inside 1000- line ");
    if (image) {
      try {

        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
    
        const path = `./public/Assets/uploads/category_banner/${image.name}`;
        await writeFile(path, buffer);
      } catch (uploadError) {
        return new Response(
          JSON.stringify({ success: false, error: uploadError.message }),
          { status: 400 }
        );
      }
    }

    // Manual validation
    const requiredFields = { category_id, category_name, image_name, navshow, status };
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
          image_name = ?,
          navshow = ?,
          status = ?,
          topPick=?
        WHERE 
          category_id = ?
      `,
      values: [category_name, image_name, navshow, status,topPick, category_id],
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
    const { category_id, navshow } = await request.json();

    // Validate inputs
    if (category_id === undefined || navshow === undefined) {
      return new Response(
        JSON.stringify({ success: false, error: 'category_id and navshow are required' }),
        { status: 400 }
      );
    }

    // Ensure navshow is either 0 or 1
    const validatedNavshow = navshow ? 1 : 0;

    // Update the navshow status
    const result = await query({
      query: `
        UPDATE categories 
        SET navshow = ?
        WHERE category_id = ?
      `,
      values: [validatedNavshow, category_id],
    });

    if (result.affectedRows === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'Category not found' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: { category_id, navshow: validatedNavshow } }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Error updating navshow status:', error);

    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
