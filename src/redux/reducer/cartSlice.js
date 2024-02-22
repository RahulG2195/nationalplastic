// reducers/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },

  reducers: {
    // addItemToCart: (state, action) => {
      // const { product_id } = action.payload;
      // const isItemInCart = state.items.some(item => item.product_id === product_id);
      // if (isItemInCart) {
      //   alert("Already in Cart");
      // } else {
      //   state.items.push(action.payload);
      //   alert("Added")
      // }
    // },
    
    
    removeItemFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { addItemToCart } = cartSlice.actions;

export const addToCart = (item) => async (dispatch) => {
  const ispresent = () => {
    if (condition) {
      
    }


  }
    try {
      const response = await axios.post('http://localhost:3000/api/Cart', item);
      dispatch(addItemToCart(item)); 
      // console.log("here is data",data);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
};
  

// export const removeFromCart = (id) => async (dispatch) => {
//   try {
//     await axios.delete(`/api/cart/remove/${id}`);
//     dispatch(removeItemFromCart(id));
//   } catch (error) {
//     console.error('Error removing from cart:', error);
//   }
// };

export default cartSlice.reducer;
