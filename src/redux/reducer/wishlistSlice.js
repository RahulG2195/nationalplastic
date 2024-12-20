import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, toast } from "react-toastify";

const notify = () => {
  toast.success("Added to Wishlist", {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

const notifyInfo = () => {
  toast.info("Already in Wishlist", {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
  },
  reducers: {
    setWishlistItems: (state, action) => {
      state.items = action.payload;
    },
    addToWishlist: (state, action) => {
      const newItem = action.payload;

      const isItemAlreadyAdded = state.items.some(
        (item) => item.product_id === newItem.product_id
      );
      if (!isItemAlreadyAdded) {
        state.items.push(newItem);
        // notify('Added to wishlist');
      } else {
        // notifyInfo('Already in wishlist');
      }
    },
    removeItemFromWishlist: (state, action) => {
      state.items = state.items.filter(
        (item) => item.product_id !== action.payload
      );
    },
  },
});

export const { addToWishlist } = wishlistSlice.actions;

export const addItemToWishlist = (item) => async (dispatch, getState) => {
  const { items } = getState().wishlist; // Access state through tshe second parameter

  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString);
  const customerId = userData.customer_id;
  const check = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/wishListUser`, {
    customer_id: customerId,
  });

  const isWishlistEmpty =
    !check.data.products || check.data.products.length === 0;
  const isItemAlreadyAdded =
    !isWishlistEmpty &&
    check.data.products.some(
      (cartItem) => cartItem.product_id == item.product_id
    );

  if (isWishlistEmpty || !isItemAlreadyAdded) {
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/wishListUser`, {
        customer_id: customerId,
        product_id: item.product_id,
      });

      dispatch(addToWishlist(item));
      notify();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  } else {
    notifyInfo();
  }
};

export default wishlistSlice.reducer;
