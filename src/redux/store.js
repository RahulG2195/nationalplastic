// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/redux/reducer/cartSlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
