import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import "../../../../envConfig.js";

export async function POST(req) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await req.json();

    // Validation
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

    console.log("Expected Signature:", expectedSignature);
    console.log("Received Signature:", razorpay_signature);

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      console.log("Payment verification successful");
      return NextResponse.json({ success: true });
    } else {
      console.log("Payment verification failed");
      return NextResponse.json({
        success: false,
        message: "Invalid signature",
      });
    }
  } catch (err) {
    console.error("Error verifying payment:", err);
    return NextResponse.json({ success: false, message: err.message });
  }
}
