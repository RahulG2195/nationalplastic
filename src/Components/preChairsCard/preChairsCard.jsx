"use client";
import Link from "next/link";
import "./PreChairsCard.css";
import { useEffect, useState } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import axios from "axios";
import { notify , notifyError} from "@/utils/notify";
import GetQuoteForm from "@/Components/BulkOrder/GetQuoteForm.jsx";
import numberWithCommas from '@/utils/formatnumber';
import Image from "next/image";

const PreChairsCard = (props) => {
  const [inWishlist, setInWishlist] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleAddToCart = () => {
    props.onAddToCart(props.id);
  };
  const handleGetQuote = () => {
    if (props.showGetQuote) {
      // notify(props.Title)
      handleImageClick(props.Title);
      // setSelectedImage(props.product_name);

    }
  };
  const handleImageClick = (imageName) => {
    // Split the selectedImage string into an array of image names
    const selectedImages = selectedImage ? selectedImage.split(",") : [];

    // Check if the new image is already present in the array
    if (!selectedImages.includes(imageName)) {
      // If not present, append the new image name
      setSelectedImage((prevSelectedImage) =>
        prevSelectedImage ? `${prevSelectedImage},${imageName}` : imageName
      );
    } else {
      // Handle the case where the image is already selected (optional)
      notifyError("Already Added to Form");
    }
  };

  const handleAddWishlist = () => {
    props.onaddToWishlist(props.id);
    setInWishlist(true);
  };
  const Np = "National Plastic";
  return (
    <>
      <div className={`card preCont mt-3 position-relative  my-4 ${props.recentClass ? props.recentClass : ""}`}>
        <div className="image-container">
          <div className="first">
            <div className="d-flex justify-content-between align-items-center">
              {/* {!props.showGetQuote && (<span className="discount">{props.Discount}%</span>)} */}
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
          <Link href={`/product-detail/${props.id}`}>
            <Image 
            src={props.ChairImg} 
            className="img-fluid rounded thumbnail-image"
            height={100}
            width={100}
            layout="responsive"
            objectFit="cover"/>
          </Link>
        </div>

        <div className="product-detail-container p-2 pb-2">
          <div className="align-items-center">
            <Link href={`/product-detail/${props.id}`} className="">
            <h5 className="dress-name"><span>{Np}</span> {props.Title} <span className="text-black">({props.Color})</span></h5>
            </Link>
            <div className="d-md-flex flex-column ">
              {props.showGetQuote && (
                <button onClick={handleGetQuote} className="getQouteButton my-3 border-0 rounded shadow text-white fw-bold px-3 py-2">
                  Get Quote
                </button>
              )}
              {props.Price && (
                <>
                  <span className="new-price pr-2 pr-md-0">₹{numberWithCommas(props.Price)}</span>
                  {props.orignalPrice && (
                    <small className="old-price text-right"><del style={{paddingLeft:"5px", fontSize:"14px"}}>₹{numberWithCommas(props.orignalPrice)}</del></small>
                  )}
                </>
              )}
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
           {!props.showGetQuote && ( <div>

              <i className="fa fa-star-o rating-star" style={{color:'gold '}} />
              <span className="rating-number">4.8</span>
            </div>)}
            {!props.showGetQuote && (<span className="buy">
              <i onClick={handleAddToCart} className="shoppingCartIcon text-black">
                <ShoppingCartOutlinedIcon />
              </i>
            </span>)}
          </div>
          {props.showGetQuote && (
            <div className="invisible-component"><GetQuoteForm product={selectedImage} /></div>
          )}
        </div>
      </div>
    </>
  );
};
export default PreChairsCard;
