"use client";
import { useState } from "react";
import "./forgotPasswordPage.css"; // Import CSS file for styling
import { isValidEmail } from "@/utils/validation";
import axios from "axios";
const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(formData.email)) {
      alert("Please enter a valid email.");
      return;
    }
    const formDataToSend = new FormData();
    formDataToSend.append("email", formData.email);
    //   // Here you can implement the logic to handle the reset password process, such as sending a reset password email
    // console.log("Reset password email sent to:", formData);
    // console.log("Reset password email sent to:", formData);
    const res = await axios.post(
      `http://localhost:3000/api/forgotPassword`,
      formDataToSend
    );
    if (res.status === 200) {
      console.log("res  ----------");
      const response = await axios.post(
        `http://localhost:3000/api/mail`,
        formDataToSend
      );
      console.log(response);
    } else {
      console.log("Inside Email Send failed with error");
      alert(res.messsage);
    }
  };

  return (
    <div className="center-content">
      {" "}
      {/* Apply CSS class to center content */}
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="text">
            Enter your email:
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            name="email"
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="reset-button">
          Reset Password
        </button>
      </form>
      <p>
        Enter your email Above. We will send you further instructions to reset
        your password.
      </p>
    </div>
  );
};

export default ResetPasswordPage;
