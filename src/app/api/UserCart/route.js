import { query } from "@/lib/db";
//fetches products based on the user ID provided
export async function POST(request) {
  try {
    const { customer_id } = await request.json();
    const user_id = customer_id;

    const mycart = await query({
      query: "SELECT product_id FROM mycart WHERE user_id = ?",
      values: [user_id],
    });

    const productIds = mycart.map((row) => row.product_id);

    // Fetch product details for the retrieved product IDs
    const products = await query({
      query: `
          SELECT p.*, mc.quantity AS cart_quantity
          FROM products p
          LEFT JOIN mycart mc ON p.product_id = mc.product_id AND mc.user_id = ?
          WHERE p.product_id IN (${productIds.join(",")})
      `,
      values: [user_id],
    });
    //appply map here to get data
    const dataForPayment = products.map((row) => ({
      product_id: row.product_id,
      product_name: row.product_name,
      color: row.color,
      quantity: row.cart_quantity,
    }));
    return new Response(
      JSON.stringify({
        status: 200,
        products: products,
        productIds: productIds,
        productps: dataForPayment,
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: error.message,
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
              message: error.message,
            })
          );
        }
      }
    } catch (error) {
      return new Response(
        JSON.stringify({
          status: 500,
          message: error.message,
        })
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: error.message,
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

export async function PATCH(request) {
  try {
    const { customer_id, product_id, quantity } = await request.json();
    const user_id = customer_id; // Assuming customer_id is the same as user_id
    //console.log("quantity", typeof quantity);
    //console.log("user_id", typeof user_id);
    //console.log("product_id", typeof product_id);

    const updateResult = await query({
      query:
        "UPDATE mycart SET quantity = quantity + ? WHERE product_id = ? AND user_id = ?",
      values: [quantity, product_id, user_id],
    });
    //console.log("-", updateResult);

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
