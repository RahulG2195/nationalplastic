import { query } from '@/lib/db';
import { parse } from 'url';

export async function GET(request) {
  const parsedUrl = parse(request.url, true);
  const queryParams = parsedUrl.query.query;
  try {
    let sqlQuery = "SELECT * FROM categories WHERE seo_url = ?";
    let sqlValues = [queryParams];

    const allCategories = await query({
      query: sqlQuery,
      values: sqlValues,
    });

    return new Response(
      JSON.stringify({
        status: 200,
        allCategories: allCategories,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

  } catch (error) {
    console.error('Error fetching categories:', error);
    return new Response(
      JSON.stringify({
        status: 500,
        message: "Internal Server Error",
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }
}
