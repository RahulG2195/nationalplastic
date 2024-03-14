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

export default async function Manufacture() {
  // Fetch data on the server-side using getStaticProps
  const { Household } = await getStaticProps();

  return (
    <section className="shop_room_sec common_section manufacturer_common_section ">
      <div className="container ">
        <div className="row">
          <div className="section_header mx-auto text-center">
            <h2>
              <span>Indias Largest Manufacturer</span>
            </h2>
            <h3>Of Household Products</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s,
            </p>
          </div>
          <div className="col-12 products_col">
            <div className="row">
              <Swiper
                className="swipper"
                style={{ width: "100%", height: "100%" }}
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={15}
                loop={true}
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
                    key={product.product_id}
                    className="col-xs-12 col-sm-6 col-md-4 shop_col my-md-4 my-2"
                  >
                    <SwiperSlide>
                      <CatCards
                        image={`/Assets/images/Home-page/${product.image_name}`}
                        title={product.product_name}
                        url={product.url}
                        style={"shop-room"}
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

export async function getStaticProps() {
  const response = await axios.get("http://localhost:3000/api/Products");
  const filteredData = response.data.products.filter(
    (item) => item.categoryType === "home_top_pics"
  );

  return {
    props: {
      Household: filteredData,
    },
  };
}

// ./src/Components/Home/Manufacture.jsx
// 65:19  Error: Missing "key" prop for element in iterator  react/jsx-key
