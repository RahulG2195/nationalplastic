"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Autoplay,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import "swiper/swiper-bundle.css";
import PreChairsCard from "@/Components/preChairsCard/preChairsCard.jsx";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { addToCart } from "@/redux/reducer/cartSlice";
import { addToCartD } from "@/redux/reducer/tempSlice";

import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, toast } from "react-toastify";
import { useRef } from "react";
import { addItemToWishlist } from "@/redux/reducer/wishlistSlice";
import { isLoggedIn } from "@/utils/validation";
import { useRouter } from "next/navigation";
import { notify , notifyError } from "@/utils/notify";

const RecentlyViewed = ({id}) => {
  const [RecentlyViewedData, setRecentlyViewedData] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [autoplay, setAutoplay] = useState(true);
  const dispatch = useDispatch();
  const swiperRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const idToBeCompared = Number(localStorage.getItem('product_id'));
    const local_id = Number(localStorage.getItem('category_id'));
    const fetchdata = async () => {
      try {
        const searchedProducts = JSON.parse(localStorage.getItem('searchedProducts') || '[]');
        
        if (searchedProducts.length > 0) {
          const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/Search`, { 
            productNames: searchedProducts 
          });
          let products = response.data.products;

          if (products.length < 6) {
          const res = await axios.patch(`${process.env.NEXT_PUBLIC_URL}/api/ProductsCat`, {
            category_id: local_id
           });
          const cat_based_products = res.data.products;
            const additionalProducts = cat_based_products;
            
            const newProducts = additionalProducts.filter(product => 
              !products.some(p => p.product_id === product.product_id)
            );

            products = [...products, ...newProducts];

          }
  
          setRecentlyViewedData(products);
        } 
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    
    fetchdata();
  }, []);

  const fetchWishlistItems = async () => {
    try {
      const userDataString = localStorage.getItem("userData");
      const userData = JSON.parse(userDataString);
      const customerId = userData.customer_id;

      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/wishListUser`, {
        customer_id: customerId,
      });
      setWishlistItems(response.data.Wishlist);
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
    }
  };

  const handleAddToWishlist = async (
    product_id,
    product_name,
    short_description,
    price,
    discount_price,
    discount,
    ChairImg
  ) => {
    try {
      const isLoggedInResult = await isLoggedIn();
      if (!isLoggedInResult) {
      notifyError("Login to add to WISHLIST")
        router.push("/Login");
      } else {
        dispatch(
          addItemToWishlist({
            product_id: product_id,
          })
        );
        fetchWishlistItems();
      }
    } catch (error) {
      notifyError("Already in WISHLIST")
      console.error("Error:", error);
    }
  };
  const fetchPrice = async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/ProductsCat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id: id }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch product data");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching product data:", error);
      throw error;
    }
  };

  const handleMoveToCart = async (product_id) => {
    const isLoggedInResult = await isLoggedIn();
    const data = await fetchPrice(product_id);
    const price = data.price;
    const discount_price = data.discount_price;
    switch (isLoggedInResult) {
      case false:
        dispatch(
          addToCartD({
            product_id,
            price,
            discount_price,
            quantity: typeof quantity !== "undefined" ? quantity : 1,
          })
        );
        break;
      case true:
        dispatch(
          addToCart({
            product_id: product_id,
            price: price,
            discount_price: discount_price,
            quantity: 1,
          })
        );
        break;
      default:
        console.warn(
          "Unexpected login state. Please handle appropriately.",
          isLoggedInResult
        );
    }
  };
  if (RecentlyViewedData.length === 0) {
    return null; // Don't render anything if there's no data
  }
  return (
    <>
      <div className="mt-5">
        <div className="text-center">
          <div className="fs-1 fw-bold text-danger">
            Recently Viewed <span className="darkBlue fw-normal">Products</span>{" "}
          </div>
          <div className="mt-1 subCptRes fw-semibold">
            {/* <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has{" "}
            </p>
            <p>been the industriesstandard dummy text ever since the 1500s,</p> */}
          </div>
        </div>
      </div>

      <div
        className="container my-5"
        onMouseEnter={() => setAutoplay(false)}
        onMouseLeave={() => setAutoplay(true)}
      >
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={15}
          slidesPerView={4}
          navigation
          loop={true}
          autoplay={autoplay ? { delay: 4000 } : false}
          breakpoints={{
            425: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            200: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 15,
            },
          }}
        >
          {RecentlyViewedData.map((chair) => {
            const images = chair.image_name ? chair.image_name.split(', ').map(image => image.trim()) : [];
           return <SwiperSlide key={chair.product_id} className="newProdCard">
              <PreChairsCard
                ChairImg={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}${images[0]}`}
                id={chair.seo_url}
                Title={chair.product_name}
                Price={chair.price}
                orignalPrice={chair.discount_price}
                Discount={chair.discount_percentage}
                Color={chair.color}
                onaddToWishlist={() =>
                  handleAddToWishlist(
                    chair.product_id,
                    chair.product_name,
                    chair.short_description,
                    chair.price,
                    chair.discount_price,
                    chair.discount_percentage,
                    chair.image_name
                  )
                }
                onAddToCart={() => handleMoveToCart(chair.product_id)}
                recentClass="reventHoverView"
              />
            </SwiperSlide>
          })}
        </Swiper>
      </div>
    </>
  );
};
export default RecentlyViewed;
