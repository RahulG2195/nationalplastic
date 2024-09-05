"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import ReactImageMagnify from 'react-image-magnify';

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

  return (
    <div className="product-detail-slider">
      {images.length > 1 ? (
        <>
          <div className="main-image-container">
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
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: `Product ${index + 1}`,
                        isFluidWidth: true,
                        src: getImageUrl(imageName),
                      },
                      largeImage: {
                        src: getImageUrl(imageName),
                        width: 1200, // Ensure this matches the actual large image size
                        height: 1800, // Ensure this matches the actual large image size
                      },
                      lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' },
                      enlargedImageContainerStyle: { zIndex: 10 },
                      enlargedImagePosition: 'over'
                    }}
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
              className="mySwiper mt-5"
            >
              {images.map((imageName, index) => (
                <SwiperSlide key={`thumb-${imageName}-${index}`}>
                  <Image
                    src={getImageUrl(imageName)}
                    alt={`Product Thumbnail ${index + 1}`}
                    width={100}
                    height={100}
                    layout="responsive"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      ) : (
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: 'Product Image',
              isFluidWidth: true,
              src: getImageUrl(images[0]),
            },
            largeImage: {
              src: getImageUrl(images[0]),
              width: 1200, // Ensure this matches the actual large image size
              height: 1800, // Ensure this matches the actual large image size
            },
            lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' },
            enlargedImageContainerStyle: { zIndex: 10 },
            enlargedImagePosition: 'over'
          }}
        />
      )}
    </div>
  );
};

export default ProductDetailSlider;
