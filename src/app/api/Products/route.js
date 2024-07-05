import { query } from "@/lib/db";

export async function GET(request) {
  try {
    const products = await query({
      query:
        "WITH ranked_products AS (SELECT product_id, product_name, product_name2, seo_url, seo_url_clr, category_id, image_name, price, discount_price, discount_percentage, categoryType, duration, InstallationCharges, color, color_code, armType, prod_status, ROW_NUMBER() OVER (PARTITION BY product_name2 ORDER BY CASE WHEN image_name = 'default_chair_img.webp' THEN 1 ELSE 0 END, product_id) AS rn FROM products WHERE prod_status = 1) SELECT product_id, product_name, product_name2, seo_url, seo_url_clr, category_id, image_name, price, discount_price, discount_percentage, categoryType, duration, InstallationCharges, color, color_code, armType, prod_status FROM ranked_products WHERE rn = 1 AND prod_status = 1",
      values: [],
    });


    const heighlightProd = await query({
      query: "SELECT * FROM products where categoryType = 'highlights'",
      values: [],
    });

    const Blog = await query({
      query: "SELECT * FROM products where categoryType = 'Blog'",
      values: [],
    });

    const prod_clr = await query({
      query:
        "Select product_id, product_name, color, color_code FROM products WHERE prod_status = 1",
      values: [],
    });
    const prod_detail = await query({
      query: "SELECT * FROM product_detail",
      values: [],
    });
    const limitProd = await query({
      query:
        "WITH ranked_products AS (SELECT product_id, product_name, product_name2, seo_url, seo_url_clr, category_id, image_name, price, discount_price, discount_percentage, categoryType, duration, InstallationCharges, color, color_code, armType, prod_status, ROW_NUMBER() OVER (PARTITION BY product_name2 ORDER BY CASE WHEN image_name = 'default_chair_img.webp' THEN 1 ELSE 0 END, product_id) AS rn FROM products WHERE prod_status = 1) SELECT product_id, product_name, product_name2, seo_url, seo_url_clr, category_id, image_name, price, discount_price, discount_percentage, categoryType, duration, InstallationCharges, color, color_code, armType, prod_status FROM ranked_products WHERE rn = 1 AND prod_status = 1 LIMIT 12",
      values: [],
    });

    return new Response(
      JSON.stringify({
        status: 200,
        products: products,
        limitProd: limitProd,
        prod_detail: prod_detail,
        heighlightProd: heighlightProd,
        Blog: Blog,
        prod_clr: prod_clr,
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
    const {
      product_name,
      short_description,
      price,
      discount_price,
      image_name,
    } = await request.json();
    const values = [
      product_name,
      short_description,
      price,
      discount_price,
      image_name,
    ];
    const updateProducts = await query({
      query:
        "INSERT INTO products (product_name, short_description, price, discount_price, image_name) VALUES (?)",
      values: [values],
    });
    const result = updateProducts.affectedRows;
    let message = result ? "success" : "error";
    const product = {
      product_name: product_name,
    };
    return new Response(
      JSON.stringify({
        message: message,
        status: 200,
        product: product,
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        data: error.message,
      })
    );
  }
}

export async function PUT(request) {
  try {
    const { category_id } = await request.json();

    const getCategory = await query({
      query: "SELECT category_name FROM categories WHERE category_id = ?",
      values: [category_id],
    });

    const category =
      getCategory.length > 0 ? getCategory[0].category_name : null;

    return new Response(
      JSON.stringify({
        status: 200,
        category_name: category,
        id: category_id,
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        data: error.message,
      })
    );
  }
}

// export async function PUT(request) {
//     try {
//         const { id, product_name } = await request.json();
//         const updateProducts = await query({
//             query: "UPDATE products SET product_name = ? WHERE id = ?",
//             values: [product_name, id],
//         });
//         const result = updateProducts.affectedRows;
//         let message = result ? "success" : "error";
//         const product = {
//             id: id,
//             product_name: product_name,
//         };
//         return new Response(JSON.stringify({
//             message: message,
//             status: 200,
//             product: product
//         }));
//     } catch (error) {
//         return new Response(JSON.stringify({
//             status: 500,
//             data: error.message
//         }));
//     }
// }

// export async function DELETE(request) {
//     try {
//         const { id } = await request.json();
//         const deleteProducts = await query({
//             query: "DELETE FROM products WHERE id = ?",
//             values: [id],
//         });
//         const result = deleteProducts.affectedRows;
//         let message = result ? "success" : "error";
//         const product = {
//             id: id,
//         };
//         return new Response(JSON.stringify({
//             message: message,
//             status: 200,
//             product: product
//         }));
//     } catch (error) {
//         return new Response(JSON.stringify({
//             status: 500,
//             data: error.message
//         }));
//     }
// }
