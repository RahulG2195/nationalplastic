import { query } from "@/lib/db";
//fetches products based on the user ID provided
export async function POST(request) {
  try {
    const requestData = await request.json();
    let product_ids = [];

    // If the request contains a single product_id, convert it to an array
    if (requestData.product_id) {
      product_ids = [requestData.product_id];
    } else if (requestData.product_ids) {
      // If the request contains product_ids array, use it directly

      product_ids = requestData.product_ids;
    } else {
      // If neither product_id nor product_ids array is present, return error
      return new Response(
        JSON.stringify({
          status: 400,
          message:
            "Invalid request format. Expected 'product_id' or 'product_ids' array.",
        })
      );
    }

    // Construct a comma-separated list of placeholders for SQL query
    const placeholders = Array(product_ids.length).fill("?").join(", ");

    // Execute the query with product_ids as values
    const products = await query({
      query: `SELECT * FROM products WHERE product_id IN (${placeholders})`,
      values: product_ids,
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
        message: err.message || "Internal server Error",
      })
    );
  }
}

//Add Product based on the UserID
export async function PUT(request) {
  try {
    try {
      const { product_id, customer_id, quantity, color } = await request.json();
      const user_id = customer_id;
      const insertResult = await query({
        query:
          "SELECT count(*) as count FROM mycart where product_id = ? and user_id = ?",
        values: [product_id, user_id],
      });
      if (insertResult[0].count === 0) {
        // product count is zero
        try {
          const insertResult = await query({
            query:
              "INSERT INTO mycart (product_id, user_id, quantity, color) VALUES (?, ?, ?, ?)",
            values: [product_id, user_id, quantity, color],
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
              message: "Product Not  Avaiable",
            })
          );
        }
      } else {
        try {
          const insertResult = await query({
            query:
              "UPDATE mycart SET quantity = quantity + 1, color = ? WHERE product_id = ? AND user_id = ?",
            values: [color, product_id, user_id],
          });

          if (insertResult.affectedRows === 1) {
            return new Response(
              JSON.stringify({
                status: 200,
                message: "Products added to cart successfully",
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
              message: err.message || "Internal server Error",
            })
          );
        }
      }
    } catch (err) {
      return new Response(
        JSON.stringify({
          status: 500,
          message: err.message || "Internal server Error",
        })
      );
    }
  } catch (err) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: err.message || "Internal server Error",
      })
    );
  }
}

export async function DELETE(request) {
  try {
    const data = await request.formData();
    const product_id = data.get("product_id"); // Log received product_id
    const user_id = data.get("customer_id"); // Log received product_id

    const deleteWishlist = await query({
      query: "DELETE FROM mycart WHERE product_id = ? AND user_id = ?",
      values: [product_id, user_id],
    });
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

export async function PATCH(request) {
  try {
    const { customer_id, product_id, quantity } = await request.json();
    const user_id = customer_id; // Assuming customer_id is the same as user_id

    const updateResult = await query({
      query:
        "UPDATE mycart SET quantity = quantity + ? WHERE product_id = ? AND user_id = ?",
      values: [quantity, product_id, user_id],
    });

    if (updateResult.affectedRows === 1) {
      return new Response(
        JSON.stringify({ message: "Product quantity updated successfully" }),
        { status: 200 }
      );
    } else if (updateResult.affectedRows === 0) {
      return new Response(
        JSON.stringify({ message: "User or product not found" }),
        { status: 404 }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Failed to update product quantity" }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Error updating product quantity" }),
      { status: 500 }
    );
  }
}
