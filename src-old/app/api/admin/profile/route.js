import { query } from '@/lib/db';

export async function POST(request) {
    try {
        const { email } = await request.json();
        
      const categories = await query({
        query: "SELECT category_name FROM categories",
        values: [],
      });
      // If categories exist, return them
      if (categories.length > 0) {
        return new Response(
          JSON.stringify({
            status: 200,
            categories: categories,
          })
        );
      } else {
        // If no categories are found, return a 404 Not Found error
        return new Response(
          JSON.stringify({
            status: 404,
            message: "No categories found",
          }),
          { status: 404 }
        );
      }
    } catch (e) {
      // If an error occurs, return a 500 Internal Server Error response
      return new Response(
        JSON.stringify({
          status: 500,
          message: "Unable to fetch categories",
          error: e.message,
        }),
        { status: 500 }
      );
    }
  }




  export async function PUT(request) {
    try {
      const { email, password } = await request.json();
  
      if (!email || !password) {
        return new Response(JSON.stringify({ error: "password required" }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      const updateQuery = "UPDATE users SET password = ? WHERE email = ?";
      await query(updateQuery, [password, email]);
  
      return new Response(JSON.stringify({ message: "Password updated successfully" }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error("Error updating password:", error);
      return new Response(JSON.stringify({ error: "Internal server error" }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }