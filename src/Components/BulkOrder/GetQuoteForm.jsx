"use client";
import Link from "next/link";
import "./GetQuoteForm.css";
import { useState } from "react";
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
    theme: "dark",
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
    theme: "dark",
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

const GetQuoteForm = (props) => {
  const [formData, setFromData] = useState({
    fullName: "",
    Email: "",
    ProductName: "",
    Mobile: "",
    Requirements: "",
    city: "",
  });
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form Data:", formData); // Log formData for debugging
      const response = await axios.post(
        "http://localhost:3000/api/BulkOrderForm",
        formData
      );
      alert("Success! Form data submitted."); // Show success message
      console.log("Response:", response.data); // Log response from the server
    } catch (error) {
      console.error("Error:", error); // Log any errors
      alert("Error occurred while submitting the form."); // Show error message
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
      <div className="GQform rounded p-4 py-5 mt-2 GQFormRes">
        <form onSubmit={handleOnSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="fullName"
              onChange={handleOnChange}
              className="form-control"
              placeholder="Your Name"
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              name="Email"
              onChange={handleOnChange}
              className="form-control"
              placeholder="Your Email Address"
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="ProductName"
              onChange={handleOnChange}
              className="form-control"
              placeholder="Enter Product Name"
            />
          </div>

          <div className="mb-4">
            <div className="input-group">
              <span className="input-group-text">+91</span>
              <input
                type="tel"
                name="Mobile"
                onChange={handleOnChange}
                className="form-control"
                placeholder="Your Mobile Number"
              />
            </div>
          </div>

          <div className="">
            <textarea
              name="Requirements"
              onChange={handleOnChange}
              className="form-control text-area"
              rows="4"
              placeholder="Tell us your requirements"
            ></textarea>
          </div>
          <div className="small text-white mb-4 reqCaptRes">
            Please include details of product, quantity, type of service etc.*
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="city"
              onChange={handleOnChange}
              className="form-control"
              placeholder="City"
            />
          </div>
          <div className="d-flex justify-content-center GQFormSubmitRes">
            <button
              type="submit"
              value="submit"
              className={
                props.className
                  ? props.className
                  : "btn bg-white darkBlue fw-semibold px-4"
              }
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default GetQuoteForm;
