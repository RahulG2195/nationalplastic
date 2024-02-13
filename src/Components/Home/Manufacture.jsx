import Link from "next/link";
import CatCards from "../CommonComp/catCards";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Autoplay,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
export default function Manufacture() {
  const productArr = [
    {
      key : 1,
      image : '/Assets/images/Home-page/Chair.png',
      title : 'Seatings',
      url : '#',
      style : 'shop-room'
    },
    {
      key : 2,
      image : '/Assets/images/Home-page/Chair.png',
      title : 'Tables',
      url : '#',
      style : 'shop-room'
    },
    {
      key : 3,
      image : '/Assets/images/Home-page/Chair.png',
      title : 'Storage',
      url : '#',
      style : 'shop-room'
    },
    {
      key : 4,
      image : '/Assets/images/Home-page/Chair.png',
      title : 'Sets',
      url : '#',
      style : 'shop-room'
    },
    {
      key : 5,
      image : '/Assets/images/Home-page/Chair.png',
      title : 'Stools',
      url : '#',
      style : 'shop-room'
    },
    {
      key : 6,
      image : '/Assets/images/Home-page/Chair.png',
      title : 'Kids Chair',
      url : '#',
      style : 'shop-room'
    },
  ];
  return (
    <section className="shop_room_sec common_section manufacturer_common_section ">
        <div className="container ">
            <div className="row">
                <div className="section_header mx-auto text-center" >
                    <h2><span>Indias Largest Manufacturer</span></h2>
                    <h3> Of Household Products</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,</p>
                </div>
                <div className="col-12 products_col">
                  <div className="row">
                  <Swiper
                className="swipper"
                style={{ width: "100%", height: "100%" }}
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={15}
                // slidesPerView={3}
                loop={true}
                // navigation
                // pagination={{ clickable: true }}
                // scrollbar={{ draggable: false }}
                // onSwiper={(swiper) => console.log(swiper)}
                // onSlideChange={() => console.log("slide change")}
                autoplay={{
                  delay: 2400,
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
                  { productArr.map((product) => ( 
                      <div className="col-xs-12 col-sm-6 col-md-4   shop_col my-md-4 my-2 " >
                        <SwiperSlide key={product.key} >
                        <CatCards
                          image={product.image}
                          title={product.title}
                          url={product.url}
                          style={product.style}
                        />
                        </SwiperSlide>
                      </div> 
                    ))}
                    </Swiper>
                  </div>
                </div>
            </div>
        </div>
    </section>
  )
}
