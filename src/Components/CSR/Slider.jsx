"use client";
import React, { useEffect, useState } from "react";
import "./Slider.css";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Autoplay,
  Pagination,
  A11y,
} from "swiper/modules";
import "swiper/swiper-bundle.css";
import axios from "axios";

const Slider = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/news_media', { params: { id: 2 } });
        const { images } = response.data.newsMedia[0];

        setImages(images ? images.split(',') : []);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="Slider_container position-relative mb-5">
      <Swiper
        className="mt-5 swipper my-swiper overflow-hidden"
        style={{ width: "60%", height: "" }}
        modules={[Navigation, Pagination, Autoplay, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {images.map((img, index) => (
          <SwiperSlide
            key={index}
            style={{ width: "100%", overflow: "hidden", height: "100%" }}
          >
            <img
              style={{ width: "100%" }}
              src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_UPLOAD_PATH_DIR}${img}`}
              alt={`slide-${index}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="CSRslider pb-5">
        <div>
          <button className="px-3 py-2">View More</button>
        </div>
      </div>
    </div>
  );
};

export default Slider;
