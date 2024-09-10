import { query } from "@/lib/db";
import { console } from 'console';


export async function GET(request) {
  try {
    const categories = await query({
      query: `
        SELECT category_id, seo_url, category_name, navshow, image_name, header_position, 
               UNIX_TIMESTAMP(added_on) as last_updated
        FROM categories
        WHERE navshow = 1 AND status = 1
        ORDER BY header_position
      `,
      values: [],
    });

    return new Response(
      JSON.stringify({
        status: 200,
        navshow: categories,
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: error.message,
      })
    );
  }
}
