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
          <Link href="/addtocart" className={`nav-link ${path === "/addtocart" ? "highlight" : ""}`}>
              Add to Cart <span> ------- </span>
          </Link>
          <Link href="/address" className={`nav-link ${path === "/address" ? "highlight" : ""}`}>
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
