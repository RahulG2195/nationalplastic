"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Autoplay,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import "swiper/swiper-bundle.css";
import TogetherCard from "../BoughtTogetherCards/TogetherCard";
import DiningTableCard from "../DiningTableCard/DiningTableCard";
import PopularCards from "../PopularPostsCards/PopularCards";
import "./Details.css";

const Details = () => {
  const togetherCardsData = [
    {
      imgSrc: "/Assets/images/Magna/Magna.png",
      caption:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam ",
    },
    {
      imgSrc: "/Assets/images/The-boss/The-boss.png",
      caption:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam ",
    },
    {
      imgSrc: "/Assets/images/Top-selling-product/Top-selling-product.png",
      caption:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam ",
    },
    {
      imgSrc: "/Assets/images/Magna/Magna.png",
      caption:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam ",
    },
    {
      imgSrc: "/Assets/images/The-boss/The-boss.png",
      caption:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam ",
    },
    {
      imgSrc: "/Assets/images/Top-selling-product/Top-selling-product.png",
      caption:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam ",
    },
  ];

  return (
    <>
      <div className="row mx-4">
        <div className="col-md-8 mt-5">
          <div className="text-center">
            <p className="small litegray">December 10, 2023</p>
            <p className="darkBlue fw-bold fs-2 mb-5">Dining Table Set</p>
          </div>
          <DiningTableCard BottomCardsCptn="BottomCardsCptn" />
          <DiningTableCard BottomCardsCptn="BottomCardsCptn" />
          <DiningTableCard BottomCardsCptn="BottomCardsCptn" />
          <div className="border-bottom border-secondary w-75 my-4 m-auto"></div>

          <div className="blogCmnts">
            <p className="darkBlue fw-bold fs-4 m-4">Leave a Comment</p>
            <textarea
              className="form-control comntArea w-100"
              placeholder="Leave a comment here"
              id="floatingTextarea2"
            ></textarea>
            <div className="d-flex CmntNameRes gap-5 my-3">
              <input type="text" className="form-control" placeholder="Name" />
              <input
                type="email"
                className="form-control"
                placeholder="Email"
              />
            </div>
            <center>
              <button
                type="button"
                className="btn btn-danger commentBtn py-3 px-4 my-4 small"
              >
                POST A COMMENT
              </button>
            </center>
          </div>
        </div>

        <div className="col-md-4 mt-5">
          <div className="sticky-sidebar">
            <PopularCards StikyCard="DetailsPopularCard" />
          </div>
        </div>
      </div>

      <div className="text-center mt-5 pt-5 mb-4">
        <div className="text-danger fw-bold fs-1">
          You Might<span className="darkBlue fw-normal"> Also Like</span>
        </div>
        <div className="mt-1 fw-normal medium subCptRes w-50">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industriesstandard dummy text
            ever since the 1500s,
          </p>
        </div>
      </div>

      <div className="d-flex justify-content-center mx-5 mb-5 py-5 px-md-5 DetailsTogetherSlide">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={10}
          slidesPerView={3}
          pagination={true}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            200: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }}
        >
          {togetherCardsData.map((card, index) => (
            <SwiperSlide key={index}>
              <TogetherCard imgSrc={card.imgSrc} caption={card.caption} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Details;
