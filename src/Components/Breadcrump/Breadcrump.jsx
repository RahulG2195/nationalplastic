import Link from "next/link";
import React from "react";

const Breadcrump = () => {
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/ProductCatlogue">Product</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Products Detail
          </li>
        </ol>
      </nav>
    </>
  );
};

export default Breadcrump;
