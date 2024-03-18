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
// import PreChairsCard from "../PreChairsCard/PreChairsCard.jsx";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { addToCart } from "@/redux/reducer/cartSlice";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, toast } from "react-toastify";
import { useRef } from "react";

const RecentlyViewed = () => {
  // const RecentlyViewedData = [
  //     { ChairImg: "/Assets/images/New-launches-1/New-launches-1.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
  //     { ChairImg: "/Assets/images/New-launches-2/New-launches-2.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
  //     { ChairImg: "/Assets/images/New-launches-3/New-launches-3.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
  //     { ChairImg: "/Assets/images/New-launches-4/New-launches-4.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
  //     { ChairImg: "/Assets/images/New-launches-1/New-launches-1.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
  //     { ChairImg: "/Assets/images/New-launches-2/New-launches-2.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
  //     { ChairImg: "/Assets/images/New-launches-3/New-launches-3.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
  //     { ChairImg: "/Assets/images/New-launches-4/New-launches-4.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
  // ];

  // const notify = () => {
  //     toast.success('ADDED TO WISHLIST', {
  //       position: "top-center",
  //       autoClose: 2000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "dark",
  //       transition: Bounce,
  //     });
  //   };

  //   const notifyinfo = () => {
  //     // console.log("Toast notification triggered");
  //     toast.info('ALREADY IN WISHLIST', {
  //       position: "top-center",
  //       autoClose: 2000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "dark",
  //       transition: Bounce,
  //     });
  //   };
  const [RecentlyViewedData, setRecentlyViewedData] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [autoplay, setAutoplay] = useState(true);
  const dispatch = useDispatch();
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          "http://13.234.238.29:3001/api/Products"
        );
        const filteredproducts = response.data.products.filter(
          (item) => item.categoryType === "premium chairs"
        );

        setRecentlyViewedData(filteredproducts);
      } catch (error) {
        alert("Error fetching data", error);
      }
    };
    fetchdata();
  }, []);

  const fetchWishlistItems = async () => {
    try {
      const response = await axios.get(
        "http://13.234.238.29:3001/api/Wishlist"
      );
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
      const isProductAlreadyAdded = wishlistItems.some(
        (item) => item.ProductName === product_name
      );
      if (isProductAlreadyAdded) {
        notifyinfo();

        return;
      }

      await axios.post(
        `http://13.234.238.29:3001/api/Wishlist`,
        {
          product_id: product_id,
          ProductName: product_name,
          productDiscription: short_description,
          Price: price,
          originalPrice: discount_price,
          discount: discount,
          WishlistImg: ChairImg,
        }
      );
      notify();
      fetchWishlistItems();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const handleAddToCart = async(product_name, short_description, price, discount_price, discount, ChairImg)
  const handleMoveToCart = (product_id) => {
    // console.log("in handle cart", product_id);
    dispatch(
      addToCart({
        product_id: product_id,
      })
    );
    console.log("this is product id in card ", product_id);
  };

  return (
    <>
      <div className="mt-5">
        <div className="text-center">
          <div className="fs-1 fw-bold text-danger">
            Recently Viewed <span className="darkBlue fw-normal">Products</span>{" "}
          </div>
          <div className="mt-1 subCptRes fw-semibold">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has{" "}
            </p>
            <p>been the industriesstandard dummy text ever since the 1500s,</p>
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
          spaceBetween={50}
          slidesPerView={4}
          navigation
          loop={true}
          // pagination={{ clickable: true }}
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
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
        >
          {/* {RecentlyViewedData.map((chair) => (
            <SwiperSlide key={chair.product_id}>
              <PreChairsCard
                ChairImg={`/Assets/images/New-launches-1/${chair.image_name}`}
                id={chair.product_id}
                Title={chair.product_name}
                Discription={chair.short_description}
                Price={chair.price}
                orignalPrice={chair.discount_price}
                Discount={chair.discount_percentage}
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
              />
            </SwiperSlide>
          ))} */}
        </Swiper>
      </div>
    </>
  );
};
export default RecentlyViewed;
//Commented Prechaircard issue
