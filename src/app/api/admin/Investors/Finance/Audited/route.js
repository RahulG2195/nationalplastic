import { query } from "@/lib/db";
import { NextResponse } from 'next/server';
import formidable from 'formidable';
// import { savefile_name } from '@/utils/file_nameHandlers';
import {uploadFile} from "@/utils/fileUploader";
const path = require("path");


export async function POST(request) {
  const formData = await request.formData();
  const years = formData.get('years');
  const title = formData.get('title');
  const file_name = formData.get('file_name');
  
  let pdfPath = '';

  if (file_name) {
    try {
      const toLowerCase = await uploadFile(file_name); 
      pdfPath = toLowerCase;

    } catch (error) {

      console.error('file_name upload error:', error);
      return NextResponse.json({ message: "Error saving file_name" }, { status: 500 });
    }
  }

  try {
   const result = await query({
      query: `INSERT INTO audited (years, title, file_name) 
              VALUES (?, ?, ?)`,
      values: [years, title, pdfPath],
    });

    return NextResponse.json({ message: "audited added successfully" }, { status: 201 });
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
export async function PUT(request) {
  const formData = await request.formData();
  const editingId = formData.get('editingId');
  const years = formData.get('years');
  const title = formData.get('title');
  const file_name = formData.get('file_name');
  
  let pdfPath = '';

  if (file_name) {
    try {
      const toLowerCase = await uploadFile(file_name);
      pdfPath = toLowerCase;
    } catch (error) {
      console.error('file_name upload error:', error);
      return NextResponse.json({ message: "Error saving file_name" }, { status: 500 });
    }
  }

  try {
    let updateQuery = `
      UPDATE audited 
      SET years = ?, title = ?
    `;
    let values = [years, title];

    if (pdfPath) {
      updateQuery += `, file_name = ?`;
      values.push(pdfPath);
    }

    updateQuery += ` WHERE aud_id = ?`;
    values.push(editingId);

    await query({
      query: updateQuery,
      values: values,
    });

    return NextResponse.json({ message: "audited updated successfully" }, { status: 200 });
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
    try {
      const auditeds = await query({
        query: `SELECT *
                FROM audited 
                ORDER BY aud_id`,
      });
  
      return NextResponse.json({ auditedData: auditeds });
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
      query: "DELETE FROM audited WHERE aud_id = ?",
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
