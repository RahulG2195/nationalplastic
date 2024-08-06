import { query } from '@/lib/db';

export async function POST(request) {
    try {
      const categories = await query({
        query: "SELECT category_name , category_id FROM categories",
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