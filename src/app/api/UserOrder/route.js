
import { query } from "@/lib/db"; 
// const router = useRouter();
import axios from "axios";

import { NextRequest, NextResponse } from "next/server";
import "../../../../envConfig.js";

// Define your API endpoint handler for GET request
// import { useRouter } from 'next/navigation'

export async function GET(request) {
  try {
    const orderResult = await query({
      query: `
        SELECT ol.*, od.*
        FROM order_list AS ol
        LEFT JOIN order_detail AS od ON ol.order_id = od.order_id
      `
    });

    return new Response(
      JSON.stringify({
        status: 200,
        orderData: orderResult,
        message: "All Orders Retrieved",
      }),
      {
        headers: { 'Content-Type': 'application/json' }
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
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

export async function POST(request) {
  try {
    // Extract data from the request JSON
    const { prod_id, user_id, extraCharge } = await request.json();
    const updateprodtocancel = await query({
      query: "UPDATE order_detail SET cancel_order = 0, per_order_status = 0, extraCharge = ? WHERE prod_id = ? AND user_id = ?",
      values: [extraCharge, prod_id, user_id],
    })
    return new Response(
      JSON.stringify({
        status: 200,
        message: "updated",
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


export async function PUT(request) {
  try {

    const { email, customer_id } = await request.json();
    
    if (customer_id) {

        const orderResult = await query({
          query: "SELECT ol.*, od.*, product_id, product_name, seo_url, seo_url_clr, image_name, discount_percentage, category_id, discount_price  FROM order_list AS ol LEFT JOIN order_detail AS od ON ol.order_id = od.order_id LEFT JOIN products ON product_id = od.prod_id WHERE ol.customer_id = ? AND ol.payment_status = 'captured'",
          values: [customer_id]
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