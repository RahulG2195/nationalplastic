import { query } from '@/lib/db';




export async function POST(request) {
  return await handleAction(request);
}

async function handleAction(request) {
  const { action, ...data } = await request.json();

  switch (action) {
    case 'GET':
      return await getCommitteesAndManagement();
    case 'ADD':
      return await addCommitteeOrManagement(data);
    case 'UPDATE':
      return await updateCommitteeOrManagement(data);
    case 'DELETE':
      return await deleteCommitteeOrManagement(data);
    default:
      return new Response(
        JSON.stringify({ status: 405, message: 'Method not allowed' }),
        { status: 405 }
      );
  }
}


export async function GET(request) {
  try {
    const data = await query({
      query: `
        SELECT *
        FROM committees_and_management
        ORDER BY type, category, id
      `,
      values: [],
    });

    if (data.length > 0) {
      const formattedData = data.reduce((acc, row) => {
        if (!acc[row.category]) {
          acc[row.category] = {
            category: row.category,
            type: row.type,
            members: [],
          };
        }
        acc[row.category].members.push(`${row.name}, ${row.position}`);
        return acc;
      }, {});

      return new Response(
        JSON.stringify({
          status: 200,
          data: Object.values(formattedData),
        })
      );
    } else {
      return new Response(
        JSON.stringify({
          status: 404,
          message: "No data found",
        }),
        { status: 404 }
      );
    }
  } catch (e) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: "Unable to fetch data",
        error: e.message,
      }),
      { status: 500 }
    );
  }
}

async function getCommitteesAndManagement() {
    try {
      console.log("Fetching data from database...");
      const data = await query({
        query: `
          SELECT *
          FROM committees_and_management
          ORDER BY type, category, id
        `,
        values: [],
      });
      console.log("Raw data from database:", data);
  
      if (data.length > 0) {
        console.log("Formatting data...");
        const formattedData = data.reduce((acc, row) => {
          if (!acc[row.category]) {
            acc[row.category] = {
              category: row.category,
              type: row.type,
              members: [],
            };
          }
          acc[row.category].members.push(`${row.name}, ${row.position}`);
          return acc;
        }, {});
        console.log("Formatted data:", formattedData);
  
        return new Response(
          JSON.stringify({
            status: 200,
            data: Object.values(formattedData),
          }),
          { status: 200 }
        );
      } else {
        console.log("No data found");
        return new Response(
          JSON.stringify({
            status: 404,
            message: "No data found",
          }),
          { status: 404 }
        );
      }
    } catch (e) {
      console.error("Error fetching data:", e);
      return new Response(
        JSON.stringify({
          status: 500,
          message: "Unable to fetch data",
          error: e.message,
        }),
        { status: 500 }
      );
    }
  }

async function addCommitteeOrManagement({ category, type, name, position }) {
  try {
    const result = await query({
      query: `
        INSERT INTO committees_and_management (category, type, name, position)
        VALUES (?, ?, ?, ?)
      `,
      values: [category, type, name, position],
    });

    return new Response(
      JSON.stringify({
        status: 201,
        message: "Item added successfully",
        id: result.insertId,
      }),
      { status: 201 }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: "Unable to add item",
        error: e.message,
      }),
      { status: 500 }
    );
  }
}

async function updateCommitteeOrManagement({ id, category, type, name, position }) {
  try {
    await query({
      query: `
        UPDATE committees_and_management
        SET category = ?, type = ?, name = ?, position = ?
        WHERE name = ?
      `,
      values: [category, type, name, position, id],
    });

    return new Response(
      JSON.stringify({
        status: 200,
        message: "Item updated successfully",
      }),
      { status: 200 }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: "Unable to update item",
        error: e.message,
      }),
      { status: 500 }
    );
  }
}

async function deleteCommitteeOrManagement({ id }) {
  try {
    await query({
      query: `
        DELETE FROM committees_and_management
        WHERE name = ?
      `,
      values: [id],
    });

    return new Response(
      JSON.stringify({
        status: 200,
        message: "Item deleted successfully",
      }),
      { status: 200 }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: "Unable to delete item",
        error: e.message,
      }),
      { status: 500 }
    );
  }
}