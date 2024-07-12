import { query } from "@/lib/db"; 
// const router = useRouter();
import axios from "axios";

import { NextRequest, NextResponse } from "next/server";
// import "../../../../envConfig.js";

export async function POST(request) {
  try {
    // Extract data from the request JSON
    const { prodId, user_id } = await request.json();

    const updatereturnprod = await query({
      query: "UPDATE order_detail SET return_order = 0, per_order_status = 0 WHERE prod_id = ? AND user_id = ?",
      values: [prodId, user_id],
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