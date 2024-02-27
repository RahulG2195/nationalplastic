// reducers/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, toast } from 'react-toastify';

const notify = () => {
  // console.log("Toast notification triggered");
  toast.success('ADDED TO CART', {
    position: "top-center",
    autoClose: 5000,
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
  // console.log("Toast notification triggered");
  toast.info('ALREADY IN CART', {
    position: "top-center",
    autoClose: 5000,
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
  name: 'cart',
  initialState: {
    items: [],
    initialCount: 1,
  },


  reducers: {
    setInitialCount: (state, action) => {
      state.initialCount = action.payload;
    },

    addItemToCart: (state, action) => {
      const { product_id } = action.payload;
      const isItemInCart = state.items.some(item => item.product_id === product_id);
      if (!isItemInCart) {
        state.items.push(action.payload);
        // alert("Added");
      } else {
        // console.log(initialState)
        // console.log("suggested ONe"+state)
        // console.log("counter "+initialState.initialCount)
        // console.log("suggested two"+state.initialCount)
        // console.log("increasing count", initialState.initialCount);
      }
    },

    removeItemFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { addItemToCart, setInitialCount } = cartSlice.actions;

export const addToCart = (item) => async (dispatch, getState) => {
  const { initialCount, items } = getState().cart; // Access state through the second parameter

  const check = await axios.get('http://localhost:3000/api/Cart');
  const isCartEmpty = !check.data.products || check.data.products.length === 0;
  const isAlreadyInCart = !isCartEmpty && check.data.products.some(cartItem => cartItem.product_id === item.product_id);


if (isCartEmpty || !isAlreadyInCart) {
  try {
    const response = await axios.post('http://localhost:3000/api/Cart', item);
    dispatch(addItemToCart(item));
    console.log(item, "this are items ");
    notify();
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
  } else {
    // alert("nono");
    notifyinfo();
    dispatch(setInitialCount(initialCount + 1)); // Dispatching the setInitialCount action with the updated count
    console.log(initialCount);
  }
};

export default cartSlice.reducer;
