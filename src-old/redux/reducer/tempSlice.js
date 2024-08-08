// reducers/tempSlice.js
import { createSlice } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";
import { notify, notifyError } from "@/utils/notify.js";

export const tempSlice = createSlice({
  name: "temp",
  initialState: {
    products: [], // Initially empty array for products
    total_price: 0, //price after discount and calculation
    discount_price: 0, //original price
  },

  reducers: {
    setInitialCountD: (state, action) => {
      return { ...tempSlice.initialState };
    },

    addItemToCartD: (state, action) => {
      const {
          product_id,
          quantity,
          price,
          discount_price,
          color = "Gold",
          from = true,
      } = action.payload;
  
      // Check if the item with the same product_id is already in the cart
      const isItemInCart = state.products.some(
          (product) => product.product_id === product_id
      );
  
      if (!isItemInCart) {
          // If the item with the product_id is not in the cart, add it as a new product
          state.products.push(action.payload);
  
          state.total_price += parseFloat(price) * quantity;
          state.discount_price += parseFloat(discount_price) * quantity;
  
          // Get the existing array from localStorage
          let existingArray = JSON.parse(localStorage.getItem("temp")) || [];
          // Append the payload to the existing array
          existingArray.push(action.payload);
          // Store the updated array back into localStorage
          localStorage.setItem("temp", JSON.stringify(existingArray));
  
          notify("Product Added Successfully");
      } else {
          // If the item with the same product_id is in the cart, check by color
          const existingProduct = state.products.find(
              (product) => product.product_id === product_id && product.color === color
          );
  
          if (existingProduct) {
              // If the item with the same product_id and color is found, update the quantity
              existingProduct.quantity += quantity;
              state.discount_price += parseFloat(discount_price) * quantity;
              state.total_price += parseFloat(price) * quantity;
  
              notify("Product Quantity Updated Successfully");
          } else {
              // If the item with the same product_id but different color is found, add it as a new product
              state.products.push(action.payload);
  
              state.total_price += parseFloat(price) * quantity;
              state.discount_price += parseFloat(discount_price) * quantity;
  
              // Get the existing array from localStorage
              let existingArray = JSON.parse(localStorage.getItem("temp")) || [];
              // Append the payload to the existing array
              existingArray.push(action.payload);
              // Store the updated array back into localStorage
              localStorage.setItem("temp", JSON.stringify(existingArray));
  
              notify("Product Added Successfully");
          }
      }
  },
    removeItemFromCartD: (state, action) => {
      const { product_id } = action.payload;

      // Find the existing product in the cart
      const existingProductIndex = state.products.findIndex(
        (product) => product.product_id === product_id
      );

      if (existingProductIndex !== -1) {
        const existingProduct = state.products[existingProductIndex];

        // Create a new state without the product
        const newState = {
          ...state,
          products: [
            ...state.products.slice(0, existingProductIndex),
            ...state.products.slice(existingProductIndex + 1),
          ],
          total_price:
            state.total_price -
            parseFloat(existingProduct.price) * existingProduct.quantity,
          discount_price:
            state.discount_price -
            parseFloat(existingProduct.discount_price) *
              existingProduct.quantity,
        };

        // Update localStorage (assuming you're using it for persistence)
        localStorage.setItem("products", JSON.stringify(newState.products));

        // Return the new state (assuming you're using a state management library)
        return newState;
      }

      // Handle the case where the product is not found
      return state;
    },
    increaseQuantityD: (state, action) => {
      const { product_id } = action.payload;
      const existingProduct = state.products.find(
        (product) => product.product_id === product_id
      );
      if (existingProduct) {
        // If product exists, increase its quantity
        existingProduct.quantity += 1;
        // Update total__price if necessary
        state.total_price += parseFloat(existingProduct.price);

        state.discount_price += parseFloat(existingProduct.discount_price);

        localStorage.setItem("temp", JSON.stringify(state.products));
      }
    },
    decreaseQuantityD: (state, action) => {
      const { product_id } = action.payload;
      const existingProduct = state.products.find(
        (product) => product.product_id === product_id
      );
      if (existingProduct) {
        // If product exists, increase its quantity
        existingProduct.quantity -= 1;
        // Update total__price if necessary
        state.total_price -= parseFloat(existingProduct.price);

        state.discount_price -= parseFloat(existingProduct.discount_price);

        localStorage.setItem("temp", JSON.stringify(state.products));
      }
    },
    emptyTempSlice: (state, action) => {
      state.products = [];
      state.total_price = 0;
      state.discount_price = 0;

      localStorage.removeItem("temp");

      // notify("Cart Emptied Successfully");
    },
  },
});

export const {
  addItemToCartD,
  setInitialCountD,
  increaseQuantityD,
  decreaseQuantityD,
  removeItemFromCartD,
  emptyTempSlice,
} = tempSlice.actions;

export const addToCartD = (item) => async (dispatch, getState) => {
  dispatch(addItemToCartD(item));
};
export default tempSlice.reducer;
