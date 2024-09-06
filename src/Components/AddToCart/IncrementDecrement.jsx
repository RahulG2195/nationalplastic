"use client";
import { useState } from "react";
import { increaseQuantity, decreaseQuantity } from "@/redux/reducer/cartSlice";

const IncrementDecrement = ({ initialCount, onIncrement, onDecrement }) => {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
    onIncrement();
  };

  const decrement = () => {
    if (count > 1) {
      setCount(prevCount => prevCount - 1);
      onDecrement();
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Ensure input is a valid number
    console.log("Input" + value);
    if (/^\d*$/.test(value)) {
      setCount(Number(value));
    }
  };

  return (
    <div className="input-group">
      <span className="input-group-text">
        <button onClick={decrement}>-</button>
      </span>

      <input
        type="text"
        value={count}
        className="form-control p-0 text-center"
        aria-label="Amount (to the nearest dollar)"
        onChange={handleInputChange}
      />

      <span className="input-group-text">
        <button onClick={increment}>+</button>
      </span>
    </div>
  );
};

export default IncrementDecrement;
