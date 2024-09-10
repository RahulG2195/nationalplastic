"use client";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Autoplay,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import "swiper/swiper-bundle.css";
export default function Dealers() {
  const DealerArr = [
    {
      key: 1,
      image: "/Assets/images/Home-page/Others Cities Icons-01.png",
      title: "Ahmedabad",
      url: "#",
    },
    {
      key: 2,
      image: "/Assets/images/Home-page/Others Cities Icons-02.png",
      title: "Bangalore",
      url: "#",
    },
    {
      key: 3,
      image: "/Assets/images/Home-page/Others Cities Icons-03.png",
      title: "Jaipur",
      url: "#",
    },
    {
      key: 4,
      image: "/Assets/images/Home-page/Others Cities Icons-04.png",
      title: "Kolkata",
      url: "#",
    },
    {
      key: 5,
      image: "/Assets/images/Home-page/Others Cities Icons-05.png",
      title: "Mumbai",
      url: "#",
    },
    {
      key: 6,
      image: "/Assets/images/Home-page/Others Cities Icons-06.png",
      title: "Chennai",
      url: "#",
    },
    {
      key: 7,
      image: "/Assets/images/Home-page/Others Cities Icons-07.png",
      title: "Delhi",
      url: "#",
    },
    {
      key: 8,
      image: "/Assets/images/Home-page/Others Cities Icons-09.png",
      title: "Hyderabad",
      url: "#",
    },
  ];
  return (
    <section className="dealer_Sec common_section">
      <div className="container">
        <div className="row">
          <div className="section_header mx-auto text-center">
            <h2>
              <span>National Plastic </span> Dealers
            </h2>
            <p>We deliver quality products across multiple states.</p>
            <br />
          </div>
          <div className="col-12 view_all_sec">
            <Link href="#" className="my-3">
              <h6>View All</h6>
            </Link>
          </div>
          <div className="col-12 products_col">
            <div className="row">
              <Swiper
                className="swipper"
                style={{ width: "100%", height: "100%" }}
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={10}
                slidesPerView={6}
                loop={true}
              
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  200: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  640: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 5,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 6,
                    spaceBetween: 50,
                  },
                }}
              >
                {DealerArr.map((dealer) => (
                  <SwiperSlide
                    key={dealer.key}
                    style={{
                      width: "100%",
                      overflow: "hidden",
                      height: "100%",
                    }}
                  >
                    <div className="dealer_cont">
                      <div className="dealer_imgs">
                        <Image
                          src={dealer.image}
                          alt={dealer.image}
                          // width={100}
                          // height={100}
                          // layout="responsive"
                          // objectFit="cover"
                          fill
                        />
                      </div>
                      <p>{dealer.title}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
