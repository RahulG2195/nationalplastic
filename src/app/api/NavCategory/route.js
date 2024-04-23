import { query } from "@/lib/db";

export async function GET(request) {
  try {
    const Categories = await query({
      query:
        "SELECT category_id, category_name, navshow FROM categories where navshow = 1",
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
        message: "Internal Server Error",
      })
    );
  }
}
