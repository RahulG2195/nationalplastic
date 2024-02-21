"use client"
import React, { useEffect, useState } from "react";
import PreChairsCard from "../preChairsCard/preChairsCard";
import './PreChairCard.css'
import axios from "axios";
import { DotLoader } from "react-spinners";
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, toast } from 'react-toastify';




const PreChairsCards = () => {
  const notify = () => {
    // console.log("Toast notification triggered");
    toast.success('ADDED TO WISHLIST', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
};

const notifyinfo = () => {
  // console.log("Toast notification triggered");
  toast.info('ALREADY IN WISHLIST', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });
};
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    fetchData();
    fetchWishlistItems(); // Fetch wishlist items when the component mounts
  }, []);


  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/Products");
      const filteredData = response.data.products.filter(item => item.categoryType === "premium chairs");

      setProducts(filteredData);
      setIsLoading(false);
    } catch (error) {
      alert("Error fetching data", error)
    }
  };



  const fetchWishlistItems = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/Wishlist");
      setWishlistItems(response.data.Wishlist);
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
    }
  };



  const handleAddToWishlist = async (product_name, short_description, price, discount_price, discount, ChairImg) => {
    try {
      const isProductAlreadyAdded = wishlistItems.some(item => item.ProductName === product_name);
      if (isProductAlreadyAdded) {
        // alert("This product is already in your wishlist.");
        notifyinfo();

        return;
      }

      await axios.post(`http://localhost:3000/api/Wishlist`, {
        ProductName: product_name,
        productDiscription: short_description,
        Price: price,
        originalPrice: discount_price,
        discount: discount,
        WishlistImg: ChairImg
      });
      notify();
      fetchWishlistItems();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (

    <div className="container mt-5">
      {isLoading ? (
        <center className="spinner">
          <DotLoader color={"#36D7B7"} loading={isLoading} />
        </center >
      ) : (
        <div className="row ">
          {products.map((product) => (
            <div key={product.product_id} className="PreCardSm col-6 col-sm-6 col-xs-4 col-md-6 col-lg-3">
              <PreChairsCard
                ChairImg={`/Assets/images/New-launches-1/${product.image_name}`}
                id={product.product_id}
                Title={product.product_name}
                Discription={product.short_description}
                Price={product.price}
                orignalPrice={product.discount_price}
                Discount={product.discount_percentage}
                onaddToWishlist={() => handleAddToWishlist
                  (
                    product.product_name,
                    product.short_description,
                    product.price,
                    product.discount_price,
                    product.discount_percentage,
                    product.image_name
                  )
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PreChairsCards;
