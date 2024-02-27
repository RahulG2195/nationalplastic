import { query } from "@/lib/db";


export async function GET(request) {
    try {
        // Get the product IDs from mycart table
        const mycart = await query({
            query: "SELECT product_id FROM mycart",
            values: [],
        });

        // Extract product IDs from the result
        const productIds = mycart.map(row => row.product_id);

        // Fetch product details for the retrieved product IDs
        const products = await query({
            query: `SELECT * FROM products WHERE product_id IN (${productIds.join(',')})`,
            values: [],
        });
        console.log("here is product id in get ",productIds)

        return new Response(JSON.stringify({
            status: 200,
            products: products
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
        const { product_id } = await request.json();

        const insertResult = await query({
            query: "INSERT INTO mycart (product_id) VALUES (?)",
            values: [product_id]
        });

        if (insertResult.affectedRows === 1) {
            return new Response(JSON.stringify({
                status: 200,
                message: "Product added to cart successfully"
            }));
        } else {
            return new Response(JSON.stringify({
                status: 500,
                message: "Failed to add product to cart"
            }));
        }
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            message: "Internal Server Error"
        }));
    }
}


export async function DELETE(request) {
    console.log("first")
    try {
        const { product_id } = await request.json();
        console.log('Received product_id:', product_id); // Log received product_id
        const deleteWishlist = await query({
            query: "DELETE FROM mycart WHERE product_id = ?",
            values: [product_id],
        });
        console.log('Affected Rows:', deleteWishlist.affectedRows); // Log affected rows
        const message = deleteWishlist.affectedRows ? "success" : "error";
        return new Response(JSON.stringify({
            message: message,
            status: 200,
            product_id: product_id
        }));
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            data: error.message
        }));
    }
 
}

