import { query } from '@/lib/db';

export async function POST(request) {
  try {
    const { page_name } = await request.json();

    const content = await query({
      query: "SELECT id, section_name, content FROM aboutus_pages WHERE page_name = ?",
      values: [page_name],
    });

    // If content exists, return it
    if (content.length > 0) {
      return new Response(
        JSON.stringify({
          status: 200,
          content: content,
        })
      );
    } else {
      // If no content is found, return a 404 Not Found error
      return new Response(
        JSON.stringify({
          status: 404,
          message: "No content found for this page",
        }),
        { status: 404 }
      );
    }
  } catch (e) {
    // If an error occurs, return a 500 Internal Server Error response
    return new Response(
      JSON.stringify({
        status: 500,
        message: "Unable to fetch page content",
        error: e.message,
      }),
      { status: 500 }
    );
  }
}

export async function PUT(request) {
    try {
      const { id, section_name, content } = await request.json();
  
      await query({
        query: "UPDATE aboutus_pages SET section_name = ?, content = ? WHERE id = ?",
        values: [section_name, content, id],
      });
  
      return new Response(
        JSON.stringify({
          status: 200,
          message: "Content updated successfully",
        })
      );
    } catch (e) {
      return new Response(
        JSON.stringify({
          status: 500,
          message: "Unable to update content",
          error: e.message,
        }),
        { status: 500 }
      );
    }
  }



export async function PATCH(request) {
    try {
        const { page_name, section_name, content } = await request.json();

        // Create a new entry
        await query({
            query: "INSERT INTO aboutus_pages (page_name, section_name, content) VALUES (?, ?, ?)",
            values: [page_name, section_name, content],
        });

        return new Response(
            JSON.stringify({
                status: 201,
                message: "New content created successfully",
            })
        );
    } catch (e) {
        return new Response(
            JSON.stringify({
                status: 500,
                message: "Unable to create content",
                error: e.message,
            }),
            { status: 500 }
        );
    }
}
 

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return new Response(
        JSON.stringify({
          status: 400,
          message: "ID is required",
        }),
        { status: 400 }
      );
    }

    await query({
      query: "DELETE FROM aboutus_pages WHERE id = ?",
      values: [id],
    });

    return new Response(
      JSON.stringify({
        status: 200,
        message: "Content deleted successfully",
      })
    );

  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
