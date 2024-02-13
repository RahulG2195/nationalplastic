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
              <div className="footer_heading">
                <h5>OUR COMPANY</h5>
              </div>
              <ul>
                <li>
                  <Link className="nav-link" href="/About">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" href="/Career">
                    Career
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" href="/NewsAndMedia">
                    Media & News
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" href="/BlogPage">
                    Blog
                  </Link>
                </li>
                <li>Customer Stories</li>
              </ul>
            </div>
            <div className="col-md-2">
              <div className="footer_heading">
                <h5>RETAIL</h5>
              </div>
              <ul>
                <li>
                  <Link className="nav-link" href="/ProductCatlogue">
                    Premium Chairs
                  </Link>
                </li>
                <li>Centre Tables</li>
                <li>Storage Cabinet</li>
                <li>Household Accesories</li>
                <li>Drawers & Racks</li>
              </ul>
            </div>
            <div className="col-md-2">
              <div className="footer_heading">
                <h5>BUSINESS</h5>
              </div>
              <ul>
                <li>Custom Furniture</li>
                <li>Exporters</li>
                <li>
                  <Link className='nav-link' href="/BulkOrder">
                    Buy in Bulk
                  </Link>
                </li>
                <li>
                  <Link className='nav-link' href="/Investor">
                    Investor Desk
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-2">
              <div className="footer_heading">
                <h5>NEED HELP</h5>
              </div>
              <ul>
                <li>Help Center</li>
                <li>
                  <Link className='nav-link' href="/ContactUs">
                    Contact Us
                  </Link>
                </li>
                <li>Ask Experts</li>

                <li>
                  <Link className='nav-link' href="/TrackYourOrder">Track your order</Link></li>
              </ul>
            </div>
            <div className="col-md-4">
              <div className="footer_heading">
                <h5>WE ACCEPT</h5>
              </div>
              <div className="paymentImg d-flex">
                <div className="gatewayimg">
                <Image
                src="/Assets/images/visa-payment-card1873.png"
                alt='logo'
               fill
              />
                </div>
                <div className="gatewayimg">
                <Image
                src="/Assets/images/mastercard.png"
                alt='logo'
                fill
              />
                </div>
                <div className="gatewayimg">
                <Image
                src="/Assets/images/Maestro.png"
                alt='logo'
                fill
              />
                </div>
                <div className="gatewayimg">
                <Image
                src="/Assets/images/Group 697.png"
                alt='logo'
                fill
              />
                </div>
              </div>
              <div className="footer_heading">
                <h5>WE ARE ALSO ON</h5>
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
