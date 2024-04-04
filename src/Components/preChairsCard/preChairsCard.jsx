"use client";
import Link from "next/link";
import "./PreChairsCard.css";
import { useEffect, useState } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import axios from "axios";

const PreChairsCard = (props) => {
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const userDataString = localStorage.getItem("userData");
        const userData = JSON.parse(userDataString);
        const customerId = userData.customer_id;

        const response = await axios.post(
          "http://localhost:3000//api/wishListUser",
          {
            customer_id: customerId,
          }
        );
        const wishlistItems = response.data.products.map(
          (product) => product.product_id
        );
        const isInWishlist = wishlistItems.includes(props.id);
        setInWishlist(isInWishlist);
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
      }
    };
    fetchWishlistItems();
  }, [props.id, inWishlist]);

  // const setid = () => {
  //   localStorage.setItem("myId", props.id);
  // };

  const handleAddToCart = () => {
    props.onAddToCart(props.id);
  };

  const handleAddWishlist = () => {
    props.onaddToWishlist(props.id);
    setInWishlist(true);
  };

  return (
    <>
      <div
        className={`preCont cards mt-3 position-relative  my-4 ${
          props.recentClass ? props.recentClass : ""
        }`}
      >
        <Link href={`/ProductDetail/${props.id}`}>
          {/* <Link href={`/ProductDetail?id=${props.id}`}> */}

          <div className="card-header">
            <img src={props.ChairImg} className="card-img-top" alt="..." />
          </div>
        </Link>
        <div className="card-body">
          <div className="PreFoot pt-2 ">
            <div className="class d-flex flex-wrap justify-content-between py-2 ">
              <Link href={`/ProductDetail/${props.id}`}>
                <div className="left fw-bold text-danger one-line-ellipsis">
                  {props.Title}
                </div>
              </Link>
              <div className="right">
                <i onClick={handleAddToCart}>
                  {" "}
                  <ShoppingCartOutlinedIcon />{" "}
                </i>
                <i
                  onClick={handleAddWishlist}
                  className={` ${
                    inWishlist ? "fa fa-heart" : "fa fa-heart-o ms-3"
                  }`}
                  style={
                    inWishlist ? { fontSize: "20px", color: "#DC3545" } : {}
                  }
                  aria-hidden="true"
                ></i>
              </div>
            </div>
            {/* show disc only when its available  */}
            {props.Discription && (
              <div className="text-left fw-medium my-2 DESCresp one-line-ellipsis1">
                {props.Discription}
              </div>
            )}

            <div className="rs d-flex flex-wrap  justify-content-between align-items-center ">
              <div className="d-flex gap-2 align-items-center">
                <div>
                  {" "}
                  <i
                    className="medium fa fa-inr fw-bold priceResp"
                    aria-hidden="true"
                  ></i>{" "}
                </div>
                <div className="medium fw-bold priceResp">{props.Price}</div>
                <div className="small text-secondary text text-decoration-line-through">
                  {props.orignalPrice}
                </div>
              </div>
              <div className="d-flex flex-wrap fw-semibold text-danger ">
                <div>{props.Discount}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PreChairsCard;
