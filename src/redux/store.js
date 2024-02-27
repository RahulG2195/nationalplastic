// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/redux/reducer/cartSlice'
import authSliceReducer from '@/redux/reducer/userSlice'


const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authSliceReducer
  },
});

export default store;
