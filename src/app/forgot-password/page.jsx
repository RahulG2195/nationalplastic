"use client";
import { useState } from "react";
import "./forgotPasswordPage.css"; // Import CSS file for styling
import { isValidEmail } from "@/utils/validation";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

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
      return tokenWithExpiry;
    };
    const formDataToSend = new FormData();
    formDataToSend.append("email", formData.email);
    // Checks Email valid or not
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/forgotPassword`,
      formDataToSend
    );
    //Generating Token and sending Email to the user
    if (res.status === 200) {
      const resetToken = await generatePasswordResetToken();
      formDataToSend.append("resetToken", resetToken); // Ensure only the first file is appended
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/mail`,
        formDataToSend
      );
      if (response.status === 200) {
        notify();
        setTimeout(() => router.push("/"), 2000);
        localStorage.setItem("resetEmail", formData.email);
      }
    } else {
      notifyError();
      alert(res.messsage);
    }
  };

  return (
    <div className="center-content">
    
      <h2 className="forgot_heading text-center py-4"><u>Reset Password</u></h2>
      <form onSubmit={handleSubmit} className="text-center">
        <div>
          <label htmlFor="email" className="text text-left">
            Enter your email:
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            name="email"
            className="form-control"
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="reset-button btn btn-warning mx-auto mt-4">
          Reset Password
        </button>
      </form>
        <small className="mt-3">We will send you reset link on your email!</small>
    </div>
  );
};

export default ResetPasswordPage;
