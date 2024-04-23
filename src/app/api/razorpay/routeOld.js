const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

export async function POST(request) {
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
