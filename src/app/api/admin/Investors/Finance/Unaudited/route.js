import { query } from "@/lib/db";
import { NextResponse } from 'next/server';
import formidable from 'formidable';
// import { savefile_name } from '@/utils/file_nameHandlers';
import { uploadFile } from "@/utils/fileUploader";
const fs = require("fs").promises;
const path = require("path");

const uploadPDF = async (file) => {
  try {
    console.log("Starting PDF upload process");
    console.log("Received file object:", file);
    
    if (!file || typeof file.arrayBuffer !== "function") {
      console.error("Invalid file object received");
      throw new Error("Invalid file object");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    console.log("NEXT_PUBLIC_EXTERNAL_PATH_DIR:", process.env.NEXT_PUBLIC_EXTERNAL_PATH_DIR);
    console.log("NEXT_PUBLIC_PDF_PATH_DIR:", process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR);
    
    const uploadDir = `${process.env.NEXT_PUBLIC_EXTERNAL_PATH_DIR}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}`;
    console.log("Upload directory:", uploadDir);

    try {
      await fs.access(uploadDir);
      console.log("Upload directory exists");
    } catch {
      console.log("Creating upload directory");
      await fs.mkdir(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, file.name);
    console.log("File will be saved to:", filePath);
    
    await fs.writeFile(filePath, buffer);
    console.log(`File successfully uploaded to ${filePath}`);
    
    return file.name;
  } catch (error) {
    console.error("Detailed upload error:", error);
    throw new Error(`PDF upload failed: ${error.message}`);
  }
};

export async function POST(request) {
  const formData = await request.formData();
  const years = formData.get('years');
  const title = formData.get('title');
  const quarter = formData.get('quarter');
  const file_name = formData.get('file_name');

  console.log("Received POST request");

    if (!file_name) {
      console.error("No file provided in form data");
      return NextResponse.json({ message: "No file provided" }, { status: 400 });
    }

    console.log("File received:", file_name.name);

    const fileName = await uploadPDF(file_name);
    // const pdfPath = `${process.env.NEXT_PUBLIC_PDF_PATH_DIR}/${fileName}`;

    console.log("PDF uploaded successfully. Path:", fileName);
  // const pdfPath = fileName;

  try {
    await query({
      query: `INSERT INTO unaudited (years, title, quarter, file_name) 
              VALUES (?, ?, ?, ?)`,
      values: [years, title, quarter, fileName],
    });

    return NextResponse.json({ message: "Unaudited added successfully" }, { status: 201 });
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
  const quarter = formData.get('quarter');
  const file_name = formData.get('file_name');

  let pdfPath = '';

  if (file_name) {
    try {
      await uploadFile(file_name);
      pdfPath = `${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${file_name.name}`;
    } catch (error) {
      console.error('file_name upload error:', error);
      return NextResponse.json({ message: "Error saving file_name" }, { status: 500 });
    }
  }

  try {
    let updateQuery = `
      UPDATE unaudited 
      SET years = ?, title = ?, quarter = ?
    `;
    let values = [years, title, quarter];

    if (pdfPath) {
      updateQuery += `, file_name = ?`;
      values.push(pdfPath);
    }

    updateQuery += ` WHERE una_id = ?`;
    values.push(editingId);

    await query({
      query: updateQuery,
      values: values,
    });

    return NextResponse.json({ message: "Unaudited updated successfully" }, { status: 200 });
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const Unauditeds = await query({
      query: `SELECT una_id, years, title, quarter, file_name
                FROM unaudited 
                ORDER BY una_id`,
    });

    return NextResponse.json({ UnauditedData: Unauditeds });
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
      query: "DELETE FROM unaudited WHERE una_id = ?",
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
