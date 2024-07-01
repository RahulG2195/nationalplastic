"use client";
import Link from "next/link";
import "./GetQuoteForm.css";
import { useState } from "react";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import {
  isValidReason
  // isValidFile,
} from "@/utils/validation";

const notify = () => {
  //console.log("name " + prodName);
  toast.success("Return Request Sent successfully!", {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
};

const notifyError = () => {
  toast.error("oop! Failed to send Return order!", {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
};



const ProdEmail = ({OId, cID, cEmail, cPhone, pID, price, qty}) => {

  const [formData, setFromData] = useState({'order_id' : OId, 'user_id' : cID, 'prodId' : pID, 'price': price, 'qty' : qty});

  const validation = (userInput) => {
    if (!isValidReason(userInput.Requirements)) {
      toast.error("Please enter a valid Reason.");
      return;
    }
  };


  const ReturnOrderFormSubmit = async (e) => {
    
    e.preventDefault();
    try {
      
      await axios.post("/api/ReturnOrder", formData);
      setFromData([]);
      notify();
    } catch (error) {
      console.error("Error:", error);
      notifyError();
    }
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFromData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div
        className={`GQform GQformprodpage rounded p-5 py-5 mt-2 GQFormRes rounded-4`}
      >
        {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
        <h5 className="text-white py-2 text-center">Send Email of damage product</h5>
        <form onSubmit={ReturnOrderFormSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="Email"
              className="form-control"
              placeholder="Your Email Address"
              readOnly
              value={cEmail}
            />
          </div>

          <div className="mb-4">
            <div className="input-group">
              {/* <span className="input-group-text">+91</span> */}
              <input
                type="tel"
                name="Mobile"
                className="form-control"
                placeholder="Your Mobile Number"
                readOnly
                value={cPhone}
              />
            </div>
          </div>
          <div className="mb-4">
            <input
              type="file"
              name="fullImage"
              className="form-control"
              placeholder="Upload Full Image"
              required
            />
          <div className="small text-white mb-4 reqCaptRes">
            Upload Full Image of Product
          </div>
          </div>
          <div className="mb-4">
            <input
              type="file"
              name="DamageImage"
              className="form-control"
              placeholder="Upload Damage Image"
              required
            />
            <div className="small text-white mb-4 reqCaptRes">
            Upload damage part of Product
          </div>
          </div>
          <div className="">
            <textarea
              name="Requirements"
              onChange={handleOnChange}
              className="form-control text-area"
              rows="4"
              placeholder="Describe product Issue"
            ></textarea>
          </div>

          <div className="small text-white mb-4 reqCaptRes">
            Please Describe More*
          </div>
          
          <div className="d-flex justify-content-center GQFormSubmitRes">
            <button
              type="submit"
              value="submit"
              className='btn btn-light'
            >
              Return Order
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default ProdEmail;
