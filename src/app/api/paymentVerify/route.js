import crypto from "crypto";

export async function POST(req, res) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await req.json();

    // Validation
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return new Response(
        JSON.stringify({
          status: 400,
          message: "Missing required data in request body",
        })
      );
    }

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
      return new Response(
        JSON.stringify({
          status: 200,
          message: "Success",
        })
      );
    } else {
      console.log("Payment verification failed");
      return new Response(
        JSON.stringify({
          status: 400,
          message: "Invalid signature",
        })
      );
    }
  } catch (err) {
    console.error("Error verifying payment:", err);
    return new Response(
      JSON.stringify({
        status: 500,
        message: "Internal Server Error",
      })
    );
  }
}
