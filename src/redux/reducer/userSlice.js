import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import "react-toastify/dist/ReactToastify.css";

export const userSlice = createSlice({
  name: "userData",
  initialState: {
    isLoggedIn: false,
    email: "",
    customer_id: "",
  },

  reducers: {
    setUserData: (state, action) => {
      action.payload.email;
      // console.log("stateeeeeeeeeeee");
      // console.log("actionnnnnnnnnnn####################3", action);
      // console.log("actionnnnnnnnnnn action.payload***********************", action.payload);
      state.isLoggedIn= true
      state.email = action.payload.email
      state.customer_id = action.payload.customer_id
      localStorage.setItem("userData",JSON.stringify(action.payload))
      localStorage.setItem("isLoggedIn",true)
      alert();
    },
  },
});
// });
export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
