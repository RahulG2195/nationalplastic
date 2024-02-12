import CatCards from "../CommonComp/catCards"; 
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Autoplay,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";

export default function TopPick() {
 const productArr = [
    {
      key : 1,
      image : '/assets/images/HomepageImages/1st-section-kids-chair.jpg',
      title : 'Event Chairs',
      url : '#'
    },
    {
      key : 2,
      image : '/assets/images/HomepageImages/1st-section-kids-chair.jpg',
      title : 'Premium Chairs',
      url : '#'
    },
    {
      key : 3,
      image : '/assets/images/HomepageImages/1st-section-kids-chair.jpg',
      title : 'Kids Chairs',
      url : '#'
    },
  ];
  return (
    <section className="top_pick_sec common_section">
        <div className="container" >
            <div className="row">
                <div className="section_header mx-auto text-center" >
                    <h2><span>Top Picks</span> For You</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.</p>
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
                  delay: 2500,
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
                    
                      <div className="col-md-4" >
                        <SwiperSlide key={product.key} >
                        <CatCards
                          image={product.image}
                          title={product.title}
                          url={product.url}
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
