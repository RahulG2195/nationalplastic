// reducers/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, toast } from "react-toastify";

const notify = () => {
  toast.success("ADDED TO CART", {
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

const notifyinfo = () => {
  toast.info("ALREADY IN CART", {
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

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [], // Initially empty array for products
    total_price: 0,
  },

  reducers: {
    setInitialCount: (state, action) => {
      state.initialCount = action.payload;
    },

    addItemToCart: (state, action) => {
      console.log(
        "state:-----------------NopeNOtHereWhenAddedFromWishLisT " + state
      );
      console.log("action: " + action);
      console.log("state: " + JSON.stringify(state));
      console.log("actionPayload: " + JSON.stringify(action.payload));
      console.log("actiion: " + JSON.stringify(action));

      const { product_id, quantity, price } = action.payload;
      console.log("product added successfully before adding" + action.payload);
      console.log(
        "product added successfully before adding" +
          JSON.stringify(state.products)
      );

      const isItemInCart = state.products.some(
        (product) => product.product_id === product_id
      );
      if (!isItemInCart) {
        state.products.push(action.payload);
        console.log("Actionpayload);" + action.payload);
        console.log("state.items);" + state.product);
        state.total_price += parseFloat(price) * quantity;
        localStorage.setItem("products", JSON.stringify(action.payload));

        // alert("Added");
      } else {
        const existingProduct = state.products.find(
          (product) => product.product_id === product_id
        );
        existingProduct.quantity += quantity;
        state.total_price += parseFloat(price) * quantity; // Update total price
      }
    },

    removeItemFromCart: (state, action) => {
      const { product_id } = action.payload;

      // Find the index of the product to be removed
      const productIndex = state.products.findIndex(
        (product) => product.product_id === product_id
      );

      if (productIndex !== -1) {
        const removedProduct = state.products[productIndex];
        const updatedProducts = [...state.products];

        // Remove the product from the cart
        updatedProducts.splice(productIndex, 1);

        // Update total_price
        state.total_price -= parseFloat(
          removedProduct.price * removedProduct.quantity
        );

        // Update state with the new products array
        state.products = updatedProducts;

        // Update localStorage
        localStorage.setItem("products", JSON.stringify(state.products));
      }
    },
    // state.total_price -= parseFloat(product.price);
    increaseQuantity: (state, action) => {
      const { product_id } = action.payload;
      console.log("increase quantit" + product_id);
      // Find the existing product in the cart
      const existingProduct = state.products.find(
        (product) => product.product_id === product_id
      );
      if (existingProduct) {
        console.log("Its should be coming anyways " + existingProduct.quantity);
        console.log(
          "Its should be coming anyways " + JSON.stringify(existingProduct)
        );
        // If product exists, increase its quantity
        existingProduct.quantity += 1;
        console.log("After Updates " + JSON.stringify(state.products));
        console.log(
          "After Updates  " + JSON.stringify(existingProduct.quantity)
        );
        // Update total_price if necessary
        state.total_price += parseFloat(existingProduct.price);
        // Notify user about the increase
        // notifyinfo(); // Call info notification
        localStorage.setItem("products", JSON.stringify(state.products));
      }
    },
    decreaseQuantity: (state, action) => {
      const { product_id } = action.payload;
      console.log("increase quantit" + product_id);
      // Find the existing product in the cart
      const existingProduct = state.products.find(
        (product) => product.product_id === product_id
      );
      if (existingProduct) {
        console.log("Its should be coming anyways " + existingProduct.quantity);
        console.log(
          "Its should be coming anyways " + JSON.stringify(existingProduct)
        );
        // If product exists, increase its quantity
        existingProduct.quantity -= 1;
        console.log("After Updates " + JSON.stringify(state.products));
        console.log(
          "After Updates  " + JSON.stringify(existingProduct.quantity)
        );
        // Update total_price if necessary
        state.total_price -= parseFloat(existingProduct.price);
        // Notify user about the increase
        // notifyinfo(); // Call info notification
        localStorage.setItem("products", JSON.stringify(state.products));
      }
    },
  },
});

export const {
  addItemToCart,
  setInitialCount,
  increaseQuantity,
  decreaseQuantity,
  removeItemFromCart,
} = cartSlice.actions;

export const addToCart = (item) => async (dispatch, getState) => {
  const { initialCount, items } = getState().wishlist; // Access state through the second parameter

  const check = await axios.get("http://localhost:3000/api/Cart");
  const isCartEmpty = !check.data.products || check.data.products.length === 0;
  const isAlreadyInCart =
    !isCartEmpty &&
    check.data.products.some(
      (cartItem) => cartItem.product_id == item.product_id
    );

  if (isCartEmpty || !isAlreadyInCart) {
    try {
      const response = await axios.post("http://localhost:3000/api/Cart", item);
      dispatch(addItemToCart(item));

      // console.log(item, "this are items ");
      // notify();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  } else {
    notifyinfo();

    dispatch(increaseQuantity(initialCount + 1)); // Dispatching the setInitialCount action with the updated count
    console.log(initialCount);
  }
};

export default cartSlice.reducer;
