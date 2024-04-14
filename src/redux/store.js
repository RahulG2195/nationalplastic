import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/redux/reducer/cartSlice";
import wishlistReducer from "@/redux/reducer/wishlistSlice";
import userSliceReducer from "@/redux/reducer/userSlice";
import tempSliceReducer from "@/redux/reducer/tempSlice";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
  userData: userSliceReducer,
  temp: tempSliceReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
