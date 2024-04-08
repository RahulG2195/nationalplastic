import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/redux/reducer/cartSlice";
import wishlistReducer from "@/redux/reducer/wishlistSlice";
import userSliceReducer from "@/redux/reducer/userSlice";
import tempSliceReducer from "@/redux/reducer/tempSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    userData: userSliceReducer,
    temp: tempSliceReducer,
  },
});

export default store;
