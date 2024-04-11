import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import "react-toastify/dist/ReactToastify.css";
// import { isLoggedIn } from "@/utils/validation";
export const isLoggedIn = () => {
  try {
    if (typeof localStorage !== "undefined") {
      const storedValue = localStorage.getItem("isLoggedIn") || false;

      if (storedValue !== null) {
        return storedValue === "true";
      }
    }

    // Return false if localStorage is not available or value is null
    return false;
  } catch (err) {
    // Handle error if needed
    initializeLocalStorage();
  }
};

export const initializeLocalStorage = () => {
  const defaultUserData = {
    isLoggedIn: false,
    email: "",
    customer_id: "",
  };

  // Check if localStorage is available before using it
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("userData", JSON.stringify(defaultUserData));
  }
};

const isLoggedInResult = isLoggedIn();
const userData = (value) => {
  if (isLoggedInResult) {
    const userDataString = localStorage.getItem("userData");
    const userData = JSON.parse(userDataString);
    if (userData) {
      const returnValue = userData[value];
      return returnValue;
    }
  } else {
    return null;
  }
};

export const userSlice = createSlice({
  name: "userData",
  initialState: {
    isLoggedIn: isLoggedInResult,
    email: userData("email"),
    customer_id: userData("customer_id"),
  },

  reducers: {
    setUserData: (state, action) => {
      action.payload.email;
      state.isLoggedIn = true;
      state.email = action.payload.email;
      state.customer_id = action.payload.customer_id;
      localStorage.setItem("userData", JSON.stringify(action.payload));
      localStorage.setItem("isLoggedIn", true);
      // alert();
    },
  },
});
// });
export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
