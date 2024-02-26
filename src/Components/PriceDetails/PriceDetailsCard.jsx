import Link from 'next/link';
import './PriceDetailsCard.css';

const PriceDetailsCard = ({ cartPrice,totalDiscount,totalPay }) => {
  return (
    <>
      <div className="PriceDetail">
        <div className="fw-medium">Price Detail (2 items)</div>

        <div className="mt-4">
          <div className={`d-flex justify-content-between mt-1 fw-semibold`}>
            <div className="text-secondary">MRP</div>
            <div> RS {cartPrice ? cartPrice : "0000"}</div>
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
            <div>00,000</div>
          </div>
          <div className="border-bottom border-secondary mt-2"></div>
        </div>

        <div className="d-flex justify-content-between mt-3">
          <div>Total Payable</div>
          <div className="medium">Rs {totalPay?totalPay:"0000"}</div>
        </div>
        <div className="small my-2 text-success">
          Congratulations, you've just saved RS {totalDiscount ? totalDiscount : "0000"} on your order
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
