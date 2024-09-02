import { query } from '@/lib/db';
import fs from 'fs/promises';
import path from 'path';
export async function GET(request) {
  try {
    const allHeroSections = await query({
      query: "SELECT * FROM herosection",
      values: [],
    });
    return new Response(
      JSON.stringify({
        status: 200,
        allHeroSections: allHeroSections,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching hero sections:', error);
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

export async function PUT(request) {
  try {
    const formData = await request.formData();
    const id = formData.get('id');
    const redirect_url = formData.get('redirect_url');
    const seo = formData.get('seo');
    const image = formData.get('image');
    let imageName;
    if (image) {
      imageName = image.name;
      const imageDir = path.join(
        process.env.NEXT_PUBLIC_EXTERNAL_PATH_DIR,
        process.env.NEXT_PUBLIC_BANNERS_PATH_DIR 
      );
      try {
        await fs.access(imageDir);
      } catch {
        await fs.mkdir(imageDir, { recursive: true });
      }

      // Save the new image file
      const imageFilePath = path.join(imageDir, imageName);
      await fs.writeFile(imageFilePath, Buffer.from(await image.arrayBuffer()));
    }

    // Build the set clause dynamically
    const updateFields = { redirect_url, seo };
if (image) {
  updateFields.image_name = imageName;
}

    const setClause = Object.keys(updateFields)
      .map(key => `${key} = ?`)
      .join(', ');

      const values = [...Object.values(updateFields), id];


    // Update the data in the database
    const result = await query({
      query: `UPDATE herosection SET ${setClause} WHERE id = ?`,
      values: values,
    });

    return new Response(
      JSON.stringify({
        status: 200,
        message: "Hero section updated successfully",
        result: result,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating hero section:', error);
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

export async function POST(request) {
  try {
    const formData = await request.formData();
    const redirect_url = formData.get('redirect_url');
    const seo = formData.get('seo');
    const image = formData.get('image');
    let imageName = '';

    if (image) {
      imageName = image.name;
      const imageDir = path.join(
        process.env.NEXT_PUBLIC_EXTERNAL_PATH_DIR,
        process.env.NEXT_PUBLIC_BANNERS_PATH_DIR 
        // Assuming you want to save the images in an "uploads" directory
      );

      // Ensure the directory exists
      try {
        await fs.access(imageDir);
      } catch {
        await fs.mkdir(imageDir, { recursive: true });
      }

      // Save the image file
      const imageFilePath = path.join(imageDir, imageName);
      await fs.writeFile(imageFilePath, Buffer.from(await image.arrayBuffer()));
    }

    // Save the data to the database
    const result = await query({
      query: "INSERT INTO herosection (redirect_url, image_name, seo) VALUES (?, ?, ?)",
      values: [redirect_url, imageName, seo],
    });

    return new Response(
      JSON.stringify({
        status: 201,
        message: "Hero section added successfully",
        result: result,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding hero section:', error);
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
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return new Response(
        JSON.stringify({
          status: 400,
          message: "id is required",
        }),
        { status: 400 }
      );
    }
    
    const result = await query({
      query: "DELETE FROM herosection WHERE id = ?",
      values: [id],
    });
    
    return new Response(
      JSON.stringify({
        status: 200,
        message: "Hero section deleted successfully",
        result: result,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting hero section:', error);
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