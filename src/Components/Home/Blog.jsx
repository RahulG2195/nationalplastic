"use client";
import BlogCard from "../CommonComp/BlogCard";
import "../../styles/blog.css";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Autoplay,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import "swiper/swiper-bundle.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Blog() {
  // const productArr = [
  //   {
  //     key: 1,
  //     image: '/Assets/images/Home-page/1st-section-kids-chair.jpg',
  //     title: 'Dinning Table Set',
  //     url: '#',
  //     cat: 'Furniture',
  //     date: 'November 4, 2023',
  //     duration: '5 minutes',
  //     shortDesc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  //   },
  //   {
  //     key: 2,
  //     image: '/Assets/images/Home-page/1st-section-kids-chair.jpg',
  //     title: 'Multipurpose storage',
  //     url: '#',
  //     cat: 'Furniture',
  //     date: 'November 4, 2023',
  //     duration: '5 minutes',
  //     shortDesc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  //   },
  //   {
  //     key: 3,
  //     image: '/Assets/images/Home-page/1st-section-kids-chair.jpg',
  //     title: 'Kids Chairs',
  //     url: '#',
  //     cat: 'Furniture',
  //     date: 'November 4, 2023',
  //     duration: '5 minutes',
  //     shortDesc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  //   },
  // ];

  const [productArr, setProductArr] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get("http://localhost:3000/api/Products");
      const filteredData = response.data.products.filter(
        (item) => item.categoryType === "Blog"
      );
      setProductArr(filteredData);
    };
    fetchdata();
  }, []);
  return (
    <section className="top_pick_sec common_section">
      <div className="px-4">
        <div className="row">
          <div className="text-center highlightCont my-5">
            <div className="fs-1 lh-small fw-bolder text-danger ">Blog</div>
            <div className="mt-1 fw-bold subCptRes w-50">
              <p>Lorem Ipsum</p>
            </div>
          </div>
          <div className="col-12 products_col">
            <div className="row">
              <Swiper
                className="swipper swpr px-5 py-5"
                style={{ width: "100%", height: "100%" }}
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={15}
                slidesPerView={2}
                // loop={true}
                navigation={{ clickable: true }}
                pagination={{ clickable: true }}
                // scrollbar={{ draggable: false }}
                // onSwiper={(swiper) => //console.log(swiper)}
                // onSlideChange={() => //console.log("slide change")}
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
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 2,
                    spaceBetween: 50,
                  },
                }}
              >
                {productArr.map((product) => (
                  <SwiperSlide key={product.product_id}>
                    <BlogCard
                      image={`/Assets/images/Home-page/${product.image_name}`}
                      title={product.product_name}
                      url={product.url}
                      cat={product.categoryType}
                      date={
                        product.createdOn &&
                        new Date(product.createdOn).toLocaleDateString(
                          undefined,
                          { month: "long", year: "numeric" }
                        )
                      }
                      duration={product.duration}
                      shortDesc={product.short_description}
                    />
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
