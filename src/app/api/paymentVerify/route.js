import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import "../../../../envConfig.js";

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
