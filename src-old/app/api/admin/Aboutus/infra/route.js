// pages/api/infrastructure.js
import { query } from '@/lib/db';

export async function GET(request) {
  try {
    const data = await query({
      query: 'SELECT * FROM infrastructure ORDER BY id',
      values: [],
    });

    return new Response(JSON.stringify({ status: 200, data }));
  } catch (e) {
    return new Response(
      JSON.stringify({ status: 500, message: "Unable to fetch data", error: e.message }),
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { title, description, image_url } = await request.json();
    const result = await query({
      query: 'INSERT INTO infrastructure (title, description, image_url) VALUES (?, ?, ?)',
      values: [title, description, image_url],
    });

    return new Response(JSON.stringify({ status: 200, message: "Data added successfully", id: result.insertId }));
  } catch (e) {
    return new Response(
      JSON.stringify({ status: 500, message: "Unable to add data", error: e.message }),
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { id, title, description, image_url } = await request.json();
    await query({
      query: 'UPDATE infrastructure SET title = ?, description = ?, image_url = ? WHERE id = ?',
      values: [title, description, image_url, id],
    });

    return new Response(JSON.stringify({ status: 200, message: "Data updated successfully" }));
  } catch (e) {
    return new Response(
      JSON.stringify({ status: 500, message: "Unable to update data", error: e.message }),
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await query({
      query: 'DELETE FROM infrastructure WHERE id = ?',
      values: [id],
    });

    return new Response(JSON.stringify({ status: 200, message: "Data deleted successfully" }));
  } catch (e) {
    return new Response(
      JSON.stringify({ status: 500, message: "Unable to delete data", error: e.message }),
      { status: 500 }
    );
  }
}