import { query } from "@/lib/db";
import { NextResponse } from 'next/server';
import formidable from 'formidable';
// import { saveFile } from '@/utils/fileHandlers';
import {uploadFile} from "@/utils/fileUploader";

// fiscalYear: 2222-2223
// quarter: Q2
// newspaper: Q2
// pdf: (binary)


export async function POST(request) {
  const formData = await request.formData();
  const fiscalYear = formData.get('fiscalYear');
  const quarter = formData.get('quarter');
  const newspaper = formData.get('newspaper');
  const file = formData.get('pdf');
  
  let pdfPath = '';

  if (file) {
    try {
      console.log("GOooodllYYY");
      // Assume uploadFile function is defined elsewhere and handles the file upload
      await uploadFile(file); // Make sure uploadFile returns a Promise
      console.log("file", file.name);
      console.log("filename", file);
      // Set the pdfPath based on where the file is saved
      pdfPath = `/Assets/uploads/Investors/${file.name}`;
    } catch (error) {
      console.error('File upload error:', error);
      return NextResponse.json({ message: "Error saving file" }, { status: 500 });
    }
  }

  try {
    await query({
      query: `INSERT INTO newspaper_advertisements (fiscal_year, quarter, newspaper, pdf_link) 
              VALUES (?, ?, ?, ?)`,
      values: [fiscalYear, quarter, newspaper, pdfPath],
    });

    return NextResponse.json({ message: "Advertisement added successfully" }, { status: 201 });
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
export async function PUT(request) {
  const formData = await request.formData();
  const editingId = formData.get('editingId');
  const fiscalYear = formData.get('fiscalYear');
  const quarter = formData.get('quarter');
  const newspaper = formData.get('newspaper');
  const file = formData.get('pdf');
  
  let pdfPath = '';

  if (file) {
    try {
      await uploadFile(file);
      pdfPath = `/Assets/uploads/Investors/${file.name}`;
    } catch (error) {
      console.error('File upload error:', error);
      return NextResponse.json({ message: "Error saving file" }, { status: 500 });
    }
  }

  try {
    let updateQuery = `
      UPDATE newspaper_advertisements 
      SET fiscal_year = ?, quarter = ?, newspaper = ?
    `;
    let values = [fiscalYear, quarter, newspaper];

    if (pdfPath) {
      updateQuery += `, pdf_link = ?`;
      values.push(pdfPath);
    }

    updateQuery += ` WHERE id = ?`;
    values.push(editingId);

    await query({
      query: updateQuery,
      values: values,
    });

    return NextResponse.json({ message: "Advertisement updated successfully" }, { status: 200 });
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const advertisements = await query({
      query: `SELECT id, fiscal_year, quarter, newspaper, pdf_link
              FROM newspaper_advertisements 
              ORDER BY fiscal_year DESC, quarter ASC`,
    });
    const groupedData = advertisements.reduce((acc, ad) => {
      if (!acc[ad.fiscal_year]) {
        acc[ad.fiscal_year] = {};
      }
      if (!acc[ad.fiscal_year][ad.quarter]) {
        acc[ad.fiscal_year][ad.quarter] = [];
      }
      acc[ad.fiscal_year][ad.quarter].push({
        id: ad.id,
        newspaper: ad.newspaper,
        pdf: ad.pdf_link,
      });
      return acc;
    }, {});

    return NextResponse.json(groupedData);
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
      query: "DELETE FROM newspaper_advertisements WHERE id = ?",
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
