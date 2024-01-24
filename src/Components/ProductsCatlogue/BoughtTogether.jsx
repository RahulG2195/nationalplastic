"use client"
import TogetherCard from "../BoughtTogetherCards/TogetherCard";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import Image from "next/image";

const BoughtTogether = () => {
    const togetherCardsData = [
        { imgSrc: "/Assets/images/Magna/Magna.png", price: "00,000" },
        { imgSrc: "/Assets/images/The-boss/The-boss.png", price: "00,000" },
        { imgSrc: "/Assets/images/Top-selling-product/Top-selling-product.png", price: "00,000" },
        { imgSrc: "/Assets/images/Magna/Magna.png", price: "00,000" },
        { imgSrc: "/Assets/images/The-boss/The-boss.png", price: "00,000" },
        { imgSrc: "/Assets/images/Top-selling-product/Top-selling-product.png", price: "00,000" },

    ];

    return (
        <>
            <div className="mt-5">
                <div className="text-center">
                    <div className="fs-1 fw-bold text-danger">Frequently Bought <span className="title2 fw-normal">Together</span> </div>
                    <div className="mt-1 fw-semibold">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has <br />
                        been the industry's standard dummy text ever since the 1500s,</div>
                </div>
            </div>

            <div className="container my-5">
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                    spaceBetween={50}
                    slidesPerView={3}
                    navigation
                    loop={true}
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 4000,
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
                    {
                        togetherCardsData.map((card, index) => (
                            <SwiperSlide key={index}>

                                <TogetherCard imgSrc={card.imgSrc} Price={card.price} />
                                
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div >

            <div className="mt-5">
                <Image
                className="mt-5"
                    src={"/Assets/images/CTA-banner-1.jpg-V2/CTA-banner-1.jpg-V2.png"}
                    width={100}
                    height={80}
                    layout='responsive'
                    objectFit='cover'
                    alt="Picture of the author"
                />
            </div>

        </>
    );
}

export default BoughtTogether;
