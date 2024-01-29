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
      image: "/assets/images/aboutIcons/business-profile.png",
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.",
    },
    {
      key: 2,
      title: "Infrastructure",
      image: "/assets/images/aboutIcons/infrastructure.png",
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.",
    },
    {
      key: 3,
      title: "Team",
      image: "/assets/images/aboutIcons/group-chat.png",
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.",
    },
    {
      key: 4,
      title: "Company Profile",
      image: "/assets/images/aboutIcons/business-profile.png",
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.",
    },
    {
      key: 5,
      title: "Infrastructure",
      image: "/assets/images/aboutIcons/infrastructure.png",
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.",
    },
    {
      key: 6,
      title: "Team",
      image: "/assets/images/aboutIcons/group-chat.png",
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.",
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
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
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
