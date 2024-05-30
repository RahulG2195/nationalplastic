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
        "SELECT *,product_id FROM products WHERE LOWER(product_name) REGEXP ? OR LOWER(categoryType) REGEXP ? OR LOWER(short_description) REGEXP ? GROUP BY product_name",
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

    return new Response(
      JSON.stringify({
        status: 200,
      })
    );

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
