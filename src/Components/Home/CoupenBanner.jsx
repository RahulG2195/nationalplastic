import React from "react";
import Image from "next/image";
import "../../styles/coupen.css";
import Link from "next/link";

function CoupenBanner() {
  return (
    <>
      <section className="coupen_sec">
        <div className="container">
          <div className="row coupen-row">
            <div className="col-md-1">
              <Image
                src="/Assets/images/gift-box.png"
                alt="gift image"
                width={100}
                height={100}
                layout="responsive"
                objectFit="cover"
              />
            </div>
            <div className="col-md-4">
              <div className="extra-isc">
                <h4>GET EXTRA 20% OFF</h4>
                <small>On Signing Up</small>
              </div>
            </div>
            <div className="col-md-6">
              <div className="offers">
                <h5>USE EXCLUSIVE COUPON</h5>
                <small>Applicable on Multiple Purchases</small>
              </div>
            </div>
            <div className="col-md-2">
              <p className="coupen_code">
                <strong>DIWALI20</strong>
              </p>
            </div>
            <div className="col-md-2">
              <div className="signup_div">
                <Link href="/Login">
                  <button className="signup">Sign Up Now</button>
                </Link>
                <p>As in Life, T&C applied</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="delivery_inst_Sec">
        <div className="container delivery_div">
          <div className="row featuresFour">
            <div className="col-6 col-md-6 col-lg-3 col-xl-3">
              <div className="divelerycol d-flex align-center" >
                    <div className="del_img">
                        <Image
                    src="/Assets/images/smiley.png"
                    alt="gift image"
                    width={33}
                    height={33}
                    />
                    </div>
                <p>Happy Customers</p>
              </div>
            </div>
            {/* <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
              <div className="divelerycol d-flex align-center">
              <div className="del_img">
                <Image
                  src="/assets/images/delivery-truck.png"
                  alt="gift image"
                  width={33}
                  height={33}
                />
                </div>
                <p>Free Shipping</p>
              </div>
            </div> */}
            {/* <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
              <div className="divelerycol d-flex align-center"  data-aos="fade-down">
                    <div className="del_img">
                        <Image
                    src="/assets/images/smiley.png"
                    alt="gift image"
                    width={33}
                    height={33}
                    />
                    </div>
                <p>Happy Customers</p>
              </div>
            </div> */}
            <div className="col-6  col-sm-6 col-md-6 col-lg-3 col-xl-3">
              <div className="divelerycol d-flex align-center">
              <div className="del_img">
                <Image
                  src="/Assets/images/delivery-truck.png"
                  alt="gift image"
                  width={33}
                  height={33}
                />
                </div>
                <p>Free Shipping</p>
              </div>
            </div>
            <div className="col-6  col-md-6 col-lg-3 col-xl-3">
              <div className="divelerycol d-flex align-center">
              <div className="del_img">
                <Image
                  src="/Assets/images/settings.png"
                  alt="gift image"
                  width={33}
                  height={33}
                />
                </div>
                <p>Free Installation</p>
              </div>
            </div>
            <div className="col-6  col-md-6 col-lg-3 col-xl-3">
              <div className="divelerycol d-flex align-center">
              <div className="del_img">
                <Image
                  src="/Assets/images/0.png"
                  alt="gift image"
                  width={33}
                  height={33}
                />
                </div>
                <p>No Cost EMIs</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CoupenBanner;
