"use client";
import Link from "next/link";
import CatCards from "../CommonComp/catCards";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Autoplay,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Manufacture() {
  const productArr = [
    {
      key: 1,
      image: "/Assets/images/Home-page/Chair.png",
      title: "Seatings",
      url: "#",
      style: "shop-room",
    },
    {
      key: 2,
      image: "/Assets/images/Home-page/Chair.png",
      title: "Tables",
      url: "#",
      style: "shop-room",
    },
    {
      key: 3,
      image: "/Assets/images/Home-page/Chair.png",
      title: "Storage",
      url: "#",
      style: "shop-room",
    },
    {
      key: 4,
      image: "/Assets/images/Home-page/Chair.png",
      title: "Sets",
      url: "#",
      style: "shop-room",
    },
    {
      key: 5,
      image: "/Assets/images/Home-page/Chair.png",
      title: "Stools",
      url: "#",
      style: "shop-room",
    },
    {
      key: 6,
      image: "/Assets/images/Home-page/Chair.png",
      title: "Kids Chair",
      url: "#",
      style: "shop-room",
    },
  ];

  const [Household, setHousehold] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get(
        "http://13.234.238.29:3000/api/Products"
      );
      const filteredData = response.data.products.filter(
        (item) => item.categoryType === "home_top_pics"
      );
      console.log(response);

      setHousehold(filteredData);
    };
    fetchdata();
  }, []);
  return (
    <section className="shop_room_sec common_section manufacturer_common_section ">
      <div className="container ">
        <div className="row">
        <div className="text-center mb-5 ">
            <div className="fs-1 lh-small fw-bolder text-danger ">Indias Largest Manufacturer <p className="darkBlue fs-1 fw-medium">Of Household Products</p> </div>
            <div className="mt-1 fw-medium subCptRes w-50"><p>ILorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,
            </p>
            </div>
          </div>
          <div className="col-12 products_col">
            <div className="row">
              <Swiper
                className="swipper"
                style={{ width: "100%", height: "100%" }}
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={15}
                // slidesPerView={3}
                loop={true}
                // navigation
                // pagination={{ clickable: true }}
                // scrollbar={{ draggable: false }}
                // onSwiper={(swiper) => console.log(swiper)}
                // onSlideChange={() => console.log("slide change")}
                autoplay={{
                  delay: 2400,
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
                {Household.map((product) => (
                  <div
                    className="col-xs-12 col-sm-6 col-md-4   shop_col my-md-4 my-2 "
                    key={product.key}
                  >
                    <SwiperSlide key={product.product_id} >
                      <CatCards
                        image={`/Assets/images/Home-page/${product.image_name}`}
                        title={product.product_name}
                        categoryType={product.categoryType}
                        onCategoryChange={() => sendCategory(
                          product.product_name
                        )}
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
