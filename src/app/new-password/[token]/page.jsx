"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "../PasswordPage.css";

const TOAST_CONFIG = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Bounce,
};

const notify = (message, type) => toast[type](message, TOAST_CONFIG);

const PasswordToken = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: "",
    resetToken: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const resetTokenParam = new URLSearchParams(window.location.search).get(
      "resetToken"
    );
    const storedResetEmail = localStorage.getItem("resetEmail");
    setFormData((prev) => ({
      ...prev,
      resetToken: resetTokenParam,
      email: storedResetEmail,
    }));
  }, []);

  const isValidPassword = (password) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(password);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValidPassword(formData.password)) {
      setFormErrors({
        password:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      });
      return;
    }

    try {
      const [_, valueAfterColon] = formData.resetToken.split(":");
      const expiry = parseInt(valueAfterColon);

      if (Date.now() >= expiry) {
        throw new Error("Token expired");
      }

      const formDataToSend = new FormData();
      formDataToSend.append("resetEmail", formData.email);
      formDataToSend.append("password", formData.password);

      await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/forgotPassword`,
        formDataToSend
      );
      notify("Password Changed Successfully", "success");
      localStorage.clear();
      setTimeout(() => router.push("/Login"), 2000);
    } catch (error) {
      notify("Process Failed. Try Again!", "error");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container new-pass">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="mb-3 text-center text-capitalize">update New password</h2>
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="password-field form-control"
            placeholder="Enter Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <i
            class={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
            id="togglePassword"
            onClick={() => setShowPassword((prevShow) => !prevShow)}
          ></i>
        </div>
        
        {formErrors.password && (
          <div className="text-danger">{formErrors.password}</div>
        )}
       
        <button type="submit" className="button btn-success">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PasswordToken;
