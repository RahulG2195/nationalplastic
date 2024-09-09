"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import "../../styles/home_prod.css";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Autoplay,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import "swiper/swiper-bundle.css";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

export default function HappyStory() {
  const [productArr, setProductArr] = useState([]);

  useEffect(() => {
    // Initialize Fancybox
    Fancybox.bind("[data-fancybox]", {});

    // Cleanup
    return () => {
      Fancybox.close();
    };
  }, []);

  useEffect(() => {
    // Fetch data using Axios
    axios
      .get("/api/admin/Youtube") // Replace this with your API endpoint
      .then((response) => {
        setProductArr(response.data.results); // Assuming your API returns the product array
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <section className="happy_Story_sec common_section">
      <div className="container">
        <div className="row">
          <div className="text-center mb-5">
            <div className="darkBlue fs-1 fw-medium">
              Happy
              <span className="fs-1 lh-small fw-bolder text-danger"> Stories</span>
            </div>
            <div className="mt-1 fw-medium subCptRes w-50">
              <p>Their Words, Our Pride</p>
            </div>
          </div>
          <div className="col-12 products_col justify-content-center">
            <div className="row">
              <Swiper
                style={{
                  "--swiper-navigation-color": "#787978",
                  "--swiper-pagination-color": "#787978",
                  height: "100%",
                }}
                className="swipper px-md-5 swpr"
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={0}
                slidesPerView={3}
                navigation={{ clickable: true }}
                autoplay={{
                  delay: 2600,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  200: { slidesPerView: 1, spaceBetween: 20 },
                  715: { slidesPerView: 2, spaceBetween: 0 },
                  1018: { slidesPerView: 2, spaceBetween: 0 },
                  1024: { slidesPerView: 3, spaceBetween: 0 },
                }}
              >
                {productArr.map((product) => (
                  <SwiperSlide className="px-3" key={product.key}>
                    <div className="card rounded-5 w-100 h-100">
                      <div className="card-img rounded-5">
                        <a
                          data-fancybox="gallery"
                          href={product.url}
                          data-type="video"
                        >
                          <Image
                            className="rounded-top-5"
                            src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_BANNERS_PATH_DIR}${product.image}`}
                            alt={product.title}
                            width={100}
                            height={50}
                            layout="responsive"
                            objectFit="cover"
                          />
                        </a>
                      </div>
                      <div className="respswpr card-body rounded-bottom-5 dot">
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
