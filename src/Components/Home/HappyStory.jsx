"use client";
import Image from "next/image";
import CatCards from "../CommonComp/catCards";
import '../../styles/home_prod.css'

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
      image: "/Assets/images/Home-page/Image 10.png",
      title: "Lorem Ipsum is simply dummy text",
      short_desc:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industriesstandard dummy text ever since the 1500s,when an unknown printer took a galley.",
      url: "#",
    },
    {
      key: 2,
      image: "/Assets/images/Home-page/Image 13.png",
      title: "Lorem Ipsum is simply dummy text",
      short_desc:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industriesstandard dummy text ever since the 1500s,when an unknown printer took a galley.",
      url: "#",
    },
    {
      key: 3,
      image: "/Assets/images/Home-page/Image 12.png",
      title: "Lorem Ipsum is simply dummy text",
      short_desc:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industriesstandard dummy text ever since the 1500s,when an unknown printer took a galley.",
      url: "#",
    },
    {
      key: 4,
      image: "/Assets/images/Home-page/Image 12.png",
      title: "Lorem Ipsum is simply dummy text",
      short_desc:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industriesstandard dummy text ever since the 1500s,when an unknown printer took a galley.",
      url: "#",
    },
  ];
  return (
    <section className="happy_Story_sec common_section">
      <div className="">
        <div className="row">
        <div className="text-center my-5 pt-5">
            <div className="darkBlue fs-1 fw-medium">Happy <span className="fs-1 lh-small fw-bolder text-danger ">Stories</span> </div>
            <div className="mt-1 fw-medium subCptRes w-50"><p>Their Words, Our Pride</p></div>
          </div>
          <div className="col-18 products_col justify-content-center">
            <div className="row ">
              <Swiper
                className="swipper px-5"
                style={{ width: "75%", height: "100%" , overflow: "hidden",}}
                modules={[Navigation, Pagination, Scrollbar, A11y, ]}
                spaceBetween={0}
                slidesPerView={3}
                loop={true}
                navigation={{ clickable: true }}            
                // pagination={{ clickable: true }}
                // scrollbar={{ draggable: false }}
                // onSwiper={(swiper) => console.log(swiper)}
                // onSlideChange={() => console.log("slide change")}

                autoplay={{
                  delay: 2600,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  200: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 0,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 0,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 0,
                  },
                }}
              >
                {productArr.map((product) => (
                  // <div key={product.key} className="col-md-4">
                  <SwiperSlide
                  className="px-3"
                    key={product.key}
                    style={{
                      // width: "100%",
                      overflow: "hidden",
                      // height: "100%",
                    }}
                  >
                    <div className="card rounded-5 w-100 h-100">
                      <div className="card-img rounded-5">
                        <Image
                        className="rounded-top-5"
                          src={product.image}
                          alt={product.image}
                          width={100}
                          height={50}
                          layout="responsive"
                          objectFit="cover"
                          // fill
                        />
                      </div>
                      <div className="card-body rounded-bottom-5 ">
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
