import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/redux/reducer/cartSlice";
import wishlistReducer from "@/redux/reducer/wishlistSlice";
import userSliceReducer from "@/redux/reducer/userSlice";
import tempSliceReducer from "@/redux/reducer/tempSlice";
import paySliceReducer from "./reducer/paySlice";
import couponReducer from "@/redux/reducer/couponSlice";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
  userData: userSliceReducer,
  temp: tempSliceReducer,
  payment: paySliceReducer,
  discount: couponReducer
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
