import { query } from "@/lib/db";
// const router = useRouter();
import axios from "axios";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  try {
    const OrderCount = await query({
      query: `SELECT COUNT(order_id) As order_count, SUM(order_amount) AS order_amt FROM order_list WHERE order_status = 5`
    })

    const allProducts = await query({
        query:
          "SELECT COUNT(product_id) AS prod_count FROM products",
        values: [],
      });

      const TotalUser = await query({
        query: `SELECT COUNT(customer_id) AS cust_count FROM customer`
      });

      const TotalCat = await query({
        query: `SELECT COUNT(category_id) AS cat_count FROM categories`
      })

    return new Response(
      JSON.stringify({
        status: 200,
        OrderCount: OrderCount,
        allProducts: allProducts,
        TotalUser: TotalUser,
        TotalCat: TotalCat,
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
