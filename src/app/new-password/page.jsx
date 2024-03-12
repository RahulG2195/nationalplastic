"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "./PasswordPage.css";

const PasswordPage = () => {
  const [formData, setFormData] = useState({
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState("");
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    const tokenFromUrl = query.token;
    setToken(tokenFromUrl);
    console.log(tokenFromUrl);
  }, [router.query]);

  const isValidPassword = (password) => {
    console.log("isValidPAssword" + password);
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
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

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      if (!isValidPassword(formData.password)) {
        alert("Weak Password");
      } else {
        // Add your logic here for a valid password
      }
      console.log("FormData: ", formData);
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

export default PasswordPage;
