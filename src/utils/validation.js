// validationUtils.js
import { initializeLocalStorage } from "@/redux/reducer/userSlice.js";

export const isValidName = (name) => {
  const namePattern = /^[A-Za-z\s]+$/;
  return namePattern.test(name);
};

export const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};
export const isValidProduct = (name) => {
  // Allow comma (",") as a separator
  const namePattern = /^[A-Za-z\s,]+$/;

  // Check if the name string consists only of letters, spaces, and commas
  return namePattern.test(name);
};

export const isValidMessage = (message) => {
  return message.trim() !== "";
};

export const isValidReason = (reason) => {
  const reasonPattern = /^[a-zA-Z0-9\s]+$/; // Allows only letters, digits, and spaces
  return reason.trim() !== "" && reasonPattern.test(reason);
};

export const isValidMobile = (mobile) => {
  const mobilePattern = /^\d{10}$/; // Change the pattern as per your requirement
  return mobilePattern.test(mobile);
};

export const isLoggedIn = () => {
  try {
    const storedValue = localStorage.getItem("isLoggedIn") || false;

    if (storedValue !== null) {
      return storedValue === "true";
    }

    return false;
  } catch (err) {
    initializeLocalStorage();
  }
};
