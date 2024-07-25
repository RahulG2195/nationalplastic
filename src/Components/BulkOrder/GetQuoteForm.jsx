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
} from "@/utils/validation";
import { Input, Button, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const GetQuoteForm = (props) => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    Email: "",
    Mobile: "",
    Requirements: "",
    city: "",
    organisation: "",
  });

  useEffect(() => {
    if (props.product) {
      const newProducts = props.product.split(',')
        .map(p => p.trim())
        .filter(p => p && !products.includes(p));
      
      if (newProducts.length > 0) {
        setProducts(prevProducts => [...prevProducts, ...newProducts]);
        notify("Products Added to Query Form, Please Fill the form for further processing.");
      }
    }
  }, [props.product]);

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue) {
      e.preventDefault();
      if (!products.includes(inputValue.trim())) {
        setProducts([...products, inputValue.trim()]);
        setInputValue('');
      } else {
        toast.warning("This product is already added.");
      }
    }
  };

  const removeProduct = (productToRemove) => {
    setProducts((prevProducts) => {
      const newProducts = prevProducts.filter(product => product !== productToRemove);
      return newProducts;
    });
    props.onProductRemove(productToRemove);
  };

  const handleTagClose = (productToRemove) => {
    removeProduct(productToRemove);
  };

  const validation = (userInput) => {
    if (products.length === 0) {
      toast.error("Please add at least one product.");
      return false;
    }
    if (!isValidName(userInput.city)) {
      toast.error("Please enter a valid city name.");
      return false;
    }
    if (!isValidName(userInput.fullName)) {
      toast.error("Please enter a valid name.");
      return false;
    }
    if (!isValidReason(userInput.Requirements)) {
      toast.error("Please enter a valid Reason.");
      return false;
    }
    if (!isValidEmail(userInput.Email)) {
      toast.error("Please enter a valid email.");
      return false;
    }
    if (!isValidProduct(products ? products : userInput.ProductName)) {
      toast.error("Please enter a product.");
      return false;
    }
    if (!isValidMobile(userInput.Mobile)) {
      toast.error("Please enter a valid mobile number.");
      return false;
    } else {
      return true;
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const submissionData = { ...formData, ProductName: products.join(', ') };
    const isValid = validation(submissionData);
    if (!isValid) return;

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/BulkOrderForm`, submissionData);
      notify("Mail Sent Successfully");
      // ... rest of your submission logic
    } catch (error) {
      console.error("Error:", error);
      notifyError("Failed to send");
    }
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={`GQform rounded p-5 py-5 mt-2 GQFormRes rounded-4 bulkForm ${props.bottomclass} `}>
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

        <div className="mb-1">
          <Input
          className="d-none"
            placeholder="Type product name and press Enter"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            style={{ marginBottom: '8px' }}
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {products.map((product, index) => (
              <Tag 
                key={index} 
                closable 
                onClose={(e) => {e.preventDefault(); handleTagClose(product);}}
                style={{ marginBottom: '8px' }}
              >
                {product}
              </Tag>
            ))}
          </div>
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

        <div>
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
            className={props.className ? props.className : "btn bg-white darkBlue form_submit fw-semibold px-4"}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default GetQuoteForm;
