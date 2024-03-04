// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/redux/reducer/cartSlice'
import authSliceReducer from '@/redux/reducer/userSlice'
import wishlistReducer from '@/redux/reducer/wishlistSlice'; 



const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authSliceReducer,
    wishlist: wishlistReducer,
    },
});

export default store;
