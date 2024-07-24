import { query } from "@/lib/db"; 
// const router = useRouter();
import axios from "axios";

import { NextRequest, NextResponse } from "next/server";
// import "../../../../envConfig.js";

// Define your API endpoint handler for GET request
// import { useRouter } from 'next/navigation'
export async function POST(req) {

  try {
      const { orderid } = await req.json();  
      console.log('orderid', orderid);
      const orderResult = await query({
        query: `
          SELECT ol.*, od.*, p.product_id, p.product_name, p.color, p.image_name, cm.customer_id, cm.FirstName, cm.LasttName, cm.Phone, cm.Address, os.*
          FROM order_list AS ol
          LEFT JOIN order_detail AS od ON ol.order_id = od.order_id
          LEFT JOIN customer as cm ON ol.customer_id = cm.customer_id
          LEFT JOIN order_status as os ON ol.order_status = os.status_id
          LEFT JOIN products as p ON od.prod_id = p.product_id
          Where od.order_id = ?
        `,
        values: [orderid]
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
  