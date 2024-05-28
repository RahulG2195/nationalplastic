import { query } from "@/lib/db";
import { parse } from "url";

export async function GET(request) {
  const parsedUrl = parse(request.url, true);

  const queryParams = parsedUrl.query.query;
  try {
    const products = await query({
      query: "SELECT MIN(product_id) AS product_id, product_name, MIN(seo_url) AS seo_url, MIN(seo_url_clr) AS seo_url_clr, MIN(category_id) AS category_id, MIN(image_name) AS image_name, MIN(price) AS price, MIN(discount_price) AS discount_price, MIN(discount_percentage) AS discount_percentage, MIN(categoryType) AS categoryType, MIN(duration) AS duration, MIN(InstallationCharges) AS InstallationCharges, MIN(color) AS color, MIN(color_code) AS color_code, MIN(armType) AS armType, prod_status FROM products where LOWER(category_id) = ? AND seo_url_clr != '' AND prod_status = 1 GROUP BY product_name",
      values: [`${queryParams}`],
    });

    const color = await query({
      query:
        "SELECT DISTINCT color, category_id FROM products WHERE LOWER(category_id) = LOWER(?)",
      values: [`${queryParams}`],
    });

    const armType = await query({
      query:
        "SELECT DISTINCT armType, category_id FROM products WHERE LOWER(category_id) = LOWER(?)",
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
