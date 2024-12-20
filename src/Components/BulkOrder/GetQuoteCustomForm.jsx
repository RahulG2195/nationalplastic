"use client";
import Link from "next/link";
import "./GetQuoteForm.css";
import { useState } from "react";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { notify, notifyError } from "@/utils/notify";
import {
  isValidName,
  isValidEmail,
  isValidReason,
  isValidMobile,
  isValidProduct,
  // isValidFile,
} from "@/utils/validation";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";

const GetQuoteCustomForm = (props) => {
  const [formData, setFromData] = useState({
    fullName: "",
    Email: "",
    ProductName: props.prodName || "", // Initialize with props.prodName
    Mobile: "",
    Requirements: "",
    city: "",
  });

  const validation = (userInput) => {
    if (!isValidName(userInput.city)) {
      toast.error("Please enter a valid  city name.");
      return;
    }
    if (!isValidName(userInput.fullName)) {
      toast.error("Please enter a valid  city name.");
      return;
    }
    if (!isValidReason(userInput.Requirements)) {
      toast.error("Please enter a valid Reason.");
      return;
    }
    if (!isValidEmail(userInput.Email)) {
      toast.error("Please enter a valid email.");
      return;
    }
    if (!isValidMobile(userInput.Mobile)) {
      toast.error("Please enter a valid mobile number.");
      return;
    } else {
      return true;
    }
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validation(formData);
    if (!isValid) return;
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/bulkOrderEmail`, formData);
      notify("Mail sent successfully");
      if (props.modalRef.current) {
        const modalElement = props.modalRef.current;
        const modalInstance = Modal.getInstance(modalElement); // Get the modal instance
        modalInstance.hide(); // Hide the modal
      }
    } catch (error) {
      notifyError(error.message);
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
        className={`GQform GQformprodpage rounded p-5 py-5 mt-2 GQFormRes rounded-4 ${props.bottomclass} `}
      >
        {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
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
              placeholder={props.prodName}
              value={props.prodName}
              readOnly={props.read}
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
export default GetQuoteCustomForm;
