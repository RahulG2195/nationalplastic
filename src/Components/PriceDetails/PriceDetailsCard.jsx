import Link from 'next/link';
import './PriceDetailsCard.css';
import { useDispatch, useSelector } from 'react-redux';
// import { setTotalPrice} from '@/redux/reducer/counterSlice';
import { useEffect, useState } from 'react';
const PriceDetailsCard = ({ itemCount, cartPrice, totalDiscount, totalPay, InstallationCharges }) => {
  // const dispatch = useDispatch();
  const ValueFromRedux = useSelector((state) => state.price.totalprice);
  const [totalPrice, setTotalPrice] = useState(0); // Set initial value to 0
  console.log(totalPrice)
  console.log(ValueFromRedux)     

  useEffect(() => {
    setTotalPrice(ValueFromRedux);
  console.log(totalPrice)
  }, [ValueFromRedux]);
  return (
    <>
      <div className="PriceDetail">
        <div className="fw-medium">Price Detail ({itemCount ? itemCount : "0"} items)</div>

        <div className="mt-4">
          <div className={`d-flex justify-content-between mt-1 fw-semibold`}>
            <div className="text-secondary">MRP</div>
            <div> RS {totalPrice ? totalPrice : 100}</div>

          </div>
          <div className={`d-flex justify-content-between mt-1 fw-semibold text-success`}>
            <div className="text-secondary">Discount</div>
            <div> RS {totalDiscount ? totalDiscount : "0000"}</div>
          </div>
          <div className={`d-flex justify-content-between mt-1 fw-semibold text-success`}>
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
          <div className="medium">Rs {totalPay ? totalPay : "0000"}</div>
        </div>
        <div className="small my-2 text-success">
          Congratulations, you have just saved RS {totalDiscount ? totalDiscount : "0000"} on your order
        </div>
        <div className="small text-center">EMI starts with Rs 0,000</div>

        <div className="d-flex justify-content-center mt-2">
          <Link href="/ThankYouPage">
            <button type="submit" className="btn btn-danger px-5 placeOrderResp">Place Order</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PriceDetailsCard;



















