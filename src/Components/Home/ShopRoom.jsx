"use client";
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

export default function ShopRoom() {
  const [Tags, setTags] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/adminProdTag`
        );
        const filteredData = response.data.AllTag;
        setTags(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchdata();
  }, []);

  return (
    <section className="shop_room_sec common_section">
      <div className="container">
        <div className="row">
          <div className="text-center mb-5">
            <div className="darkBlue fs-1 fw-medium">
              Shop By
              <span className="fs-1 lh-small fw-bold text-danger "> Rooms</span>
            </div>
            <div className="mt-1 fw-medium subCptRes w-md-50">
              <p>
                Easily furnish every room in your home! Check out our Shop By Rooms section for furniture and accessories tailored to your living room, dining room, bedroom, balcony, baby room, and more.
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
                  delay: 2700,
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
                {Tags.map((tag) => (
                  <SwiperSlide key={tag.tag_id}>
                    <div className="col-md-4 shop_col my-md-4 my-2">
                      <CatCards
                        redirection={"shop-by-room"}
                        tag_id={tag.tag_id}
                        tag_seo={tag.tag_seo}
                    catid={tag.tag_seo}
                        manfacthover={"manfact"}
                        style={"manfTitle"}
                        image={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}${tag.tag_image}`}
                        title={tag.tag_name}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {Tags.map((tag) => (
                <div
                  className="col-xs-12 col-sm-6 col-md-4 shop_col my-md-4 my-2 hideswiper"
                  key={tag.tag_id}
                >
                  <CatCards
                    redirection={"shop-by-room"}
                    hoverglow="yellowGlow"
                    catid={tag.tag_seo}
                    style="manfTitle pt-4 px-4 d-flex gap-5 justify-content-arround"
                    image={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}${tag.tag_image}`}
                    title={tag.tag_name}
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