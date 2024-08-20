import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: null,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    createOrderRequest(state) {
      state.error = null; 
    },
    createOrderSuccess(state, action) {
      state.order = action.payload;
    },
    createOrderFailure(state, action) {
      state.error = action.payload;
    },
  },
});

export const { createOrderRequest, createOrderSuccess, createOrderFailure } =
  orderSlice.actions;
export default orderSlice.reducer;
