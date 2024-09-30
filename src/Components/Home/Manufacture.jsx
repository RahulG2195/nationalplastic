"use client";
import Link from "next/link";
import CatCards from "../CommonComp/catCards";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../styles/home_prod.css";
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

  const [Household, setHousehold] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/Category`);
      const filteredData = response.data.Manufacture;

      setHousehold(filteredData);
    };
    fetchdata();
  }, []);
  return (
    <section className="shop_room_sec common_section manufacturer_common_section ">
      <div className="container">
        <div className="row">
          <div className="text-center mb-5 ">
            <div className="fs-1 lh-small fw-bolder manuf_head">
              Indias Largest Manufacturer
              <p className="darkBlue fs-1 fw-medium">Of Household Products</p>{" "}
            </div>
            <div className="mt-1 fw-medium subCptRes w-50">
              <p>
              Explore Indias largest variety of household products, including comfortable seating, functional tables, convenient storage solutions, adorable baby chairs, and more!
              </p>
            </div>
          </div>
          <div className="col-12 products_col">
            <div className="row">
              <Swiper
                className="swipper show_swipper"
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
                  <div key={product.key}>
                    <SwiperSlide key={product.category_id}>
                      <CatCards
                        catid={
                          product.seo_url
                        }
                        manfacthover="manfact"
                        style="manfTitle"
                        image={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}${product.image_name}`}
                        title={product.category_name}
                        categoryType={product.categoryType}
                        onCategoryChange={() =>
                          sendCategory(product.product_name)
                        }
                      />
                    </SwiperSlide>
                  </div>
                ))}
              </Swiper>

              {Household.map((product) => (
                <div
                  className="col-xs-12 col-sm-6 px-md-3 col-md-4 shop_col my-md-4 my-2 hideswiper"
                  key={product.key}
                >
                  <CatCards
                        redirection={"product-catalogue"}

                        catid={
                          product.seo_url
                        }
                        manfacthover="manfact"
                        style="manfTitle"
                        image={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}${product.image_name}`}
                        title={product.category_name}
                        categoryType={product.categoryType}
                        onCategoryChange={() =>
                          sendCategory(product.product_name)
                        }
                      />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
