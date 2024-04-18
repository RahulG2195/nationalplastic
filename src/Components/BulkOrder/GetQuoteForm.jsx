"use client";
import Link from "next/link";
import "./GetQuoteForm.css";
import { useState, useEffect } from "react";
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

const GetQuoteForm = (props) => {
  const [products, setProducts] = useState();
  console.log("props", props);
  useEffect(() => {
    // This effect runs once when the component mounts, updating products state
    setProducts(props.product);
    if (props.product) {
      notify("Product Added to BulkOrder Form");
    }
  }, [props.product]);
  const [formData, setFromData] = useState({
    fullName: "",
    Email: "",
    ProductName: "",
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
    if (!isValidProduct(userInput.ProductName)) {
      toast.error("Please enter a message.");
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
      await axios.post("/api/BulkOrderForm", formData);
      notify("Mail Sended SucessFully");
    } catch (error) {
      console.error("Error:", error);
      notifyError("Failed to send");
    }
    try {
      const response = await axios.post("/api/bulkOrderEmail", formData);
      // console.log("Response:", response.data);
      // console.log("Response:", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error:", error);
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
        className={`GQform rounded p-5 py-5 mt-2 GQFormRes rounded-4 bulkForm ${props.bottomclass} `}
      >
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
              placeholder={products || "Enter Product Name"}
              defaultValue={products || ""}
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
          <div className="mb-4">
            <input
              type="text"
              name="organisation"
              onChange={handleOnChange}
              className="form-control"
              placeholder="organisation"
            />
          </div>
          <div className="d-flex justify-content-center GQFormSubmitRes">
            <button
              type="submit"
              value="submit"
              className={
                props.className
                  ? props.className
                  : "btn bg-white darkBlue form_submit fw-semibold px-4"
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
