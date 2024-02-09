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
      image: "/Assets/images/investors/Card-bg-img.png",
    },
    {
      key: 2,
      title: "Shareholding Pattern",
      image: "/Assets/images/investors/Card-bg-img.png",
    },
    {
      key: 3,
      title: "Corporate Governance",
      image: "/Assets/images/investors/Card-bg-img.png",
    },
    {
      key: 4,
      title: "Investor Contact ",
      image: "/Assets/images/investors/Card-bg-img.png",
    },
    {
      key: 5,
      title: "AGM Compliance",
      image: "/Assets/images/investors/Card-bg-img.png",
    },
    {
      key: 6,
      title: "Transfer Of Share Notice",
      image: "/Assets/images/investors/Card-bg-img.png",
    },
    {
      key: 7,
      title: "Outcome Of Board Meeting",
      image: "/Assets/images/investors/Card-bg-img.png",
    },
    {
      key: 8,
      title: "Listing Disclosure",
      image: "/Assets/images/investors/Card-bg-img.png",
    },
  ];

  return (
    <>
      <div className="investor-swiper">

        <Swiper
          className="h-80 w-80  "
          modules={[Navigation, A11y,]}
          spaceBetween={50}
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



          {SliderCardArr.map((val) => (
            <SwiperSlide key={val.key}>
              {/* Use AboutSlider as the content of each slide */}
              <InvestorSliderCard
                bgimage={val.image}
                title={val.title}
                srlImage={val.srlImage}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default InvestorsSlider;
