import { query } from "@/lib/db";
import { parse } from "url";

export async function GET(request) {
  const parsedUrl = parse(request.url, true);

  const queryParams = parsedUrl.query.query;
  try {
    const products = await query({
      query: "SELECT product_id, product_name, seo_url, category_id, image_name, price, discount_price, discount_percentage, categoryType, duration, InstallationCharges, color, color_code, armType, prod_status FROM products where category_id = ?  AND prod_status = 1 GROUP BY product_name",
      values: [`${queryParams}`],
    });

    const color = await query({
      query:
        "SELECT DISTINCT color, category_id FROM products WHERE category_id = ?",
      values: [`${queryParams}`],
    });

    const armType = await query({
      query:
        "SELECT DISTINCT armType, category_id FROM products WHERE category_id = ?",
      values: [`${queryParams}`],
    });

    return new Response(
      JSON.stringify({
        status: 200,
        products: products,
        color: color,
        armType: armType,
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
      query:
        "SELECT price, discount_price FROM products WHERE product_id = ? AND prod_status = 1",
      values: [product_id],
    });

    if (result.length > 0) {
      const { price, discount_price } = result[0];
      return new Response(JSON.stringify({ price, discount_price }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
      });
    }
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
export async function PUT(request) {
  try {
    const { seo_url } = await request.json();
    const result = await query({
      query: "SELECT price, discount_price, product_id FROM products WHERE seo_url = ? AND prod_status = 1",
      values: [seo_url],
    });

    if (result.length > 0) {
      const { price, discount_price, product_id } = result[0];
      return new Response(
        JSON.stringify({ price, discount_price, product_id }),
        { status: 200 }
      );
    } else {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
      });
    }
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
