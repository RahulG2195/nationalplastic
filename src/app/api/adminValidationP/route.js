import { query } from '@/lib/db';

export async function POST(request) {
    try {
      // Parse the request body to extract the category_name
      const requestBody = await request.json();
      const { category_name } = requestBody;
  
      // Query the database to find the category_id based on the category_name
      const category = await query({
        query: "SELECT * FROM categories WHERE category_name = ?",
        values: [category_name],
      });
  
      // If the category exists, return its category_id
      if (category.length > 0) {
        return new Response(
          JSON.stringify({
            status: 200,
            category_id: category[0].category_id,
          })
        );
      } else {
        // If the category does not exist, return a 404 Not Found error
        return new Response(
          JSON.stringify({
            status: 404,
            message: "Category not found",
          }),
          { status: 404 }
        );
      }
    } catch (e) {
      // If an error occurs, return a 500 Internal Server Error response
      return new Response(
        JSON.stringify({
          status: 500,
          message: "Internal Server Error",
          error: e.message,
        }),
        { status: 500 }
      );
    }
  }
  