"use client";
import CatCards from "../CommonComp/catCards";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Autoplay,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
export default function TopPick() {
  // const productArr = [
  //   {
  //     key: 1,
  //     image: "/Assets/images/Home-page/1st-section-kids-chair.jpg",
  //     title: "Event Chairs",
  //     url: "#",
  //   },
  //   {
  //     key: 2,
  //     image: "/Assets/images/Home-page/1st-section-kids-chair.jpg",
  //     title: "Premium Chairs",
  //     url: "#",
  //   },
  //   {
  //     key: 3,
  //     image: "/Assets/images/Home-page/1st-section-kids-chair.jpg",
  //     title: "Kids Chairs",
  //     url: "#",
  //   },
  // ];

  const [hometoppics, setHometoppics] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/Category`
      );
      const filteredData = response.data.topPick

      setHometoppics(filteredData);
    };
    fetchdata();
  }, []);



  return (
    <section className="top_pick_sec common_section">
      <div className="container">
        <div className="row">
          <div className="text-center mb-md-5 mb-2">
            <div className="fs-1 fw-bold text-danger">
              Top Picks <span className="darkBlue fw-normal">For You</span>{" "}
            </div>
            <div className="mt-1 fw-medium subCptRes w-50">
              <p>
                  Explore our top picks featuring the Premium Chair Collection, offering Quality, Comfort, and Style all in one place!
              </p>
            </div>
          </div>
          <div className="col-12 px-md-5 products_col mt-4">
            <div className="row">
              <Swiper
                className="swipper"
                style={{ width: "100%", height: "100%" }}
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={15}
                loop={true}
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
                    pagination: { clickable: true }
                  },
                }}
              >
                {hometoppics.map((product) => (
                  <div className="col-md-4" key={product.key}>
                    <SwiperSlide key={product.category_id}>
                      <CatCards
                        hovereffect={"TopPickHover"}
                        catid={product.seo_url}
                        image={`${process.env.NEXTAUTH_URL}${process.env.PRODUCTS_PATH_DIR}${product.image_name}`}
                        title={product.category_name}
                        url={product.url}
                      />
                    </SwiperSlide>
                  </div>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
