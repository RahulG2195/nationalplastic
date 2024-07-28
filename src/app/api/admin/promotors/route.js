import { query } from '@/lib/db';

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

// ... rest of the code (saveTeamMember and deleteTeamMember functions) remains the same