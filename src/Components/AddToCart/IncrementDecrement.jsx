"use client";
import { useState } from "react";

const IncrementDecrement = ({ initialCount }) => {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="input-group">
      <span className="input-group-text">
        <button onClick={decrement}>-</button>{" "}
      </span>

      <input
        type="text"
        value={count}
        className="form-control"
        aria-label="Amount (to the nearest dollar)"
        readOnly
      />

      <span className="input-group-text">
        <button onClick={increment}>+</button>
      </span>
    </div>
  );
};

export default IncrementDecrement;
