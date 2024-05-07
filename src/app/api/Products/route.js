import { query } from "@/lib/db";

export async function GET(request) {
    try {
        const products = await query({
            query: "SELECT MIN(product_id) AS product_id, product_name, MIN(seo_url) AS seo_url, MIN(category_id) AS category_id, MIN(image_name) AS image_name, MIN(price) AS price, MIN(discount_price) AS discount_price, MIN(discount_percentage) AS discount_percentage, MIN(categoryType) AS categoryType, MIN(duration) AS duration, MIN(InstallationCharges) AS InstallationCharges, MIN(color) AS color, MIN(color_code) AS color_code, MIN(armType) AS armType, prod_status FROM products WHERE prod_status = 1 GROUP BY product_name", 
            values: [],
        });

        const prod_clr = await query({
            query: "Select product_id, product_name, color, color_code FROM products WHERE prod_status = 1",
            values: [],
        })

        const limitProd = await query({
            query: "SELECT MIN(product_id) AS product_id, product_name, MIN(seo_url) AS seo_url, MIN(category_id) AS category_id, MIN(image_name) AS image_name, MIN(price) AS price, MIN(discount_price) AS discount_price, MIN(discount_percentage) AS discount_percentage, MIN(categoryType) AS categoryType, MIN(duration) AS duration, MIN(InstallationCharges) AS InstallationCharges, MIN(color) AS color, MIN(color_code) AS color_code, MIN(armType) AS armType, prod_status FROM products WHERE prod_status = 1  GROUP BY product_name limit 12",
            values: [],
        });

        return new Response(JSON.stringify({
            status: 200,
            products: products,
            limitProd: limitProd,
            // prod_detail: prod_detail,
            prod_clr: prod_clr,
        }));

    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            message: "Internal Server Error"
        }));
    }
}

export async function POST(request) {
    try {
        const { product_name, short_description, price, discount_price, image_name } = await request.json();
        const values = [product_name, short_description, price, discount_price, image_name];
        const updateProducts = await query({
            query: "INSERT INTO products (product_name, short_description, price, discount_price, image_name) VALUES (?)",
            values: [values],
        });
        const result = updateProducts.affectedRows;
        let message = result ? "success" : "error";
        const product = {
            product_name: product_name,
        };
        return new Response(JSON.stringify({
            message: message,
            status: 200,
            product: product
        }));
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            data: error.message
        }));
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
