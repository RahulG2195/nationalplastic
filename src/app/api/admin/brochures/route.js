// File: pages/api/admin/brochures.js
import { query } from '@/lib/db';
import { NextResponse } from 'next/server';
// import { uploadFile } from '@/lib/uploadHelper'; // Use the upload helper function



import fs from 'fs';
import path from 'path';

const uploadFile = async (file, uploadType) => {
  try {
    if (!file || typeof file.arrayBuffer !== 'function') {
      throw new Error('Invalid file object');
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Set different upload directories based on file type
    const uploadDir = `${process.env.NEXT_PUBLIC_EXTERNAL_PATH_DIR}${process.env.NEXT_PUBLIC_UPLOAD_PATH_DIR}/`;

    // Check if the directory exists, if not create it
    try {
      await fs.promises.access(uploadDir);
    } catch {
      await fs.promises.mkdir(uploadDir, { recursive: true });
    }

    // Define the file path (ensure each file gets a unique name)
    const filePath = path.join(uploadDir, file.name);
    await fs.promises.writeFile(filePath, buffer);

    return file.name; // Return the file name to be stored in the database
  } catch (error) {
    console.error('Detailed upload error:', error);
    throw new Error(`File upload failed: ${error.message}`);
  }
};



export async function GET(request) {
  try {
    const brochures = await query({
      query: 'SELECT * FROM brochures',
      values: [],
    });

    return NextResponse.json({ success: true, brochures }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

// POST - Create a new brochure
export async function POST(request) {
  try {
    const formData = await request.formData();
    const data = {};
    const requiredFields = ['title'];

    // Collect the required fields
    requiredFields.forEach((field) => {
      const value = formData.get(field);
      if (value) {
        data[field] = value;
      } else {
        return NextResponse.json(
          { success: false, error: `The field ${field} is required` },
          { status: 400 }
        );
      }
    });

    // Handle the file uploads (PDF and Image)
    const imageFile = formData.get('image');
    const pdfFile = formData.get('pdf');

    // Upload the image
    if (imageFile && imageFile.size > 0) {
      try {
        const imagePath = await uploadFile(imageFile, 'image'); // Upload to 'images' folder
        data.image = imagePath;
      } catch (error) {
        return NextResponse.json(
          { success: false, error: 'Failed to upload image' },
          { status: 500 }
        );
      }
    }

    // Upload the PDF
    if (pdfFile && pdfFile.size > 0) {
      try {
        const pdfPath = await uploadFile(pdfFile, 'pdf'); // Upload to 'pdfs' folder
        data.pdf = pdfPath;
      } catch (error) {
        return NextResponse.json(
          { success: false, error: 'Failed to upload PDF' },
          { status: 500 }
        );
      }
    }

    // Insert the brochure data into the database
    const result = await query({
      query: 'INSERT INTO brochures (title, image, pdf, created_at) VALUES (?, ?, ?, NOW())',
      values: [data.title, data.image, data.pdf],
    });

    return NextResponse.json({ success: true, id: result.insertId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT - Update an existing brochure
export async function PUT(request) {
  try {
    const formData = await request.formData();
    const id = formData.get('id');
    const status = formData.get('status'); // Fixed from 'id' to 'status'
    const data = {};
    console.log("Received ID:", id);

    // Collect the updated data fields
    const title = formData.get('title');
    if (title) {
      data.title = title;
    }

    // Handle file uploads (image and PDF)
    const imageFile = formData.get('image');
    const pdfFile = formData.get('pdf');

    // If an image is provided, upload it and store the file path
    if (imageFile && imageFile.size > 0) {
      try {
        const imagePath = await uploadFile(imageFile, 'images'); // Upload to 'images' folder
        data.image = imagePath;
        console.log("Uploaded image path:", data.image);
      } catch (error) {
        return NextResponse.json(
          { success: false, error: 'Failed to upload image' },
          { status: 500 }
        );
      }
    }

    // If a PDF is provided, upload it and store the file path
    if (pdfFile && pdfFile.size > 0) {
      try {
        const pdfPath = await uploadFile(pdfFile, 'pdfs'); // Upload to 'pdfs' folder
        data.pdf = pdfPath;
        console.log("Uploaded PDF path:", data.pdf);
      } catch (error) {
        return NextResponse.json(
          { success: false, error: 'Failed to upload PDF' },
          { status: 500 }
        );
      }
    }

    // Now construct the query dynamically based on which fields were updated
    const queryValues = [];
    const updateQuery = [];

    // Always update the title and status
    updateQuery.push('title = ?', 'status = ?');
    queryValues.push(data.title || formData.get('title'), status);

    // Conditionally update image if available
    if (data.image) {
      updateQuery.push('image = ?');
      queryValues.push(data.image);
    }

    // Conditionally update pdf if available
    if (data.pdf) {
      updateQuery.push('pdf = ?');
      queryValues.push(data.pdf);
    }

    // Add the ID for the WHERE clause
    // updateQuery.push('WHERE id = ?');
    queryValues.push(id);

    // If there is no image or pdf to update, we should avoid leaving dangling commas
    if (updateQuery.length === 2) {
      // If only title and status are being updated
      updateQuery.splice(1, 1); // Remove the comma after 'status = ?'
      queryValues.splice(1, 1); // Remove the corresponding value for status
    }

    // Log the constructed query for debugging
    console.log(`query is: UPDATE brochures SET ${updateQuery.join(', ')}  WHERE id = ? `);
    console.log('values are:', queryValues);

    // Execute the query
    const result = await query({
      query: `UPDATE brochures SET ${updateQuery.join(', ') } WHERE id = ? `,
      values: queryValues,
    });

    console.log(result, "Update result");

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    console.error('Error during update:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}



// DELETE - Delete a brochure
export async function DELETE(request) {
  try {
    const { id } = await request.json();

    // Delete the brochure from the database
    const result = await query({
      query: 'DELETE FROM brochures WHERE id = ?',
      values: [id],
    });

    return NextResponse.json({ success: true, message: 'Brochure deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
