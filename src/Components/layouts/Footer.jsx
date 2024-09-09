"use client";
import Image from 'next/image';
import '../../styles/footer.css';
import Link from 'next/link';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Footer() {

  const [basicInfo, setBasicInfo] = useState({
    logo: '',
    brand1_link: '',
    brand2_link: '',
    instagram: '',
    youtube: '',
    twitter: '',
    facebook: '',
    google: '',
    mobile_number1: '',
    mobile_number2: '',
    address: '',
    email: '',
    indiamart: '',
  });
  const [initialBasicInfo, setInitialBasicInfo] = useState({});


  useEffect(() => {
    const fetchBasicInfo = async () => {
      try {
        const response = await axios.get('/api/basicInfo');
        const basicInfoData = response.data.basicInfo;
        setBasicInfo(basicInfoData);
        setInitialBasicInfo(basicInfoData);
      } catch (error) {
        console.error('There was an error fetching the basic info!', error);
      }
    };

    fetchBasicInfo();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <section className="footer pb-4">
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <div className="footer_heading ">
                <h5 className='fw-bolder'>OUR COMPANY</h5>
              </div>
              <ul>
                <li>
                  <Link className="nav-link fw-bold" href="/Companyprofile">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link className="nav-link fw-bold" href="/Career">
                    Career
                  </Link>
                </li>
                <li>
                  <Link className="nav-link fw-bold" href="/NewsAndMedia">
                    Media & News
                  </Link>
                </li>
                {/* <li>
                  <Link className="nav-link fw-bold" href="/BlogPage">
                    Blog
                  </Link>
                </li> */}
                <li className='fw-bold'>Customer Stories</li>
              </ul>
            </div>
            <div className="col-md-2">
              <div className="footer_heading">
                <h5 className='fw-bolder'>RETAIL</h5>
              </div>
              <ul>
                <li><Link className="nav-link fw-bold" href="/ProductCatlogue/premium_event_chair">Premium Event Chair</Link></li>
                <li className='fw-bold'><Link className="nav-link fw-bold" href="/ProductCatlogue/premium_chair">Premium Chair</Link> </li>
                <li className='fw-bold'><Link className="nav-link fw-bold" href="/ProductCatlogue/popular_chair">Popular Chair</Link> </li>
                <li className='fw-bold'><Link className="nav-link fw-bold" href="/ProductCatlogue/without_arm_tent">Without Arm Chair</Link></li>
                <li className='fw-bold'><Link className="nav-link fw-bold" href="/ProductCatlogue/office_chair">Office Chair</Link></li>
              </ul>
            </div>
            <div className="col-md-2">
              <div className="footer_heading">
                <h5 className='fw-bolder'>BUSINESS</h5>
              </div>
              <ul>
                <li className='fw-bold'>Custom Furniture</li>
                <li className='fw-bold'>Exporters</li>
                {/* <li>
                  <Link className='nav-link fw-bold' href="/BulkOrder">
                    Buy in Bulk
                  </Link>
                </li> */}
                <li>
                  <Link className='nav-link fw-bold' href="/Investor">
                    Investor Desk
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-2">
              <div className="footer_heading">
                <h5 className='fw-bolder'>NEED HELP</h5>
              </div>
              <ul>
                <li className='fw-bold'><Link className='nav-link fw-bold' href='/ContactUs'>Help Center</Link> </li>
                <li>
                  <Link className='nav-link fw-bold' href="/ContactUs">
                    Contact Us
                  </Link>
                </li>
                <li className='fw-bold'><Link className='nav-link fw-bold' href='/ContactUs'>Ask Experts</Link> </li>
                <li className='fw-bold'><Link className='nav-link fw-bold' href='/Colors'>Colors</Link> </li>

                {/* <li>
                  <Link className='nav-link fw-bold' href="/TrackYourOrder">Track your order</Link>
                  </li> */}
              </ul>
            </div>
            <div className="col-md-4">
              <div className="footer_heading">
                <h5 className='fw-bolder'>WE ACCEPT</h5>
              </div>
              <div className="paymentImg d-flex py-3 px-2">
                <div className="gatewayimg">
                  <Image
                    width={75}
                    height={40}
                    src="/Assets/images/visa-payment-card1873@2x.png"
                    alt='logo'
                    objectFit='cover'
                  // fill
                  />
                </div>
                <div className="gatewayimg">
                  <Image
                    width={75}
                    height={40}
                    src="/Assets/images/mastercard.png"
                    alt='logo'
                    objectFit='cover'

                  // fill
                  />
                </div>
                <div className="gatewayimg">
                  <Image
                    width={75}
                    height={40}
                    src="/Assets/images/Group 697.png"
                    alt='logo'
                    objectFit='cover'
                  // fill
                  />
                </div>
                <div className="gatewayimg">
                  <Image
                    width={75}
                    height={40}
                    src="/Assets/images/Maestro.png"
                    alt='logo'
                    objectFit='contain'
                  // fill
                  />
                </div>

              </div>
              <div className="footer_heading">
                <h5 className='fw-bolder'>WE ARE ALSO ON</h5>
              </div>
              <div className="otherLogo">
                <a href={basicInfo.indiamart}>
                  <Image
                    src="/Assets/images/indiamart.svg"
                    alt='logo'
                    fill
                  />
                </a>

              </div>
            </div>
          </div>
        </div>
        {/* <button onClick={scrollToTop} className="back-to-top">
        <i class="fa fa-arrow-up fa-2x" aria-hidden="true"></i>

        </button> */}
      </section >
     {/*  <div className='text-center py-5 ' style={{backgroundColor:'#ECECEC'}}>
        <p className='w-md-50 mx-auto fw-semibold footercaption'>We Deliver in Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer</p>
      </div> */}
      <section className='bottom_footer '>
        <div className="container">
          <div className="col-12 text-center">

            <div className="footer_social d-md-flex align-items-center">
              <div className="comp_logo">
                <Link href='/'>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_UPLOAD_PATH_DIR}${basicInfo.logo}`}
                    alt='logo'
                    fill
                  />
                </Link>
              </div>
              <div className="social_icons d-flex gap-3">

                <a href={basicInfo.instagram} target="_blank"><i class="fa fa-instagram  fs-1" aria-hidden="true"></i>
                </a>

                <a href={basicInfo.youtube} target="_blank"><i class="fa fa-youtube-play  fs-1" aria-hidden="true"></i>
                </a>

                <a href={basicInfo.twitter} target="_blank"><i class="fa fa-twitter fs-1" aria-hidden="true"></i>
                </a>


                <a href={basicInfo.facebook} target="_blank"><i class="fa fa-facebook fa-flip fs-1" aria-hidden="true"></i>
                </a>

                <a href={basicInfo.google} target="_blank"><i class="fa fa-google fs-1" aria-hidden="true"></i>
                </a>
              </div>

            </div>
            <div className="footer_term d-flex justify-content-center">
              <Link href='/TermsAndConditions'><p className='text-white'>Terms and Conditions <span> | </span> </p></Link>
              <Link href='/PrivacyAndPolicy'><p className='text-white'> Privacy Policy <span> | </span> </p></Link>
              <Link href='/ShippingAndDelivery'><p className='text-white'> Shipping Policy <span> | </span> </p></Link>
              <Link href='/Refund'><p className='text-white'> Refund Policy </p></Link>
            </div>
          </div>
        </div>

      </section>

      <div className='social_icon_for_mob'>
        <div className='icon-wrapper call_icon'>
          <a href="tel:+912267669922">
            <Image
              height={48}
              width={23}
              layout="responsive"
              objectFit="contain"
              src="/Assets/svg/Path 2.svg"
              alt="location"
            />
          </a>
        </div>
        <div className='icon-wrapper wp_icon'>
          <a href=''>
            <Image
              height={100}
              width={100}
              layout="responsive"
              objectFit="contain"
              src="/Assets/images/whatsapp.png"
              alt="whatsapp icon"
            />
          </a>
        </div>
      </div>

    </>
  )
}
