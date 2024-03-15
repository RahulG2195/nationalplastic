import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    totalprice: 99,
  },
  reducers: {
    increment: (state, actions) => {
      console.log(actions.payload);
      console.log(actions.type);
      console.log(actions.meta);

      state.value++;
    },
    decrement: (state) => {
      state.value--;
    },
  },
});
const calc = () => {};
export const priceCalculator = async (data) => {
  console.log(
    "----------------------------PC------1------------------------------"
  );
  try {
    console.log("data:", JSON.stringify(data));
    const res = await axios.put(
      `https://65f3c3d8ec00e6036ff3d2eb--incandescent-sfogliatella-3ba504.netlify.app/api/Users`,
      data
    );
    console.log(
      "----------------------------PC------2------------------------------"
    );
    console.log(res);
    console.log("FROM pricecalculator" + JSON.stringify(res.data));
    console.log(res);

    return res.data; // Change this line
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

export default counterSlice.reducer;
export const { increment, decrement } = counterSlice.actions;
