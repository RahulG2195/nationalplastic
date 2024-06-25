"use client";
import Link from "next/link";
import "./PriceDetailsCard.css";
import { useDispatch, useSelector } from "react-redux";
// import { setTotalPrice} from '@/redux/reducer/counterSlice';
import { useEffect, useState } from "react";
import axios from "axios";
import { createOrderSuccess } from "@/redux/reducer/paySlice";
import { useRouter } from "next/navigation";

const PriceDetailsCard = ({
  itemCount,
  cartPrice,
  totalDiscount,
  totalPay,
  InstallationCharges,
  redirect,
}) => {
  const router = useRouter();
  const { customer_id, email } = useSelector((state) => state.userData);
  const [Phone, setPhone] = useState(null);
  const [Name, setName] = useState(null);
  const [Address, setAddress] = useState(null);

  const isBrowser = typeof window !== "undefined";

  useEffect(() => {
    const fetchUserData = async () => {
      const formData = {
        email: email,
        getProfile: true,
      };
      const response = await axios.put("/api/Users", formData);
      const userData = response.data.message[0]; // Directly access response.data.message
      const { Phone, FirstName, Address } = userData;
      setPhone(Phone);
      setName(FirstName);
      setAddress(Address);
    };

    fetchUserData();
  }, []);

  const userState = useSelector((state) => state.userData.isLoggedIn);

  const [InstallationCharge, setInstallationCharge] = useState(40);
  const productCount = useSelector((state) => {
    let who;
    if (!userState) {
      who = "temp";
    } else {
      who = "cart";
    }
    const cart = state[who] || {};
    return cart.products?.length || 0;
  });
  const dispatch = useDispatch();

  const [count, setCount] = useState(productCount);
  useEffect(() => {
    setCount(productCount);
    setInstallationCharge(productCount * 40);
  }, [productCount]);
  const priceFromState = useSelector(
    (state) => state.cart.total_price || state.temp.total_price || 0
  );
  const MRPvalue = useSelector(
    (state) => state.cart.discount_price || state.temp.discount_price || 0
  );
  const orderData = useSelector((state) => state.payment?.order?.data?.message);

  const [discount, setdiscount] = useState(MRPvalue - priceFromState);
  const [totalPrice, setTotalPrice] = useState(priceFromState);
  const [MRPPrice, setMRPPrice] = useState(MRPvalue);
  const [DiscountToPoint, setDiscountToPoint] = useState(
    totalDiscount * itemCount
  );

  const [DiscountCard, setDiscountCard] = useState(0);
  const [productsData, setProductsData] = useState(null);

  const testing = async () => {
    const userCartData = await axios.post("/api/UserCart", {
      customer_id: customer_id,
    });
    setProductsData(userCartData.data.productps);
  };
  useEffect(() => {
    testing();
    setTotalPrice(priceFromState.toFixed(2));
    setMRPPrice(MRPvalue.toFixed(2));
    setdiscount(Math.round((MRPvalue - priceFromState) * 100) / 100);
    const discount = Math.round((MRPvalue - priceFromState) * 100) / 100;
    setDiscountCard(discount > 0 ? discount.toFixed(2) : 0);
  }, [priceFromState, MRPvalue, DiscountCard, totalDiscount]);

  //! logic for getting products data as a array with qty, color , p_id and name from usercart
  // const userCartData = await axios.post("/api/UserCart", {
  //   customer_id: customer_id,
  // });
  // const productsData = userCartData.data.productps;
  // dispatch(createOrderSuccess(orderData));
  const makePayment = async ({ productId = null }) => {

    const totalPay = parseFloat(totalPrice) + parseFloat(InstallationCharge);
    // console.log('totalPay', totalPay);
    // console.log('totalPay', totalPay * 100);
    const response = await axios.post("/api/razorpay", {
      amount: totalPay * 100,
      currency: "INR",
      // products: productsData,
      email: email,
      isBrowser: isBrowser,
    });
    const orderData = response;

    const options = {
      amount: orderData.data.message.amount,
      currency: orderData.data.message.currency,
      name: "National PLastic",
      description: "Payment for your purchase",
      image: "",
      order_id: orderData.data.message.id,
      handler: async function (response) {
        const data = await fetch("/api/paymentVerify", {
          method: "POST",
          // headers: {
          //   // Authorization: 'YOUR_AUTH_HERE'
          // },
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            isBrowser: isBrowser,
          }),
        });
        const payID = response.razorpay_payment_id;
        const res = await data.json();
        const status = res.success || false;
        if (status) {
          const response = await axios.put("/api/razorpay", {
            razorpay_payment_id: payID,
            isBrowser: isBrowser,
          });
          updateDatabase(response.data.response);
          sendPaymentSuccessMail(response.data.response);
          router.push("/ThankYouPage");
        }
      },
      prefill: {
        name: Name || null,
        email: email || null,
        contact: Phone || null,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.success", function (response) {
      alert("Payment succesfully received");
    });
    paymentObject.on("payment.failed", function (response) {
      alert("Payment failed. Please try again. Contact support for help");
    });
  };

  const sendPaymentSuccessMail = async (values) => {
    const paymentData = {
      id: values.id,
      contact: values.contact,
      email: values.email,
      bank: values.bank,
      description: values.description,
      method: values.method,
      order_id: values.order_id,
      currency: values.currency || "INR",
      amount: values.amount,
      status: values.status,
    };
    await axios.put("/api/RegisterEmail", paymentData);
  };
  const updateDatabase = async (values) => {
    const paymentData = {
      razorpay_order_id: values.order_id,
      customer_id: customer_id,
      customer_email: values.email,
      Phone: values.contact,
      order_address: Address,
      order_city: Address,
      order_pincode: Address,
      order_payment_type: values.method,
      payment_status: values.status,
      razor_payment_id: values.id,
      order_detail: {
        price: values.amount,
        cart: productsData,
      },
    };
    const resData = await axios.put("/api/paymentVerify", paymentData);
  };
  return (
    <>
      <div className="PriceDetail">
        <div className="fw-medium">
          Price Detail ({count ? count : "0"} items)
        </div>

        <div className="mt-4">
          <div className={`d-flex justify-content-between mt-1 fw-semibold`}>
            <div className="text-secondary">MRP</div>
            <div> RS {MRPPrice ? MRPPrice : "0000.00"}</div>
          </div>
          <div
            className={`d-flex justify-content-between mt-1 fw-semibold text-success`}
          >
            <div className="text-secondary">Discount</div>
            <div> RS {totalDiscount ? discount : "0000"}</div>
          </div>
          <div
            className={`d-flex justify-content-between mt-1 fw-semibold text-success`}
          >
            <div className="text-secondary">Coupon (htyxhs5)</div>
            <div>RS 0000.00</div>
          </div>
          <div className={`d-flex justify-content-between mt-1 fw-semibold`}>
            <div className="text-secondary ">Installation Charge</div>
            <div>Rs {InstallationCharge ? InstallationCharge : "0000"}</div>
          </div>
          <div className="border-bottom border-secondary mt-2"></div>
        </div>

        <div className="d-flex justify-content-between mt-3">
          <div>Total Payable</div>
          <div className="fw-bold">
            Rs{" "}
            {totalPay
              ? parseFloat(totalPrice) + parseFloat(InstallationCharge)
              : "0000.00"
              ? parseFloat(totalPrice) + parseFloat(InstallationCharge)
              : "0000.00"}
          </div>
        </div>
        <div className="small my-2 text-success text-center">
          Congratulations, you have just saved RS
          {totalDiscount ? discount : "0000"} on your order
        </div>
        <div className="small text-center">EMI starts with Rs 10,000</div>

        <div className="d-flex justify-content-center mt-2">
          {redirect ? (
            <Link href={`${userState ? "/Address" : "/Login"}`}>
              <button
                type="submit"
                className="btn btn-danger px-md-5 placeOrderResp"
              >
                {userState ? "Checkout" : "Login To Checkout"}
              </button>
            </Link>
          ) : (
            // <Link href="/razorpay">
            <button
              type="submit"
              className="btn btn-danger px-md-5 placeOrderResp"
              onClick={() => {
                makePayment({ productId: "example_ebook" });
              }}
              disabled={!userState}
            >
              Place Order
            </button>
            // </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default PriceDetailsCard;

// razorpay_order_id: "order_O1vVcUugpUouWV"
// razorpay_payment_id"pay_O1vf4hyeCnkPNw"
// razorpay_signature"3dd852f8211df76541b1a2dcafc2382676ed064f61fc50106795211d40ae5431"

// VM4812 PriceDetailsCard.jsx:112 response verify==
// {message: 'expectedSignature is not defined'}
// message:"expectedSignature is not defined"

// ! important
// order_O56riulAYqkU6m;
// order_O570oinlp2HVzt
