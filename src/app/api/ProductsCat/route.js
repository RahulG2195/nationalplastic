import { query } from "@/lib/db";
import { parse } from "url";

export async function GET(request) {
  const parsedUrl = parse(request.url, true);

  const queryParams = parsedUrl.query.query;
  try {
    const products = await query(
      {
        query: "SELECT p.product_id, p.product_name, p.product_name2, p.seo_url, p.seo_url_clr, p.category_id, p.image_name, p.price, p.discount_price, p.discount_percentage, p.categoryType, p.duration, p.InstallationCharges, p.color, p.color_code, p.armType, p.prod_status FROM products p JOIN (SELECT product_name, MIN(product_id) AS min_product_id FROM products WHERE category_id = ? AND prod_status = 1 GROUP BY product_name ) sub ON p.product_name = sub.product_name AND p.product_id = sub.min_product_id WHERE p.category_id = ? AND p.prod_status = 1",
        values: [queryParams, queryParams],
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
        message: error.message,
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
