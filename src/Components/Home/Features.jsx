import Image from "next/image";
import "../../styles/feature.css";

function Features() {
  return (
    <section className="feature_sec common_section">
      <div className="container feature">
        <div className="row">
          <div className="col-sm-12 col-md-4">
            <a href="">
              <div className="feature_img">
                <Image
                  src="/assets/images/feature/Offers-section-1.png"
                  classname="img-fluid d-block w-100"
                  alt=""
                  fill
                />
              </div>
            </a>
            <div className="discounts_div com-dic"><a href="">
              <p className="com-para">
                <strong>Additional Discount</strong> Upto Rs. 10,000/-
              </p>
              <p>Available at your nearest stores</p>
              </a>
            </div>

          </div>
          <div className="col-sm-12 col-md-4">
            <a href="">
              <div className="feature_img">
                <Image
                  src="/assets/images/feature/Offers-section-2.png"
                  classname="img-fluid d-block w-100"
                  alt=""
                  fill
                />
              </div>
            </a>
            <div className="discounts_div_imp com-dic"><a href="">
              <p className="imp-para">
                <strong>Additional Discount</strong> Upto Rs. 30,000/-
              </p>
              <p>ICICI Bank, HDFC Bank and More</p>
            </a></div>
            
          </div>
          <div className="col-sm-12 col-md-4">
            <a href="">
              <div className="feature_img">
                <Image
                  src="/assets/images/feature/Offers-section-1.png"
                  classname="img-fluid d-block "
                  alt=""
                  fill
                />
              </div>
            </a>
            <div className="discounts_div com-dic"><a href="">
              <p className="com-para">
                <strong>No Cost </strong>EMI Offers
              </p>
              <p>Available with All Leading Banks</p>
            </a></div>
          </div>
        </div>
      </div>



      {/* <div className="container discount_cont my-4" >
        <div className="row">
          <div className="col-md-4">
            <a href=""><div className="discounts_div com-dic">
              <p className="com-para">
                <strong>Additional Discount</strong> Upto Rs. 10,000/-
              </p>
              <p>Available at your nearest stores</p>
            </div></a>
          </div>
          <div className="col-md-4">
            <a href=""><div className="discounts_div_imp com-dic">
              <p className="imp-para">
                <strong>Additional Discount</strong> Upto Rs. 30,000/-
              </p>
              <p>ICICI Bank, HDFC Bank and More</p>
            </div></a>
          </div>
          <div className="col-md-4">
            <a href=""><div className="discounts_div com-dic">
              <p className="com-para">
                <strong>No Cost </strong>EMI Offers
              </p>
              <p>Available with All Leading Banks</p>
            </div></a>
          </div>
        </div>
      </div> */}
    </section>
  );
}

export default Features;
