import { query } from '@/lib/db';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import {uploadFile} from "@/utils/fileUploader";
import path from 'path';

const UPLOAD_DIR = join(process.cwd(), 'public','Assets', 'uploads','Investors');
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

export async function GET(request) {
  try {
    const transactions = await query({
      query: "SELECT * FROM rp_transaction",
      values: [],
    });

    return new Response(
      JSON.stringify({
        status: 200,
        transactions: transactions,
      }),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching transactions:', error);
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

export async function POST(request) {
  const formData = await request.formData();
  const document = formData.get('document');
  const file = formData.get('file');
  if (!file) {
    return new Response(JSON.stringify({ error: 'No file uploaded' }), { status: 400 });
  }
  try {
    await uploadFile(file); 
    const pdfPath = `${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${file.name}`;
    const result = await query({
      query: "INSERT INTO rp_transaction (document, url) VALUES (?, ?)",
      values: [document, pdfPath],
    });

    return new Response(
      JSON.stringify({
        status: 201,
        message: "Transaction created successfully",
        id: result.insertId,
      }),
      { 
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error creating transaction:', error);
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

export async function PUT(request, { params }) {
  const formData = await request.formData();
  const document = formData.get('document');
  const file = formData.get('file');
  const id = formData.get('id');
  let url;
  if (file) {
    await uploadFile(file); 
    url = `${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${file.name}`;

    // Delete old file if it exists
    const oldTransaction = await query({
      query: "SELECT url FROM rp_transaction WHERE id = ?",
      values: [id],
    });
    

    if (oldTransaction.length > 0) {
      const oldFilename = oldTransaction[0].url.split('/').pop();
      const oldFilePath = join(UPLOAD_DIR, oldFilename);
      await unlink(oldFilePath).catch(() => {});
    }
  }
  try {
    if (url) {
      await query({
        query: "UPDATE rp_transaction SET document = ?, url = ? WHERE id = ?",
        values: [document, url, id],
      });
    } else {
      await query({
        query: "UPDATE rp_transaction SET document = ? WHERE id = ?",
        values: [document, id],
      });
    }

    return new Response(
      JSON.stringify({
        status: 200,
        message: "Transaction updated successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating transaction:', error);
    if (url) {
      // Use the same path as set during upload
      await unlink(url).catch(() => {});
    }
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

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const document = searchParams.get('fileName');

  try {
    if (document) {
      const basePath = path.join(process.cwd(), 'public');
      const absolutePath = path.join(basePath, document);
      await unlink(absolutePath).catch((error) => console.error('Unlink error:', error));
    }

    await query({
      query: "DELETE FROM rp_transaction WHERE id = ?",
      values: [id],
    });

    return new Response(
      JSON.stringify({
        status: 200,
        message: "Transaction deleted successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting transaction:', error);
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

