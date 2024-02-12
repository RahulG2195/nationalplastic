import Image from "next/image";
import CatCards from "../CommonComp/catCards";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Autoplay,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
export default function Highlight() {
  const productArr = [
    {
      key: 1,
      image: "/assets/images/HomepageImages/1st-section-kids-chair.jpg",
      title: "Lorem Ipsum is simply dummy text",
      short_desc: "Lorem Ipsum is simply dummy text",
      url: "#",
    },
    {
      key: 2,
      image: "/assets/images/HomepageImages/1st-section-kids-chair.jpg",
      title: "Lorem Ipsum is simply dummy text",
      short_desc: "Lorem Ipsum is simply dummy text",
      url: "#",
    },
    {
      key: 3,
      image: "/assets/images/HomepageImages/1st-section-kids-chair.jpg",
      title: "Lorem Ipsum is simply dummy text",
      short_desc: "Lorem Ipsum is simply dummy text",
      url: "#",
    },
  ];
  return (
    <section className="top_pick_sec common_section">
      <div className="container">
        <div className="row">
          <div className="section_header Specific-product mx-auto text-center">
            <h2>
              <span>Specific </span> Product Highlight
            </h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s.
            </p>
          </div>
          <div className="col-12 highlight_col">
            <div className="row">
              <Swiper
                className="my-slider"
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={50}
                // slidesPerView={3}
                loop={true}
                // navigation
                // pagination={{ clickable: true }}
                // autoplay={{
                //   delay: 2900,
                //   disableOnInteraction: false,
                // }}
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
                {productArr.map((product) => (
                  <div className="col-md-4">
                    <SwiperSlide key={product.key}>
                      <div className="card">
                        <Image
                          src={product.image}
                          alt={product.image}
                          width={100}
                          height={100}
                          layout="responsive"
                          objectFit="cover"
                        />
                        <div className="card-body">
                          <h5 className="card-title">{product.title}</h5>
                          <p className="card-text">{product.short_desc}</p>
                          <a
                            href={product.url}
                            className="btn btn-dark text-white rounded-circle highArrow"
                          >
                            <i
                              className="fa fa-arrow-right"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </div>
                      </div>
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
