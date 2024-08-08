import { query } from "@/lib/db";
// const router = useRouter();
import axios from "axios";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  try {
    const orderResult = await query({
      query: `
        SELECT ol.*, cm.customer_id, cm.FirstName, cm.LasttName, cm.Phone, cm.Address, os.*
        FROM order_list AS ol
        LEFT JOIN customer as cm ON ol.customer_id = cm.customer_id
        LEFT JOIN order_status as os ON ol.order_status = os.status_id
      `,
    });
    const orderDetailResult = await query({
      query: `
        SELECT * FROM order_detail`,
    });

    const OrderStatus = await query({
      query: `
        SELECT * FROM order_status`,
    });

    const OrderCount = await query({
      query: `SELECT COUNT(order_id) As order_count, SUM(order_amount) AS order_amt FROM order_list WHERE order_status = 5`
    })

    return new Response(
      JSON.stringify({
        status: 200,
        orderData: orderResult,
        orderDetailData: orderDetailResult,
        OrderStatus: OrderStatus,
        OrderCount: OrderCount,
        message: "All Orders Retrieved",
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST(request) {
  try {
    // Extract data from the request JSON
    const { newStatus, order_id } = await request.json();

    // update order detail table if admin select cancel order
    if (newStatus == 6) {
      await query({
        query:
          "UPDATE order_detail SET cancel_order = 0, per_order_status = 0 WHERE order_id = ?",
        values: [order_id],
      });

      // update order detail table if admin select return order
    } else if (newStatus == 7) {
      await query({
        query:
          "UPDATE order_detail SET return_order = 0, per_order_status = 0 WHERE order_id = ?",
        values: [order_id],
      });
    }

    // update order status on main order list table
    await query({
      query: "UPDATE order_list SET order_status = ? WHERE order_id = ?",
      values: [newStatus, order_id],
    });

    return new Response(
      JSON.stringify({
        status: 200,
        message: "Order status Udpated",
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

// fetching data on front-end
export async function PUT(request) {
  try {
    const { customer_id } = await request.json();

    if (customer_id) {
      const orderResult = await query({
        query:
          "SELECT ol.*, od.*, product_id, product_name, seo_url, seo_url_clr, image_name, discount_percentage, category_id, discount_price  FROM order_list AS ol LEFT JOIN order_detail AS od ON ol.order_id = od.order_id LEFT JOIN products ON product_id = od.prod_id WHERE ol.customer_id = ? AND ol.payment_status = 'captured'",
        values: [customer_id],
      });

      return new Response(
        JSON.stringify({
          status: 200,
          orderData: orderResult,
          message: "Order Found",
        })
      );
    } else {
      throw new Error("User data not Found");
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

export async function PATCH(request) {
  const { prod_id, user_id, extraCharge, order_id, type } =
    await request.json();

  try {
    if (type == "Cancel") {
      const result = await query({
        query:
          "UPDATE order_detail SET cancel_order = 0, per_order_status = 0, extraCharge = ? WHERE prod_id = ? && user_id = ? ",
        values: [extraCharge, prod_id, user_id],
      });

      if (result) {
        const cancelValidate = await query({
          query:
            "Select order_id, cancel_order, per_order_status from order_detail WHERE order_id = ? AND cancel_order = 1 AND per_order_status = 1",
          values: [order_id],
        });
        if (cancelValidate.length == 0) {
          await query({
            query: "UPDATE order_list SET order_status = 6 WHERE order_id = ?",
            values: [order_id],
          });
        }
      }
    
    } else if (type == "return") {

      const result = await query({
        query:
          "UPDATE order_detail SET return_order = 0, per_order_status = 0, extraCharge = 0 WHERE prod_id = ? && user_id = ? ",
        values: [prod_id, user_id],
      });

      if (result) {
        const cancelValidate = await query({
          query:
            "Select order_id, return_order, per_order_status from order_detail WHERE order_id = ? AND return_order = 1 AND per_order_status = 1",
          values: [order_id],
        });
        if (cancelValidate.length == 0) {
          await query({
            query: "UPDATE order_list SET order_status = 7 WHERE order_id = ?",
            values: [order_id],
          });
        }
      }
    }

    return new Response(
      JSON.stringify({
        status: 200,
        message: "Order status Updated",
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
