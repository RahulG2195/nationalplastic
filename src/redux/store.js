// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/redux/reducer/cartSlice'
import wishlistReducer from '@/redux/reducer/wishlistSlice'; 

import authReducer from '@/redux/reducer/userSlice'
import counterReducer  from './reducer/counterSlice';


const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    },
    auth: authReducer,
    price : counterReducer
});

export default store;

