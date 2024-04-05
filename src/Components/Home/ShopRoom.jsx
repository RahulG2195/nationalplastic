import CatCards from "../CommonComp/catCards";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../styles/home_prod.css";
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
          "http://13.234.238.29/api/Category"
        );
        //console.log("response of the category ", response.data.categories);
        const filteredData = response.data.categories.filter(
          (item) =>
            item.category_id === 30 ||
            item.category_id === 31 ||
            item.category_id === 32 ||
            item.category_id === 33 ||
            item.category_id === 34 ||
            item.category_id === 35
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
          <div className="text-center mb-5">
            <div className="darkBlue fs-1 fw-medium">
              Shop By{" "}
              <span className="fs-1 lh-small fw-bold text-danger ">Rooms</span>{" "}
            </div>
            <div className="mt-1 fw-medium subCptRes w-50">
              <p>
                ILorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industrys
                standard dummy text ever since the 1500s,
              </p>
            </div>
          </div>
          <div className="col-12 products_col">
            <div className="row">
              <Swiper
                className="swipper show_swipper"
                style={{ width: "100%", height: "100%" }}
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={15}
                loop={true}
                pagination={{ clickable: true }}
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
                    <SwiperSlide key={product.category_id}>
                      <CatCards
                        catid={
                          product.category_name &&
                          product.category_name.toLowerCase().includes("baby")
                            ? 18
                            : product.category_id
                        }
                        image={`/Assets/images/Home-page/${product.image_name}`}
                        title={product.category_name}
                        url="#"
                        style={"shop-room"}
                        key={product.category_id}
                      />
                    </SwiperSlide>
                  </div>
                ))}
              </Swiper>

              {productArr.map((product) => (
                <div
                  className="col-xs-12 col-sm-6 col-md-4 shop_col my-md-4 my-2 hideswiper"
                  key={product.key}
                >
                  <CatCards
                    hoverglow="yellowGlow"
                    catid={
                      product.category_name &&
                      product.category_name.toLowerCase().includes("baby ")
                        ? 18
                        : product.category_id
                    }
                    style="manfTitle pt-4 px-4 d-flex gap-5  justify-content-arround"
                    image={`/Assets/images/Home-page/${product.image_name}`}
                    title={product.category_name}
                    categoryType={product.categoryType}
                    onCategoryChange={() => sendCategory(product.product_name)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
// ./src/Components/Home/ShopRoom.jsx
// 78:19  Error: Missing "key" prop for element in iterator  react/jsx-key
