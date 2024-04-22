import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});
export async function GET() {
  const payment_capture = 1;
  const amount = 1 * 100; // amount in paisa. In our case it's INR 1
  const currency = "INR";
  const options = {
    amount: amount.toString(),
    currency,
    receipt: shortid.generate(),
    payment_capture,
    notes: {
      // These notes will be added to your transaction. So you can search it within their dashboard.
      // Also, it's included in webhooks as well. So you can automate it.
      paymentFor: "testingDemo",
      userId: "100",
      productId: "P100",
    },
  };

  const order = await instance.orders.create(options);
  return NextResponse.json({ msg: "success", order });
}

export async function POST(request) {
  console.log("----------inside post request");

  const { amount, currency = "INR", receipt_email } = await request.json();

  try {
    const order = await instance.orders.create({
      amount: amount,
      currency,
    });

    return new Response(JSON.stringify({ message: order }), {
      status: 201,
    });
    console.error(error);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  }
}
