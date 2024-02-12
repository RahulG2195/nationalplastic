import CatCards from "../CommonComp/catCards";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Autoplay,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";

export default function ShopRoom() {
 const productArr = [
    {
      key : 1,
      image : '/assets/images/HomepageImages/Living-Room.jpg',
      title : 'Seatings',
      url : '#',
      style : 'shop-room'
    },
    {
      key : 2,
      image : '/assets/images/HomepageImages/Dining.jpg',
      title : 'Tables',
      url : '#',
      style : 'shop-room'
    },
    {
      key : 3,
      image : '/assets/images/HomepageImages/Bedroom.jpg',
      title : 'Storage',
      url : '#',
      style : 'shop-room'
    },
    {
      key : 4,
      image : '/assets/images/HomepageImages/Bedroom.jpg',
      title : 'Sets',
      url : '#',
      style : 'shop-room'
    },
    {
      key : 5,
      image : '/assets/images/HomepageImages/Dining.jpg',
      title : 'Stools',
      url : '#',
      style : 'shop-room'
    },
    {
      key : 6,
      image : '/assets/images/HomepageImages/Bedroom.jpg',
      title : 'Kids Chair',
      url : '#',
      style : 'shop-room'
    },
  ];
  return (
    <section className="shop_room_sec common_section">
        <div className="container">
            <div className="row">
                <div className="section_header mx-auto text-center">
                    <h2>Shop By <span>Rooms</span></h2>
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
                  delay: 2700,
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
                      <div className="col-md-4 shop_col my-md-4 my-2"> 
                    <SwiperSlide key={product.key} >
                        <CatCards
                          image={product.image}
                          title={product.title}
                          url={product.url}
                          style={product.style}
                        />
                        </SwiperSlide>
                      </div> 
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
