//Cutomer_id === userID
import { query } from "@/lib/db";
import axios from "axios";
//Getting the Particular user information
export async function POST(request) {
  try {
    // Assuming you're passing customer_id as part of the request query
    const { customer_id } = await request.json();
    //console.log("CustomerINsidePost: " + customer_id);
    const user_id = customer_id;
    //console.log("User: " + user_id);
    // Get the product IDs from the wishlist table for a specific customer
    // alert();
    const wishlist = await query({
      query: "SELECT product_id FROM wishlist WHERE user_id = ?",
      values: [user_id],
    });
    const productIds = wishlist.map((row) => row.product_id);

    const products = await query({
      query: `
          SELECT *
          FROM products
          WHERE product_id IN (${productIds.join(",")})
      `,
      values: [],
    });
    //console.log(wishlist);
    // Fetch products from the products table based on the product IDs
    return new Response(
      JSON.stringify({
        status: 200,
        products: products,
      })
    );
  } catch (error) {
    console.error("Error in GET request:", error);
    return new Response(
      JSON.stringify({
        status: 500,
        message: "Internal Server Error",
      })
    );
  }
}
//Updating the wishlist for the current user
export async function PUT(request) {
  try {
    const { product_id, customer_id } = await request.json();
    const user_id = customer_id;
    //console.log("this is id i want to post ", product_id);

    // Check if the product_id is provided
    if (!product_id) {
      return new Response(
        JSON.stringify({
          status: 400,
          message: "Missing product_id in request body",
        })
      );
    }

    const insertResult = await query({
      query: "INSERT INTO wishlist (product_id, user_id) VALUES (?, ?)",
      values: [product_id, user_id],
    });

    if (insertResult.affectedRows === 1) {
      return new Response(
        JSON.stringify({
          status: 200,
          message: "Product added to wishlist successfully",
        })
      );
    } else {
      return new Response(
        JSON.stringify({
          status: 500,
          message: "Failed to add product to wishlist",
        })
      );
    }
  } catch (error) {
    console.error("Error in POST request:", error);
    return new Response(
      JSON.stringify({
        status: 500,
        message: "Internal Server Error",
      })
    );
  }
}

export async function DELETE(request) {
  try {
    const formData = await request.formData();
    //console.log("formData", formData); // Get form data
    const user_id = formData.get("customer_id");
    const product_id = formData.get("product_id");

    // Log received product_id
    const deleteWishlist = await query({
      query: "DELETE FROM wishlist WHERE product_id = ? AND user_id = ?",
      values: [product_id, user_id],
    });
    //console.log("Affected Rows:", deleteWishlist); // Log affected rows

    //console.log("Affected Rows:", deleteWishlist.affectedRows); // Log affected rows
    const message = deleteWishlist.affectedRows ? "success" : "error";
    return new Response(
      JSON.stringify({
        message: message,
        status: 200,
        product_id: product_id,
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
