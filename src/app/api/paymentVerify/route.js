import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import "../../../../envConfig.js";
import { query } from "@/lib/db";

export async function POST(req) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      isBrowser,
    } = await req.json();
    // Validation
    if (isBrowser) {
      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return NextResponse.json({
          success: false,
          error: "Missing required data in request body",
        });
      }
      // Import crypto for security best practices
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");
      const isAuthentic = expectedSignature === razorpay_signature;
      if (isAuthentic) {
        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json({
          success: false,
          message: "Invalid signature",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Internal server Error",
      });
    }
  } catch (err) {
    console.error("Error verifying payment:", err);
    return NextResponse.json({ success: false, message: err.message });
  }
}

export async function PUT(request) {
  try {
    const requestData = await request.json();
    const {
      razorpay_order_id,
      customer_id,
      customer_email,
      Phone,
      order_address,
      order_pincode = null,
      order_city = null,
      order_payment_type,
      payment_status,
      razor_payment_id,
      order_detail,
    } = requestData;
    // Insert order_list
    const orderListValues = [
      razorpay_order_id,
      customer_id,
      customer_email,
      Phone,
      order_address,
      order_pincode,
      order_city,
      order_payment_type,
      payment_status,
      razor_payment_id,
    ];

    // Replace undefined with null
    const sanitizedOrderListValues = orderListValues.map((value) =>
      value !== undefined ? value : null
    );

    const orderListQuery =
      "INSERT INTO order_list (razorpay_order_id, customer_id,customer_email, Phone, order_address, order_pincode, order_city, order_payment_type, payment_status, razor_payment_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    const res = await query({
      query: orderListQuery,
      values: sanitizedOrderListValues,
    });

    // Insert order_detail
    const orderDetailValues = [
      razorpay_order_id,
      customer_id,
      order_detail.price,
      JSON.stringify(order_detail.cart),
    ];
    const orderDetailQuery =
      "INSERT INTO order_detail (razorpay_order_id, customer_id, price, cart) VALUES (?, ?, ?, ?)";
    const res2 = await query({
      query: orderDetailQuery,
      values: orderDetailValues,
    });

    return new Response(
      JSON.stringify({
        message: "success",
        status: 200,
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
