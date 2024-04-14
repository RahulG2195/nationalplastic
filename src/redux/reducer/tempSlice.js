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
    setInitialCount: (state, action) => {
      state.initialCount = action.payload;
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
      console.log(
        "product added before adding" + JSON.stringify(action.payload)
      );
      console.log(" products in states " + JSON.stringify(state.products));

      const isItemInCart = state.products.some(
        (product) => product.product_id === product_id
      );

      console.log("f or t", isItemInCart);

      if (!isItemInCart) {
        state.products.push(action.payload);
        console.log("stateTotalPrice: " + discount_price);
        console.log(
          "stateTotalPrice:---- " + parseFloat(discount_price) * quantity
        );
        console.log("Actionpayload;" + action.payload);
        console.log("state.items;" + state);
        console.log("state.items;" + JSON.stringify(state));
        console.log("State updating ---------------------");

        state.total_price += parseFloat(price) * quantity;
        console.log("State updating ---------------------", state.total_price);

        state.discount_price += parseFloat(discount_price) * quantity;
        // Get the existing array from localStorage
        let existingArray = JSON.parse(localStorage.getItem("temp")) || [];
        // Append the payload to the existing array
        existingArray.push(action.payload);
        // Store the updated array back into localStorage
        localStorage.setItem("temp", JSON.stringify(existingArray));

        console.log("flase or true", from);

        notify("product Added Successfully");
      } else if (from) {
        console.log("NoMahnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn!");
        const existingProduct = state.products.find(
          (product) => product.product_id === product_id
        );
        existingProduct.quantity += quantity;
        state.discount_price += parseFloat(discount_price) * quantity;
        console.log("State updating ---------------------");

        state.total_price += parseFloat(price) * quantity;
        console.log("State updating ---------------------", state.total_price);

        // Update total price
        notify("products Added Successfully");
      }
    },
    removeItemFromCartD: (state, action) => {
      console.log("gggggggggggggggggg");
      console.log("Removing", action.payload);
      console.log("JSON", JSON.stringify(action.payload));
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
  },
});

export const {
  addItemToCartD,
  setInitialCount,
  increaseQuantityD,
  decreaseQuantityD,
  removeItemFromCartD,
} = tempSlice.actions;

export const addToCartD = (item) => async (dispatch, getState) => {
  dispatch(addItemToCartD(item));

  console.log(item, "this are items ");
};
export default tempSlice.reducer;
