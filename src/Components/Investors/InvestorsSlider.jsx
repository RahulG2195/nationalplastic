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
                    slidesPerView={3}
                    loop={true}
                    navigation
                    pagination={{ clickable: true }}
                    // scrollbar={{ draggable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                >
                    <SwiperSlide style={{ width: "100%", overflow: "hidden", height: "100%" }} ><img style={{ width: '' }} />
                <div>
                    
                </div>
                 </SwiperSlide>
                    <SwiperSlide style={{ width: "100%", overflow: "hidden", height: "100%" }} ><img style={{ width: '' }} />
                    <h1>dvgfdgfdg</h1> </SwiperSlide>
                    <SwiperSlide style={{ width: "100%", overflow: "hidden", height: "100%" }} ><img style={{ width: '' }} />
                    <h1>dvgfdgfdg</h1> </SwiperSlide>
                    <SwiperSlide style={{ width: "100%", overflow: "hidden", height: "100%" }} ><img style={{ width: '' }} />
                    <h1>dvgfdgfdg</h1> </SwiperSlide>
                </Swiper>
                
            </div>
        </>
    )
}
export default InvestorsSlider