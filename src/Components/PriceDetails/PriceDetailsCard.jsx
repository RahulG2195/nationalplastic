import Link from "next/link";
import "./PriceDetailsCard.css";
import { useDispatch, useSelector } from "react-redux";
// import { setTotalPrice} from '@/redux/reducer/counterSlice';
import { useEffect, useState } from "react";

const PriceDetailsCard = ({
  itemCount,
  cartPrice,
  totalDiscount,
  totalPay,
  InstallationCharges,
  redirect,
}) => {
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
  const [count, setCount] = useState(productCount);
  useEffect(() => {
    setCount(productCount);
    setInstallationCharge(productCount * 40);
    // Update localCount whenever productCount changes
  }, [productCount]);
  console.log("pdc", itemCount);
  const priceFromState = useSelector(
    (state) => state.cart.total_price || state.temp.total_price || 0
  );
  const MRPvalue = useSelector(
    (state) => state.cart.discount_price || state.temp.discount_price || 0
  );
  const [discount, setdiscount] = useState(MRPvalue - priceFromState);
  console.log("dis", discount);
  const [totalPrice, setTotalPrice] = useState(priceFromState);
  const [MRPPrice, setMRPPrice] = useState(MRPvalue);
  const [DiscountToPoint, setDiscountToPoint] = useState(
    totalDiscount * itemCount
  );

  const [DiscountCard, setDiscountCard] = useState(0);
  useEffect(() => {
    setTotalPrice(priceFromState.toFixed(2));
    setMRPPrice(MRPvalue.toFixed(2));
    setdiscount(Math.round((MRPvalue - priceFromState) * 100) / 100);
    console.log(DiscountToPoint);
    const discount = Math.round((MRPvalue - priceFromState) * 100) / 100;
    setDiscountCard(discount > 0 ? discount.toFixed(2) : 0);
  }, [priceFromState, MRPvalue, DiscountCard, totalDiscount]);
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
              ? totalPay
              : totalPrice
              ? parseFloat(totalPrice) + parseFloat(InstallationCharge)
              : "0000"}
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
            <Link href="/ThankYouPage">
              <button
                type="submit"
                className="btn btn-danger px-md-5 placeOrderResp"
              >
                Place Order
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default PriceDetailsCard;
