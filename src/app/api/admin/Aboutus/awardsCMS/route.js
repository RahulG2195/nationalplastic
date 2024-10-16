import { query } from '@/lib/db';
import { writeFile } from 'fs/promises';

const fs = require("fs").promises;
const path = require("path");

export async function POST(request) {
  const formData = await request.formData();
  const action = formData.get('action');

  switch (action) {
    case 'GET':
      return await getAwardsAndCertificates();
    case 'ADD':
    case 'UPDATE':
      return await saveAwardOrCertificate(formData, action);
    case 'DELETE':
      return await deleteAwardOrCertificate(formData);
    default:
      return new Response(
        JSON.stringify({ status: 405, message: 'Method not allowed' }),
        { status: 405 }
      );
  }
}

async function getAwardsAndCertificates() {
  try {
    const pageContentQuery = "SELECT * FROM awards_page WHERE content_type = 'page_content' LIMIT 1";
    const certificatesQuery = "SELECT * FROM awards_page WHERE content_type = 'certificate' ORDER BY display_order";

    const pageContent = await query({ query: pageContentQuery, values: [] });
    const certificates = await query({ query: certificatesQuery, values: [] });

    return new Response(
      JSON.stringify({
        status: 200,
        pageContent: pageContent,
        certificates,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ status: 500, message: error.message }),
      { status: 500 }
    );
  }
}

async function saveAwardOrCertificate(formData, action) {
  try {
    const id = formData.get('id');
    const title = formData.get('title') || '';
    const description = formData.get('description') || '';
    const content_type = formData.get('content_type');
    const display_order = formData.get('display_order');
    const file = formData.get('image');
    let imageName;
    if(file){
     imageName = file.name;
    }
    let image_url = '';
    let filepath = '';


    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      filepath = path.join(
        process.env.NEXT_PUBLIC_EXTERNAL_PATH_DIR,
        process.env.NEXT_PUBLIC_ABOUT_PATH_DIR
      );;
      try {
        await fs.access(filepath);
      } catch {
        await fs.mkdir(filepath, { recursive: true });
      }
      image_url = path.join(filepath, imageName);
      await fs.writeFile(image_url, Buffer.from(await file.arrayBuffer()));
  
    }

    if (action === 'ADD') {
      const insertQuery = `
        INSERT INTO awards_page (title, description, image_url, content_type, display_order)
        VALUES (?, ?, ?, ?, ?)
      `;
      await query({ query: insertQuery, values: [title, description, imageName, content_type, display_order] });
    } else {
      let updateFields = [];
      let updateValues = [];

      if (title !== null) {
        updateFields.push('title = ?');
        updateValues.push(title);
      }

      if (description !== null) {
        updateFields.push('description = ?');
        updateValues.push(description);
      }

      if (imageName) {
        updateFields.push('image_url = ?');
        updateValues.push(imageName);
      }

      if (content_type !== null) {
        updateFields.push('content_type = ?');
        updateValues.push(content_type);
      }

      if (display_order !== null) {
        updateFields.push('display_order = ?');
        updateValues.push(display_order);
      }

      updateValues.push(id); // Add the ID as the last value for the WHERE clause

      const updateQuery = `
        UPDATE awards_page
        SET ${updateFields.join(', ')}
        WHERE id = ?
      `;

      await query({ query: updateQuery, values: updateValues });
    }

    return new Response(
      JSON.stringify({ status: 200, message: `Item ${action === 'ADD' ? 'created' : 'updated'} successfully` }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ status: 500, message: error.message }),
      { status: 500 }
    );
  }
}

async function deleteAwardOrCertificate(formData) {
  try {
    const id = formData.get('id');
    const deleteQuery = 'DELETE FROM awards_page WHERE id = ?';
    await query({ query: deleteQuery, values: [id] });
    return new Response(
      JSON.stringify({ status: 200, message: 'Item deleted successfully' }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ status: 500, message: error.message }),
      { status: 500 }
    );
  }
}