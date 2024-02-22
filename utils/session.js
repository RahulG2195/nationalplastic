// utils/session.js

// Function to set user session
export const setUserSession = (userData) => {
    sessionStorage.setItem('user', JSON.stringify(userData));
  };
  
  // Function to get user session
  export const getUserSession = () => {
    const userSession = sessionStorage.getItem('user');
    return userSession ? JSON.parse(userSession) : null;
  };
  
  // Function to clear user session
  export const clearUserSession = () => {
    sessionStorage.removeItem('user');
  };
  