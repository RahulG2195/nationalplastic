import { query } from "@/lib/db";
import { alignProperty } from "@mui/material/styles/cssUtils";

export async function GET(request) {
    try {
        const Wishlist = await query({
            query: "SELECT * FROM Wishlist",
            values: [],
        });

        return new Response(JSON.stringify({
            status: 200,
            Wishlist: Wishlist
        }));
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            message: "Internal Server Error"
        }));
    }
}// route.js

export async function POST(request) {
    console.log(request)
    try {
        const { ProductName, productDiscription, WishlistImg, Price, originalPrice, discount } = await request.json();
        const updateProducts = await query({
            query: "INSERT INTO Wishlist (ProductName, productDiscription, WishlistImg, Price, originalPrice, discount) VALUES (?, ?, ?, ?, ?, ?)",
            values: [ProductName, productDiscription, WishlistImg, Price, originalPrice, discount]
        });

        const result = updateProducts.affectedRows;
        let message = result ? "success" : "error";
        
        const Wishlist = {
            ProductName: ProductName,
            productDiscription: productDiscription,
            WishlistImg: WishlistImg,
            Price: Price,
            originalPrice: originalPrice,
            discount: discount
        };

        return new Response(JSON.stringify({
            message: message,
            status: 200,
            Wishlist: Wishlist
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
//         const { id, ProductName } = await request.json();
//         const updateProducts = await query({
//             query: "UPDATE Wishlist SET ProductName = ? WHERE id = ?",
//             values: [ProductName, id],
//         });
//         const result = updateProducts.affectedRows;
//         let message = result ? "success" : "error";
//         const Wishlist = {
//             id: id,
//             ProductName: ProductName,
//         };
//         return new Response(JSON.stringify({
//             message: message,
//             status: 200,
//             Wishlist: Wishlist
//         }));
//     } catch (error) {
//         return new Response(JSON.stringify({
//             status: 500,
//             data: error.message
//         }));
//     }
// }

export async function DELETE(request) {
    console.log("first")
    try {
        const { WishlistId } = await request.json();
        console.log('Received WishlistId:', WishlistId); // Log received WishlistId
        const deleteWishlist = await query({
            query: "DELETE FROM Wishlist WHERE WishlistId = ?",
            values: [WishlistId],
        });
        console.log('Affected Rows:', deleteWishlist.affectedRows); // Log affected rows
        const message = deleteWishlist.affectedRows ? "success" : "error";
        return new Response(JSON.stringify({
            message: message,
            status: 200,
            WishlistId: WishlistId
        }));
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            data: error.message
        }));
    }
    console.log("at ur desire place ")
}
