import { query } from '@/lib/db';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function GET(request) {
  return await getTeamMembers();
}

export async function POST(request) {
  const formData = await request.formData();
  const action = formData.get('action');

  switch (action) {
    case 'ADD':
    case 'UPDATE':
      return await saveTeamMember(formData, action);
    case 'DELETE':
      return await deleteTeamMember(formData);
    default:
      return new Response(
        JSON.stringify({ status: 405, message: 'Method not allowed' }),
        { status: 405 }
      );
  }
}

async function getTeamMembers() {
  try {
    const teamMembersQuery = "SELECT * FROM team_members ORDER BY display_order";
    const teamMembers = await query({ query: teamMembersQuery, values: [] });

    return new Response(
      JSON.stringify({
        status: 200,
        teamMembers,
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

async function saveTeamMember(formData, action) {
  try {
    const name = formData.get('name');
    const designation = formData.get('designation');
    const description = formData.get('description');
    const display_order = formData.get('display_order');
    const image = formData.get('image');

    let image_url = '';
    if (image) {
      const filename = `${Date.now()}-${image.name}`;
      const uploadPath = path.join(process.cwd(), 'public', 'Assets', 'uploads', 'Aboutus', filename);
      await writeFile(uploadPath, Buffer.from(await image.arrayBuffer()));
      image_url = `${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_ABOUT_PATH_DIR}${filename}`;
    }

    let sql, values;

    if (action === 'ADD') {
      sql = 'INSERT INTO team_members (name, designation, description, image_url, display_order) VALUES (?, ?, ?, ?, ?)';
      values = [name, designation, description, image_url, display_order];
    } else {
      const id = formData.get('id');
      sql = 'UPDATE team_members SET name = ?, designation = ?, description = ?, display_order = ? WHERE id = ?';
      values = [name, designation, description, display_order, id];

      if (image_url) {
        sql = 'UPDATE team_members SET name = ?, designation = ?, description = ?, image_url = ?, display_order = ? WHERE id = ?';
        values = [name, designation, description, image_url, display_order, id];
      }
    }

    await query({ query: sql, values });

    return new Response(
      JSON.stringify({
        status: 200,
        message: `Team member ${action === 'ADD' ? 'added' : 'updated'} successfully`,
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

async function deleteTeamMember(formData) {
  try {
    const id = formData.get('id');
    const sql = 'DELETE FROM team_members WHERE id = ?';
    const values = [id];

    await query({ query: sql, values });

    return new Response(
      JSON.stringify({
        status: 200,
        message: 'Team member deleted successfully',
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