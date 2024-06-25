"use client";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "../../styles/profilepage.css";
import { toast, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Import validation functions
import {
  isValidName,
  isValidEmail,
  isValidMobile as isValidPhone,
  isValidPassword,
  isValidReason as isValidAddress,
} from "@/utils/validation";
import { notifyError } from "@/utils/notify";

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    otp: "", // Add OTP field
  });
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [message, setMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false); // State to track OTP sent status

  const sendOTPLoader = async (email) => {
    try {
      const response = await axios.post('/api/sendOTP', { email });
      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('otp', data.otp);
        localStorage.setItem('otpExpiry', data.otpExpiry);
        setMessage('Please check your email, OTP sent successfully.');
        setOtpSent(true); // Set OTP sent status to true
      } else {
        setMessage(data.message);
        throw new Error(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      setMessage(error.message || 'An error occurred while sending OTP. Please try again.');
      throw new Error(error.message || 'Failed to send OTP');
    }
  };

  const handleSendOTP = (email) => {
    toast.promise(
      sendOTPLoader(email),
      {
        pending: 'Sending OTP...',
        success: 'OTP sent successfully!',
        error: {
          render({ data }) {
            return data.message || 'Failed to send OTP';
          },
        },
      },
      {
        position: 'top-center',
        transition: Bounce,
      }
    );
  };

  const verifyOtpLoader = async () => {
    const storedOtp = localStorage.getItem('otp');
    const storedOtpExpiry = localStorage.getItem('otpExpiry');
    const now = new Date();

    if (storedOtpExpiry && new Date(storedOtpExpiry) < now) {
      setMessage('OTP has expired.');
      throw new Error('OTP has expired.');
    }

    if (storedOtp === formData.otp) {
      setMessage('OTP verified successfully.');
      localStorage.removeItem('otp');
      localStorage.removeItem('otpExpiry');
      const response = await axios.post('/api/Users', formData);

      if (response.status === 201) {
        setSuccessMessage('OTP verified successfully!! Registration complete.');
        router.push('/Login');
      } else {
        throw new Error(response.data.message || 'Failed to complete registration');
      }
    } else {
      setMessage('Invalid OTP.');
      throw new Error('Invalid OTP.');
    }
  };

  const handleVerifyOtp = () => {
    toast.promise(
      verifyOtpLoader(),
      {
        pending: 'Verifying OTP...',
        success: 'OTP verified, Registration successfully!',
        error: {
          render({ data }) {
            return data.message || 'Failed to verify OTP';
          },
        },
      },
      {
        position: 'top-center',
        transition: Bounce,
      }
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validateForm(formData);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.get(`/api/Users?email=${formData.email}`);
        if (response.status === 201) {
          handleSendOTP(formData.email); // Use handleSendOTP instead of sendOTP
        } else {
          notifyError("Email already exists!");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      setFormErrors(errors);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "image" ? files[0] : value,
    }));

    setFormErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = (data) => {
    const errors = {};

    if (!isValidName(data.firstName)) errors.firstName = "Invalid first name";
    if (!isValidName(data.lastName)) errors.lastName = "Invalid last name";
    if (!isValidEmail(data.email)) errors.email = "Invalid email address";
    if (!isValidPhone(data.phone)) errors.phone = "Invalid phone number";
    if (!isValidAddress(data.address)) errors.address = "Invalid address";
    if (!isValidPassword(data.password))
      errors.password =
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    if (data.password !== data.confirmPassword)
      errors.confirmPassword = "Passwords do not match";

    return errors;
  };

  return (
    <div className="container">
      <div className="row Login-Page-ImgForm">
        <div className="col-md-6 login-image">
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
        <div className="col-md-6">
          <div className="Login-Form">
            <form onSubmit={handleSubmit}>
              <h3 className="text-center mb-2">Registration</h3>
              {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
              )}
              {!otpSent ? (
                <>
                  {["firstName", "lastName", "email", "phone", "address"].map(
                    (field, index) => (
                      <div className="row mb-3 mt-3" key={index}>
                        <div className="col-sm-12">
                          <input
                            type={field === "email" ? "email" : "text"}
                            className="form-control"
                            id={`input${field.charAt(0).toUpperCase() + field.slice(1)}`}
                            name={field}
                            placeholder={`Enter Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                            value={formData[field]}
                            onChange={handleInputChange}
                          />
                          {formErrors[field] && (
                            <div className="text-danger">{formErrors[field]}</div>
                          )}
                        </div>
                      </div>
                    )
                  )}
                  {["password", "confirmPassword"].map((field, index) => (
                    <div className="row mb-3 mt-3" key={index}>
                      <div className="col-sm-12">
                        <input
                          type="password"
                          className="form-control"
                          id={`input${field.charAt(0).toUpperCase() + field.slice(1)}`}
                          name={field}
                          placeholder={`Enter Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                          value={formData[field]}
                          onChange={handleInputChange}
                        />
                        {formErrors[field] && (
                          <div className="text-danger">{formErrors[field]}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="row mb-3 mt-3">
                  <div className="col-sm-12">
                    <input
                      type="text"
                      className="form-control"
                      id="inputOtp"
                      name="otp"
                      placeholder="Enter OTP"
                      value={formData.otp}
                      onChange={handleInputChange}
                    />
                    {formErrors.otp && (
                      <div className="text-danger">{formErrors.otp}</div>
                    )}
                  </div>
                </div>
              )}
              <div className="form-btn-login-div">
                {!otpSent ? (
                  <button type="submit" className="btn form-btn-login">
                    Register
                  </button>
                ) : (
                  <button type="button" className="btn form-btn-login" onClick={handleVerifyOtp}>
                    Submit OTP
                  </button>
                )}
              </div>
              {message && <div className="alert alert-info">{message}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
