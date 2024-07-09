import Image from "next/image";
import "./soon.css";
import "./utils.css";
function CommingSoon() {
  return (
    <>
      <div
        className="bg-img1 size1 flex-w flex-c-m p-t-55 p-b-55 p-l-15 p-r-15"
        style={{ backgroundImage: 'url("/Assets/images/bg01.jpg")' }}
      >
        <div className="wsize1 bor1 bg1 p-t-175 p-b-45 p-l-15 p-r-15 respon1">
          <div className="wrappic1">
            <img src="/Assets/images/nation_logo.png" alt="LOGO" />
          </div>
          <h1 className="txt-center cmo p-t-33 w-75 mx-auto">
            Coming <span> Soon</span>
          </h1>
          <p className="txt-center m1-txt1 p-t-33 p-b-68 w-75 mx-auto">
            Exciting things are on the way! Stay tuned for updates and be the
            first to experience what's next.
          </p>
          
          <hr />
          <div className="row mx-auto justify-conent-center contact-cener">
            <div className="col-md-12">
                <a href="https://maps.app.goo.gl/By6KDX78L6wSxZQk7" target="_blank">
              <address className="d-flex w-50">
                <i className="fa fa-map-marker" aria-hidden="true"></i>
                4th Floor, Vilco Center, Subhash Rd, opp. Garware Lane, Victory Society, Navpada, Vile Parle East, Vile Parle, Mumbai, Maharashtra 400057
              </address>
              </a>
              <p className="txt-left pt-4">
                <i className="fa fa-phone" aria-hidden="true"></i>{" "}
                <a href="tel:+91-22-6766 9920"> +91-22-6766 9920</a>
              </p>
              <p className="txt-left pt-4">
                <i className="fa fa-phone" aria-hidden="true"></i>{" "}
                <a href="tel:+91-22-6766 9922"> +91-22-6766 9922</a>
              </p>
              <p className="txt-left pt-4">
                <i className="fa fa-envelope-open" aria-hidden="true"></i>
                <a href="mailto:info@nationalplastic.com"> info@nationalplastic.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommingSoon;
