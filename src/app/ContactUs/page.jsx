import Image from "next/image";

import "../../styles/contactus.css";
import ContactUsCard from "@/Components/ContactUs/ContactUsCard";
function ContactUs() {
  const RegisteredOfficeCardArr = [
    {
      key: 1,
      title:"North - Regional Offices",
      location: "D-92, Meerut Road, Indl Area, Ghaziabad, U.P. India",
      phone: "+91-9219220368, +91- 9213090354",
      email: "info@nationalplastic.com",
    },
    {
      key: 2,
      title:"South - Regional Offices",
      location: "21, New Timber Yard Layout, Off. Mysore Road, Near Satellite Bus Stand & Big Bazar, Banglore- 560 026",
      phone: "080-26742855",
      email: "info@nationalplastic.com",
    },
    {
      key: 3,
      title:"Punjab - Branch Office",
      location: "D-92, Meerut Road, Indl Area, Ghaziabad, U.P. India",
      phone: "+91-9219220368, +91- 9213090354",
      email: "info@nationalplastic.com",
    },
    {
      key: 4,
      title:"Kerala - Branch Office",
      location: "D-92, Meerut Road, Indl Area, Ghaziabad, U.P. India",
      phone: "+91-9219220368, +91- 9213090354",
      email: "info@nationalplastic.com",
    },
  ]
  
  // **************FactoryUnitsArr Array************
  const FactoryUnitsArr = [
    {
      key: 1,
      title:"Silvassa",
      location: "Plot No. 263, Village Dadra, Silvassa Union Territory of Dadra Nagarhaveli, (Near Dadra 66 KVA Sub-station, 6 KM from Vapi)",
      phone: "+91-9219220368, +91- 9213090354",
      email: "info@nationalplastic.com",
    },
    {
      key: 2,
      title:"Patna",
      location: "Plot No. B-1 to B-7, Industrial Area, Fatuha, Patna.",
      phone: "+91-9219220368, +91- 9213090354",
      email: "info@nationalplastic.com",
    },
    {
      key: 3,
      title:"Nellore",
      location: "SY. No. 283, 297, 298, APIIC Indl. Park, Menakur, Village Naidupeth Mandal, SPSR, Nellore - 524126.",
      phone: "+91-9219220368, +91- 9213090354",
      email: "info@nationalplastic.com",
    },
    {
      key: 4,
      title:"Lorem ipsum",
      location: "D-92, Meerut Road, Indl Area, Ghaziabad, U.P. India",
      phone: "+91-9219220368, +91- 9213090354",
      email: "info@nationalplastic.com",
    },
  ]
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
          <div className="col-md-4">
            <div className="location-image">
              <Image
                src="/assets/images/ContactUs/red-place-marker-white-background.png"
                width={100}
                height={100}
                layout="responsive"
                objectFit="cover"
              />
            </div>
            <div className="RegisteredOffice">
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
                <i class="fa fa-envelope-open" aria-hidden="true"></i>
                <p>info@nationalplastic.com</p>
              </div>
            </div>
          </div>
          <div className="col-md-8 map-image" >
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

{/* Branch Offices */}
<div className="container BranchOffices">
    <h2>Branch <span>Offices</span></h2>
<div className="row BranchOfficescards">
{RegisteredOfficeCardArr.map((val) => (
    <div className="col-md-6" key={val.key}> 
              <ContactUsCard title={val.title} location={val.location} phone={val.phone} email={val.email} />
            </div>
          ))}
    </div>
</div>
{/* Factory Units */}

<div className="container BranchOffices">
    <h2>Factory <span>Units</span></h2>
<div className="row BranchOfficescards">
{FactoryUnitsArr.map((val) => (
    <div className="col-md-6" key={val.key}> 
              <ContactUsCard title={val.title} location={val.location} phone={val.phone} email={val.email} />
            </div>
          ))}
    </div>
</div>
    </>
  );
}
export default ContactUs;
