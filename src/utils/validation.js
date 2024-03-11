// validationUtils.js
export const isValidName = (name) => {
  const namePattern = /^[A-Za-z\s]+$/;
  return namePattern.test(name);
};

export const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
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
