import Image from 'next/image';
import '../../styles/footer.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <section className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <div className="footer_heading ">
                <h5 className='fw-bolder'>OUR COMPANY</h5>
              </div>
              <ul>
                <li>
                  <Link className="nav-link fw-bold" href="/About">
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
                <li>
                  <Link className="nav-link fw-bold" href="/BlogPage">
                    Blog
                  </Link>
                </li>
                <li className='fw-bold'>Customer Stories</li>
              </ul>
            </div>
            <div className="col-md-2">
              <div className="footer_heading">
                <h5 className='fw-bolder'>RETAIL</h5>
              </div>
              <ul>
                <li>
                  <Link className="nav-link fw-bold" href="/ProductCatlogue">
                    Premium Chairs
                  </Link>
                </li>
                <li className='fw-bold'>Centre Tables</li>
                <li className='fw-bold'>Storage Cabinet</li>
                <li className='fw-bold'>Household Accesories</li>
                <li className='fw-bold'>Drawers & Racks</li>
              </ul>
            </div>
            <div className="col-md-2">
              <div className="footer_heading">
                <h5 className='fw-bolder'>BUSINESS</h5>
              </div>
              <ul>
                <li className='fw-bold'>Custom Furniture</li>
                <li className='fw-bold'>Exporters</li>
                <li>
                  <Link className='nav-link fw-bold' href="/BulkOrder">
                    Buy in Bulk
                  </Link>
                </li>
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
                <li className='fw-bold'>Help Center</li>
                <li>
                  <Link className='nav-link fw-bold' href="/ContactUs">
                    Contact Us
                  </Link>
                </li>
                <li className='fw-bold'>Ask Experts</li>

                <li>
                  <Link className='nav-link fw-bold' href="/TrackYourOrder">Track your order</Link></li>
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
                <Image
                  src="/Assets/images/indiamart.svg"
                  alt='logo'
                  fill
                />

              </div>
            </div>
          </div>
        </div>
      </section >
      <section className='bottom_footer'>
        <div className="container">
          <div className="col-12 text-center">
            <p>We Deliver in Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer</p>

            <div className="footer_social">
              <div className="comp_logo">
                <Image
                  src="/Assets/images/nation_logo.png"
                  alt='logo'
                  fill
                />
              </div>
              <div className="social_icons">
                <Image
                  src="/Assets/images/Group 37.svg"
                  alt='logo'
                  layout='responsive'
                  objectFit='cover'
                  width={100}
                  height={100}
                />
                <Image
                  src="/Assets/images/Path 19.svg"
                  alt='logo'
                  layout='responsive'
                  objectFit='cover'
                  width={100}
                  height={100}
                />
                <Image
                  src="/Assets/images/Path 20.svg"
                  alt='logo'
                  layout='responsive'
                  objectFit='cover'
                  width={100}
                  height={100}
                />
                <Image
                  src="/Assets/images/Path 80.svg"
                  alt='logo'
                  layout='responsive'
                  objectFit='cover'
                  width={100}
                  height={100}
                />
              </div>

            </div>
            <div className="footer_term d-flex justify-content-center">
              <Link href='#'><p>Terms and Conditions <span> | </span> </p></Link>
              <Link href='#'><p> Privacy Policy <span> | </span> </p></Link>
              <Link href='#'><p> Cookies Policy <span> | </span> </p></Link>
              <Link href='#'><p> Refund Policy </p></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
