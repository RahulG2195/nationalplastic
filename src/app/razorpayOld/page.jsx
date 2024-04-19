"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { useRouter } from "next/navigation";

const Payment = () => {
  const router = useRouter();

  const [amount, setAmount] = useState(1000); // Example amount in rupees
  const [receiptEmail, setReceiptEmail] = useState("customer@example.com");
  const [error, setError] = useState(null);
  const orderData = useSelector((state) => state.payment?.order?.data?.message);
  const [orderId, setOrderId] = useState(orderData.id);

  console.log(
    "---------------------------+++++++++-------------------------------------"
  );

  console.log(orderData);
  const handlePayment = async () => {
    try {
      const response = await axios.post("/api/razorpay", {
        amount: amount,
      });
      console.log(response);
      const paymentLink = `https://api.razorpay.com/v1/checkout/embedded/${orderData.id}`;
      window.location.href = paymentLink;
      router.push(paymentLink);

      setError(null);
      console.log("2555555");
      console.log(orderData);
      // Initialize Razorpay checkout (replace with your actual options)
      const options = {
        key: "rzp_test_WUEWvbWJ3T7hJ0",
        amount: 1000,
        currency: "INR",
        name: "Your Company Name",
        description: "Payment for your purchase",
        image: "https://your-company-logo.com/logo.png",
        order_id: "order_O03KcISBpP9klw",
        handler: async function (response) {
          const { razorpay_payment_id, razorpay_signature } = response;
          try {
            const verifyResponse = await axios.post(
              "/api/razorpay/verify-payment",
              {
                razorpay_payment_id,
                razorpay_signature,
                order_id: orderData.id,
              }
            );
            console.log("vr", verifyResponse);

            if (verifyResponse.data.success) {
              console.log("Payment verified successfully!");
              // Handle successful payment (e.g., display success message, update order status)
            } else {
              console.error("Payment verification failed!");
              setError("Payment verification failed.");
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            setError("Error verifying payment.");
          }
        },
        theme: {
          color: "#333333",
          hover_color: "#428bca",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
      setError(error.message || "Error creating order");
    }
  };

  return (
    <div>
      <h1>Payment</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="email"
        value={receiptEmail}
        onChange={(e) => setReceiptEmail(e.target.value)}
      />
      <button onClick={handlePayment} disabled={!orderId}>
        Pay Now
      </button>
      {orderId && <p>Order ID: {orderId}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Payment;
