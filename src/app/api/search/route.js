import { query } from "@/lib/db";
import { parse } from "url";

export async function GET(request) {
  try {
    // const parsedUrl = parse(request.url, true);
    const isBrowser = typeof window !== "undefined";
    // Default limit to 10 products per page

    if (isBrowser) {
      const parsedUrl = parse(request.url, true);
      const queryParams = parsedUrl.query || "Pune";
      // console.log("from routes", queryParams);
      // console.log("from routes", parsedUrl);

      const searchTerm = queryParams.query.toLocaleLowerCase();
      const page = parseInt(queryParams.page) || 1;
      // Default to page 1
      const limit = parseInt(queryParams.limit) || 12;
      const offset = (page - 1) * limit;

      const products = await query({
        query:
          "SELECT * FROM products WHERE LOWER(product_name) REGEXP ? OR LOWER(categoryType) REGEXP ? OR LOWER(short_description) REGEXP ? LIMIT ? OFFSET ?",
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
          "SELECT * FROM products WHERE LOWER(product_name) REGEXP ? OR LOWER(categoryType) REGEXP ? OR LOWER(short_description) REGEXP ?",
        values: [`${searchTerm}`, `${searchTerm}`, `${searchTerm}`],
      });
      return new Response(
        JSON.stringify({
          status: 200,
          products: products,
          allproducts: allproducts,
        })
      );
    }
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
        message: "Internal Server Error in getting",
      })
    );
  }
}
