"use client";
import { useState } from "react";

const IncrementDecrement = () => {
  const [Number, setNum] = useState(0);

  const incNum = () => {
    setNum(Number + 1);
  };

  const decNum = () => {
    setNum(Number - 1);
  };
  return (
    <>
      <div class="input-group">
        {/* Increment Decrement start */}
        {/* <IncrementDecrement/> */}

        <span class="input-group-text">
          <button onClick={decNum}>-</button>{" "}
        </span>

        <input
          type="text"
          value={Number}
          class="form-control"
          aria-label="Amount (to the nearest dollar)"
          readonly
        />

        <span class="input-group-text">
          <button onClick={incNum}> +</button>
        </span>

        {/* Increment Decrement end */}
      </div>
    </>
  );
};
export default IncrementDecrement;
