// SliderCard.js
"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Autoplay,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";

import InvestorSlider from "./InvestorSlider";

function InvestorSliderCard() {
  const SliderCardArr = [
    {
      key: 1,
      title: "Company Profile",
      image: "/assets/images/investors/Group5.png",
    },
    {
      key: 2,
      title: "Infrastructure",
      image: "/assets/images/investors/Group6.png",
    },
    {
      key: 3,
      title: "Team",
      image: "/assets/images/investors/Group7.png",
    },
    {
      key: 4,
      title: "Company Profile",
      image: "/assets/images/investors/Group8.png",
    },
    {
      key: 5,
      title: "Infrastructure",
      image: "/assets/images/investors/Group5.png",
    },
    {
      key: 6,
      title: "Team",
      image: "/assets/images/investors/Group6.png",
    },
    {
        key: 7,
        title: "Infrastructure",
        image: "/assets/images/investors/Group7.png",
      },
      {
        key: 8,
        title: "Team",
        image: "/assets/images/investors/Group8.png",
      },
    // Add more items as needed
  ];

  return (
    <>
      <Swiper
        className="my-slider"
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={3}
        loop={true}
        navigation
        // pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log('slide change')}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
      >
        {SliderCardArr.map((val) => (
          <SwiperSlide key={val.key}>
            {/* Use AboutSlider as the content of each slide */}
            <InvestorSlider
              image={val.image}
              title={val.title}
            //   description={val.desc}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default InvestorSliderCard;
