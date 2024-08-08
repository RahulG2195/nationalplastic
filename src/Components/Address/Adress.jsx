import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import "./AddHeader.css";

const AddHeader = () => {
  const path = usePathname();

  return (
    <div className="AddHeader-container">
      <div className="row">
        <div className="ATCflow">
          <Link href="/AddToCart" className={`nav-link ${path === "/AddToCart" ? "highlight" : ""}`}>
              Add to Cart <span> ------- </span>
          </Link>
          <Link href="/Address" className={`nav-link ${path === "/Address" ? "highlight" : ""}`}>
              Address <span> ------- </span>
          </Link>
          <Link href="" className={`nav-link ${path === "/Payment" ? "highlight" : ""}`}>
              Payment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddHeader;
