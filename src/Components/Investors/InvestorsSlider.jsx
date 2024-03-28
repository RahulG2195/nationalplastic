// SliderCard.js
"use client";
import React from "react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './InvestorsSliderCard.css'


import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import InvestorSliderCard from "./InvestorSliderCard";
import { Hidden } from "@mui/material";


function InvestorsSlider() {
  const SliderCardArr = [
    {
      key: 1,
      title: "Financials",
      image: "/Assets/svg/Group 829/Group 829.png",
    },
    {
      key: 2,
      title: "Shareholding Pattern",
      image: "/Assets/svg/Group 830/Group 830.png",
    },
    {
      key: 3,
      title: "Corporate Governance",
      image: "/Assets/svg/Group 831/Group 831.png",
    },
    {
      key: 4,
      title: "Investor Contact ",
      image: "/Assets/svg/Group 832/Group 832.png",
    },
    {
      key: 5,
      title: "AGM Compliance",
      image: "/Assets/svg/Group 833/Group 833.png",
    },
    {
      key: 6,
      title: "Transfer Of Share Notice",
      image: "/Assets/svg/Group 834/Group 834.png",
    },
    {
      key: 7,
      title: "Outcome Of Board Meeting",
      image: "/Assets/svg/Group 835/Group 835.png",
    },
    {
      key: 8,
      title: "Listing Disclosure",
      image: "/Assets/svg/Group 836/Group 836.png",
    },
  ];

  return (
    <>
      <div className="investor-swiper mt-0">

        <Swiper
          className="h-80 w-80 mx-5 "
          modules={[Navigation, A11y,]}
          spaceBetween={0 }
          slidesPerView={3}
          navigation
          loop={true}
          // autoplay={{
          //   delay: 2500,
          //   disableOnInteraction: false,
          // }}
          breakpoints={{

            425: {
              slidesPerView: 2,
              spaceBetween: 0,
            },
            200: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 0,
            },
            600: {
              slidesPerView: 3,
              spaceBetween: 0,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 0,
            },
          }}

        >

          {SliderCardArr.map((val) => (
            <SwiperSlide key={val.key} >
              {/* Use AboutSlider as the content of each slide */}
              <InvestorSliderCard
                bgimage={val.image}
                title={val.title}
                srlImage={val.srlImage}
                key={val.key}
                isEven={val.key % 2 === 0}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default InvestorsSlider;
