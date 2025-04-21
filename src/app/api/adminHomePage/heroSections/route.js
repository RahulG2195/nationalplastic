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
    const image = formData.get('image');
    const mobileImage = formData.get('mobile_image');

    let imageName;
    let mobileImageName;

    const imageDir = path.join(
      process.env.NEXT_PUBLIC_EXTERNAL_PATH_DIR,
      process.env.NEXT_PUBLIC_BANNERS_PATH_DIR
    );

    try {
      await fs.access(imageDir);
    } catch {
      await fs.mkdir(imageDir, { recursive: true });
    }

    const updateFields = {};

    if (image) {
      imageName = image.name;
      const imageFilePath = path.join(imageDir, imageName);
      await fs.writeFile(imageFilePath, Buffer.from(await image.arrayBuffer()));
      updateFields.image_name = imageName;
    }

    if (mobileImage) {
      mobileImageName = mobileImage.name;
      const mobileImagePath = path.join(imageDir, mobileImageName);
      await fs.writeFile(mobileImagePath, Buffer.from(await mobileImage.arrayBuffer()));
      updateFields.mobile_image_name = mobileImageName;
    }

    if (Object.keys(updateFields).length === 0) {
      return new Response(
        JSON.stringify({ status: 400, message: "No fields to update" }),
        { status: 400 }
      );
    }

    const setClause = Object.keys(updateFields)
      .map(key => `${key} = ?`)
      .join(', ');

    const values = [...Object.values(updateFields), id];

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
    const image = formData.get('image');
    const mobileImage = formData.get('mobile_image');

    let imageName = '';
    let mobileImageName = '';

    const imageDir = path.join(
      process.env.NEXT_PUBLIC_EXTERNAL_PATH_DIR,
      process.env.NEXT_PUBLIC_BANNERS_PATH_DIR
    );

    try {
      await fs.access(imageDir);
    } catch {
      await fs.mkdir(imageDir, { recursive: true });
    }

    if (image) {
      imageName = image.name;
      const imageFilePath = path.join(imageDir, imageName);
      await fs.writeFile(imageFilePath, Buffer.from(await image.arrayBuffer()));
    }

    if (mobileImage) {
      mobileImageName = mobileImage.name;
      const mobileImagePath = path.join(imageDir, mobileImageName);
      await fs.writeFile(mobileImagePath, Buffer.from(await mobileImage.arrayBuffer()));
    }

    const result = await query({
      query: "INSERT INTO herosection (image_name, mobile_image_name) VALUES (?, ?)",
      values: [imageName, mobileImageName],
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