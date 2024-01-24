'use client'
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Autoplay,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import "swiper/swiper-bundle.css";
export default function Dealers() {
 const DealerArr = [
    {
      key : 1,
      image : '/assets/images/HomepageImages/Others Cities Icons-01.png',
      title : 'Ahmedabad',
      url : '#'
    },
    {
      key : 2,
      image : '/assets/images/HomepageImages/Others Cities Icons-02.png',
      title : 'Bangalore',
      url : '#'
    },
    {
      key : 3,
      image : '/assets/images/HomepageImages/Others Cities Icons-03.png',
      title : 'Jaipur',
      url : '#'
    },
    {
      key : 4,
      image : '/assets/images/HomepageImages/Others Cities Icons-04.png',
      title : 'Kolkata',
      url : '#'
    },
    {
      key : 5,
      image : '/assets/images/HomepageImages/Others Cities Icons-05.png',
      title : 'Mumbai',
      url : '#'
    },
    {
      key : 6,
      image : '/assets/images/HomepageImages/Others Cities Icons-06.png',
      title : 'Chennai',
      url : '#'
    },
    {
      key : 7,
      image : '/assets/images/HomepageImages/Others Cities Icons-07.png',
      title : 'Delhi',
      url : '#'
    },
    {
      key : 8,
      image : '/assets/images/HomepageImages/Others Cities Icons-09.png',
      title : 'Hyderabad',
      url : '#'
    },
  ];
  return (
    <section className="dealer_Sec common_section">
        <div className="container">
            <div className="row">
                <div className="section_header mx-auto text-center"data-aos="zoom-in">
                    <h2><span>National Plastic  </span> Dealers</h2>
                    <p>States We Deliver In (carousel will be here)</p>
                </div>
                <div className="col-12 view_all_sec"data-aos="slide-left">
                  <Link href='#' className="my-3"><h6>View All</h6></Link>
                </div>
                <div className="col-12 products_col">
                  <div className="row">
                  <Swiper className='swipper' style={{ width: "100%", height: "100%" }}
                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                    spaceBetween={10}
                    slidesPerView={6}
                    loop={true}
                    data-aos="fade-up"
                    // navigation
                    // pagination={{ clickable: true }}
                    // scrollbar={{ draggable: true }}
                    // onSwiper={(swiper) => console.log(swiper)}
                    // onSlideChange={() => console.log('slide change')}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                >
                  {
                  DealerArr.map((dealer) => (
                    
                      <SwiperSlide key={dealer.key} style={{ width: "100%", overflow: "hidden", height: "100%" }}>
                          <div className="dealer_cont">
                              <div className="dealer_imgs">
                                <Image 
                                  src={dealer.image}
                                  alt={dealer.image}
                                  // width={100}
                                  // height={100}
                                  // layout="responsive"
                                  // objectFit="cover"
                                  fill
                                  />
                              </div>
                                <p>{dealer.title}</p>
                          </div>
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
