import React from "react";
import Image from "next/image";
import "../../styles/coupen.css";
import Link from "next/link";

function CoupenBanner() {
  return (
    <>
      {/* <section> */}
        <div className="yellowcpn">
          <div className="">
            <div className="position-relative dsktpbnr">
              <Image
                src="/Assets/svg/Group 944/Group 944.png"
                alt="gift image"
                width={100}
                height={100}
                layout="responsive"
                objectFit="cover"
              />
              <div className="d-flex gap-4 dSup">
                <div className="">
                  <p className="coupen_code">
                    <strong className="diwali">DIWALI20</strong>
                  </p>
                </div>
                <div className="">
                  <div className="signup_div">
                    <Link href="/Login">
                      <button className="signup">Sign Up Now</button>
                    </Link>
                    <p className="ltc">As in Life, T&C applied</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="position-relative mblBnner">
              <Image
                src="/Assets/svg/Group 946/Group 946.png"
                alt="gift image"
                width={100}
                height={100}
                layout="responsive"
                objectFit="cover"
              />
              <div className="d-flex gap-4 dSupMobile">
                <div className="">
                  <p className="coupen_code">
                    <strong className="diwaliM">DIWALI20</strong>
                  </p>
                </div>
                <div className="">
                  <div className="signup_div">
                    <Link href="/Login">
                      <button className="signup " >Sign Up Now</button>
                    </Link>
                    <p className="ltcM">As in Life, T&C applied</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      {/* </section> */}

      <div className="delivery_inst_Sec">
        <div className="container delivery_div">
          <div className="row featuresFour d-flex justify-content-center">
            <div className="col-6 col-md-4 col-lg-3 col-xl-3">
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
            <div className="col-6 col-md-4 col-xs-6 col-lg-3 col-xl-3">
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
            <div className="col-6 col-md-4 col-lg-3 col-xl-3">
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
            <div className="col-6 col-md-4 col-lg-3 col-xl-3">
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
