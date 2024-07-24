import { query } from '@/lib/db';
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';

const uploadImage = async (file) => {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = `public/Assets/uploads/${file.name}`;
    await writeFile(path, buffer);
    return path; // Return the path or filename for storing in the database
  } catch (error) {
    throw new Error('Image upload failed: ' + error.message);
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

    // Fetch existing basic info to retain current logo if no new file is provided
    const existingInfo = await query({
      query: 'SELECT logo FROM basic_info WHERE id = ?',
      values: [1], // Assuming id = 1 for simplicity
    });

    let existingLogo = existingInfo[0]?.logo || null;

    // Handle logo upload
    const logoFile = formData.get('logo');
    if (logoFile && logoFile.size > 0) { // Check if file is provided and has size greater than 0
      try {
        const logoPath = await uploadImage(logoFile);
        data.logo = logoFile.name; // Or use logoPath if you store the path in the database
      } catch (error) {
        console.error('Error uploading logo:', error);
        return NextResponse.json(
          { success: false, error: 'Failed to upload logo' },
          { status: 500 }
        );
      }
    } else {
      // If no new file is uploaded, keep the existing value
      data.logo = existingLogo;
    }

    // Build the query dynamically
    const queryParts = [];
    const values = [];
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined) {
        queryParts.push(`${key} = ?`);
        values.push(data[key]);
      }
    });

    // Ensure there's an ID to update
    values.push(1); // Assuming id = 1 for simplicity

    const dynamicQuery = `
      UPDATE basic_info
      SET ${queryParts.join(', ')}
      WHERE id = ?
    `;

    // Execute the dynamic query
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
