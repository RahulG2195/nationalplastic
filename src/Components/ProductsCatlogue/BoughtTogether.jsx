"use client";
import TogetherCard from "../BoughtTogetherCards/TogetherCard";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch } from "react-redux";
import {
  Navigation,
  Autoplay,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import "swiper/swiper-bundle.css";
import Image from "next/image";
import axios from "axios";
import PreChairsCard from "../preChairsCard/preChairsCard";
import { useParams } from "next/navigation";
import { Bounce, toast } from "react-toastify";
import { isLoggedIn } from "@/utils/validation";
import { useRouter } from "next/navigation";
import { addToCart } from "@/redux/reducer/cartSlice";
import { addToCartD } from "@/redux/reducer/tempSlice";

import { addItemToWishlist } from "@/redux/reducer/wishlistSlice";

const BoughtTogether = () => {
  const router = useParams();
  const cat_id = router.productCatId;
  const route = useRouter();

  const dispatch = useDispatch();


  const [togetherCardsData, setTogetherCardsData] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/Products`
        );
        setTogetherCardsData(response.data.frequent);
      } catch (error) {
        alert("error");
      }
    };
    fetchdata();
  }, []);

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
            quantity: 1,
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

  const handleAddToWishlist = async (product_id) => {
    const isLoggedInResult = await isLoggedIn();
    if (!isLoggedInResult) {
      notify();
      route.push("/Login");
    } else {
      dispatch(
        addItemToWishlist({
          product_id: product_id,
        })
      );
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
  return (
    <>
      <div className="mt-5">
        <div className="text-center">
          <div className="fs-1 fw-bold text-danger">
            Frequently Bought
            <span className="darkBlue fw-normal">Together</span>
          </div>
          <div className="mt-1 fw-semibold subCptRes">
            <p>
              Explore popular product combinations that customers often purchase together.
            </p>
            <p>Find curated bundles to enhance your shopping experience.</p>
          </div>
        </div>

      </div>

      <div className="container my-5">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={50}
          slidesPerView={3}
          // navigation
          loop={true}
          // pagination={{ clickable: true }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
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
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
        >
          {togetherCardsData?.map((card) => {
            const images = card.image_name ? card.image_name.split(', ').map(image => image.trim()) : [];
            return <SwiperSlide key={card.product_id} className="newProdCard">
              <PreChairsCard
                ChairImg={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}${images[0]}`}
                id={card.seo_url}
                Title={card.product_name}
                Discription={card.short_description}
                Price={card.price}
                orignalPrice={card.discount_price}
                Color={card.color}
                Discount={card.discount_percentage}
                onaddToWishlist={() =>
                  handleAddToWishlist(card.product_id)
                }
                onAddToCart={() => handleMoveToCart(card.product_id)}
              />
            </SwiperSlide>
          })}
        </Swiper>
      </div>

      {/* <div className="mt-md-5 mt-2">
        <Image
          className="mt-md-5 mt-2"
          src={"/Assets/images/CTA-banner-1.jpg-V2/CTA-banner-1.jpg-V2.png"}
          width={100}
          height={80}
          layout="responsive"
          objectFit="cover"
          alt="Picture of the author"
        />
      </div> */}
    </>
  );
};

export default BoughtTogether;
