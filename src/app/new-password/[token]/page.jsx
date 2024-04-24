"use client";

import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
import axios from "axios";
import "../PasswordPage.css";
import { useParams } from "next/navigation";
import { Bounce, toast } from "react-toastify";

const notify = () => {
  toast.success("Password Changed SucessFully", {
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
  toast.error("Process Failed Try Again!", {
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
const PasswordToken = () => {
  //   const router = useRouter();
  const [formData, setFormData] = useState({
    password: "",
    resetToken: "",
    email: localStorage.getItem("resetEmail"),
  });
  const [formErrors, setFormErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const resetTokenParam = window.location.search
    .slice(1)
    .split("&")
    .find((param) => param.startsWith("resetToken="));
  //   const params = useParams();
  formData.resetToken = resetTokenParam.split("=")[1];
  //console.log("Entire Query Object:", formData.resetToken);
  useEffect(() => {
    //console.log();
    const storedResetEmail = localStorage.getItem("resetEmail");
    setFormData((prevFormData) => ({
      ...prevFormData,
      resetEmail: storedResetEmail,
    }));
  }, []);

  const isValidPassword = (password) => {
    //console.log("isValidPAssword" + password);
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+$/;
    return passwordPattern.test(password);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //console.log("INvalid");
      const errors = {};
      //console.log(formData.password);
      //console.log(formData.email);
      const inputString = formData.resetToken;

      const [_, valueAfterColon] = inputString.split(":");
      const storedValue = valueAfterColon;
      //console.log(storedValue);
      const expiry = parseInt(storedValue);
      const isValidPassword = (password) => {
        const passwordPattern =
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
        return passwordPattern.test(password);
      };
      const formDataToSend = new FormData();
      formDataToSend.append("resetEmail", formData.email);
      formDataToSend.append("password", formData.password);
      if (!isValidPassword(formData.password)) {
        errors.password =
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character";
      }
      //   formDataToSend.append("email", formData.email);
      if (errors.password) {
        setFormErrors(errors);
      }
      if (Date.now() < expiry) {
        const res = await axios.put(`/api/forgotPassword`, formDataToSend);
        notify();
        localStorage.clear();
      } else {
        notifyError();
      }
    } catch (error) {
      notifyError();
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <input
          type={showPassword ? "text" : "password"}
          className="input"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Enter your password"
        />
        {formErrors.password && (
          <div className="text-danger">{formErrors.password}</div>
        )}
        <button
          type="button"
          className="toggle-button"
          onClick={handleTogglePassword}
        >
          {showPassword ? "Hide" : "Show"} Password
        </button>
        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PasswordToken;
