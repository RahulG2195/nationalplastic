import Image from 'next/image';
import '../../styles/footer.css';

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
                <li>About Us</li>
                <li>Career</li>
                <li>Media & News</li>
                <li>Blog</li>
                <li>Customer Stories</li>
              </ul>
          </div>
          <div className="col-md-2">
          <div className="footer_heading">
              <h5>RETAIL</h5>
            </div>
              <ul>
                <li>Premium Chairs</li>
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
                <li>Buy in Bulk</li>
                <li>Investor Desk</li>
              </ul>
          </div>
          <div className="col-md-2">
          <div className="footer_heading">
              <h5>NEED HELP</h5>
            </div>
              <ul>
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Ask Experts</li>
                <li>Track your order</li>
              </ul>
          </div>
          <div className="col-md-4">
            <div className="footer_heading">
              <h5>WE ACCEPT</h5>
            </div>
              <div className="paymentImg">

              </div>
              <div className="footer_heading">
                <h5>WE ARE ALSO ON</h5>
              </div>
          </div>
        </div>
      </div>
    </section>
    <section className='bottom_footer'>
      <div className="container">
        <div className="col-12 text-center">
          <p>We Deliver in Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer</p>

          <div className="footer_social">
            <div className="comp_logo">
              <Image
              src="/assets/images/nation_logo.png"
              alt='logo'
              fill
              />
            </div>
          </div>
          <div className="footer_term d-flex justify-content-center">
            <p>Terms and Conditions | </p>
            <p> Privacy Policy | </p>
            <p> Cookies Policy | </p>
            <p> Refund Policy </p>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
