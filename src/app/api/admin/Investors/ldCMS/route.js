import { query } from '@/lib/db';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import {uploadFile} from "@/utils/fileUploader";

const fs = require("fs").promises;
const path = require("path");

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const document = searchParams.get('file');

  try {
    if (document) {
      const basePath = path.join(process.cwd(), 'public');
      const absolutePath = path.join(basePath, document);
      console
      await unlink(absolutePath).catch((error) => console.error('Unlink error:', error));
    }

    await query({
      query: "DELETE FROM disclosures WHERE id = ?",
      values: [id],
    });

    return new Response(
      JSON.stringify({
        status: 200,
        message: "disclosures deleted successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting disclosures:', error);
    return new Response(
      JSON.stringify({
        status: 500,
        message: "Internal Server Error",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const disclosures = await query({
      query: "SELECT * FROM disclosures ORDER BY year DESC, quarter ASC",
      values: [],
    });

    const groupedDisclosures = disclosures.reduce((acc, disclosure) => {
      const key = disclosure.year;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(disclosure);
      return acc;
    }, {});

    return new Response(
      JSON.stringify({
        status: 200,
        disclosures: Object.values(groupedDisclosures),
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: "Internal Server Error",
      })
    );
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const year = formData.get('year');
    const quarter = formData.get('quarter');
    const document_type = formData.get('document_type');
    const file = formData.get('file');


    const pdfPath = "/var/www/uploads/uploads/investors";

    // Check if the directory exists, if not, create it
    try {
      await fs.access(pdfPath);
    } catch {
      await fs.mkdir(pdfPath, { recursive: true });
    }
    await uploadFile(file); 
    const result = await query({
      query: "INSERT INTO disclosures (year, quarter, document_type, document_url) VALUES (?, ?, ?, ?)",
      values: [year, quarter, document_type, pdfPath],
    });

    return new Response(
      JSON.stringify({
        status: 200,
        message: "Disclosure added successfully",
        id: result.insertId,
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: "Internal Server Error",
      })
    );
  }
}

export async function PUT(request) {
  try {
    const formData = await request.formData();
    const id = formData.get('id');
    const year = formData.get('year');
    const quarter = formData.get('quarter');
    const document_type = formData.get('document_type');
    const file = formData.get('file');

   if(file){

    const pdfPath = "/var/www/uploads/uploads/investors";
    // Check if the directory exists, if not, create it
    try {
      await fs.access(pdfPath);
    } catch {
      await fs.mkdir(pdfPath, { recursive: true });
    }
    await uploadFile(file); 
    await query({
      query: "UPDATE disclosures SET year = ?, quarter = ?, document_type = ?, document_url = ? WHERE id = ?",
      values: [year, quarter, document_type, pdfPath, id],
    });
   }else{
    await query({
      query: "UPDATE disclosures SET year = ?, quarter = ?, document_type = ?, WHERE id = ?",
      values: [year, quarter, document_type, id],
    });
  }
    return new Response(
      JSON.stringify({
        status: 200,
        message: "Disclosure updated successfully",
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
