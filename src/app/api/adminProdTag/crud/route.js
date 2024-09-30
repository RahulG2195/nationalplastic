// File: app/api/adminProdTag/route.js

import { NextResponse } from 'next/server';
import { query } from '@/lib/db'; // Assume this is your database connection utility
const fs = require("fs").promises;
const path = require("path");


const uploadImage = async (file) => {
  try {
    if (!file || typeof file.arrayBuffer !== "function") {
      throw new Error("Invalid file object");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadDir = `${process.env.NEXT_PUBLIC_EXTERNAL_PATH_DIR}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}`;

    // Check if the directory exists, if not, create it
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, file.name);
    await fs.writeFile(filePath, buffer);
    return file.name;
  } catch (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }
};


export async function GET() {
  try {
    const tags_cat = await query({
      query: "SELECT * FROM tags_cat",
    });
    return NextResponse.json({ status: 200, AllTagss: tags_cat });
  } catch (error) {
    console.error('Error fetching tags_cat:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });  
  }
}


export async function POST(req) {
  try {
    const formData = await req.formData();
    const tag_name = formData.get('tag_name');
    const tag_seo = formData.get('tag_seo');
    const tag_status = formData.get('tag_status');
    const visible = formData.get('visible');
    const tag_image = formData.get('tag_image');
    const tag_sub_banner = formData.get('tag_sub_banner');

    // Handle file uploads
    await uploadImage(tag_image);
    const imagePath = tag_image.name;

    let subBannerPath = null;
    if (tag_sub_banner) {
      await uploadImage(tag_sub_banner);
      subBannerPath = tag_sub_banner.name;
    }

    const result = await query({
      query: "INSERT INTO tags_cat (tag_name, tag_seo, tag_status, visible, tag_image, tag_sub_banner) VALUES (?, ?, ?, ?, ?, ?)",
      values: [tag_name, tag_seo, tag_status, visible, imagePath, subBannerPath],
    });

    return NextResponse.json({ message: "Tag added successfully", tagId: result.insertId }, { status: 201 });
  } catch (error) {
    console.error('Error adding tag:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


// Helper function for switch query


export async function PATCH(req) {
  try {
    const formData = await req.formData();
    const tag_id = formData.get('tag_id');

    if (!tag_id) {
      return NextResponse.json({ error: "tag_id is required" }, { status: 400 });
    }

    let updateQuery = "UPDATE tags_cat SET ";
    let values = [];
    let setClauses = [];

    // Check for each possible field
    const fields = ['tag_name', 'tag_seo', 'tag_status', 'visible'];
    let onlySwitchUpdate = true;

    for (const field of fields) {
      if (formData.has(field)) {
        setClauses.push(`${field} = ?`);
        values.push(formData.get(field));
        if (field !== 'tag_status' && field !== 'visible') {
          onlySwitchUpdate = false;
        }
      }
    }

    // Handle image uploads
    const imageFields = ['tag_image', 'tag_sub_banner'];
    for (const field of imageFields) {
      const file = formData.get(field);
      if (file && file instanceof Blob) {
        await uploadImage(file);
        setClauses.push(`${field} = ?`);
        values.push(file.name);
        onlySwitchUpdate = false;
      }
    }

    // If no fields to update, return an error
    if (setClauses.length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    updateQuery += setClauses.join(", ") + " WHERE tag_id = ?";
    values.push(tag_id);

    await query({
      query: updateQuery,
      values: values,
    });

    if (onlySwitchUpdate) {
      const field = formData.has('tag_status') ? 'tag_status' : 'visible';
      return NextResponse.json({ message: `Tag ${field} updated successfully` }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Tag updated successfully" }, { status: 200 });
    }

  } catch (error) {
    console.error('Error updating tag:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
export async function DELETE(req) {
  try {
    const { tag_id } = await req.json();

    await query({
      query: "DELETE FROM tags_cat WHERE tag_id = ?",
      values: [tag_id],
    });

    return NextResponse.json({ message: "Tag deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error('Error deleting tag:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}