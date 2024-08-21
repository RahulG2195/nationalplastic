import { query } from '@/lib/db';
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
const fs = require("fs").promises;
const path = require("path");

const uploadImage = async (file) => {
  try {
    if (!file || typeof file.arrayBuffer !== "function") {
      throw new Error("Invalid file object");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadDir = `${process.env.NEXT_PUBLIC_EXTERNAL_PATH_DIR}${process.env.NEXT_PUBLIC_UPLOAD_PATH_DIR}`;
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, file.name);
    await fs.writeFile(filePath, buffer);
    return file.name;
  } catch (error) {
    console.error("Detailed upload error:", error);
    throw new Error(`Image upload failed: ${error.message}`);
  }
};

export async function GET(request) {
  try {
    const basicInfo = await query({
      query: 'SELECT * FROM basic_info',
      values: [],
    });

    return new Response(
      JSON.stringify({
        status: 200,
        basicInfo: basicInfo[0] || {},
      })
    );
  } catch (e) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: 'Internal Server Error',
        error: e.message,
      })
    );
  }
}


export async function POST(request) {
  try {
    const formData = await request.formData();
    const data = {};
    const requiredFields = [
      'brand1_link',
      'brand2_link',
      'instagram',
      'youtube',
      'twitter',
      'facebook',
      'google',
      'mobile_number1',
      'mobile_number2',
      'address',
      'email',
      'email_2',
      'map_url',
      'indiamart',
      'wpNumber'
    ];
    const missingFields = [];

    requiredFields.forEach((field) => {
      const value = formData.get(field);
      if (!value) {
        missingFields.push(field);
      } else {
        data[field] = value;
      }
    });

    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, error: `The following fields are required: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    const existingInfo = await query({
      query: 'SELECT logo FROM basic_info WHERE id = ?',
      values: [1],
    });

    let existingLogo = existingInfo[0]?.logo || null;

    // Handle logo upload
    const logoFile = formData.get('logo');
    console.log("logo ",logoFile)
    if (logoFile && logoFile.size > 0) {
      try {
        const logoPath = await uploadImage(logoFile);
        data.logo = logoFile.name; 
      } catch (error) {
        console.error('Error uploading logo:', error);
        return NextResponse.json(
          { success: false, error: 'Failed to upload logo' },
          { status: 500 }
        );
      }
    } else {
      data.logo = existingLogo;
    }

    const queryParts = [];
    const values = [];
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined) {
        queryParts.push(`${key} = ?`);
        values.push(data[key]);
      }
    });

    values.push(1); 

    const dynamicQuery = `
      UPDATE basic_info
      SET ${queryParts.join(', ')}
      WHERE id = ?
    `;

    const result = await query({
      query: dynamicQuery,
      values: values,
    });

    return NextResponse.json(
      { success: true, data: result },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating basic info:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
