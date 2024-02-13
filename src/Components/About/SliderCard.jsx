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

import AboutSlider from "./AboutSlider";

function SliderCard() {
  const SliderCardArr = [
    {
      key: 1,
      title: "Company Profile",
      image: "/Assets/images/aboutIcons/business-profile.png",
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.",
    },
    {
      key: 2,
      title: "Infrastructure",
      image: "/Assets/images/aboutIcons/infrastructure.png",
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.",
    },
    {
      key: 3,
      title: "Team",
      image: "/Assets/images/aboutIcons/group-chat.png",
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.",
    },
    {
      key: 4,
      title: "Company Profile",
      image: "/Assets/images/aboutIcons/business-profile.png",
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.",
    },
    {
      key: 5,
      title: "Infrastructure",
      image: "/Assets/images/aboutIcons/infrastructure.png",
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.",
    },
    {
      key: 6,
      title: "Team",
      image: "/Assets/images/aboutIcons/group-chat.png",
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.",
    },
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
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
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
        {SliderCardArr.map((val) => (
          <SwiperSlide key={val.key}>
            {/* Use AboutSlider as the content of each slide */}
            <AboutSlider
              image={val.image}
              title={val.title}
              description={val.desc}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default SliderCard;