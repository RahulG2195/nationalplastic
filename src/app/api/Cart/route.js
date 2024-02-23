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
    console.log(request)
    try {
        const { product_id, quantity, product_name, description, price, original_price, image_name } = await request.json();
        
        // Set default values to null for variables that might be undefined
        const productId = product_id !== undefined ? product_id : null;
        const quantityValue = quantity !== undefined ? quantity : null;
        const productName = product_name !== undefined ? product_name : null;
        const productDescription = description !== undefined ? description : null;
        const productPrice = price !== undefined ? price : null;
        const originalPrice = original_price !== undefined ? original_price : null;
        const imageName = image_name !== undefined ? image_name : null;

        const updateProducts = await query({
            query: "INSERT INTO mycart (product_id, quantity, product_name, description, price, original_price, image_name) VALUES (?, ?, ?, ?, ?, ?, ?)",
            values: [productId, quantityValue, productName, productDescription, productPrice, originalPrice, imageName]
        });
        console.log(result)
        const result = updateProducts.affectedRows; 
        console.log(result)
        // Corrected variable name
        let message = result ? "success" : "error";

        const mycart = {
            product_id: productId,
            image_name: imageName,
            product_name: productName,
            description: productDescription,
            price: productPrice,
            original_price: originalPrice,
            quantity: quantityValue
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

