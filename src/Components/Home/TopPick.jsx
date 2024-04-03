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
  console.log("here are categories", hometoppics);
  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get("http://localhost:3000/api/Category");
      console.log("response of the category ", response.data.categories);
      const filteredData = response.data.categories.filter(
        (item) =>
          item.category_id === 15 ||
          item.category_id === 13 ||
          item.category_id === 18
      );
      console.log(response);

      setHometoppics(filteredData);
    };
    fetchdata();
  }, []);

  // const sendCategory = (productName) => {
  //   localStorage.setItem("category", productName);
  // };

  return (
    <section className="top_pick_sec common_section">
      <div className="container">
        <div className="row">
          <div className="text-center mb-5 ">
            <div className="fs-1 fw-bold text-danger">
              Top Picks <span className="darkBlue fw-normal">For You</span>{" "}
            </div>
            <div className="mt-1 fw-medium subCptRes w-50">
              <p>
                ILorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industrys
                standard dummy text ever since the 1500s,
              </p>
            </div>
          </div>
          <div className="col-12 px-5 products_col mt-4">
            <div className="row">
              <Swiper
                className="swipper"
                style={{ width: "100%", height: "100%" }}
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={15}
                // slidesPerView={3}
                loop={true}
                // navigation
                pagination={{ clickable: true }}
                // scrollbar={{ draggable: false }}
                // onSwiper={(swiper) => console.log(swiper)}
                // onSlideChange={() => console.log("slide change")}
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
                {hometoppics.map((product) => (
                  <div className="col-md-4" key={product.key}>
                    <SwiperSlide key={product.category_id}>
                      <CatCards
                        hovereffect={"TopPickHover"}
                        catid={product.category_id}
                        image={`/Assets/images/Home-page/${product.image_name}`}
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
