import { createSlice } from '@reduxjs/toolkit';

const couponSlice = createSlice({
  name: 'coupon',
  initialState: {
    discountPercentage: null,
    couponCode: null,
  },
  reducers: {
    applyDiscount: (state, action) => {
      const { discountPercentage , couponCode } = action.payload;
      state.discountPercentage = discountPercentage;
      state.couponCode = couponCode;
    },
    removeCoupon: (state) => {
      state.discountPercentage = null;
      state.couponCode = null;
    },
  },
});

export const { applyDiscount, removeCoupon } = couponSlice.actions;
export default couponSlice.reducer;