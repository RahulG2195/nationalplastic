import Image from "next/image";
import "../../styles/feature.css";

function Features() {
  return (
    <section className="feature_sec common_section">
      <div className="container feature">
        <div className="row">
          <div className="col-sm-12 col-md-4 features">
            <div>
              <div className="feature_img">
                <a href="">
                  <Image
                    src="/Assets/images/feature/Offers-section-1.png"
                    className="img-fluid d-block w-100" // Use w-100 to make the image fill the entire col-lg col-md-3 col-sm-12umn
                    alt="Team Member"
                    width={100}
                    height={100}
                    layout="responsive"
                    objectFit="cover"
                  /> 
                </a>
              </div>
              <div className="discounts_div com-dic">
                <a href="">
                  <p className="com-para">
                    <strong>Additional Discount</strong> Upto Rs. 10,000/-
                  </p>
                  <p>Available at your nearest stores</p>
                </a>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-4 features">
            <div>
              <a href="">
                <div className="feature_img">
                  <Image
                    src="/Assets/images/feature/Offers-section-2.png"
                    className="img-fluid d-block w-100" // Use w-100 to make the image fill the entire col-lg col-md-3 col-sm-12umn
                    alt="Team Member"
                    width={100}
                    height={100}
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
              </a>
              <div className="discounts_div_imp com-dic">
                <a href="">
                  <p className="imp-para">
                    <strong>Additional Discount</strong> Upto Rs. 30,000/-
                  </p>
                  <p>ICICI Bank, HDFC Bank and More</p>
                </a>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-4 features">
            <div>
              <a href="">
                <div className="feature_img">
                  <Image
                  src="/Assets/images/feature/Offers-section-1.png"
                  className="img-fluid d-block w-100" // Use w-100 to make the image fill the entire col-lg col-md-3 col-sm-12umn
                    alt="Team Member"
                    width={100}
                    height={100}
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
              </a>
              <div className="discounts_div com-dic">
                <a href="">
                  <p className="com-para">
                    <strong>No Cost </strong>EMI Offers
                  </p>
                  <p>Available with All Leading Banks</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

export default Features;
