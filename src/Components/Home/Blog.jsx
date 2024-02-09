'use client'
import BlogCard from "../CommonComp/BlogCard";
import '../../styles/blog.css';
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Autoplay,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import "swiper/swiper-bundle.css";

export default function Blog() {
  const productArr = [
    {
      key: 1,
      image: '/Assets/images/Home-page/1st-section-kids-chair.jpg',
      title: 'Dinning Table Set',
      url: '#',
      cat: 'Furniture',
      date: 'November 4, 2023',
      duration: '5 minutes',
      shortDesc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      key: 2,
      image: '/Assets/images/Home-page/1st-section-kids-chair.jpg',
      title: 'Multipurpose storage',
      url: '#',
      cat: 'Furniture',
      date: 'November 4, 2023',
      duration: '5 minutes',
      shortDesc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      key: 3,
      image: '/Assets/images/Home-page/1st-section-kids-chair.jpg',
      title: 'Kids Chairs',
      url: '#',
      cat: 'Furniture',
      date: 'November 4, 2023',
      duration: '5 minutes',
      shortDesc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
  ];

  return (
    <section className="top_pick_sec common_section">
      <div className="container">
        <div className="row">
          <div className="section_header mx-auto text-center" data-aos="zoom-in">
            <h2><span>Blog</span></h2>
            <p>Lorem Ipsum</p>
          </div>
          <div className="col-12 products_col" data-aos="slide-up">
            <div className="row">
              <Swiper
                className="swipper"
                style={{ width: "100%", height: "100%" }}
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={15}
                slidesPerView={3}
                loop={true}
                navigation
                pagination={{ clickable: true }}
                // scrollbar={{ draggable: false }}
                // onSwiper={(swiper) => console.log(swiper)}
                // onSlideChange={() => console.log("slide change")}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
              >
                {
                  productArr.map((product) => (
                    <SwiperSlide key={product.key} >
                      <BlogCard
                        image={product.image}
                        title={product.title}
                        url={product.url}
                        cat={product.cat}
                        date={product.date}
                        duration={product.duration}
                        shortDesc={product.shortDesc}
                      />
                    </SwiperSlide>
                  ))
                }
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
