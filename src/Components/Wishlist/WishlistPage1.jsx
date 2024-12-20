"use client";
import "./Wishlist.css";
import WishlistCard from "../WishlistCard/WishlistCard";
import FooterRow from "../FooterRow/FooterRow";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart} from "../../redux/reducer/cartSlice.js";


const WishlistPage1 = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    const userData = JSON.parse(userDataString) || {};
    const customerId = userData.customer_id || {};
    const fetchData = async () => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/wishListUser`, {
          customer_id: customerId,
        });
        
        const wishlistData = response.data.products.map((item) => {
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
      const userDataString = localStorage.getItem("userData");
      const userData = JSON.parse(userDataString);
      const customerId = userData.customer_id;
      const formData = new FormData();
      formData.append("customer_id", customerId);
      formData.append("product_id", product_id);
      for (const entry of formData.entries()) {
      }
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/wishListUser`, {
        data: formData,
      });

      setWishlistItems((prevItems) =>
        prevItems.filter((item) => item.product_id !== product_id)
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddToCart = (productId, price, discount_price) => {
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
          <div className="table-wishlist">
            {wishlistItems.length > 0 ? (
              wishlistItems.map((item) => {
                const images = item ? item.image_name.split(', ').map(image => image.trim()) : [];
                return <WishlistCard
                  key={item.product_id}
                  id={item.product_id}
                  WishlistImg={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}${images[0]}`}
                  productName={item.product_name}
                  producDiscription={item.short_description}
                  Price={item.price}
                  color={item.color}
                  originalPrice={item.discount_price}
                  discount={item.discount_percentage}
                  onDeleteSuccess={() => handleDeleteSuccess(item.product_id)}
                  onAddToCart={() =>
                    handleAddToCart(
                      item.product_id,
                      item.price,
                      item.discount_price
                    )
                  }
                />
            })
            ) : (
              <h4 className="text-secondary text-center mx-auto">
                Wishlist is empty{" "}
              </h4>
            )}
          </div>
        </div>
      </div>
      <FooterRow />
    </div>
  );
};

export default WishlistPage1;
