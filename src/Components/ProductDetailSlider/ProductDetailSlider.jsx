"use client";
import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    if (imageurl) {
      const splitImages = imageurl.split(",").map((image) => image.trim()).filter(Boolean);
      setImages(splitImages.length > 0 ? splitImages : [defaultImage]);
    } else {
      setImages([defaultImage]);
    }
  }, [imageurl]);

  const getImageUrl = (imageName) => {
    return `${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}${imageName}`;
  };

  const handleImageError = (event) => {
    event.target.src = getImageUrl(defaultImage);
  };

  if (images.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {images.length > 1 ? (
        <>
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2 topSliderRes"
          >
            {images.map((imageName, index) => (
              <SwiperSlide key={`${imageName}-${index}`}>
                <Image
                  src={getImageUrl(imageName)}
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
          >
            {images.map((imageName, index) => (
              <SwiperSlide key={`thumb-${imageName}-${index}`}>
                <Image
                  src={getImageUrl(imageName)}
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
          src={getImageUrl(images[0])}
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