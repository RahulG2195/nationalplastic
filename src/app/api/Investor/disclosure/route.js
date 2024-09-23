import { query } from '@/lib/db';
import { uploadFile } from "@/utils/fileUploader";
import { writeFile } from 'fs/promises';
const fs = require("fs").promises;
const path = require("path");

export const dynamic = 'force-dynamic';
export const bodyParser = false;
const local_UPLOAD_DIR = path.join(process.cwd(), 'public', 'Assets', 'uploads','Investors');

// GET method for fetching records
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const year = searchParams.get("year");
        const results = await query({
            query: "SELECT * from disclosure_data where year = ?;",
            values: [year],
        });
        const yearsList = await query({
          query: "SELECT label, id from navitems where parentId = 17;",
          values: [],
      });
        return new Response(JSON.stringify({ results , yearsList: yearsList }), { status: 200 });
    } catch (e) {
        return new Response(JSON.stringify({ success: false, message: e.message }), { status: 500 });
    }
}
export async function DELETE(request) {
    try {
        const { id } = await request.json();
        const result = await query({
            query: "DELETE FROM disclosure_data WHERE id = ?;",
            values: [id],
        });
        return new Response(JSON.stringify({ success: true, message: "Record deleted successfully" }), { status: 200 });
    } catch (e) {
        return new Response(JSON.stringify({ success: false, message: e.message }), { status: 500 });
    }
}
// PUT method for handling form data (file uploads)
export async function PUT(request) {
    try {
        const formData = await request.formData();
        const fields = Object.fromEntries(formData.entries());
        const files = Object.fromEntries(
            Array.from(formData.entries()).filter(([_, value]) => value instanceof File)
        );

        const action = fields.action;

        switch (action) {
            case 'addRecord':
                return await handleAddRecord(fields, files);
            case 'editRecord':
                return await handleEditRecord(fields, files);

            default:
                return new Response(JSON.stringify({ message: 'Invalid action' }), { status: 400 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
}

// POST method for handling JSON data
export async function POST(request) {
    try {
        const body = await request.json();
        const { action } = body;

        switch (action) {
            case 'insertDisclosure':
                return await handleInsertDisclosure(body);
            case 'deleteDisclosure':
                return await handleDeleteDisclosure(body);
            default:
                return new Response(JSON.stringify({ message: 'Invalid action' }), { status: 400 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
}

// Helper function for adding a record
async function handleAddRecord(fields, files) {
    const { title, year } = fields;

    if (!title || !year) {
        return new Response(JSON.stringify({ message: 'Title and year are required' }), { status: 400 });
    }

    let fileName = '';

    if (files.file) {
        fileName = await handleFileUpload(files.file);
    }

    try {
        const result = await query({
            query: "INSERT INTO disclosure_data (title, file_path,  year) VALUES (?, ?, ?)",
            values: [title, fileName,  year],
        });

        return new Response(JSON.stringify({
            message: 'Record added successfully',
            id: result.insertId
        }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({
            message: 'Error adding record',
            error: error.message
        }), { status: 500 });
    }
}

// Helper function for editing a record
async function handleEditRecord(fields, files) {
    const { id } = fields;

    if (!id) {
        return new Response(JSON.stringify({ message: 'ID is required' }), { status: 400 });
    }

    let updateFields = [];
    let updateValues = [];

    if (fields.title) {
        updateFields.push('title = ?');
        updateValues.push(fields.title);
    }

    if (fields.year) {
        updateFields.push('year = ?');
        updateValues.push(fields.year);
    }

   

    let fileName = fields.currentFilePath;

    if (files.file) {
        fileName = await handleFileUpload(files.file);
        updateFields.push('file_path = ?');
        updateValues.push(fileName);
    }

    if (updateFields.length === 0) {
        return new Response(JSON.stringify({ message: 'No fields to update' }), { status: 400 });
    }

    try {
        const updateQuery = `UPDATE disclosure_data SET ${updateFields.join(', ')} WHERE id = ?`;
        updateValues.push(id);

        const result = await query({
            query: updateQuery,
            values: updateValues,
        });

        return new Response(JSON.stringify({
            message: 'Record updated successfully',
            affectedRows: result.affectedRows
        }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({
            message: 'Error updating record',
            error: error.message
        }), { status: 500 });
    }
}

// Helper function for file upload
async function handleFileUpload(file) {
    const pdfPath = `${process.env.NEXT_PUBLIC_EXTERNAL_PATH_DIR}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}`;
    
    try {
        await fs.access(pdfPath);
    } catch {
        await fs.mkdir(pdfPath, { recursive: true });
    }
    
    await uploadFile(file);
    try{
        const uploadDirSEcond = `${process.env.NEXT_PUBLIC_EXTERNAL_PATH_DIR}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}`;
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filePathSecond = path.join(uploadDirSEcond, file.name);
        await fs.writeFile(filePathSecond, buffer);
        const filePath = path.join(local_UPLOAD_DIR, file.name);
        await writeFile(filePath, buffer);
      }catch(error){
        console.log("error writing file locally", error)
      }
    return file.name;
}


function validateYear(year) {
  const yearString = year.toString();
  return /^\d{4}$/.test(yearString);
}

async function handleInsertDisclosure(body) {
  const { label } = body;
  if (!label) {
      return new Response(JSON.stringify({ message: 'Year is required' }), { status: 400 });
  }
  
  if (!validateYear(label)) {
      return new Response(JSON.stringify({ message: 'Invalid year format. Year must be a 4-digit number.' }), { status: 400 });
  }
  
  try {
      const result = await query({
          query: "INSERT INTO navitems (label, link, parentId) VALUES (?, ?, ?)",
          values: [label, `/generalDisclosure/${label}`, 17],
      });
      return new Response(JSON.stringify({
          message: 'Disclosure data inserted successfully',
          insertId: result.insertId
      }), { status: 200 });
  } catch (error) {
      return new Response(JSON.stringify({
          message: 'Error inserting disclosure data',
          error: error.message
      }), { status: 500 });
  }
}


// New function for editing a disclosure
async function handleEditDisclosure(body) {
    const { id, label } = body;
    if (!id || !label) {
      return new Response(JSON.stringify({ message: 'ID and year are required' }), { status: 400 });
    }
    
    if (!validateYear(label)) {
      return new Response(JSON.stringify({ message: 'Invalid year format. Year must be a 4-digit number.' }), { status: 400 });
    }
    
    try {
      const result = await query({
        query: "UPDATE navitems SET label = ?, link = ? WHERE id = ? AND parentId = 17",
        values: [label, `/generalDisclosure/${label}`, id],
      });
      
      if (result.affectedRows === 0) {
        return new Response(JSON.stringify({ message: 'No disclosure found with the given ID' }), { status: 404 });
      }
      
      return new Response(JSON.stringify({
        message: 'Disclosure data updated successfully',
        affectedRows: result.affectedRows
      }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({
        message: 'Error updating disclosure data',
        error: error.message
      }), { status: 500 });
    }
  }
  
  // New function for deleting a disclosure
  async function handleDeleteDisclosure(body) {
    const { id } = body;
    if (!id) {
      return new Response(JSON.stringify({ message: 'ID is required' }), { status: 400 });
    }
    
    try {
      const result = await query({
        query: "DELETE FROM navitems WHERE id = ? AND parentId = 17",
        values: [id],
      });
      
      if (result.affectedRows === 0) {
        return new Response(JSON.stringify({ message: 'No disclosure found with the given ID' }), { status: 404 });
      }
      
      return new Response(JSON.stringify({
        message: 'Disclosure data deleted successfully',
        affectedRows: result.affectedRows
      }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({
        message: 'Error deleting disclosure data',
        error: error.message
      }), { status: 500 });
    }
  }
  
 