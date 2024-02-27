import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axios from "axios";
import {useEffect} from 'react'
// Note: Removed unnecessary import (`// import Cookies from "js-cookie";`)

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true" ? true : false,
  userData: {
    email: "",
    password: "", // Password should not be persisted
  },
};

// **`use client` is not required here as the reducer is written in TypeScript and not JSX.**

export const loginSlice = createAsyncThunk("/auth/login", async (data) => {
  try {
    console.log("data:", JSON.stringify(data));
    const res = await axios.put(`http://localhost:3000/api/Users`, data);

    toast.promise(res, {
      loading: "Wait! Authentication in progress...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to log in",
    });

    return res.data; // Change this line
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginSlice.fulfilled, (state, action) => {

        console.log("inside Usefffect of authslice"+JSON.stringify(action?.meta?.arg))
   






      // Update localStorage and state using useEffect for client-side synchronization
      
        localStorage.setItem("data", JSON.stringify(action.meta.arg));
        localStorage.setItem("isLoggedIn", true);
        state.isLoggedIn = true;
        state.userData = action.meta.arg;
   // Add action as a dependency to ensure effect runs only on action change
    });
  },
});

export default authSlice.reducer;
