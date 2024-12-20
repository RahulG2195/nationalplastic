"use client";

import Image from "next/image";
import "../../styles/contactus.css";
import ContactUsCard from "@/Components/ContactUs/ContactUsCard";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Bounce, toast } from "react-toastify";

const notify = () => {
  toast.success("Mail Sended SucessFully", {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};
const notifyError = () => {
  toast.error("Failed To send Mail", {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

import {
  isValidName,
  isValidEmail,
  isValidMessage,
  isValidReason,
  isValidMobile,
  // isValidFile,
} from "@/utils/validation";
function ContactUs() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
    reason: "",
    mobile: "",
    file: null,
  });
  const [initialBasicInfo, setInitialBasicInfo] = useState({});


  async function handleInputChange(event) {
    const { name, value } = event.target;
    {
      setUserInput({ ...userInput, [name]: value });
    }
  }
  async function handleImageUpload(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setUserInput({
          ...userInput,
          file: uploadedImage,
        });
      });
    }
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if (!isValidName(userInput.name)) {
      toast.error("Please enter a valid name.");
      return;
    }
    if (!isValidEmail(userInput.email)) {
      toast.error("Please enter a valid email.");
      return;
    }
    if (!isValidMessage(userInput.message)) {
      toast.error("Please enter a message.");
      return;
    }
    if (!isValidReason(userInput.reason)) {
      toast.error("Please select a reason.");
      return;
    }
    if (!isValidMobile(userInput.mobile)) {
      toast.error("Please enter a valid mobile number.");
      return;
    }

    const formData = new FormData();
    formData.append("name", userInput.name);
    formData.append("email", userInput.email);
    formData.append("message", userInput.message);
    formData.append("reason", userInput.reason);
    formData.append("mobile", userInput.mobile);
    formData.append("file", userInput.file); // Ensure only the first file is appended

    //TryCatch For the Email Message

    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/sendEmail`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Set content type for FormData
      },
    });
    if (res.status === 200) {
      setUserInput({
        name: "",
        email: "",
        message: "",
        reason: "",
        mobile: "",
        file: null,
      });
      notify();
    } else {
      notifyError();
    }
  }

  // const RegisteredOfficeCardArr = [
  //   {
  //     key: 1,
  //     title: "North - Regional Offices",
  //     location: "D-92, Meerut Road, Indl Area, Ghaziabad, U.P. India",
  //     phone: "+91-9219220368, +91- 9213090354",
  //     email: "info@nationalplastic.com",
  //   },
  //   {
  //     key: 2,
  //     title: "South - Regional Offices",
  //     location:
  //       "21, New Timber Yard Layout, Off. Mysore Road, Near Satellite Bus Stand & Big Bazar, Banglore- 560 026",
  //     phone: "080-26742855",
  //     email: "info@nationalplastic.com",
  //   },
  //   {
  //     key: 3,
  //     title: "Punjab - Branch Office",
  //     location: "D-92, Meerut Road, Indl Area, Ghaziabad, U.P. India",
  //     phone: "+91-9219220368, +91- 9213090354",
  //     email: "info@nationalplastic.com",
  //   },
  //   {
  //     key: 4,
  //     title: "Kerala - Branch Office",
  //     location: "D-92, Meerut Road, Indl Area, Ghaziabad, U.P. India",
  //     phone: "+91-9219220368, +91- 9213090354",
  //     email: "info@nationalplastic.com",
  //   },
  // ];

  // **************FactoryUnitsArr Array************
  const FactoryUnitsArr = [
    {
      key: 1,
      title: "Silvassa",
      location:
        "Plot No. 263, Village Dadra, Silvassa Union Territory of Dadra Nagarhaveli, (Near Dadra 66 KVA Sub-station, 6 KM from Vapi)",
      phone: "+91-9978444982",
      email: "info@nationalplastic.com",
    },
    {
      key: 2,
      title: "Patna",
      location: "Plot No. B-1 to B-7, Industrial Area,Fatuha, Patna",
      phone: "+91-8929813491",
      email: "info@nationalplastic.com",
    },
    {
      key: 3,
      title: "Nellore",
      location:
        "SY. No. 283, 297, 298, APIIC Indl. Park, Menakur, Village Naidupeth Mandal, SPSR, Nellore - 524126.",
      phone: "+91-9908798433",
      email: "info@nationalplastic.com",
    },
    // {
    //   key: 4,
    //   title: "Lorem ipsum",
    //   location: "D-92, Meerut Road, Indl Area, Ghaziabad, U.P. India",
    //   phone: "+91-9219220368, +91- 9213090354",
    //   email: "info@nationalplastic.com",
    // },
  ];



  const [basicInfo, setBasicInfo] = useState({
    logo: '',
    brand1_link: '',
    brand2_link: '',
    instagram: '',
    youtube: '',
    twitter: '',
    facebook: '',
    mobile_number1: '',
    mobile_number2: '',
    address: '',
    email: ''
  });

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



  const branchOfficesRef = useRef(null);
  const factoryUnitsRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <>
      <div className="container-flude">
        <div className="row">
          {/* <Image
            src="/Assets/images/ContactUs/Contact-Us-pg-banner.png"
            alt="Contact Us Page Banner"
            width={100}
            height={100}
            layout="responsive"
            objectFit="cover"
          /> */}
        </div>
        <div className="row">
        <h1 className="text-center pt-5 fw-bold darkBlue "> CONTACT US</h1>

          {/* <div className="clip-path-element">
            <h1>CONTACT US</h1>
            <div className="contact-btn pb-5">
              <button onClick={() => scrollToSection(branchOfficesRef)}>Branch Offices</button>
              <button onClick={() => scrollToSection(factoryUnitsRef)}>Factory Units</button>
            </div>
          </div> */}
        </div>

        <div className="row position-relative pb-md-5 ">
          <div className="contactCTA pb-5">
            <Image
              src="/Assets/images/ContactUs/call-center-headphone-keyboard-table.png"
              alt="Contact Us Page Banner"
              width={100}
              height={100}
              layout="responsive"
              objectFit="cover"
            />

            <div className=" row GTA">
              <div className="col-md-6 GTA-inner">
                <h1>Get In Touch</h1>
              </div>

              <div className="col-md-6 cta-form px-md-5 py-5">
                <form onSubmit={onFormSubmit}>
                  <h3 className="fw-bold">Send a message</h3>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      // placeholder="Enter your name"
                      name="name"
                      onChange={handleInputChange}
                      value={userInput.name}
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
                      // placeholder="Enter your email"
                      name="email"
                      onChange={handleInputChange}
                      value={userInput.email}
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
                      // placeholder="Enter your mobile number"
                      name="mobile"
                      onChange={handleInputChange}
                      value={userInput.mobile}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="reason" className="form-label">
                      Reason
                    </label>
                    <select
                      className="form-select"
                      id="reason"
                      name="reason"
                      onChange={handleInputChange}
                      value={userInput.reason}
                    >
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
                    <input
                      type="file"
                      className="form-control"
                      id="file"
                      placeholder="Maximum Size: 50mb"
                      name="file"
                      onChange={handleImageUpload}
                      // value={userInput.file}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      rows={5}
                      // placeholder="Enter your message"
                      defaultValue={""}
                      name="message"
                      onChange={handleInputChange}
                      value={userInput.message}
                    />
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn cta-contact-btn py-3 px-md-5 medium"
                    >
                      Submit Your Request
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="row LocationSection mt-5 pt-5 my-md-5 py-md-5 position-relative">
          <div className="position-relative">
            <div className="location-image ">
              <Image
                src="/Assets/images/ContactUs/red-place-marker-white-background.png"
                alt="Contact Us Page Banner"
                width={100}
                height={100}
                layout="responsive"
                objectFit="cover"
              />
            </div>
            <div className="RegisteredOffice py-5 ps-5 col-md-8 col-lg-8 col-xl-4 ">
              <div className="ROtitle px-md-5">
                <h1>Registered</h1>
                <h1>Office</h1>
              </div>
              <div className="RegisteredOfficeIcon">
                <i className="fa fa-map-marker" aria-hidden="true"></i>
                <p>
                  {basicInfo.address}
                </p>
              </div>
              <div className="RegisteredOfficeIcon">
                <i className="fa fa-phone" aria-hidden="true"></i>
                <a href={`tel:+91-${basicInfo.mobile_number1}`}>+91-{basicInfo.mobile_number1}</a>
              </div>
              <div className="RegisteredOfficeIcon">
                <i className="fa fa-envelope-open" aria-hidden="true"></i>
                <p>{basicInfo.email}</p>
              </div>
            </div>
          </div>
          <div className="col-md-8 col-lg-8 col-xl-8 map-image">
            {/* <Image
              src="/Assets/images/ContactUs/map.png"
              alt="Contact Us Page Banner"
              width={100}
              height={50}
              layout="responsive"
              objectFit="cover"
            /> */}
            <iframe src={basicInfo.map_url} className="w-100 h-100" style={{border:'0'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>

      {/* Branch Offices */}
      {/* <div className="container BranchOffices pt-5 mt-5" ref={branchOfficesRef}>
        <h2 className="fs-1">
          Branch <span>Offices</span>
        </h2>
        <div className="row BranchOfficescards">
          {RegisteredOfficeCardArr.map((val) => (
            <div className="col-md-6" key={val.key}>
              <ContactUsCard
                title={val.title}
                location={val.location}
                phone={val.phone}
                email={val.email}
              />
            </div>
          ))}
        </div>
      </div> */}
      {/* Factory Units */}

      <div className="container BranchOffices py-5" ref={factoryUnitsRef}>
        <h2>
          Factory <span>Units</span>
        </h2>
        <div className="row BranchOfficescards ">
          {FactoryUnitsArr.map((val) => (
            <div className="col-md-6 col-lg-4 col-12" key={val.key}>
              <ContactUsCard
                title={val.title}
                location={val.location}
                phone={val.phone}
                email={val.email}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default ContactUs;
