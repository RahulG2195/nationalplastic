"use client";
import "./Wishlist.css";
import WishlistCard from "../WishlistCard/WishlistCard";
import FooterRow from "../FooterRow/FooterRow";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/reducer/cartSlice";

const WishlistPage1 = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://13.234.238.29:3002/api/Wishlist"
        );
        // const wishlistData = response.data.products;
        const wishlistData = response.data.products.map((item) => {
          // Calculate discount percentage
          const discountPercentage =
            item.discount_price && item.price
              ? Math.floor(
                  ((item.discount_price - item.price) / item.discount_price) *
                    100
                )
              : 0;
          return {
            ...item,
            discount_percentage: discountPercentage,
          };
        });

        setWishlistItems(wishlistData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteSuccess = async (product_id) => {
    try {
      const response = await axios.delete(
        `http://13.234.238.29:3002/api/Wishlist`,
        { data: { product_id } }
      );
      setWishlistItems((prevItems) =>
        prevItems.filter((item) => item.product_id !== product_id)
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddToCart = (productId, price, discount_price) => {
    // Dispatch addToCart action to add item to cart
    dispatch(
      addToCart({
        product_id: productId,
        price: price,
        discount_price: discount_price,
        quantity: 1,
      })
    );
  };

  return (
    <div className="main_container">
      <div className="d-flex justify-content-center">
        <div className="WCcontainer border-0">
          <h4 className="p-4 fw-bold">Wishlist</h4>
          <div className="center">
            {wishlistItems.length === 0 ? (
              <h2 className="text-secondary">No products in </h2>
            ) : (
              wishlistItems.map(
                (item) => (
                  console.log("here is item", item),
                  (
                    <WishlistCard
                      key={item.product_id}
                      id={item.product_id}
                      WishlistImg={`/Assets/images/New-launches-1/${item.image_name}`}
                      productName={item.product_name}
                      producDiscription={item.short_description}
                      Price={item.price}
                      originalPrice={item.discount_price}
                      discount={item.discount_percentage}
                      onDeleteSuccess={() =>
                        handleDeleteSuccess(item.product_id)
                      }
                      onAddToCart={() =>
                        handleAddToCart(
                          item.product_id,
                          item.price,
                          item.discount_price
                        )
                      }
                    />
                  )
                )
              )
            )}
          </div>
        </div>
      </div>
      <FooterRow />
    </div>
  );
};

export default WishlistPage1;
