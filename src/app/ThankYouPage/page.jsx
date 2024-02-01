import Image from "next/image";
import "../../styles/error.css";
function ThankYouPage() {
  return (
    <>
      <div className="container error-main-container">
        <div className="row ThankYouImg">
          <Image
            src="/assets/images/404/successful.png"
            width={100}
            height={100}
            layout="responsive"
            objectFit="cover"
          />
        </div>

        <div className="row error-text">
            <h1>Order Successful</h1>
            <h5>Thankyou so much for your order</h5>
            <button className="error-homepage-btn" >CHECK STATUS</button>
        </div>
      </div>
    </>
  );
}
export default ThankYouPage;
