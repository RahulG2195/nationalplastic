"use client";

import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
import axios from "axios";
import "../PasswordPage.css";
import { useParams } from "next/navigation";
const PasswordToken = () => {
  //   const router = useRouter();
  const [formData, setFormData] = useState({
    password: "",
    resetToken: "",
    email: localStorage.getItem("resetEmail"),
  });
  const [showPassword, setShowPassword] = useState(false);
  const resetTokenParam = window.location.search
    .slice(1)
    .split("&")
    .find((param) => param.startsWith("resetToken="));
  //   const params = useParams();
  formData.resetToken = resetTokenParam.split("=")[1];
  console.log("Entire Query Object:", formData.resetToken);
  useEffect(() => {
    console.log();
    const storedResetEmail = localStorage.getItem("resetEmail");
    setFormData((prevFormData) => ({
      ...prevFormData,
      resetEmail: storedResetEmail,
    }));
  }, []);

  const isValidPassword = (password) => {
    console.log("isValidPAssword" + password);
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
      console.log("INvalid");

      console.log(formData.password);
      console.log(formData.email);
      const inputString = formData.resetToken;

      const [_, valueAfterColon] = inputString.split(":");
      const storedValue = valueAfterColon;
      console.log(storedValue);
      const expiry = parseInt(storedValue);
      //   setFormData(formData.resetToken, expiry)
      //   console.log(Date.now());
      //   console.log(expiry);
      //   console.log(typeof Date.now());
      //   console.log(typeof expiry);
      //   console.log(Date.now() > expiry);
      //   console.log(Date.now() < expiry);
      //   console.log(Date.now() < 1710314741895);
      const formDataToSend = new FormData();
      formDataToSend.append("resetEmail", formData.email);
      formDataToSend.append("password", formData.password);
      //   formDataToSend.append("email", formData.email);

      if (Date.now() < expiry) {
        console.log("yes  here");
        const res = await axios.put(
          `http://localhost:3000/api/forgotPassword`,
          formDataToSend
        );
        console.log(res);
        // return res.status(400).json({ error: "Token expired" });
      } else {
        console.log("Everthing okay");
        //   router.push("/forgot-password");
      }
      console.log("FormData from token: ", formData);
    } catch (error) {
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
