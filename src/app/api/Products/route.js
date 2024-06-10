import { query } from "@/lib/db";

export async function GET(request) {
  try {
    const products = await query({
      query:
        "SELECT p.product_id, p.product_name, p.seo_url, p.seo_url_clr, p.category_id, p.image_name, p.price, p.discount_price, p.discount_percentage, p.categoryType, p.duration, p.InstallationCharges, p.color, p.color_code, p.armType, p.prod_status FROM products p JOIN (SELECT product_name, MIN(product_id) AS min_product_id FROM products WHERE prod_status = 1 GROUP BY product_name ) sub ON p.product_name = sub.product_name AND p.product_id = sub.min_product_id WHERE p.prod_status = 1",
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
        "SELECT p.product_id, p.product_name, p.seo_url, p.seo_url_clr, p.category_id, p.image_name, p.price, p.discount_price, p.discount_percentage, p.categoryType, p.duration, p.InstallationCharges, p.color, p.color_code, p.armType, p.prod_status FROM products p JOIN (SELECT product_name, MIN(product_id) AS min_product_id FROM products WHERE prod_status = 1 GROUP BY product_name ) sub ON p.product_name = sub.product_name AND p.product_id = sub.min_product_id WHERE p.prod_status = 1 limit 12",
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
        message: "Internal Server Error",
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
