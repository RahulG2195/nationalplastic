import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axios from "axios";

const createLocalStorageIfNeeded = (key, value) => {
  if (typeof window !== "undefined" && localStorage !== null) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // console.error("Error creating local storage:", error);
    }
  }
};

const createInitialStateFromLocalStorage = () => {
  try {
    const initialState = {
      isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
      userData: JSON.parse(localStorage.getItem("userData")) || {
        email: "",
        password: "", // Password should not be persisted
      },
    };

    // Create local storage if not found
    if (
      !localStorage.getItem("isLoggedIn") ||
      !localStorage.getItem("userData")
    ) {
      createLocalStorageIfNeeded("isLoggedIn", false);
      createLocalStorageIfNeeded("userData", initialState.userData);
    }

    return initialState;
  } catch (error) {
    // console.error("Error retrieving initial state from local storage:", error);
    return {
      isLoggedIn: false,
      userData: {
        email: "",
        password: "",
      },
    };
  }
};

const initialState = createInitialStateFromLocalStorage();

// ... rest of your code
export const authSliceReducer = createAsyncThunk(
  "/auth/login",
  async (data) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("userData", JSON.stringify(data));
        localStorage.setItem("isLoggedIn", true);

        return data;
      } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error;
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authSliceReducer.fulfilled, (state, action) => {
      localStorage.setItem("userData", JSON.stringify(data));
      localStorage.setItem("isLoggedIn", true);
      state.isLoggedIn = true;
      // console.log("state.isLoggedIn"+ state.isLoggedIn)
      state.userData = action.meta.arg;
    });
  },
});

export default authSlice.reducer;
