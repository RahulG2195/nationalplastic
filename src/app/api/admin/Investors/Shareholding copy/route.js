import { query } from "@/lib/db";
import { NextResponse } from 'next/server';
import formidable from 'formidable';
// import { savefile_name } from '@/utils/file_nameHandlers';
import {uploadFile} from "@/utils/fileUploader";


export async function POST(request) {
  const formData = await request.formData();
  const years = formData.get('years');
  // const title = formData.get('title');
  const q1 = formData.get('q1');
  const q2 = formData.get('q2');
  const q3 = formData.get('q3');
  const q4 = formData.get('q4');
  const file_name1 = formData.get('file_name1');
  const file_name2 = formData.get('file_name2');
  const file_name3 = formData.get('file_name3');
  const file_name4 = formData.get('file_name4');
  
  let pdfPath1 = '';
  let pdfPath2 = '';
  let pdfPath3 = '';
  let pdfPath4 = '';

  if (file_name1 && file_name2 && file_name3 && file_name4) {
    try {
      // Assume uploadFile function is defined elsewhere and handles the file_name1 upload
      await uploadFile(file_name1); // Make sure uploadFile returns a Promise
      // Set the pdfPath based on where the file_name1 is saved
      pdfPath1 = `${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${file_name1.name}`;
      pdfPath2 = `${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${file_name2.name}`;
      pdfPath3 = `${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${file_name3.name}`;
      pdfPath4 = `${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${file_name4.name}`;

    } catch (error) {

      console.error('file name upload error:', error);
      return NextResponse.json({ message: "Error saving file name" }, { status: 500 });
    }
  }

  try {
    await query({
      query: `INSERT INTO shareholding_corporate (years, q1, file_name1, q2, file_name2, q3, file_name3, q4, file_name4) 
              VALUES (?, ?, ?, ?)`,
      values: [years,  q1, pdfPath1, q2, pdfPath2, q3, pdfPath3, q4, pdfPath4],
    });

    return NextResponse.json({ message: "Sharholding added successfully" }, { status: 201 });
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
export async function PUT(request) {
  const formData = await request.formData();
  const editingId = formData.get('editingId');
  const years = formData.get('years');
  const q1 = formData.get('q1');
  const q2 = formData.get('q2');
  const q3 = formData.get('q3');
  const q4 = formData.get('q4');
  const file_name1 = formData.get('file_name1');
  const file_name2 = formData.get('file_name2');
  const file_name3 = formData.get('file_name3');
  const file_name4 = formData.get('file_name4');
  
  let pdfPath1 = '';
  let pdfPath2 = '';
  let pdfPath3 = '';
  let pdfPath4 = '';

  if (file_name1) {
    try {
      await uploadFile(file_name1);
      pdfPath1 = `${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${file_name1.name}`;
      pdfPath2 = `${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${file_name2.name}`;
      pdfPath3 = `${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${file_name3.name}`;
      pdfPath4 = `${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${file_name4.name}`;

    } catch (error) {
      console.error('file name upload error:', error);
      return NextResponse.json({ message: "Error saving file_name1" }, { status: 500 });
    }
  }

  try {
    let updateQuery = `
      UPDATE shareholding_corporate SET years = ?, title = ?, q1 = ?`;
    let values = [years, q1];

    if (pdfPath1) {
      updateQuery += `, file_name1 = ?`;
      values.push(pdfPath1);
    }
    if (pdfPath2) {
      updateQuery += `, file_name2 = ?`;
      values.push(pdfPath2);
    }
    if (pdfPath3) {
      updateQuery += `, file_name3 = ?`;
      values.push(pdfPath3);
    }
    if (pdfPath4) {
      updateQuery += `, file_name4 = ?`;
      values.push(pdfPath4);
    }

    updateQuery += ` WHERE sc_id = ?`;
    values.push(editingId);

    await query({
      query: updateQuery,
      values: values,
    });

    return NextResponse.json({ message: "Sharholding updated successfully" }, { status: 200 });
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
    try {
      const annual_report_returns = await query({
        query: `SELECT * FROM shareholding_corporate ORDER BY sc_id`,
      });
  
      return NextResponse.json({ annual_report_returnData: annual_report_returns });
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
      query: "DELETE FROM shareholding_corporate WHERE sc_id = ?",
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
