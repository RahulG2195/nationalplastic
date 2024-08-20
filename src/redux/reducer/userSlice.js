import { createSlice } from "@reduxjs/toolkit";
export const isLoggedIn = () => {
  try {
    if (typeof localStorage !== "undefined") {
      const storedValue = localStorage.getItem("isLoggedIn") || false;

      if (storedValue !== null) {
        return storedValue === "true";
      }
    }
    return false;
  } catch (err) {
    initializeLocalStorage();
  }
};

export const initializeLocalStorage = () => {
  const defaultUserData = {
    isLoggedIn: false,
    email: "",
    customer_id: "",
  };

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
    isLoggedIn: false,
    email: null,
    customer_id: null,
  },

  reducers: {
    setUserData: (state, action) => {
      action.payload.email;
      state.isLoggedIn = true;
      state.email = action.payload.email;
      state.customer_id = action.payload.customer_id;
      localStorage.setItem("userData", JSON.stringify(action.payload));
      localStorage.setItem("isLoggedIn", true);
    },
  },
});
export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
