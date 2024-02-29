// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/redux/reducer/cartSlice'
import authSliceReducer from '@/redux/reducer/userSlice'
import counterReducer  from './reducer/counterSlice';


const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authSliceReducer,
    price : counterReducer
  },
});

export default store;

