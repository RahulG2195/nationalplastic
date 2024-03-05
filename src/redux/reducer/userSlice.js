// 'use server'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axios from "axios";

const initialState = {
  isLoggedIn: false,
  userData: {
    email: "",
    password: "", // Password should not be persisted
  },
};

export const loginSlice = createAsyncThunk("/auth/login", async (data) => {
  try {
    // console.log("data:", JSON.stringify(data));
    const res = await axios.put(`http://localhost:3000/api/Users`, data);

    toast.promise(res, {
      loading: "Wait! Authentication in progress...",
      success: (data) => {
        return data?.data?.message;
      
      },
      error: "Failed to log in",
    });

    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error; // Rethrow error to handle it in component
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginSlice.fulfilled, (state, action) => {
      console.log("inside Usefffect of authslice" + JSON.stringify(action?.meta?.arg));
      
      // Update state with user data and login status
      state.isLoggedIn = true;
      state.userData = action.meta.arg;

      // Store user data and login status in localStorage
      localStorage.setItem("userData", JSON.stringify(action.meta.arg));
      localStorage.setItem("isLoggedIn", true);
    });
  },
});

export default authSlice.reducer;
