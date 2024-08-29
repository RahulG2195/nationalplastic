// File: app/api/adminProdTag/route.js

import { NextResponse } from 'next/server';
import { query } from '@/lib/db'; // Assume this is your database connection utility
import { uploadFile } from "@/utils/fileUploader";
const path = require("path");

export async function GET() {
  try {
    const tags_cat = await query({
      query: "SELECT * FROM tags_cat",
    });

    return NextResponse.json({ status: 200, AllTag: tags_cat });
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
    await uploadFile(tag_image);
    const imagePath = tag_image.name;

    let subBannerPath = null;
    if (tag_sub_banner) {
      await uploadFile(tag_sub_banner);
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

export async function PATCH(req) {
  try {
    const formData = await req.formData();
    const tag_id = formData.get('tag_id');
    const tag_name = formData.get('tag_name');
    const tag_seo = formData.get('tag_seo');
    const tag_status = formData.get('tag_status');
    const visible = formData.get('visible');
    const tag_image = formData.get('tag_image');
    const tag_sub_banner = formData.get('tag_sub_banner');

    let updateQuery = "UPDATE tags_cat SET tag_name = ?, tag_seo = ?, tag_status = ?, visible = ?";
    let values = [tag_name, tag_seo, tag_status, visible];

    if (tag_image) {
      await uploadFile(tag_image);
      const imagePath = tag_image.name;
      updateQuery += ", tag_image = ?";
      values.push(imagePath);
    }

    if (tag_sub_banner) {
      await uploadFile(tag_sub_banner);
      const subBannerPath = tag_sub_banner.name;
      updateQuery += ", tag_sub_banner = ?";
      values.push(subBannerPath);
    }

    updateQuery += " WHERE tag_id = ?";
    values.push(tag_id);

    await query({
      query: updateQuery,
      values: values,
    });

    return NextResponse.json({ message: "Tag updated successfully" }, { status: 200 });
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