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
  // const dispatch = useDispatch();

  const priceFromState = useSelector((state) => state.cart.total_price || 0);
  const MRPvalue = useSelector((state) => state.cart.discount_price || 0);

  const [totalPrice, setTotalPrice] = useState(priceFromState);
  const [MRPPrice, setMRPPrice] = useState(MRPvalue);
  const [DiscountCard, setDiscountCard] = useState(0);
  useEffect(() => {
    setTotalPrice(priceFromState.toFixed(2));
    setMRPPrice(MRPvalue.toFixed(2));

    const discount = MRPvalue - priceFromState;
    setDiscountCard(discount > 0 ? discount.toFixed(2) : 0);
  }, [priceFromState, MRPvalue, DiscountCard]);
  return (
    <>
      <div className="PriceDetail">
        <div className="fw-medium">
          Price Detail ({itemCount ? itemCount : "0"} items)
        </div>

        <div className="mt-4">
          <div className={`d-flex justify-content-between mt-1 fw-semibold`}>
            <div className="text-secondary">MRP</div>
            <div> RS {MRPPrice}</div>
          </div>
          <div
            className={`d-flex justify-content-between mt-1 fw-semibold text-success`}
          >
            <div className="text-secondary">Discount</div>
            <div> RS {DiscountCard ? DiscountCard : "0000"}</div>
          </div>
          <div
            className={`d-flex justify-content-between mt-1 fw-semibold text-success`}
          >
            <div className="text-secondary">Coupon (htyxhs5)</div>
            <div>-RS 00,000</div>
          </div>
          <div className={`d-flex justify-content-between mt-1 fw-semibold`}>
            <div className="text-secondary">Installation Charge</div>
            <div>Rs {InstallationCharges ? InstallationCharges : "0000"}</div>
          </div>
          <div className="border-bottom border-secondary mt-2"></div>
        </div>

        <div className="d-flex justify-content-between mt-3">
          <div>Total Payable</div>
          <div className="fw-bold">
            Rs{" "}
            {totalPrice
              ? parseFloat(totalPrice) + parseFloat(InstallationCharges)
              : "0000"}
          </div>
        </div>
        <div className="small my-2 text-success">
          Congratulations, you have just saved RS{" "}
          {totalDiscount ? totalDiscount : "0000"} on your order
        </div>
        <div className="small text-center">EMI starts with Rs 0,000</div>

        <div className="d-flex justify-content-center mt-2">
          {redirect ? (
            <Link href="/Address">
              <button
                type="submit"
                className="btn btn-danger px-5 placeOrderResp"
              >
                Checkout
              </button>
            </Link>
          ) : (
            <Link href="/ThankYouPage">
              <button
                type="submit"
                className="btn btn-danger px-5 placeOrderResp"
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
