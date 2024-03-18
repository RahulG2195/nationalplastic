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
  const [productArr, setProductArr] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          "http://13.234.238.29:3000/api/Products"
        );
        const filteredData = response.data.products.filter(
          (item) => item.categoryType === "shop_by_room"
        );
        setProductArr(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error gracefully, e.g., display an error message
      }
    };
    fetchdata();
  }, []);

  return (
    <section className="shop_room_sec common_section">
      <div className="container">
        <div className="row">
          <div className="section_header mx-auto text-center">
            <h2>
              Shop By <span>Rooms</span>
            </h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s,
            </p>
          </div>
          <div className="col-12 products_col">
            <div className="row">
              <Swiper
                className="swipper"
                style={{ width: "100%", height: "100%" }}
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={15}
                loop={true}
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
                  <div
                    className="col-md-4 shop_col my-md-4 my-2"
                    key={product.product_id}
                  >
                    <SwiperSlide key={product.product_id}>
                      <CatCards
                        image={`/Assets/images/Home-page/${product.image_name}`}
                        title={product.product_name}
                        url="#"
                        style={"shop-room"}
                        key={product.product_id}
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
  );
}
// ./src/Components/Home/ShopRoom.jsx
// 78:19  Error: Missing "key" prop for element in iterator  react/jsx-key
