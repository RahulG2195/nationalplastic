import { query } from "@/lib/db";

export async function GET(request) {
  try {
    const Categories = await query({
      //ORDER BY header_position ASC
      query:
        `SELECT category_id, seo_url, category_name, navshow, image_name, header_position, 
       UNIX_TIMESTAMP(added_on) as last_updated 
FROM categories 
WHERE navshow = 1 
ORDER BY header_position ASC`,
      values: [],
    });

    return new Response(
      JSON.stringify({
        status: 200,
        navshow: Categories,
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: error.message
      })
    );
  }
}
