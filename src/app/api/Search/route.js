import { query } from "@/lib/db";
// import { parse } from "url";

export async function POST(request) {
  try {
    // const parsedUrl = parse(request.url, true);
    // Default limit to 10 products per page
    const data = await request.json(); // Parse incoming JSON data
    const { productName } = data;
    const searchTerm = productName.toLocaleLowerCase();
    const page = 1;
    // Default to page 1
    const limit = 12;
    const offset = (page - 1) * limit;

    const products = await query({
      query:
        "SELECT *,product_id FROM products WHERE LOWER(product_name) REGEXP ? OR LOWER(categoryType) REGEXP ? OR LOWER(short_description) REGEXP ? GROUP BY product_name LIMIT ? OFFSET ?",
      values: [
        `${searchTerm}`,
        `${searchTerm}`,
        `${searchTerm}`,
        `${limit}`,
        `${offset}`,
      ],
    });

    const allproducts = await query({
      query:
        "SELECT p.product_id, p.product_name, p.seo_url, p.seo_url_clr, p.short_description,  p.category_id, p.image_name, p.price, p.discount_price, p.discount_percentage, p.categoryType, p.duration, p.InstallationCharges, p.color, p.color_code, p.armType, p.prod_status FROM products p JOIN ( SELECT product_name, MIN(product_id) AS min_product_id FROM products WHERE prod_status = 1 GROUP BY product_name ) sub ON p.product_name = sub.product_name AND p.product_id = sub.min_product_id WHERE LOWER(p.product_name) REGEXP ? OR LOWER(categoryType) REGEXP ? OR LOWER(short_description) REGEXP ? AND p.prod_status = 1",
      values: [`${searchTerm}`, `${searchTerm}`, `${searchTerm}`],
    });

    return new Response(
      JSON.stringify({
        status: 200,
        products: products,
        allproducts: allproducts,
      })
    );

    // console.log("Products: from toutes query", allproducts);
    // console.log("Products: from toutes query", products);

    // return new Response(
    //   JSON.stringify({
    //     status: 200,
    //   })
    // );

    // Return the search results
  } catch (error) {
    console.error("Error searching products:", error);

    return new Response(
      JSON.stringify({
        status: 500,
        message: error.message,
      })
    );
  }
}


export async function PUT(request) {
  try {
    const data = await request.json();
    const { productNames } = data;

    // Ensure productNames is an array
    if (!Array.isArray(productNames) || productNames.length === 0) {
      return new Response(
        JSON.stringify({
          status: 400,
          message: "Invalid or empty productNames array",
        }),
        { status: 400 }
      );
    }

    // Create placeholders for the SQL query
    const placeholders = productNames.map(() => '?').join(',');

    const products = await query({
      query: `
        SELECT p.product_id, p.product_name, p.seo_url, p.seo_url_clr, p.short_description,
               p.category_id, p.image_name, p.price, p.discount_price, p.discount_percentage,
               p.categoryType, p.duration, p.InstallationCharges, p.color, p.color_code,
               p.armType, p.prod_status
        FROM products p
        WHERE p.product_name IN (${placeholders})
          AND p.prod_status = 1
        GROUP BY p.product_name
      `,
      values: productNames,
    });

    return new Response(
      JSON.stringify({
        status: 200,
        products: products,
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching products:", error);

    return new Response(
      JSON.stringify({
        status: 500,
        message: error.message,
      }),
      { status: 500 }
    );
  }
}