import { query } from "@/lib/db";
// import { parse } from "url";

export async function POST(request) {
  try {
    // const parsedUrl = parse(request.url, true);
    // Default limit to 10 products per page
    const data = await request.json(); // Parse incoming JSON data
const { productName } = data;
    const searchTerm = productName.toLocaleLowerCase();
    const page =  1;
    // Default to page 1
    const limit = 12;
    const offset = (page - 1) * limit;

    const products = await query({
      query:
        "SELECT MIN(product_id) AS product_id, product_name, MIN(seo_url) AS seo_url, MIN(category_id) AS category_id, MIN(image_name) AS image_name, MIN(price) AS price, MIN(discount_price) AS discount_price, MIN(discount_percentage) AS discount_percentage, MIN(categoryType) AS categoryType, MIN(duration) AS duration, MIN(InstallationCharges) AS InstallationCharges, MIN(color) AS color, MIN(color_code) AS color_code, MIN(armType) AS armType, prod_status FROM products WHERE LOWER(product_name) REGEXP ? OR LOWER(categoryType) REGEXP ? OR LOWER(short_description) REGEXP ? GROUP BY product_name LIMIT ? OFFSET ?",
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
        "SELECT MIN(product_id) AS product_id, product_name, MIN(seo_url) AS seo_url, MIN(category_id) AS category_id, MIN(image_name) AS image_name, MIN(price) AS price, MIN(discount_price) AS discount_price, MIN(discount_percentage) AS discount_percentage, MIN(categoryType) AS categoryType, MIN(duration) AS duration, MIN(InstallationCharges) AS InstallationCharges, MIN(color) AS color, MIN(color_code) AS color_code, MIN(armType) AS armType, prod_status FROM products WHERE LOWER(product_name) REGEXP ? OR LOWER(categoryType) REGEXP ? OR LOWER(short_description) REGEXP ? GROUP BY product_name",
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
