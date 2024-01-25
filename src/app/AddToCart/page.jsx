'use client'
import Image from "next/image";
import "../../styles/addtocart.css";
const { main } = require("@popperjs/core");
import CartProduct from "@/Components/AddToCart/CartProduct";
import PriceDetailsCard from "@/Components/PriceDetails/PriceDetailsCard";
import FooterRow from "@/Components/FooterRow/FooterRow";
import React, { useState } from "react";

function AddToCart() {
// const [inputArr, setInputArr]= useState ([ProductDetailArr]);


  const ProductDetailArr = [
    {
      key: 1,
      image1: "/assets/images/AddTOCart/product-Chairs.png",
      productName: "Lorem ipsum dolor sit amet",
      productPrice: "10000",
      discountedPrice: "7000",
      productDesc: "Lorem ipsum dolor sit amet, consetetur",
    },
    {
      key: 2,
      image1: "/assets/images/AddTOCart/product-Chairs.png",
      productName: "Lorem ipsum dolor sit amet 2",
      productPrice: "1000",
      discountedPrice: "700",
      productDesc: "Lorem ipsum dolor sit amet, consetetur2",
    },
  ];
  return (
    <>
      {/* <h1>THis is Add To Cart</h1> */}
      <div className="row">
        <div className="ATCflow">
          <p>
            Add to Cart <span> ---------- </span>
          </p>
          <p>
            Address <span> ----------- </span>
          </p>
          <p> Payment</p>
        </div>
      </div>
      <div className="container cartView">
        <div className="row">
          <div className="col-md-8">
            <div className="row my-cart">
              <div className="col-md-4">
                <h5>My Cart (0)</h5>
              </div>
              <div className="col-md-8 search-pin">
                <div className="LocationIconPin">
                  <div className="locationIcon">
                    <div className="iconImage">
                      <Image
                        src="/assets/images/AddTOCart/Icon-location.png"
                        classname="img-fluid d-block w-3"
                        alt="ome banner 1"
                        width={100}
                        height={80}
                        // layout="responsive"
                        // objectFit="cover"
                      />
                    </div>
                    <p>Deliver To</p>
                  </div>
                  <div className="locationPin">
                    <div class="input-group mb-3">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Your Pin code"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                      />
                      <div class="input-group-append">
                        <button>Check Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr/>

              <div className="container">
                {ProductDetailArr.map((val) => (
                  <div className="row" key={val.key}>
                    <CartProduct
                      src={val.image1}
                      productName={val.productName}
                      productPrice={val.productPrice}
                      discountedPrice={val.discountedPrice}
                      productDesc={val.productDesc}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-md-4 place-order">
            <PriceDetailsCard/>
          </div>
        </div>
      </div>

      <FooterRow/>
    </>
  );
}
export default AddToCart;
