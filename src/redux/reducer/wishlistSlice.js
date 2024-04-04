import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, toast } from "react-toastify";

const notify = () => {
    toast.success("added to wishlist", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
    });
};

const notifyInfo = () => {
    toast.info("already in wishlist", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
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
            console.log("want to add this in wish", newItem.product_id);

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

export const addItemToWishlist = (item) => async(dispatch, getState) => {
    // console.log("ininininin")

    const { items } = getState().wishlist; // Access state through tshe second parameter

    const userDataString = localStorage.getItem("userData");
    const userData = JSON.parse(userDataString);
    const customerId = userData.customer_id;
    console.log("Customer Id: " + customerId);
    const check = await axios.post("http://localhost:3000/api/wishListUser", {
        customer_id: customerId,
    });

    const isWishlistEmpty = !check.data.products || check.data.products.length === 0;
    const isItemAlreadyAdded = !isWishlistEmpty &&
        check.data.products.some(
            (cartItem) => cartItem.product_id == item.product_id
        );

    console.log("i want to post ");
    if (isWishlistEmpty || !isItemAlreadyAdded) {
        try {
            const response = await axios.put(
                "http://localhost:3000/api/wishListUser", {
                    customer_id: customerId,
                    product_id: item.product_id,
                }
            );
            console.log("response from slicer of wishslist: " + response);
            console.log("response from slicer of wishlist: " + response.data);
            console.log("response from slicer of wishlist: " + response.message);
            console.log("response from slicer of wishlist: " + response.status);

            dispatch(addToWishlist(item));
            // console.log(item, "this are items ");
            notify();
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    } else {
        notifyInfo();
    }
};

export default wishlistSlice.reducer;