import { query } from "@/lib/db";
//fetches products based on the user ID provided
export async function POST(request) {
  try {
    const { customer_id } = await request.json();
    console.log("Customer: " + customer_id);
    const user_id = customer_id;

    const mycart = await query({
      query: "SELECT product_id FROM mycart WHERE user_id = ?",
      values: [user_id],
    });

    const productIds = mycart.map((row) => row.product_id);
    console.log("productIds------", productIds);
    // Fetch product details for the retrieved product IDs
    const products = await query({
      query: `SELECT * FROM products WHERE product_id IN (${productIds.join(
        ","
      )})`,
      values: [],
    });

    return new Response(
      JSON.stringify({
        status: 200,
        products: products,
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: "Invalid UserID",
      })
    );
  }
}

//Add Product based on the UserID
export async function PUT(request) {
  try {
    const { product_id, customer_id } = await request.json();
    const user_id = customer_id;
    const insertResult = await query({
      query: "INSERT INTO mycart (product_id,user_id) VALUES (?,?)",
      values: [product_id, user_id],
    });

    if (insertResult.affectedRows === 1) {
      return new Response(
        JSON.stringify({
          status: 200,
          message: "Product added to cart successfully",
        })
      );
    } else {
      return new Response(
        JSON.stringify({
          status: 500,
          message: "Failed to add product to cart",
        })
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: "Internal Server Error",
      })
    );
  }
}

export async function DELETE(request) {
  console.log("first");
  try {
    const { product_id, customer_id } = await request.json();
    const user_id = customer_id; // Log received product_id
    const deleteWishlist = await query({
      query: "DELETE FROM mycart WHERE product_id = ? AND user_id = ?",
      values: [product_id, user_id],
    });
    console.log("Affected Rows:", deleteWishlist.affectedRows); // Log affected rows
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
