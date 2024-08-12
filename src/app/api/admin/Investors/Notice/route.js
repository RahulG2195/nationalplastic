import { query } from "@/lib/db";
import { NextResponse } from 'next/server';
import formidable from 'formidable';
// import { savefile_name } from '@/utils/file_nameHandlers';
import {uploadFile} from "@/utils/fileUploader";


export async function POST(request) {
  const formData = await request.formData();
  const title = formData.get('title');
  const years = formData.get('years');
  const file_name = formData.get('file_name');
  
  let pdfPath = '';

  if (file_name) {
    try {
      // Assume uploadFile function is defined elsewhere and handles the file_name upload
      await uploadFile(file_name); // Make sure uploadFile returns a Promise
      // Set the pdfPath based on where the file_name is saved
      pdfPath = file_name.name;

    } catch (error) {

      console.error('file_name upload error:', error);
      return NextResponse.json({ message: "Error saving file_name" }, { status: 500 });
    }
  }

  try {
    await query({
      query: `INSERT INTO notice (years, title, file_name) VALUES (?, ?, ?)`,
      values: [years, title, pdfPath],
    });

    return NextResponse.json({ message: "notice added successfully" }, { status: 201 });
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}


export async function PUT(request) {
  const formData = await request.formData();
  const editingId = formData.get('editingId');
  const title = formData.get('title');
  const years = formData.get('years');
  const file_name = formData.get('file_name');
  
  let pdfPath = '';

  if (file_name) {
    try {
      await uploadFile(file_name);
      pdfPath = file_name.name;
    } catch (error) {
      console.error('file_name upload error:', error);
      return NextResponse.json({ message: "Error saving file_name" }, { status: 500 });
    }
  }

  try {
    let updateQuery = `
      UPDATE notice 
      SET title = ?, years = ?
    `;
    let values = [title, years];

    if (pdfPath) {
      updateQuery += `, file_name = ?`;
      values.push(pdfPath);
    }

    updateQuery += ` WHERE ad_id = ?`;
    values.push(editingId);

    await query({
      query: updateQuery,
      values: values,
    });

    return NextResponse.json({ message: "notice updated successfully" }, { status: 200 });
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
    try {
      const noticeData = await query({
        query: `SELECT *
                FROM notice 
                ORDER BY ad_id`,
      });
  
      return NextResponse.json({ noticeData: noticeData });
    } catch (error) {
      console.error('Database query error:', error);
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  }


export async function DELETE(request) {
  try {
    const { id } = await request.json();

    // Validate required fields
    if (!id) {
      return new Response(
        JSON.stringify({
          status: 400,
          message: "ID is required.",
        })
      );
    }

    // Execute database query
    const deleteBulkOrderForm = await query({
      query: "DELETE FROM notice WHERE ad_id = ?",
      values: [id],
    });

    // Handle response
    const result = deleteBulkOrderForm.affectedRows;
    const message = result ? "success" : "error";

    return new Response(
      JSON.stringify({
        status: 200,
        message: message,
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: error.message,
      })
    );
  }
}
