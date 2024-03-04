// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/redux/reducer/cartSlice'
import authReducer from '@/redux/reducer/userSlice'
import counterReducer  from './reducer/counterSlice';


const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    price : counterReducer
  },
});

export default store;

