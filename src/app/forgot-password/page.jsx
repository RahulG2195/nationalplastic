"use client";
import { useState } from "react";
import "./forgotPasswordPage.css"; // Import CSS file for styling
import { isValidEmail } from "@/utils/validation";
import axios from "axios";
import { Bounce, toast } from "react-toastify";

const notify = () => {
  toast.success("Mail Sended SucessFully", {
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
  toast.error("Failed To send Mail", {
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
    const generateRandomString = (length) => {
      const charset =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      return Array.from(
        { length },
        () => charset[Math.floor(Math.random() * charset.length)]
      ).join("");
    };

    const generatePasswordResetToken = () => {
      const randomBytes = generateRandomString(64);
      const token = randomBytes.toString("hex");

      // 3. (Optional) Add timestamp for expiry
      const expiry = Date.now() + 5 * 60 * 1000; // One hour from now (milliseconds)
      const tokenWithExpiry = `${token}:${expiry}`;
      console.log("Token with expiry", tokenWithExpiry);
      return tokenWithExpiry;
    };
    const formDataToSend = new FormData();
    formDataToSend.append("email", formData.email);
    // Checks Email valid or not
    const res = await axios.post(
      `http://localhost:3000/api/forgotPassword`,
      formDataToSend
    );
    //Generating Token and sending Email to the user
    if (res.status === 200) {
      console.log("res  ----------");
      const resetToken = await generatePasswordResetToken();
      console.log("resetToken ----------", resetToken);
      formDataToSend.append("resetToken", resetToken); // Ensure only the first file is appended
      console.log("resetTOken" + resetToken);
      const response = await axios.post(
        `http://localhost:3000/api/mail`,
        formDataToSend
      );
      console.log("response: ");
      if (response.status === 200) {
        notify();

        console.log("success from forgot-Passwords");
        // localStorage.setItem("resetToken", resetToken);
        localStorage.setItem("resetEmail", formData.email);
      }
      console.log(response);
    } else {
      notifyError();
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
