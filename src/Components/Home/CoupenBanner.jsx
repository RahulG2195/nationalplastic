import React from "react";
import Image from "next/image";
import "../../styles/coupen.css";
import Link from "next/link";

function CoupenBanner() {
  return (
    <>
      <section className="coupen_sec">
        <div className="container text-center"> {/* Added text-center class */}
          <div className="coupen-row d-flex align-items-center">
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
            <div className="col-md-5 position-relative  me-5 border-end border-secondary">
              <div className="extra-isc ">
                <h>GET EXTRA 20% OFF</h>
                <p className="text- fw-bold small">On Signing Up</p>
              </div>
            </div>
            {/* <div className=" border-start border-secondary"></div> */}
            <div className=" px-4 ">
              <div className="offers ">
                <h5 className="text-start">USE EXCLUSIVE COUPON</h5>
                <p className="fw-semibold text-start">Applicable on Multiple Purchases</p>
              </div>
            </div>


            <div className="col-md-2 me-">
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

      <div className="delivery_inst_Sec">
        <div className="container delivery_div">
          <div className="row featuresFour d-flex justify-content-center">
            <div className="col-4 col-md-4 col-lg-3 col-xl-3">
              <div className="divelerycol d-flex align-items-center">
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
            <div className="col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3">
              <div className="divelerycol d-flex align-items-center">
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
            <div className="col-6 col-md-6 col-lg-3 col-xl-3">
              <div className="divelerycol d-flex align-items-center">
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
            <div className="col-6 col-md-6 col-lg-3 col-xl-3">
              <div className="divelerycol d-flex align-items-center">
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
      </div>

    </>
  );
}

export default CoupenBanner;
