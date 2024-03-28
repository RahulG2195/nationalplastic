"use client"
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './productDetSliderstyles.css';


const ProductDetailSlider = (imageurl) => {

    const getimageurl = imageurl.imageurl
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                loop={true}
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2 topSliderRes"
            >
                <SwiperSlide>
                    <img src={`/Assets/images/New-launches-1/${getimageurl}`} alt="Product" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={`/Assets/images/New-launches-1/${getimageurl}`} alt="Product" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={`/Assets/images/New-launches-1/${getimageurl}`} alt="Product" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={`/Assets/images/New-launches-1/${getimageurl}`} alt="Product" />
                </SwiperSlide>

            </Swiper>

            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper mt-4"
            >
                <SwiperSlide>
                    <img src={`/Assets/images/New-launches-1/${getimageurl}`} alt="Product" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={`/Assets/images/New-launches-1/${getimageurl}`} alt="Product" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={`/Assets/images/New-launches-1/${getimageurl}`} alt="Product" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={`/Assets/images/New-launches-1/${getimageurl}`} alt="Product" />
                </SwiperSlide>

            </Swiper>
        </>
    )
}
export default ProductDetailSlider 