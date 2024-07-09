import { query } from "@/lib/db";

export async function GET(request) {
  try {
    const Categories = await query({
      query:
        "SELECT category_id, category_name, navshow, image_name, header_position FROM categories where navshow = 1 ORDER BY header_position ASC",
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
