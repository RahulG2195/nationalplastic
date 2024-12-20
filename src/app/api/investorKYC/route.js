import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { writeFile } from 'fs/promises';
const fs = require("fs").promises;
const path = require("path");

// Function to handle file uploads
  const uploadFile = async (file) => {
    try {
      if (!file || typeof file.arrayBuffer !== "function") {
        console.error("Invalid file object received");
        throw new Error("Invalid file object");
      }
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadDir = `${process.env.NEXT_PUBLIC_EXTERNAL_PATH_DIR}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}`;
      try {
        await fs.access(uploadDir);
      } catch {
        await fs.mkdir(uploadDir, { recursive: true });
      }
      const filePath = path.join(uploadDir, file.name);
      await fs.writeFile(filePath, buffer);
      return file.name;
    } catch (error) {
      throw new Error(`PDF upload failed: ${error.message}`);
    }
  };



// Handle GET request
export async function GET() {
  try {
    const result = await query({
      query: 'SELECT * FROM investorkyc LIMIT 1',
      values: [],
    });
    const data = result[0] || {};
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching investorKYC data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

// Handle PUT request
export async function PUT(request) {
    try {
      const formData = await request.formData();
      const message = formData.get('message') || '';
      const circularLink = formData.get('circularLink') || '';
      const rta_heading = formData.getAll('rta_headings[]') || [];
      const pdfFiles = formData.getAll('rtaFiles[]') || [];
  
      const pdfFileNames = [];
      for (const pdfFile of pdfFiles) {
        if (pdfFile.size > 0) {
          try {
            const fileName = await uploadFile(pdfFile);
            pdfFileNames.push(fileName);
          } catch (error) {
            console.error('Error uploading PDF file:', error);
            return NextResponse.json({ success: false, error: 'Failed to upload PDF' }, { status: 500 });
          }
        }
      }
  
      // Building dynamic query
      let queryStr = 'UPDATE investorKyc SET ';
      const values = [];
      
      if (message) {
        queryStr += 'message = ?, ';
        values.push(message);
      }
      if (circularLink) {
        queryStr += 'circularLink = ?, ';
        values.push(circularLink);
      }
      if (rta_heading.length > 0) {
        queryStr += 'rta_heading = ?, ';
        values.push(rta_heading.join(','));
      }
      if (pdfFileNames.length > 0) {
        queryStr += 'rta_link = ?, ';
        values.push(pdfFileNames.join(','));
      }
      queryStr = queryStr.slice(0, -2);
  
      queryStr += ' WHERE id = 1';
  
  
      // Execute the query
      await query({
        query: queryStr,
        values,
      });
  
      return NextResponse.json({ message: 'Data updated successfully' });
    } catch (error) {
      console.error('Error updating investorKYC data:', error);
      return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
    }
  }