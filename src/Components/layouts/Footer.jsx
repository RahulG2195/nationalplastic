"use client";
import Image from "next/image";
import "../../styles/footer.css";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { Collapse, Typography } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import BackToTopButton from '@/Components/BackToTop/BackToTopButton';

const { Panel } = Collapse;
export default function Footer() {
  const [basicInfo, setBasicInfo] = useState({
    logo: "",
    brand1_link: "",
    brand2_link: "",
    instagram: "",
    youtube: "",
    twitter: "",
    facebook: "",
    google: "",
    mobile_number1: "",
    mobile_number2: "",
    address: "",
    email: "",
    indiamart: "",
  });

  const [initialBasicInfo, setInitialBasicInfo] = useState({});

  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    const fetchBasicInfo = async () => {
      try {
        const response = await axios.get("/api/basicInfo");
        const basicInfoData = response.data.basicInfo;
        setBasicInfo(basicInfoData);
        setInitialBasicInfo(basicInfoData);
      } catch (error) {
        console.error("There was an error fetching the basic info!", error);
      }
    };

    fetchBasicInfo();
  }, []);


  const footerSections = [
    {
      title: "OUR COMPANY",
      links: [
        { text: "About Us", href: "/company-profile" },
        { text: "brochure", href: "/catalogue" },
        { text: "blog", href: "#" },
        { text: "Career", href: "/careers" },
        { text: "Media & News", href: "/news-and-media" },
        // { text: "Customer Stories", href: "#" }
      ]
    },
    {
      title: "RETAIL",
      links: [
        { text: "Premium Event Chair", href: "/product-catalogue/premium-event-chair" },
        { text: "Premium Chair", href: "/product-catalogue/premium-chair" },
        { text: "Popular Chair", href: "/product-catalogue/popular-chair" },
        { text: "Without Arm Chair", href: "/product-catalogue/without-arm-tent-chairs" },
        { text: "Office Chair", href: "/product-catalogue/office-chairs" }
      ]
    },
    {
      title: "BUSINESS",
      links: [
        // { text: "Custom Furniture", href: "#" },
        // { text: "Exporters", href: "#" },
        { text: "Investor Desk", href: "/unaudited-financial-results" },
        { text: "Annual Report", href: "/annual-report" },
        { text: "Shareholding Pattern", href: "/share-holding-pattern" }

      ]
    },
    {
      title: "NEED HELP",
      links: [
        { text: "Contact Us", href: "/contact-us" },
        { text: "Terms and Conditions", href: "/terms-and-conditions" },
        { text: "Shipping Policy", href: "/shipping-and-delivery" },
        { text: "Privacy Policy", href: "/privacy-policy" },
        { text: "Refund Policy", href: "/refund-and-return-policy" }
      ]
    }
  ];
  return (
    <>
      <section className="footer pb-4" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="container mx-auto px-4">
          <div className="row">
            {/* Mobile Accordion View */}
            <div className="d-block d-lg-none col-12 pb-4">
              <Collapse
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                ghost
                className="site-collapse-custom-collapse"
              >
                {footerSections.map((section, index) => (
                  <Panel
                    header={<span className="fw-bold">{section.title}</span>}
                    key={index}
                    className="site-collapse-custom-panel"
                  >
                    <ul className="list-unstyled">
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex} className="mb-2">
                          {link.href !== "#" ? (
                            <Link
                              href={link.href}
                              className="text-decoration-none text-secondary"
                              style={{ color: '#666' }}
                            >
                              {link.text}
                            </Link>
                          ) : (
                            <span style={{ color: '#666' }}>{link.text}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </Panel>

                ))}
                <div className="px-4">
                  <span className="fw-bold text-black fs-1">Support</span>
                  <div className="d-flex align-items-center gap-3 py-2">
                    <span><i class="fa fa-phone " aria-hidden="true"></i></span>
                    <span className="fw-semibold "> <u>{basicInfo.mobile_number1}</u></span>
                  </div>
                  <div className="d-flex align-items-center gap-3 py-2">
                    <span><i class="fa fa-envelope-o " aria-hidden="true"></i></span>
                    <span className="fw-semibold ">{basicInfo.email}</span>
                  </div>
                  <div className="d-flex align-items-center gap-3 py-2">
                    <span><i class="fa fa-map-marker " aria-hidden="true"></i></span>
                    <span className="fw-semibold "> {basicInfo.address}</span>
                  </div>
                </div>
              </Collapse>

            </div>

            {/* Desktop View */}
            <div className="d-none d-lg-flex col-lg-8">
              <div className="row w-100">
                {footerSections.map((section, index) => (
                  <div key={index} className="col-3">
                    <div className="footer_heading">
                      <h5 className="fw-bold mb-3">{section.title}</h5>
                    </div>
                    <ul className="list-unstyled">
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex} className="mb-2">
                          {link.href !== "#" ? (
                            <Link
                              href={link.href}
                              className="text-decoration-none"
                              style={{ color: '#666' }}
                            >
                              {link.text}
                            </Link>
                          ) : (
                            <span style={{ color: '#666' }}>{link.text}</span>
                          )}
                        </li>
                      ))}
                    </ul>


                  </div>
                ))}
              </div>
            </div>


            {/* Payment and Social Section - Same for both views */}
            <div className="col-12 col-lg-4">
              <div className="pb-3">
                <div className="">
                  <div className="footer_heading">
                    <h5 className="fw-bold mb-3">Support</h5>
                  </div>
                  {/* <span className="fw-bold text-black fs-1 m-0 p-0">Support</span> */}
                  <div className="d-flex align-items-center gap-3 py-1">
                    <span><i class="fa fa-phone text-black" aria-hidden="true"></i></span>
                    <span className="fw-semibold "> <u>{basicInfo.mobile_number1}</u></span>
                  </div>
                  <div className="d-flex align-items-center gap-3 py-1">
                    <span><i class="fa fa-envelope-o text-black" aria-hidden="true"></i></span>
                    <span className="fw-semibold ">{basicInfo.email}</span>
                  </div>
                  <div className="d-flex align-items-center gap-3 py-1">
                    <span><i class="fa fa-map-marker text-black" aria-hidden="true"></i></span>
                    <span className="fw-semibold "> {basicInfo.address}</span>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <div className="footer_heading">
                  <h5 className="fw-bold mb-0">WE ACCEPT SECURE PAYMENT</h5>
                </div>
                <div className="d-flex gap-2 py-3">
                  <div style={{ width: '75px', height: '40px', position: 'relative' }}>
                    <Image
                      src="/Assets/images/visa-payment-card1873@2x.png"
                      alt="Visa"
                      width={75}
                      height={40}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ width: '75px', height: '40px', position: 'relative' }}>
                    <Image
                      src="/Assets/images/mastercard.png"
                      alt="Mastercard"
                      width={75}
                      height={40}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ width: '75px', height: '40px', position: 'relative' }}>
                    <Image
                      src="/Assets/images/Group 697.png"
                      alt="Payment"
                      width={75}
                      height={40}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ width: '75px', height: '40px', position: 'relative' }}>
                    <Image
                      src="/Assets/images/Maestro.png"
                      alt="Maestro"
                      width={75}
                      height={40}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="footer_heading">
                  <h5 className="fw-bold mb-0">WE ARE ALSO ON</h5>
                </div>
                <div className="d-flex gap-3 align-items-center">
                  <div style={{ height: '40px', position: 'relative' }}>
                    <a href={basicInfo.indiamart} target="_blank" rel="noopener noreferrer">
                      <Image
                        className="position-relative "
                        src="/Assets/images/indiamart.svg"
                        alt="IndiaMART"
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </a>
                  </div>
                  <div style={{ height: '40px', position: 'relative' }}>
                    <a href={basicInfo.indiamart} target="_blank" rel="noopener noreferrer">
                      <Image
                        className="position-relative "
                        src="/Assets/images/Meesho_logo.png"
                        alt="IndiaMART"
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </a>
                  </div>
                  <div style={{ height: '40px', position: 'relative' }}>
                    <a href={basicInfo.indiamart} target="_blank" rel="noopener noreferrer">
                      <Image
                        className="position-relative "
                        src="/Assets/images/fc_logo.png"
                        alt="IndiaMART"
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
        .site-collapse-custom-collapse {
          background: #f5f5f5;
        }
        
        .site-collapse-custom-panel {
          margin-bottom: 8px;
          overflow: hidden;
          border: none;
          border-radius: 2px;
        }

        .site-collapse-custom-panel .ant-collapse-content {
          background: #f5f5f5;
        }

        :global(.ant-collapse-ghost > .ant-collapse-item) {
          border-bottom: 1px solid #d9d9d9 !important;
        }

        :global(.ant-collapse-ghost > .ant-collapse-item:last-child) {
          border-bottom: none !important;
        }
      `}</style>
      </section >
      {/*  <div className='text-center py-5 ' style={{backgroundColor:'#ECECEC'}}>
        <p className='w-md-50 mx-auto fw-semibold footercaption'>We Deliver in Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer</p>
      </div> */}
      < section className="bottom_footer " >
        <div className="container">
          <div className="col-12 text-center">
            <div className="footer_social d-md-flex align-items-center">
              <div className="comp_logo">
                <Link href="/">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_UPLOAD_PATH_DIR}${basicInfo.logo}`}
                    alt="logo"
                    fill
                  />
                </Link>
              </div>
              <div className="social_icons d-flex gap-3">
                <a href={basicInfo.instagram} target="_blank">
                  <i className="fa fa-instagram  fs-1" aria-hidden="true"></i>
                </a>

                <a href={basicInfo.youtube} target="_blank">
                  <i className="fa fa-youtube-play  fs-1" aria-hidden="true"></i>
                </a>

                <a href={basicInfo.twitter} target="_blank">
                  <i className="fa fa-twitter fs-1" aria-hidden="true"></i>
                </a>

                <a href={basicInfo.facebook} target="_blank">
                  <i className="fa fa-facebook fa-flip fs-1" aria-hidden="true"></i>
                </a>

                <a href={basicInfo.google} target="_blank">
                  <i className="fa fa-google fs-1" aria-hidden="true"></i>
                </a>
                <a
                  href="https://in.pinterest.com/NationalPlastic1952/"
                  target="_blank"
                >
                  <i className="fa fa-pinterest fs-1" aria-hidden="true"></i>
                </a>
              </div>
            </div>
            {/* FROM HERE REMOVED THE TERMS & POLICY SECTION  */}
            <div className="footer_term d-flex justify-content-center twoby2">
              <p> India&apos;s Largest Manufacturer of household and event chairs </p>
            </div>
          </div>
        </div>
      </section >

      <div className="social_icon_for_mob">
        <div className="d-flex align-items-center gap-2 callIcon ">
          <p className=" contactus ps-2  fw-bold">contact us </p>
          <div className="icon-wrapper call_icon">
            <a href="tel:+912267669922">
              {/* <Image
                height={48}
                width={23}
                layout="responsive"
                objectFit="contain"
                src="/Assets/svg/Path 2.svg"
                alt="location"
              /> */}
              <i class="fa fa-phone fs-3 p-1 " aria-hidden="true"></i>

            </a>
          </div>

        </div>
        <div className="icon-wrapper wp_icon w-auto">
          <div className="d-flex align-items-center gap-2 callIcon">
            <a href={`https://wa.me/91${basicInfo.wpNumber}`}>
              {/* <Image
                height={100}
                width={100}
                layout="responsive"
                objectFit="contain"
                src="/Assets/images/whatsapp.png"
                alt="whatsapp icon"
               
              /> */}
              {/* <img src="/Assets/images/whatsapp.png" alt=""  style={{width:'38px'}}/> */}
              <i class="fa fa-whatsapp whatsapp fs-3 p-2" aria-hidden="true"></i>
            </a>

            <p className="contactus pe-2  fw-bold">whatsapp</p>
          </div>
        </div>
      </div >
      {/* <BackToTopButton /> */}

      < div className="copyrightsdiv" >
        <p>Copyright © 2024 National Plastic Industries Ltd . All Rights Reserved.</p>
      </div >
    </>
  );
}


{/* <div className="footer_term d-flex justify-content-center twoby2">
<Link href="/terms-and-conditions">
  <p className="text-white">
    Terms and Conditions <span> | </span>{" "}
  </p>
</Link>
<Link href="/privacy-policy">
  <p className="text-white">
    {" "}
    Privacy Policy <span className="hideitnow"> | </span>{" "}
  </p>
</Link>
<Link href="/shipping-and-delivery">
  <p className="text-white">
    {" "}
    Shipping Policy <span> | </span>{" "}
  </p>
</Link>
<Link href="/refund-and-return-policy">
  <p className="text-white"> Refund Policy </p>
</Link>
</div> */}