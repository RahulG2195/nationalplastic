"use client"
// import './Slider.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination, Scrollbar, A11y } from 'swiper/modules'; import 'swiper/swiper-bundle.css';

const InvestorsSlider = () => {
    return (
        <>
            <div className="Slider_container position-relative">
                <div className=" CSRslider">
                </div>
                <Swiper className='mt-5 swipper' style={{ width: "70vw", height: "100vh" }}
                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                    spaceBetween={50}
                    slidesPerView={1}
                    loop={true}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                >
                    <SwiperSlide style={{ width: "100%", overflow: "hidden", height: "100%" }} ><img style={{ width: '' }} src="/assets/images/CSR-img-2/CSR-img-2.png" alt="" /></SwiperSlide>
                    <SwiperSlide style={{ width: "100%", overflow: "hidden", height: "100%" }} ><img style={{ width: '' }} src="/assets/images/CSR-img-2/CSR-img-2.png" alt="" /></SwiperSlide>
                    <SwiperSlide style={{ width: "100%", overflow: "hidden", height: "100%" }} ><img style={{ width: '' }} src="/assets/images/CSR-img-2/CSR-img-2.png" alt="" /></SwiperSlide>
                    <SwiperSlide style={{ width: "100%", overflow: "hidden", height: "100%" }} ><img style={{ width: '' }} src="/assets/images/CSR-img-2/CSR-img-2.png" alt="" /></SwiperSlide>
                </Swiper>
                <div>
                    <button className='px-3 py-2'>View More</button>
                </div>
            </div>
        </>
    )
}
export default InvestorsSlider