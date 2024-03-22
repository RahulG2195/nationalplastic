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
    removeItemFromCart: async (state, action) => {
      const { product_id } = action.payload;
      const userDataString = localStorage.getItem("userData");
      const userData = JSON.parse(userDataString);
      const customer_id = userData.customer_id;
      const response = await axios.delete(
        "http://localhost:3000/api/UserCart",
        {
          customer_id: customer_id,
          product_id: product_id,
        }
      );
      console.log("Delete Response " + JSON.stringify(response));
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

      // Find the existing product in the cart
      const existingProductIndex = state.products.findIndex(
        (product) => product.product_id === product_id
      );

      if (existingProductIndex !== -1) {
        const existingProduct = state.products[existingProductIndex];

        console.log("Its should be coming anyways " + existingProduct.quantity);
        console.log(
          "Its should be coming anyways " + JSON.stringify(existingProduct)
        );

        // Create a new product object with updated quantity
        const updatedProduct = {
          ...existingProduct, // Spread operator to copy existing product properties
          quantity: existingProduct.quantity + 1,
        };

        // Update the state with the new product object
        const newState = {
          ...state,
          products: [
            ...state.products.slice(0, existingProductIndex),
            updatedProduct,
            ...state.products.slice(existingProductIndex + 1),
          ],
          total_price: state.total_price + parseFloat(existingProduct.price),
          discount_price:
            state.discount_price + parseFloat(existingProduct.discount_price),
        };

        // Update localStorage (assuming you're using it for persistence)
        localStorage.setItem("products", JSON.stringify(newState.products));
        const userDataString = localStorage.getItem("userData");
        const userData = JSON.parse(userDataString);
        const customerId = userData.customer_id;
        const response = axios.patch("http://localhost:3000/api/UserCart", {
          customer_id: customerId,
          product_id: product_id,
          quantity: 1,
        });

        // Return the new state (assuming you're using a state management library)
        return newState;
      }

      // Handle the case where the product is not found
      return state;
    },
    decreaseQuantity: (state, action) => {
      const { product_id } = action.payload;

      // Find the existing product in the cart
      const existingProductIndex = state.products.findIndex(
        (product) => product.product_id === product_id
      );

      if (existingProductIndex !== -1) {
        const existingProduct = state.products[existingProductIndex];

        // Check if quantity is already 0, avoid negative quantities
        if (existingProduct.quantity === 0) {
          // Notify user about minimum quantity reached (optional)
          // notifyError('Minimum quantity reached');
          return state;
        }

        const updatedProduct = {
          ...existingProduct,
          quantity: existingProduct.quantity - 1,
        };

        // Update the state with the new product object
        const newState = {
          ...state,
          products: [
            ...state.products.slice(0, existingProductIndex),
            updatedProduct,
            ...state.products.slice(existingProductIndex + 1),
          ],
          total_price: state.total_price - parseFloat(existingProduct.price),
          discount_price:
            state.discount_price - parseFloat(existingProduct.discount_price),
        };

        // Update localStorage (assuming you're using it for persistence)
        localStorage.setItem("products", JSON.stringify(newState.products));
        const userDataString = localStorage.getItem("userData");
        const userData = JSON.parse(userDataString);
        const customerId = userData.customer_id;
        const response = axios.patch("http://localhost:3000/api/UserCart", {
          customer_id: customerId,
          product_id: product_id,
          quantity: -1,
        });

        // Return the new state (assuming you're using a state management library)
        return newState;
      }

      // Handle the case where the product is not found
      return state;
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
  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString);
  const customerId = userData.customer_id;
  const response = await axios.put("http://localhost:3000/api/UserCart", {
    customer_id: customerId,
    product_id: item.product_id,
  });
  console.log("response From slicer" + response.status);
  console.log("response From slicer" + response.data);
  console.log("response From slicer" + response.body);
  notify();
  dispatch(addItemToCart(item));
};

export default cartSlice.reducer;
