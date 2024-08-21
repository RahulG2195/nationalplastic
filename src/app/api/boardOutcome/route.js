import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { writeFile } from 'fs/promises';

const fs = require("fs").promises;
const path = require("path");

// Function to handle file uploads
const uploadFile = async (file) => {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = `${process.env.NEXT_PUBLIC_EXTERNAL_PATH_DIR}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}`;
    try {
      await fs.access(filePath);
    } catch {
      await fs.mkdir(filePath, { recursive: true });
    }
    await writeFile(filePath, buffer);
    return file.name; // Return the filename for storing in the database
  } catch (error) {
    throw new Error('File upload failed: ' + error.message);
  }
};

// Handle GET request
export async function GET() {
  try {
    const result = await query({
      query: 'SELECT * FROM boardOutcome',
      values: [],
    });
    const data = result || [];
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching boardOutcome data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

// Handle POST request
export async function POST(request) {
    try {
      const formData = await request.formData();
      const yearHeading = formData.get('yearHeading') || '';
      const status = formData.get('status') || 1;
      const pdfFiles = formData.getAll('pdfFiles');
  
      const pdfFileNames = [];
      for (const pdfFile of pdfFiles) {
        if (pdfFile instanceof File && pdfFile.size > 0) {
          try {
            const fileName = await uploadFile(pdfFile);
            pdfFileNames.push(fileName);
          } catch (error) {
            console.error('Error uploading PDF file:', error);
            return NextResponse.json({ success: false, error: 'Failed to upload PDF' }, { status: 500 });
          }
        } else {
          console.warn('Received non-file or empty file:', pdfFile);
        }
      }
  
  
      const result = await query({
        query: 'INSERT INTO boardOutcome (year_heading, pdf, status) VALUES (?, ?, ?)',
        values: [yearHeading, pdfFileNames.join(','), status],
      });
      return NextResponse.json({ message: 'Data saved successfully', id: result.insertId });
    } catch (error) {
      console.error('Error saving boardOutcome data:', error);
      return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
    }
  }
  
  export async function PUT(request) {
    try {
      const formData = await request.formData();
      const id = formData.get('id');
      const yearHeading = formData.get('yearHeading') || '';
      const status = formData.get('status') || 1;
      const existingPdfFiles = formData.getAll('existingPdfFiles[]');
      const newPdfFiles = formData.getAll('newPdfFiles');
      const currentData = await query({
        query: 'SELECT pdf FROM boardOutcome WHERE id = ?',
        values: [id],
      });
      let currentPdfFiles = currentData[0].pdf ? currentData[0].pdf.split(',') : [];
      const pdfFilesToKeep = existingPdfFiles.filter(file => currentPdfFiles.includes(file));
      const pdfFileNames = [...pdfFilesToKeep];
      for (const newPdfFile of newPdfFiles) {
        if (newPdfFile.size > 0) {
          const fileName = await uploadFile(newPdfFile);
          pdfFileNames.push(fileName);
        }
      }
      const queryStr = 'UPDATE boardOutcome SET year_heading = ?, pdf = ?, status = ? WHERE id = ?';
      const values = [yearHeading, pdfFileNames.join(','), status, id];
  
      await query({
        query: queryStr,
        values,
      });
  
      return NextResponse.json({ message: 'Data updated successfully' });
    } catch (error) {
      console.error('Error updating boardOutcome data:', error);
      return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
    }
  }
  