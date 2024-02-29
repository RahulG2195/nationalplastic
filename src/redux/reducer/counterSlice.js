import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    totalprice: 99,
  },
  reducers: {
    increment: (state) => {
      state.value++;
    },
    decrement: (state) => {
      state.value--;
    },
  },
});

export default counterSlice.reducer;
export const { increment, decrement } = counterSlice.actions;
