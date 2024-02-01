import Image from "next/image";

import "../../styles/contactus.css";
function ContactUs() {
  return (
    <>
      <div className="container-flude">
        <div className="row">
          <Image
            src="/assets/images/ContactUs/Contact-Us-pg-banner.png"
            width={100}
            height={100}
            layout="responsive"
            objectFit="cover"
          />
        </div>

        <div className="row">
          <div class="clip-path-element">
            <h1>CONTACT US</h1>
            <div className="contact-btn">
              <button>Branch Offices</button>
              <button>Factory Units</button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="contactCTA">
            <Image
              src="/assets/images/ContactUs/call-center-headphone-keyboard-table.png"
              width={100}
              height={100}
              layout="responsive"
              objectFit="cover"
            />

            <div className=" row GTA">
              <div className="col-md-6 GTA-inner">
                <h1>Get In</h1>
                <h1>Touch</h1>
              </div>

              <div className="col-md-6 cta-form">
                <form>
                  <h3>Send a message</h3>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="mobile" className="form-label">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="mobile"
                      placeholder="Enter your mobile number"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="reason" className="form-label">
                      Reason
                    </label>
                    <select className="form-select" id="reason">
                      <option selected="">Choose...</option>
                      <option value="general">General Inquiry</option>
                      <option value="feedback">Feedback</option>
                      <option value="support">Support Request</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="file" className="form-label">
                      Upload File
                    </label>
                    <input type="file" className="form-control" id="file" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      rows={5}
                      placeholder="Enter your message"
                      defaultValue={""}
                    />
                  </div>
                  <button type="submit" className="btn cta-contact-btn">
                    Submit Your Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div>
              <h1>Registered</h1>
              <h1>Office</h1>
            </div>
            <div className="RegisteredOfficeIcon">
              <i class="fa fa-map-marker" aria-hidden="true"></i>
              <p>
                Office No. 213, 214 & 215, 2nd Floor, Hubtown Solaris, N. S.
                Phadake Marg, Andheri (East), Mumbai- 400 069. India.
              </p>
            </div>
            <div className="RegisteredOfficeIcon">
              <i class="fa fa-phone" aria-hidden="true"></i>
              <p>+91-22-6766 9920/ +91-22-6766 9922</p>
            </div>
            <div className="RegisteredOfficeIcon">
              <i class="fa fa-envelope-o" aria-hidden="true"></i>
              <p>info@nationalplastic.com</p>
            </div>
          </div>
          <div className="col-md-6">
            <Image
              src="/assets/images/ContactUs/map.png"
              width={100}
              height={100}
              layout="responsive"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default ContactUs;
