"use client";
import React, { Suspense } from "react";
import Buy from "./Buy";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import axios from "axios";
import { useSelector } from "react-redux";

const BuyProduct = () => {
  const orderData = useSelector((state) => state.payment?.order?.data?.message);
  console.log(orderData);
  console.log(orderData.amount);
  console.log(orderData.currency);
  console.log(orderData.id);

  console.log(JSON.stringify(orderData));
  const router = useRouter();

  const makePayment = async ({ productId = null }) => {
    // "use server"
    // const key = process.env.RAZORPAY_API_KEY;
    // console.log(key);
    // Make API call to the serverless API
    // const data = await axios.post("/api/razorpay");
    // const { order } = await data.json();
    // console.log(order.id);
    const options = {
      key: "rzp_test_WUEWvbWJ3T7hJ0",
      amount: orderData.amount,
      currency: orderData.currency,
      name: "National PLastic",
      description: "Payment for your purchase",
      image: "",
      order_id: orderData.id,
      // image: logoBase64,
      handler: async function (response) {
        // if (response.length==0) return <Loading/>;
        console.log("FROM BUyProduct: ", response);
        const data = await fetch("/api/paymentverify", {
          method: "POST",
          // headers: {
          //   // Authorization: 'YOUR_AUTH_HERE'
          // },
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          }),
        });

        const res = await data.json();

        console.log("response verify==", res);

        if (res?.message == "success") {
          console.log("redirected.......");
          router.push(
            "/paymentsuccess?paymentid=" + response.razorpay_payment_id
          );
        }

        // Validate payment at server - using webhooks is a better idea.
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
      },
      prefill: {
        name: "mmantratech",
        email: "mmantratech@gmail.com",
        contact: "9354536067",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      alert("Payment failed. Please try again. Contact support for help");
    });
  };

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Buy makePayment={makePayment} />
      </Suspense>
    </>
  );
};

export default BuyProduct;
// razorpay_order_id
// :
// "order_O0Ns011IoUb7qG"
// razorpay_payment_id
// :
// "pay_O0O4Zs4ec40duK"
// razorpay_signature
// :
// "43627024d7110cd48fe7da955eed4e1f015f7109dadaeaaaa6f64621d5546e9f"
// [[Prototype]]
// :
// Object
