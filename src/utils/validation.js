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
export const isValidPassword = (password) => {
  // Regular expression to check if password has at least one special character and one number
  const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  const numberRegex = /[0-9]/;

  // Check if the password meets the length requirement
  if (password.length < 8) {
    return false;
  }

  // Check if the password contains at least one special character and one number
  if (!specialCharRegex.test(password) || !numberRegex.test(password)) {
    return false;
  }

  return true;
};

export const isValidState = (state) => {
  return state.trim().length > 0 && state.trim().length <= 50;
};

export const isValidCity = (city) => {
  return city.trim().length > 0 && city.trim().length <= 50;
};

export const isValidPincode = (pincode) => {
  // Assuming Indian pincode format (6 digits)
  return /^\d{6}$/.test(pincode);
};

// We'll use the existing isValidAddress function for the address field