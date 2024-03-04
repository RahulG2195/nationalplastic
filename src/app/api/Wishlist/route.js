// Import the query function from your database library
import { query } from "@/lib/db";

export async function GET(request) {
    try {
        // Get the product IDs from the wishlist table
        const wishlist = await query({
            query: "SELECT product_id FROM wishlist",
            values: [],
        });

        const productIds = wishlist.map(row => row.product_id);

        // If there are no product IDs in the wishlist, return an empty response
        if (productIds.length === 0) {
            return new Response(JSON.stringify({
                status: 200,
                products: []
            }));
        }

        // Fetch products from the products table based on the product IDs
        const products = await query({
            query: `
                SELECT *
                FROM products
                WHERE product_id IN (${productIds.join(',')})
            `,
            values: [],
        });

        return new Response(JSON.stringify({
            status: 200,
            products: products
        }));
    } catch (error) {
        console.error("Error in GET request:", error);
        return new Response(JSON.stringify({
            status: 500,
            message: "Internal Server Error"
        }));
    }
}

export async function POST(request) {
    try {
        const { product_id } = await request.json();
        console.log("this is id i want to post ",product_id)

        // Check if the product_id is provided
        if (!product_id) {
            return new Response(JSON.stringify({
                status: 400,
                message: "Missing product_id in request body"
            }));
        }

        const insertResult = await query({
            query: "INSERT INTO wishlist (product_id) VALUES (?)",
            values: [product_id]
        });

        if (insertResult.affectedRows === 1) {
            return new Response(JSON.stringify({
                status: 200,
                message: "Product added to wishlist successfully"
            }));
        } else {
            return new Response(JSON.stringify({
                status: 500,
                message: "Failed to add product to wishlist"
            }));
        }
    } catch (error) {
        console.error("Error in POST request:", error);
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
            query: "DELETE FROM Wishlist WHERE product_id = ?",
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
