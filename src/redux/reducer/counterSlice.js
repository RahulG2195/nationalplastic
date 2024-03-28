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
export const priceCalculator = async(data) => {
    console.log(
        "----------------------------PC------1------------------------------"
    );
    try {
        console.log("data:", JSON.stringify(data));
        const res = await axios.put(`http://13.234.238.29:3000/api/Users`, data);
        console.log(
            "----------------------------PC------2------------------------------"
        );
        console.log(res);
        console.log("FROM pricecalculator" + JSON.stringify(res.data));
        console.log(res);

        return res.data; // Change this line
    } catch (error) {
        toast.error(error ? .response ? .data ? .message);
    }
};

export default counterSlice.reducer;
export const { increment, decrement } = counterSlice.actions;