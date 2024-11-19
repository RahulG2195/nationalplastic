"use client";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "../../styles/profilepage.css";
import { toast, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Input } from 'antd';
import { useEffect, useRef } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import {
  isValidName,
  isValidEmail,
  isValidMobile as isValidPhone,
  isValidPassword,
  isValidReason,
  isValidAddress,
  isValidCity, isValidState, isValidPincode
} from "@/utils/validation";
import { notifyError } from "@/utils/notify";
import "./passwordStyle.css";
const initialFormData = {
  firstName: "", lastName: "", email: "", phone: "", address: "",
  password: "", confirmPassword: "", state: "", city: "", pincode: '', otp: "",
};

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});
  const [message, setMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const otpInputs = useRef([]);
  const secretKey = process.env.NEXT_PUBLIC_secretKey
  const [countdown, setCountdown] = useState(0);
  const [resendEnabled, setResendEnabled] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedOtpSent = localStorage.getItem('otp');
      if (storedOtpSent === 'true') {
        setOtpSent(true);
      }
    }
  }, []);

  useEffect(() => {
    if (otpSent && otpInputs.current[0]) {
      otpInputs.current[0].focus();
    }
  }, [otpSent]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: "" }));
  };
  const handleOtpChange = (target, index) => {
    const value = target.value.replace(/\D/g, '');
    setFormData(prevData => {
      const newOtp = prevData.otp.split('');
      newOtp[index] = value;
      return {
        ...prevData,
        otp: newOtp.join('').slice(0, 6)
      };
    });

    if (value && index < 5) {
      otpInputs.current[index + 1].focus();
    }
  };

  const handleResendOTP = () => {
    handleOTP('send');
    notify("OTP sent");
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !formData.otp[index] && index > 0) {
      otpInputs.current[index - 1].focus();
    }
  };
  const validateForm = () => {
    const errors = {};
    if (!isValidState(formData.state)) { errors.state = "Invalid state"; }
    if (!isValidCity(formData.city)) { errors.city = "Invalid city"; }
    if (!isValidPincode(formData.pincode)) { errors.pincode = "Invalid pincode"; }
    if (!isValidName(formData.firstName)) errors.firstName = "Invalid first name";
    if (!isValidName(formData.lastName)) errors.lastName = "Invalid last name";
    if (!isValidEmail(formData.email)) errors.email = "Invalid email address";
    if (!isValidPhone(formData.phone)) errors.phone = "Invalid phone number";
    if (!isValidAddress(formData.address)) errors.address = "Invalid address";
    if (!isValidPassword(formData.password)) errors.password = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Passwords do not match";
    return errors;
  };
  const combineAddressFields = (formData) => {
    const fullAddress = `${formData.address}, ${formData.city}, ${formData.state}, ${formData.pincode}`.trim();
    const updatedFormData = {
      ...formData,
      address: fullAddress,
    };
    delete updatedFormData.state;
    delete updatedFormData.city;
    delete updatedFormData.pincode;

    return updatedFormData;
  };

  function encrypt(text, key) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return btoa(result); 
  }
  function decrypt(encoded, key) {
    const text = atob(encoded); 
    let result = '';
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
  }

  const handleOTP = async (action) => {
    console.log(`handleOTP called with action: ${action}`); 
    try {
      if (action === 'send') {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/sendOTP`, { email: formData.email });
        if (response.status === 200) {
          const { otp, otpExpiry } = response.data;
          const encryptedOTP = encrypt(otp.toString(), secretKey);
          const encryptedExpiry = encrypt(otpExpiry.toString(), secretKey);
          localStorage.setItem('otp', encryptedOTP);
          localStorage.setItem('otpExpiry', encryptedExpiry);
          setMessage('Please check your email, OTP sent successfully.');
          setOtpSent(true);
          setCountdown(60); // Countdown in seconds
          setResendEnabled(false);

          const timer = setInterval(() => {
            setCountdown(prevCountdown => {
              if (prevCountdown <= 1) {
                clearInterval(timer);
                setResendEnabled(true);
                return 0;
              }
              return prevCountdown - 1;
            });
          }, 1000);
        } else {
          throw new Error(response.data.message || 'Failed to send OTP');
        }
      } else if (action === 'verify') {
        console.log("verify"+ "why it comes here");
        const storedEncryptedOTP = localStorage.getItem('otp');
        const storedEncryptedExpiry = localStorage.getItem('otpExpiry');
        const storedOtp = decrypt(storedEncryptedOTP, secretKey);
        const storedOtpExpiry = decrypt(storedEncryptedExpiry, secretKey);
        if (new Date(storedOtpExpiry) < new Date()) {
          throw new Error('OTP has expired.');
        }
        if (storedOtp !== formData.otp) {
          throw new Error('Invalid OTP.');
        }
        const updatedFormData = combineAddressFields(formData);
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/Users`, updatedFormData);
        localStorage.removeItem('otp');
        localStorage.removeItem('otpExpiry');

        if (response.status === 201) {
          setMessage('Registration successful!');
          setTimeout(() => router.push('/Login'), 2000); // Redirect after 2 seconds
        } else {
          throw new Error(response.data.message || 'Failed to complete registration');
        }
      }
    } catch (error) {
      setMessage(error.message || 'An error occurred. Please try again.');
      throw error;
    }
  };
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);

    setFormData(prevData => ({
      ...prevData,
      otp: pastedData
    }));
    const focusIndex = Math.min(pastedData.length, 5);
    otpInputs.current[focusIndex].focus();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!otpSent) {
      const errors = validateForm();
      if (Object.keys(errors).length === 0) {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/Users?email=${formData.email}`);
          if (response.status === 201) {
            toast.promise(
              handleOTP('send'),
              {
                pending: 'Sending OTP...',
                success: 'OTP sent successfully!',
                error: { render: ({ data }) => data.message || 'Failed to send OTP' },
              },
              { position: 'top-center', transition: Bounce }
            );
          } else {
            notifyError("Email already exists!");
          }
        } catch (error) {
          console.error("Error submitting form:", error);
        }
      } else {
        setFormErrors(errors);
      }
    } else {
      // This is the OTP verification attempt
      toast.promise(
        handleOTP('verify'),
        {
          pending: 'Verifying OTP...',
          success: 'OTP verified successfully!',
          error: { render: ({ data }) => data.message || 'Failed to verify OTP' },
        },
        { position: 'top-center', transition: Bounce }
      );
    }
  };
  const fields = {
    "First Name": "firstName", "Last Name": "lastName", "Email": "email",
    "Mobile No": "phone", "State": "state", "City": "city", "Pincode": "pincode",
    "Password": "password", "Confirm Password": "confirmPassword", "Address": "address",
  };


  return (
    <div className="container mt-desk">
      <div className="row Login-Page-ImgForm">
        <div className="col-md-5 login-image">
          <Image
            src="/Assets/images/catalogue/loginPage.png"
            className="img-fluid d-block w-100"
            alt="Team Member"
            width={100}
            height={100}
            layout="responsive"
            objectFit="cover"
          />
        </div>
        <div className="col-md-7">
          <div className="Login-Form">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <h3 className="mb-2">Registration</h3>
                <p>Track your order, create wishlist & more</p>
                {!otpSent ? (
                  <>
                    {Object.entries(fields).map(([key, value]) => (
                      <div key={value} className={`mb-3 mt-3 ${['state', 'city', 'pincode'].includes(value) ? 'col-md-4' : value === 'address' ? 'col-12' : 'col-md-6'}`}>
                        <label htmlFor={`input${value}`}>{key}</label>
                        {value === 'address' ? (
                          <textarea
                            className="form-control"
                            id={`input${value}`}
                            name={value}
                            value={formData[value]}
                            onChange={handleInputChange}
                          />
                        ) : ['password', 'confirmPassword'].includes(value) ? (
                          <Input.Password
                            className="form-control password-input"
                            id={`input${value}`}
                            name={value}
                            value={formData[value]}
                            onChange={handleInputChange}
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                          />
                        ) : (
                          <input
                            type={value === "email" ? "email" : 'text'}
                            className="form-control"
                            id={`input${value}`}
                            name={value}
                            value={formData[value]}
                            onChange={handleInputChange}
                          />
                        )}
                        {formErrors[value] && <div className="text-danger">{formErrors[value]}</div>}
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="mb-3 mt-3">
                    <label htmlFor="otp-input" className="form-label">Enter OTP</label>
                    <div className="otp-input-container">
                      {[...Array(6)].map((_, index) => (
                        <input
                          key={index}
                          ref={el => otpInputs.current[index] = el}
                          type="text"
                          maxLength="1"
                          className="form-control otp-input"
                          value={formData.otp[index] || ''}
                          onChange={e => handleOtpChange(e.target, index)}
                          onKeyDown={e => handleOtpKeyDown(e, index)}
                          onPaste={handleOtpPaste}
                        />
                      ))}
                    </div>
                    {formErrors.otp && <div className="text-danger mt-2">{formErrors.otp}</div>}

                  </div>
                )}
                <div className="form-btn-login-div">
                  <button type="submit" className="btn form-btn-login">
                    {otpSent ? "Submit OTP" : "Register"}
                  </button>
                </div>
                {message && <div className="alert alert-info">{message}</div>}
                <div className="mt-3 text-center">
                  <p>Already Registered? <a href="/Login">Login</a></p>
                </div>
              </div>
            </form>
          </div>
          {otpSent && !resendEnabled && <p>Resend OTP in {countdown}s</p>}
          {resendEnabled && <button onClick={()=>handleResendOTP()}>Resend OTP</button>}
        </div>
      </div>
    </div>
  );
}

export default Register;