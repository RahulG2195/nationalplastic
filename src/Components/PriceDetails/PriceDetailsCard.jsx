"use client";
import Link from "next/link";
import "./PriceDetailsCard.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { createOrderSuccess } from "@/redux/reducer/paySlice";
import { useRouter } from "next/navigation";
import { emptyCartAsync } from "@/redux/reducer/cartSlice"
import numberWithCommas from "@/utils/formatnumber";
import { removeCoupon } from "@/redux/reducer/couponSlice";

const PriceDetailsCard = ({ itemCount, totalDiscount, totalPay, redirect }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { customer_id, email } = useSelector((state) => state.userData);

  const { discountPercentage, couponCode } = useSelector(
    (state) => state.discount
  );
  const [Phone, setPhone] = useState(null);
  const [Name, setName] = useState(null);
  const [Address, setAddress] = useState(null);
  const isBrowser = typeof window !== "undefined";
  // User Data
  useEffect(() => {
    const fetchUserData = async () => {
      const formData = {
        email: email,
        getProfile: true,
      };
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/Users`,
        formData
      );
      const userData = response.data.message[0]; // Directly access response.data.message
      const { Phone, FirstName, Address } = userData;
      setPhone(Phone);
      setName(FirstName);
      setAddress(Address);
    };

    fetchUserData();
  }, []);
  const userState = useSelector((state) => state.userData.isLoggedIn);
  const [InstallationCharge, setInstallationCharge] = useState(0);
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
  const [finalAmount, setFinalAmount] = useState(0);
  const [DiscountCard, setDiscountCard] = useState(0);
  const [productsData, setProductsData] = useState(null);

  const settingProductData = async () => {
    const userCartData = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/UserCart`,
      {
        customer_id: customer_id,
      }
    );
    setProductsData(userCartData.data.productps);
  };
  useEffect(() => {
    settingProductData();

    setTotalPrice(priceFromState.toFixed(2));
    setMRPPrice(MRPvalue.toFixed(2));
    setdiscount(Math.round((MRPvalue - priceFromState) * 100) / 100);
    const discount = Math.round((MRPvalue - priceFromState) * 100) / 100;
    setDiscountCard(discount > 0 ? discount.toFixed(2) : 0);
    const calculateFinalAmount = () => {
      if (count === 0) {
        setFinalAmount("0.00");
        return;
      }

      const baseAmount = parseFloat(totalPrice) + parseFloat(InstallationCharge);
      const discountAmount = baseAmount * (discountPercentage / 100);
      const finalTotal = baseAmount - discountAmount;
      setFinalAmount(finalTotal.toFixed(2));
    };

    calculateFinalAmount();
  }, [priceFromState, MRPvalue, DiscountCard, totalDiscount]);

  const makePayment = async ({ productId = null }) => {
    const totalPay = finalAmount;
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/razorpay`,
      {
        amount: totalPay * 100,
        currency: "INR",
        email: email,
        isBrowser: isBrowser,
      }
    );
    const orderData = response;
    const options = {
      amount: orderData.data.message.amount,
      currency: orderData.data.message.currency,
      name: "National PLastic",
      description: "Payment for your purchase",
      image: "",
      order_id: orderData.data.message.id,
      handler: async function (response) {
        const data = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/paymentVerify`,
          {
            method: "POST",
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              isBrowser: isBrowser,
            }),
          }
        );
        const payID = response.razorpay_payment_id;
        const res = await data.json();
        const status = res.success || false;
        if (status) {
          const response = await axios.put(
            `${process.env.NEXT_PUBLIC_BASE_URL}/razorpay`,
            {
              razorpay_payment_id: payID,
              isBrowser: isBrowser,
            }
          );
          updateDatabase(response.data.response);
          sendPaymentSuccessMail(response.data.response);
          dispatch(emptyCartAsync(customer_id))
          dispatch(removeCoupon());
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
      amount: finalAmount,
      coupon_code: couponCode,
      status: values.status,
    };
    axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/RegisterEmail`,
      paymentData
    );
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
        price: finalAmount,
        cart: productsData,
      },
    };
    const resData = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/paymentVerify`,
      paymentData
    );
    console.log("Payment {paymentVerify} Data", JSON.stringify(resData));
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
            <div> ₹ {MRPPrice ? numberWithCommas(MRPPrice) : "0000.00"}</div>
          </div>
          <div
            className={`d-flex justify-content-between mt-1 fw-semibold text-success`}
          >
            <div className="text-secondary">Discount</div>
            <div>
              {" "}
              - ₹{" "}
              {totalDiscount ? numberWithCommas(discount.toFixed(2)) : "0000"}
            </div>
          </div>
          <div
            className={`d-flex justify-content-between mt-1 fw-semibold text-success`}
          >
            <div className="text-secondary">
              Coupon ({couponCode ? couponCode : 'NONE'})
            </div>
            <div>{couponCode ? discountPercentage + '%' : "0000"}</div>
          </div>
          <div className={`d-flex justify-content-between mt-1 fw-semibold`}>
            <div className="text-secondary ">Installation Charge</div>
            <div>
              {" "}
              ₹{" "}
              {InstallationCharge
                ? numberWithCommas(InstallationCharge)
                : "0000"}
            </div>
          </div>
          <div className="border-bottom border-secondary mt-2"></div>
        </div>

        <div className="d-flex justify-content-between mt-3">
          <div>Total Payable</div>
          <div className="fw-bold">
            ₹{totalPrice ? numberWithCommas(finalAmount) : "0000.00"}
          </div>
        </div>
        <div className="small my-2 text-success text-center">
          Congratulations, you have just saved RS
          {totalDiscount
            ? numberWithCommas((MRPPrice - finalAmount).toFixed(2))
            : "0000"}{" "}
          on your order
        </div>
        <div className="d-flex justify-content-center mt-2">
          {redirect ? (
            <Link href={`${userState ? "/Address" : "/Login"}`}>
              <button
                type="submit"
                className="btn btn-danger px-md-5 placeOrderResp"
                disabled={count === 0}
              >
                {userState ? "Checkout" : "Login To Checkout"}
              </button>
            </Link>
          ) : (
            <button
              type="submit"
              className="btn btn-danger px-md-5 placeOrderResp"
              // onClick={() => {
              //   makePayment({ productId: "example_ebook" });
              // }}
              onClick={() => {
                console.log("Payment");
              }}
              // disabled={!userState || count === 0}
              disabled ="true"

            >
              Place Order
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default PriceDetailsCard;
