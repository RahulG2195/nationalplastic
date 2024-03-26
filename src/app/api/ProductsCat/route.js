import { query } from "@/lib/db";
import { parse } from "url";

export async function GET(request) {
  const parsedUrl = parse(request.url, true);
  const queryParams = parsedUrl.query.query;
  try {
    const products = await query({
      query: "SELECT * FROM products where LOWER(category_id) = LOWER(?)",
      values: [`${queryParams}`],
    });

    return new Response(
      JSON.stringify({
        status: 200,
        products: products,
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

export async function POST(request) {
  try {
      const { product_id } = await request.json();
      const result = await query({
          query: "SELECT price, discount_price FROM nationalplastic_db.products WHERE product_id = ?;",
          values: [product_id]
      });

      if (result.length > 0) {
          const { price, discount_price } = result[0];
          return new Response(JSON.stringify({ price, discount_price }), { status: 200 });
      } else {
          return new Response(JSON.stringify({ message: "Product not found" }), { status: 404 });
      }
  } catch (error) {
      return new Response(JSON.stringify({
          status: 500,
          message: error.message,
      }), { status: 500 });
  }
}
