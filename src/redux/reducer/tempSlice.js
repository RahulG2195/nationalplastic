import { createSlice } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";
import { notify, notifyError } from "@/utils/notify.js";

export const tempSlice = createSlice({
  name: "temp",
  initialState: {
    products: [],
    total_price: 0, 
    discount_price: 0, 
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
      const isItemInCart = state.products.some(
          (product) => product.product_id === product_id
      );
  
      if (!isItemInCart) {
          state.products.push(action.payload);
  
          state.total_price += parseFloat(price) * quantity;
          state.discount_price += parseFloat(discount_price) * quantity;
          let existingArray = JSON.parse(localStorage.getItem("temp")) || [];
          existingArray.push(action.payload);
          localStorage.setItem("temp", JSON.stringify(existingArray));
  
          notify("Product Added Successfully");
      } else {
          const existingProduct = state.products.find(
              (product) => product.product_id === product_id && product.color === color
          );
  
          if (existingProduct) {
              existingProduct.quantity += quantity;
              state.discount_price += parseFloat(discount_price) * quantity;
              state.total_price += parseFloat(price) * quantity;
  
              notify("Product Quantity Updated Successfully");
          } else {
              state.products.push(action.payload);
              state.total_price += parseFloat(price) * quantity;
              state.discount_price += parseFloat(discount_price) * quantity;
              let existingArray = JSON.parse(localStorage.getItem("temp")) || [];
              existingArray.push(action.payload);
              localStorage.setItem("temp", JSON.stringify(existingArray));
  
              notify("Product Added Successfully");
          }
      }
  },
    removeItemFromCartD: (state, action) => {
      const { product_id } = action.payload;
      const existingProductIndex = state.products.findIndex(
        (product) => product.product_id === product_id
      );

      if (existingProductIndex !== -1) {
        const existingProduct = state.products[existingProductIndex];
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
        localStorage.setItem("products", JSON.stringify(newState.products));
        return newState;
      }
      return state;
    },
    increaseQuantityD: (state, action) => {
      const { product_id } = action.payload;
      const existingProduct = state.products.find(
        (product) => product.product_id === product_id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
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
        existingProduct.quantity -= 1;
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
