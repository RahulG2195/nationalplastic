"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
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
  const defaultImage = "default_chair_img.webp";
  const swiperElRef = useRef(null);

  useEffect(() => {
    try {
      if (imageurl) {
        console.log("Processing imageurl:", imageurl);
        const splitImages = imageurl.split(",").map((image) => image.trim()).filter(Boolean);
        if (splitImages.length === 0) {
          console.warn("No valid images found in imageurl. Using default image.");
          setImages([defaultImage]);
        } else {
          console.log("Processed images:", splitImages);
          setImages(splitImages);
        }
      } else {
        console.log("No imageurl provided. Using default image.");
        setImages([defaultImage]);
      }
    } catch (error) {
      console.error("Error processing imageurl:", error);
      setImages([defaultImage]);
    }
  }, [imageurl]);

  const handleImageError = (error) => {
    console.warn(`Failed to load image:`, error);
    setImages((prevImages) => prevImages.map(img => img === error.target.src.split('/').pop() ? defaultImage : img));
  };

  useEffect(() => {
    // Initialize Swiper only after images are loaded
    if (images.length > 0 && swiperElRef.current) {
      const swiperInstance = swiperElRef.current.swiper;
      if (swiperInstance) {
        swiperInstance.update();
      }
    }
  }, [images]);

  if (images.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {images.length > 1 ? (
        <>
          <Swiper
            ref={swiperElRef}
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2 topSliderRes"
            onInit={() => console.log("Main Swiper initialized")}
            onError={(error) => console.error("Main Swiper error:", error)}
          >
            {images.map((imageName, index) => (
              <SwiperSlide key={`${imageName}-${index}`}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}${imageName}`}
                  alt={`Product ${index + 1}`}
                  width={500}
                  height={500}
                  onError={handleImageError}
                  layout="responsive"
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
            onInit={() => console.log("Thumbs Swiper initialized")}
            onError={(error) => console.error("Thumbs Swiper error:", error)}
          >
            {images.map((imageName, index) => (
              <SwiperSlide key={`thumb-${imageName}-${index}`}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}${imageName}`}
                  alt={`Product Thumbnail ${index + 1}`}
                  width={100}
                  height={100}
                  onError={handleImageError}
                  layout="responsive"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : (
        <Image
          src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}${images[0]}`}
          alt="Product"
          width={500}
          height={500}
          onError={handleImageError}
          layout="responsive"
        />
      )}
    </>
  );
};

export default ProductDetailSlider;