import { query } from "@/lib/db";
import { alignProperty } from "@mui/material/styles/cssUtils";

export async function GET(request) {
    try {
        const mycart = await query({
            query: "SELECT * FROM mycart",
            values: [],
        });

        return new Response(JSON.stringify({
            status: 200,
            mycart: mycart
        }));
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            message: "Internal Server Error"
        }));
    }
}// route.js

// route.js

export async function POST(request) {
    try {
        const { product_id, quantity, product_name, description, price, original_price, image_name } = await request.json();
        
        // Check if the product is already in the cart
        const checkCartQuery = await query({
            query: "SELECT * FROM mycart WHERE product_id = ?",
            values: [product_id]
        });

        if (checkCartQuery.length > 0) {
            // Product already exists in the cart, return an error response
            return new Response(JSON.stringify({
                status: 400,
                message: "Product already exists in the cart"
            }));
        }

        // Product is not in the cart, proceed to insert it
        const updateProducts = await query({
            query: "INSERT INTO mycart (product_id, quantity, product_name, description, price, original_price, image_name) VALUES (?, ?, ?, ?, ?, ?, ?)",
            values: [product_id, quantity, product_name, description, price, original_price, image_name]
        });

        const result = updateProducts.affectedRows;
        let message = result ? "success" : "error";

        const mycart = {
            product_id: product_id,
            image_name: image_name,
            product_name: product_name,
            description: description,
            price: price,
            original_price: original_price,
            quantity: quantity
        };

        return new Response(JSON.stringify({
            message: message,
            status: 200,
            mycart: mycart
        }));

    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            data: error.message
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
    console.log("at ur desire place ")
}

