import { query } from '@/lib/db';
import formidable from 'formidable';
import fs from 'fs/promises';
import path from 'path';
export const dynamic = 'force-dynamic';
export const bodyParser = false;
export async function GET(request){
    try{
        const { searchParams } = new URL(request.url);
        const year = searchParams.get("year");
        const results = await query({
            // query:"select * from navitems",
            query:"SELECT * from disclosure_data where year = ?;",
            values:[year],
        })
        return new Response(
            JSON.stringify({
                results: results
            },{status:200})
        )
    }catch(e){
         return new Response(
            JSON.stringify({success:false, message:e.message}),
            {status:500}
         ); 
    }
}
export async function PUT(request) {
  return await handleActionData(request);
}
async function handleActionData(request) {
  try {
    const form = new formidable.IncomingForm();
    
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(request, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });


    const action = fields.action;

    switch (action) {
      case 'addRecord':
        return await addRecord(fields, files);
      case 'editRecord':
        return await editRecord(fields, files);
      default:
        return new Response(JSON.stringify({ message: 'Invalid action' }), { status: 400 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}
async function addRecord(fields, files) {
  const { title, year } = fields;
  const status = fields.status ? parseInt(fields.status) : 1;

  if (!title || !year) {
    return new Response(JSON.stringify({ message: 'Title and year are required' }), { status: 400 });
  }

  let fileName = '';

  if (files.file) {
    const file = files.file;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    await fs.mkdir(uploadDir, { recursive: true });

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    fileName = file.originalFilename ? `${uniqueSuffix}-${file.originalFilename}` : `${uniqueSuffix}-upload`;
    const newPath = path.join(uploadDir, fileName);

    await fs.rename(file.filepath, newPath);

  }

  try {
    const result = await query({
      query: "INSERT INTO disclosure_data (title, filePath, status, year) VALUES (?, ?, ?, ?)",
      values: [title, fileName, status, year],
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
async function editRecord(fields, files) {
  const { id, title, year } = fields;
  const status = fields.status ? parseInt(fields.status) : 1;

  if (!id || !title || !year) {
    return new Response(JSON.stringify({ message: 'ID, title, and year are required' }), { status: 400 });
  }

  let fileName = fields.currentFilePath || '';

  if (files.file) {
    const file = files.file;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    await fs.mkdir(uploadDir, { recursive: true });

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    fileName = file.originalFilename ? `${uniqueSuffix}-${file.originalFilename}` : `${uniqueSuffix}-upload`;
    const newPath = path.join(uploadDir, fileName);

    await fs.rename(file.filepath, newPath);


    // If there was an old file, you might want to delete it here
    if (fields.currentFilePath) {
      const oldPath = path.join(uploadDir, fields.currentFilePath);
      try {
        await fs.unlink(oldPath);
      } catch (error) {
        console.error(`Error deleting old file: ${error.message}`);
      }
    }
  }

  try {
    const result = await query({
      query: "UPDATE disclosure_data SET title = ?, filePath = ?, status = ?, year = ? WHERE id = ?",
      values: [title, fileName, status, year, id],
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


export async function POST(request) {
  return await handleAction(request);
}

async function handleAction(request) {
  try {
    const body = await request.json();
    const { action } = body;

    switch (action) {
      case 'updateStatus':
        return await updateStatus(body);
      case 'addRecord':
        return await addRecord(body);
      case 'editRecord':
        return await editRecord(body);
      default:
        return new Response(JSON.stringify({ message: 'Invalid action' }), { status: 400 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}


async function updateStatus(body) {
    const { Id , status=1 } = body;
  
    // Validate input
    if (!Id) {
      return new Response(JSON.stringify({ message: 'Label is required' }), { status: 400 });
    }
  
    // Perform database operation
    try {
      const result = await query({
        query: "UPDATE disclosure_data SET status = ? where id = ?",
        values: [status , Id],
      });
  
      return new Response(JSON.stringify({
        message: 'Field inserted successfully',
        id: result
      }), { status: 201 });
    } catch (error) {
      return new Response(JSON.stringify({
        message: 'Error inserting field',
        error: error.message
      }), { status: 500 });
    }
}

  async function getRecord(id) {
    try {
      const result = await query({
        query: "SELECT * FROM disclosure_data WHERE id = ?",
        values: [id],
      });
  
      if (result.length === 0) {
        return new Response(JSON.stringify({ message: 'Record not found' }), { status: 404 });
      }
  
      return new Response(JSON.stringify(result[0]), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({
        message: 'Error fetching record',
        error: error.message
      }), { status: 500 });
    }
  }


