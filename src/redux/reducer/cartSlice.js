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
    total_price: 0, //price after discount and calculation
    discount_price: 0, //original price
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
      console.log(
        "actionPayload inside additemtocart: " + JSON.stringify(action.payload)
      );
      console.log("actiion: " + JSON.stringify(action));

      const { product_id, quantity, price, discount_price } = action.payload;
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
        console.log("stateTotalPrice: " + discount_price);
        console.log(
          "stateTotalPrice:---- " + parseFloat(discount_price) * quantity
        );
        console.log("Actionpayload;" + action.payload);
        console.log("state.items;" + state.product);
        state.total_price += parseFloat(price) * quantity;
        state.discount_price += parseFloat(discount_price) * quantity;
        localStorage.setItem("products", JSON.stringify(action.payload));

        // alert("Added");
      } else {
        console.log("NoMahnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn!");
        const existingProduct = state.products.find(
          (product) => product.product_id === product_id
        );
        existingProduct.quantity += quantity;
        state.discount_price += parseFloat(discount_price) * quantity;
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
        state.discount_price -= parseFloat(
          removedProduct.discount_price * removedProduct.quantity
        );

        // Update state with the new products array
        state.products = updatedProducts;

        // Update localStorage
        localStorage.setItem("products", JSON.stringify(state.products));
      }
    },
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
        // Update total__price if necessary
        state.total_price += parseFloat(existingProduct.price);
        state.discount_price += parseFloat(existingProduct.discount_price);

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
        // Update total__price if necessary
        state.total_price -= parseFloat(existingProduct.price);
        state.discount_price -= parseFloat(existingProduct.discount_price);
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
  console.log("addToCart" + JSON.stringify(item));
  console.log("addToCart" + JSON.stringify(item));
  const check = await axios.get(
    "https://65f3c3d8ec00e6036ff3d2eb--incandescent-sfogliatella-3ba504.netlify.app/api/Cart"
  );
  const isCartEmpty = !check.data.products || check.data.products.length === 0;
  const isAlreadyInCart =
    !isCartEmpty &&
    check.data.products.some(
      (cartItem) => cartItem.product_id == item.product_id
    );

  if (isCartEmpty || !isAlreadyInCart) {
    try {
      const response = await axios.post(
        "https://65f3c3d8ec00e6036ff3d2eb--incandescent-sfogliatella-3ba504.netlify.app/api/Cart",
        item
      );
      console.log("response From slicer" + response.status);
      console.log("response From slicer" + response.data);
      console.log("response From slicer" + response.body);

      notify();

      dispatch(addItemToCart(item));

      // console.log(item, "this are items ");
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
