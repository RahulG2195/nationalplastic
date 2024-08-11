// app/api/admin/Aboutus/infraCMS/route.js
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { query } from '@/lib/db';
const fs = require('fs');
const path = require('path');
export async function POST(request) {
  try {
    const formData = await request.formData();
    const action = formData.get('action');

    switch (action) {
      case 'GET':
        return await getInfrastructureData();
      case 'ADD':
        return await addInfrastructureData(formData);
      case 'UPDATE':
        return await updateInfrastructureData(formData);
      case 'DELETE':
        return await deleteInfrastructureData(formData);
      default:
        return NextResponse.json({ status: 405, message: 'Method not allowed' }, { status: 405 });
    }
  } catch (error) {
    return NextResponse.json({ status: 500, message: 'Server error', error: error.message }, { status: 500 });
  }
}

async function getInfrastructureData() {
  try {
    const data = await query({
      query: 'SELECT * FROM infrastructure ORDER BY id',
      values: [],
    });
    return NextResponse.json({ status: 200, data });
  } catch (e) {
    return NextResponse.json({ status: 500, message: "Unable to fetch data", error: e.message }, { status: 500 });
  }
}

// app/api/admin/Aboutus/infraCMS/route.js

// app/api/admin/Aboutus/infraCMS/route.js

async function addInfrastructureData(formData) {
    try {
      const title = formData.get('title');
      const description = formData.get('description');
      const image = formData.get('image');
  
      let imagePath = '';
      if (image && image.name) {
        try{
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const path = `${process.env.NEXT_PUBLIC_EXTERNAL_PATH_DIR}${process.env.NEXT_PUBLIC_ABOUT_PATH_DIR}`;
        try {
          await fs.access(path);
        } catch {
          await fs.mkdir(path, { recursive: true });
        }
        imagePath = image.name;
        await writeFile(path, buffer);
        } catch (error) {
          console.error('Error in writing image file:', error);
          return NextResponse.json({ status: 500, message: "Unable to add image", error: error.message }, { status: 500 });
        }
      }
  
      const result = await query({
        query: 'INSERT INTO infrastructure (title, description, image_url) VALUES (?, ?, ?)',
        values: [title, description, imagePath],
      });
      return NextResponse.json({ status: 200, message: "Data added successfully", id: result.insertId });
    } catch (e) {
      console.error('Error in addInfrastructureData:', e);
      return NextResponse.json({ status: 500, message: "Unable to add data", error: e.message }, { status: 500 });
    }
  }
  
  async function updateInfrastructureData(formData) {
    try {
      const id = formData.get('id');
      const title = formData.get('title');
      const description = formData.get('description');
      const image = formData.get('image');
      const existingImageUrl = formData.get('image_url');
  
      let imagePath = existingImageUrl || '';
      if (image && image.name) {
        try{
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        imagePath = image.name;
        const path = `${process.env.NEXT_PUBLIC_EXTERNAL_PATH_DIR}${process.env.NEXT_PUBLIC_ABOUT_PATH_DIR}`;
        try {
          await fs.access(path);
        } catch {
          await fs.mkdir(path, { recursive: true });
        }
        await writeFile(path, buffer);



        } catch (error) {
          console.error('Error in writing image file:', error);
          return NextResponse.json({ status: 500, message: "Unable to add image", error: error.message }, { status: 500 });
        }
      }
  
      await query({
        query: 'UPDATE infrastructure SET title = ?, description = ?, image_url = ? WHERE id = ?',
        values: [title, description, imagePath, id],
      });
      return NextResponse.json({ status: 200, message: "Data updated successfully" });
    } catch (e) {
      console.error('Error in updateInfrastructureData:', e);
      return NextResponse.json({ status: 500, message: "Unable to update data", error: e.message }, { status: 500 });
    }
  }

async function deleteInfrastructureData(formData) {
  try {
    const id = formData.get('id');
    await query({
      query: 'DELETE FROM infrastructure WHERE id = ?',
      values: [id],
    });
    return NextResponse.json({ status: 200, message: "Data deleted successfully" });
  } catch (e) {
    return NextResponse.json({ status: 500, message: "Unable to delete data", error: e.message }, { status: 500 });
  }
}