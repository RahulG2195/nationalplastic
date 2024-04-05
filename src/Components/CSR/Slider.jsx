"use client";
import "./Slider.css";
import React, { createContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Autoplay,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import "swiper/swiper-bundle.css";

const Slider = () => {
  return (
    <>
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
          //    onSlideChange={() => console.log('slide change')}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {/* Slides go here */}

          <SwiperSlide
            style={{ width: "100%", overflow: "hidden", height: "100%" }}
          >
            <img
              style={{ width: "100%" }}
              src="/Assets/images/CSR-img-2/CSR-img-2.png"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide
            style={{ width: "100%", overflow: "hidden", height: "100%" }}
          >
            <img
              style={{ width: "100%" }}
              src="/Assets/images/CSR-img-2/CSR-img-2.png"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide
            style={{ width: "100%", overflow: "hidden", height: "100%" }}
          >
            <img
              style={{ width: "100%" }}
              src="/Assets/images/CSR-img-2/CSR-img-2.png"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide
            style={{ width: "100%", overflow: "hidden", height: "100%" }}
          >
            <img
              style={{ width: "100%" }}
              src="/Assets/images/CSR-img-2/CSR-img-2.png"
              alt=""
            />
          </SwiperSlide>
        </Swiper>
        <div className=" CSRslider pb-5 ">
          <div>
            <button className="px-3 py-2">View More</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Slider;
