'use client'
import Image from "next/image";
import CatCards from "../CommonComp/catCards";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Autoplay,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import "swiper/swiper-bundle.css";

export default function HappyStory() {
  const productArr = [
    {
      key: 1,
      image: "/assets/images/HomepageImages/Image 10.png",
      title: "Lorem Ipsum is simply dummy text",
      short_desc:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,when an unknown printer took a galley.",
      url: "#",
    },
    {
      key: 2,
      image: "/assets/images/HomepageImages/Image 13.png",
      title: "Lorem Ipsum is simply dummy text",
      short_desc:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,when an unknown printer took a galley.",
      url: "#",
    },
    {
      key: 3,
      image: "/assets/images/HomepageImages/Image 12.png",
      title: "Lorem Ipsum is simply dummy text",
      short_desc:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,when an unknown printer took a galley.",
      url: "#",
    },
    {
      key: 4,
      image: "/assets/images/HomepageImages/Image 12.png",
      title: "Lorem Ipsum is simply dummy text",
      short_desc:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,when an unknown printer took a galley.",
      url: "#",
    },
  ];
  return (
    <section className="happy_Story_sec common_section">
      <div className="container">
        <div className="row">
          <div className="section_header mx-auto text-center"data-aos="zoom-in">
            <h2>
              <span>Happy </span> Stories
            </h2>
            <p>Their Words, Our Pride (carousel will be here)</p>
          </div>
          <div className="col-12 products_col">
            <div className="row">
              <Swiper
                className="swipper"
                style={{ width: "100%", height: "100%" }}
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={15}
                slidesPerView={3}
                loop={true}
                navigation
                // pagination={{ clickable: true }}
                // scrollbar={{ draggable: false }}
                // onSwiper={(swiper) => console.log(swiper)}
                // onSlideChange={() => console.log("slide change")}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
              >
                {productArr.map((product) => (
                  // <div key={product.key} className="col-md-4">
                  <SwiperSlide
                    key={product.key}
                    // style={{
                    //   width: "100%",
                    //   overflow: "hidden",
                    //   height: "100%",
                    // }}
                  >
                    <div className="card"data-aos="fade-up">
                      <div className="card-img">
                        <Image
                          src={product.image}
                          alt={product.image}
                          // width={100}
                          // height={100}
                          // layout="responsive"
                          // objectFit="cover"
                          fill
                        />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text">{product.short_desc}</p>
                      </div>
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
