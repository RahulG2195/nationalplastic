import React from "react";
import "./WishlistCard.css";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

const WishlistCard = (props) => {
  const handleMoveToCart = () => {
    props.onAddToCart(
      props.id
      // props.Title,
      // props.Discription,
      // props.Price,
      // props.orignalPrice,
      // props.Discount
      // props.ChairImg
    );
  };
  const Np = "National Plastic";
  const handleOnClick = async () => {
    toast.dismiss(); // Close any existing toast notifications
    toast.dark(
      <div>
        <p>Are you sure you want to delete this item from the wishlist?</p>
        <div className="d-flex justify-content-end">
          <button className="btn btn-danger me-2" onClick={handleDelete}>
            Yes
          </button>
          <button className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
        onClose: () => { }, // Do nothing on close
      }
    );
  };
  const handleDelete = () => {
    try {
      props.onDeleteSuccess(props.id);
      toast.dismiss(); // Close the toast after deletion
    } catch (error) {
      alert("Can't delete");
    }
  };
  const handleCancel = () => {
    toast.dismiss();
  };

  const setid = () => {
    localStorage.setItem("myId", props.id);
  };

  return (
    <div className="wishlist-card">
      <div className="wishlist-image">
        <Link onClick={setid} href={`/ProductDetail/${props.productName}`}>
          <Image
            src={props.WishlistImg}
            className="img-fluid rounded-start"
            alt="Card Image"
            height={100}
            width={100}
            layout="responsive"
            objectFit="cover"
          />
        </Link>
      </div>
      <div className="wishlist-details d-flex justify-content-evenly px-0">
        <div className="wishCptResp">
          <Link onClick={setid} href={`/ProductDetail/${props.productName}`}>
            <h5 className="card-title ProductTitle fw-semibold">
             <span style={{ color: "#CC0008" }}>{Np}</span>{props.productName} ({props.color}) 
            </h5>
          </Link>
          <p className="card-text productSubTitle">{props.producDiscription}</p>
        </div>
        <div className="">
          <div className="price m-1 fw-bold WishpriceRsp">
            <div>₹{props.Price}</div>
            <div className=" text-body-tertiary og_price">
              <del>₹{props.originalPrice}</del>
              <span className="text-danger small">{props.discount}%</span>
            </div>
          </div>
        </div>
        <div className="actions_btn">
          <div className="wishlist-buttons">
            <button
              type="button"
              className="btn btn-danger moveTocartResp ms-1 me-3"
              onClick={handleMoveToCart}
            >
              MOVE TO CART
            </button>
            <button type="button" className="btn" onClick={handleOnClick}>
              <img src="/Assets/svg/Icon core-trash.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
