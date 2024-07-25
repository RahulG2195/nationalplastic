import Link from "next/link";
import React, { useEffect } from "react";

const Breadcrump = ({ category_id, category_name, product_name, catlogue }) => {
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link href={`/ProductCatlogue/${category_id}`}>
              {category_name || catlogue || "Product Catelgoue"}
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product_name || "Product"}
          </li>
        </ol>
      </nav>
    </>
  );
};

export default Breadcrump;
