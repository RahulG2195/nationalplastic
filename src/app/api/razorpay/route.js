import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { v4 as uuidv4 } from "uuid"; // Import for generating unique IDs

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

export async function GET() {
  const payment_capture = 1;
  const amount = 1 * 100; // amount in paisa. In our case it's INR 1
  const currency = "INR";

  const order = await instance.orders.create(options);
  return NextResponse.json({ msg: "success", order });
}

export async function POST(request) {
  try {
    const {
      amount,
      currency = "INR",
      products,
      email,
      isBrowser,
    } = await request.json();
    console.log("is browser", isBrowser);
    if (isBrowser) {
      const options = {
        amount: amount,
        currency,
        receipt: uuidv4(), // Generate unique receipt ID using uuid
        notes: {
          email: email,
          // cart: JSON.stringify(products),
        },
      };
      const order = await instance.orders.create(options);
      return new Response(JSON.stringify({ message: order }), {
        status: 201,
      });
    } else {
      throw new Error("Failed to fetch payment details");
    }
  } catch (error) {
    console.error("error ", error);
    return new Response(
      JSON.stringify({ message: error || "INTERNAL SERVER ERROR" }),
      {
        status: 500,
      }
    );
  }
}
//Fetches Payement data based on the payment ID
export async function PUT(request) {
  try {
    console.log("inside- put request");

    const { razorpay_payment_id, isBrowser } = await request.json();
    console.log("inside put request");

    if (isBrowser) {
      const response = await instance.payments.fetch(razorpay_payment_id);
      console.log("----------------------------", response.id);
      return NextResponse.json({ msg: "successss", response });
    } else {
      throw new Error("Failed to fetch payment details");
    }
  } catch (error) {
    return NextResponse.json({
      msg: "Failed to verifyy",
      err: error.message,
    });
  }
}
//response from put request
