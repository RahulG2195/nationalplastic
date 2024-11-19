import { query } from "@/lib/db";
// import { parse } from "url";

export async function POST(request) {
  try {
    // const parsedUrl = parse(request.url, true);
    // Default limit to 10 products per page
    const data = await request.json(); // Parse incoming JSON data
    const { productName } = data;
    const productNameDecode = decodeURIComponent(productName);

    // Sanitize to remove any unexpected special characters
    const sanitizedProductName = productNameDecode.replace(/[^a-zA-Z0-9 ]/g, '');

    // Convert to lowercase
    const searchTerm = sanitizedProductName.toLowerCase();

    const page = 1;
    // Default to page 1
    const limit = 12;
    const offset = (page - 1) * limit;

    console.log('searchTerm', searchTerm);

    // const products = await query({
    //   query:
    //     `SELECT 
    //       product_id,
    //       seo_url,
    //       product_name,
    //       price,
    //       discount_price,
    //       discount_percentage,
    //       image_name,
    //       color
    //     FROM products 
    //     WHERE 
    //       (LOWER(product_name) REGEXP ? 
    //       OR LOWER(categoryType) REGEXP ? 
    //       OR LOWER(short_description) REGEXP ?)
    //       AND prod_status = 1
    //     ORDER BY price ASC -- change 'ASC' to 'DESC' for descending order
    //     LIMIT ? OFFSET ?`,
    //   values: [
    //     `${searchTerm}`,
    //     `${searchTerm}`,
    //     `${searchTerm}`,
    //     `${limit}`,
    //     `${offset}`,
    //   ],
    // });


    //  console.log("results: " + products);
    //    console.log("results: " + JSON.stringify(products));


    const allproducts = await query({
      query: `
WITH category_search AS (
  SELECT DISTINCT c.category_id
  FROM categories c
  WHERE LOWER(c.category_name) LIKE LOWER(CONCAT('%', ?, '%'))
),
initial_search AS (
  SELECT 
    p.product_id, 
    p.product_name, 
    p.category_id
  FROM products p
  WHERE (LOWER(p.product_name) LIKE LOWER(CONCAT('%', ?, '%'))
    OR p.category_id IN (SELECT category_id FROM category_search))
    AND p.prod_status = 1
)
SELECT 
  p.product_id,
  p.product_name, 
  p.seo_url, 
  p.seo_url_clr, 
  p.short_description,
  p.category_id, 
  p.image_name, 
  p.price, 
  p.discount_price, 
  p.discount_percentage,
  p.categoryType, 
  p.duration, 
  p.InstallationCharges, 
  p.color, 
  p.color_code,
  p.armType, 
  p.prod_status,
  c.category_name,
  CASE 
    WHEN LOWER(p.product_name) = LOWER(?) THEN 1
    WHEN LOWER(c.category_name) = LOWER(?) THEN 2
    WHEN LOWER(p.product_name) LIKE LOWER(CONCAT('%', ?, '%')) THEN 3
    WHEN LOWER(c.category_name) LIKE LOWER(CONCAT('%', ?, '%')) THEN 4
    ELSE 5
  END AS proximity_rank
FROM products p
JOIN initial_search i ON p.product_id = i.product_id
JOIN categories c ON p.category_id = c.category_id
WHERE p.prod_status = 1
ORDER BY proximity_rank, product_name, color;
      `,
      values: [searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm],
    });

    return new Response(
      JSON.stringify({
        status: 200,
        // products: products,
        allproducts: allproducts,
      })
    );

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