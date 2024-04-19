// "use client";
// import React, { useState } from "react";
// import Razorpay from "razorpay";

// const PaymentButton = () => {
//   const [razorpayInstance, setRazorpayInstance] = useState(null);

//   const initializeRazorpay = async () => {
//     const options = {
//       key: "YOUR_KEY_ID", // Replace with your actual key ID
//       amount: "50000", // Amount in paise (can be dynamically set)
//       currency: "INR",
//       name: "Acme Corp",
//       description: "Test Transaction",
//       image: "https://example.com/your_logo", // Replace with your logo URL
//       order_id: "order_9A33XWu170gUtm", // Replace with actual order ID
//       handler: handlePaymentSuccess,
//       prefill: {
//         name: "Gaurav Kumar",
//         email: "gaurav.kumar@example.com",
//         contact: "9000090000",
//       },
//       notes: {
//         address: "Razorpay Corporate Office",
//       },
//       theme: {
//         color: "#3399cc",
//       },
//     };

//     const rzp = new Razorpay(options);
//     setRazorpayInstance(rzp);
//   };

//   useEffect(() => {
//     initializeRazorpay(); // Initialize Razorpay on component mount
//   }, []);

//   const handlePaymentSuccess = (response) => {
//     alert(
//       `Payment Successful!\nRazorpay Payment ID: ${response.razorpay_payment_id}`
//     );
//   };

//   const handlePaymentFailure = (response) => {
//     alert(
//       `Payment Failed! Error details:\nCode: ${response.error.code}\nDescription: ${response.error.description}\nSource: ${response.error.source}\nStep: ${response.error.step}\nReason: ${response.error.reason}`
//     );
//   };

//   const handleClick = async () => {
//     if (!razorpayInstance) {
//       await initializeRazorpay(); // Ensure initialization before opening payment
//     }
//     razorpayInstance.open();
//   };

//   return (
//     <button id="rzp-button1" onClick={handleClick}>
//       Pay
//     </button>
//   );
// };

// export default PaymentButton;
