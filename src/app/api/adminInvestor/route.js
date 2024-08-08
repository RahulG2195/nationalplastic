import { query } from "@/lib/db";

export async function POST(request) {
  return await handleAction(request);
}

async function handleAction(request) {
  try {
    const body = await request.json();
    const { action } = body;

    switch (action) {
      case 'insertField':
        return await insertField(body);
      case 'updateField':
        return await updateField(body);
      default:
        return new Response(JSON.stringify({ message: 'Invalid action' }), { status: 400 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ status: 500, message: error.message }));
  }
}

async function insertField(body) {
  const { label, link, parentId } = body;

  // Validate input
  if (!label) {
    return new Response(JSON.stringify({ message: 'Label is required' }), { status: 400 });
  }

  // Perform database operation
  try {
    const result = await query({
      query: "INSERT INTO fields (label, link, parentId) VALUES (?, ?, ?)",
      values: [label, link, parentId],
    });

    return new Response(JSON.stringify({
      message: 'Field inserted successfully',
      id: result.insertId
    }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({
      message: 'Error inserting field',
      error: error.message
    }), { status: 500 });
  }
}

async function updateField(body) {
  const { id, label, link, parentId } = body;

  // Validate input
  if (!id || !label) {
    return new Response(JSON.stringify({ message: 'ID and label are required' }), { status: 400 });
  }

  // Perform database operation
  try {
    const result = await query({
      query: "UPDATE fields SET label = ?, link = ?, parentId = ? WHERE id = ?",
      values: [label, link, parentId, id],
    });

    if (result.affectedRows === 0) {
      return new Response(JSON.stringify({ message: 'Field not found' }), { status: 404 });
    }

    // Fetch the updated field
    const updatedField = await query({
      query: "SELECT * FROM fields WHERE id = ?",
      values: [id],
    });

    return new Response(JSON.stringify({
      message: 'Field updated successfully',
      field: updatedField[0]
    }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({
      message: 'Error updating field',
      error: error.message
    }), { status: 500 });
  }
}