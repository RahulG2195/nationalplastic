"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./productDetSliderstyles.css";

const ProductDetailSlider = ({ imageurl }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (imageurl) {
      setImages([]); // Clear the images state
      const splitImages = imageurl.split(", ").map((image) => image.trim()) || [
        "default_chair_img.webp",
      ];
      setImages(splitImages);
    } else {
      setImages(["default_chair_img.webp"]); // Set default image if imageurl is not provided
    }
  }, [imageurl]);

  return (
    <>
      {images.length > 1 ? (
        <>
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            loop={true}
            spaceBetween={10}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2 topSliderRes"
          >
            {images.map((imageName) => (
              <SwiperSlide key={imageName}>
                <img
                  src={`/Assets/uploads/products/${imageName}`}
                  alt="Product"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper mt-4"
          >
            {images.map((imageName) => (
              <SwiperSlide key={imageName}>
                <img
                  src={`/Assets/uploads/products/${imageName}`}
                  alt="Product"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : (
        <img src={`/Assets/uploads/products/${images[0]}`} alt="Product" />
      )}
    </>
  );
};

export default ProductDetailSlider;
