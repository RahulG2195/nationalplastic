"use client";
import Link from "next/link";
import "./PreChairsCard.css";
import { useEffect, useState } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import axios from "axios";

const PreChairsCard = (props) => {
  const [inWishlist, setInWishlist] = useState(false);

  const handleAddToCart = () => {
    props.onAddToCart(props.id);
  };

  const handleAddWishlist = () => {
    props.onaddToWishlist(props.id);
    setInWishlist(true);
  };
const Np = "National Plastic";
  return (
    <>
      <div className={`card preCont mt-3 position-relative  my-4 ${props.recentClass ? props.recentClass : "" }`}>
        <div className="image-container">
          <div className="first">
            <div className="d-flex justify-content-between align-items-center">
              <span className="discount">25%</span>
              <span className="wishlist">
                <i
                  onClick={handleAddWishlist}
                  className={` ${inWishlist ? "fa fa-heart" : "fa fa-heart-o"
                    }`}
                  style={
                    inWishlist ? { fontSize: "20px", color: "#DC3545" } : {}
                  }
                  aria-hidden="true"
                ></i>
                {/* <i className="fa fa-heart-o" /> */}
              </span>
            </div>
          </div>
          <Link href={`/ProductDetail/${props.id}`}>
            <img
              src={props.ChairImg}
              className="img-fluid rounded thumbnail-image"
            />
          </Link>
        </div>

        <div className="product-detail-container p-2">
          <div className="align-items-center">
            <Link href={`/ProductDetail/${props.id}`} className="">
              <h5 className="dress-name"><span>{Np}</span> {props.Title}</h5>
            </Link>
            <div className="d-md-flex flex-column mb-2">

              <span className="new-price pr-2 pr-md-0">₹{props.Price}</span>
              <small className="old-price text-right"><del>₹{props.orignalPrice}</del></small>
            </div>
          </div>
          {/* <div className="d-flex justify-content-between align-items-center pt-1">
            <div className="color-select d-flex ">
              <input type="button" name="grey" className="btn creme" />
              <input type="button" name="red" className="btn red ml-2" />
              <input type="button" name="blue" className="btn blue ml-2" />
            </div>
          </div> */}
          <div className="d-flex justify-content-between align-items-center pt-1">
            <div>

              <i className="fa fa-star-o rating-star" />
              <span className="rating-number">4.8</span>
            </div>
            <span className="buy">
              <i onClick={handleAddToCart} className="shoppingCartIcon">
                <ShoppingCartOutlinedIcon />
              </i>
            </span>
          </div>

        </div>
      </div>
    </>
  );
};
export default PreChairsCard;
