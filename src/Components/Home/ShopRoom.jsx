import CatCards from "../CommonComp/catCards";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Autoplay,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ShopRoom() {
  //  const productArr = [
  //     {
  //       key : 1,
  //       image : '/Assets/images/Home-page/Living-Room.jpg',
  //       title : 'Seatings',
  //       url : '#',
  //       style : 'shop-room'
  //     },
  //     {
  //       key : 2,
  //       image : '/Assets/images/Home-page/Dining.jpg',
  //       title : 'Tables',
  //       url : '#',
  //       style : 'shop-room'
  //     },
  //     {
  //       key : 3,
  //       image : '/Assets/images/Home-page/Bedroom.jpg',
  //       title : 'Storage',
  //       url : '#',
  //       style : 'shop-room'
  //     },
  //     {
  //       key : 4,
  //       image : '/Assets/images/Home-page/Bedroom.jpg',
  //       title : 'Sets',
  //       url : '#',
  //       style : 'shop-room'
  //     },
  //     {
  //       key : 5,
  //       image : '/Assets/images/Home-page/Dining.jpg',
  //       title : 'Stools',
  //       url : '#',
  //       style : 'shop-room'
  //     },
  //     {
  //       key : 6,
  //       image : '/Assets/images/Home-page/Bedroom.jpg',
  //       title : 'Kids Chair',
  //       url : '#',
  //       style : 'shop-room'
  //     },
  //   ];

  const [productArr, setProductArr] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get('http://localhost:3000/api/Products')
      const filteredData = response.data.products.filter(item => item.categoryType == "shop_by_room")
      setProductArr(filteredData)
    }
    fetchdata();

  }, [])
  const sendCategory = (productName) => {
    localStorage.setItem('category', productName);
  };

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
                {productArr.map((product) => (
                  <div className="col-md-4 shop_col my-md-4 my-2">
                    <SwiperSlide key={product.product_id} >
                      <CatCards
                        image={`/Assets/images/Home-page/${product.image_name}`}
                        title={product.product_name}
                        url={"#"}
                        style={"shop-room"}
                        onCategoryChange={() => sendCategory(
                          product.product_name
                        )}
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
