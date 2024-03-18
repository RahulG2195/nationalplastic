import Image from "next/image";
import CatCards from "../CommonComp/catCards";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Autoplay,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { SyncLoader } from "react-spinners";

export default function Highlight() {
  // const productArr = [
  //   {
  //     key : 1,
  //     image : '/Assets/images/Home-page/1st-section-kids-chair.jpg',
  //     title : 'Lorem Ipsum is simply dummy text',
  //     short_desc : 'Lorem Ipsum is simply dummy text',
  //     url : '#'
  //   },
  //   {
  //     key : 2,
  //     image : '/Assets/images/Home-page/1st-section-kids-chair.jpg',
  //     title : 'Lorem Ipsum is simply dummy text',
  //     short_desc : 'Lorem Ipsum is simply dummy text',
  //     url : '#'
  //   },
  //   {
  //     key : 3,
  //     image : '/Assets/images/Home-page/1st-section-kids-chair.jpg',
  //     title : 'Lorem Ipsum is simply dummy text',
  //     short_desc : 'Lorem Ipsum is simply dummy text',
  //     url : '#'
  //   },
  // ];

  const [productArr, setProductArr] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get(
        "http://13.234.238.29:3002/api/Products"
      );
      const filteredData = response.data.products.filter(
        (item) => item.categoryType === "highlights"
      );
      setProductArr(filteredData);
      // setIsLoading(false);
    };
    fetchdata();
  }, []);

  return (
    <section className="top_pick_sec common_section">
      <div className="container">
        <div className="row">
        <div className="text-center mb-5">
            <div className="darkBlue fs-1 fw-medium">Specific <span className="fs-1 lh-small fw-bolder text-danger "> Product Highlight</span> </div>
            <div className="mt-1 fw-medium subCptRes w-50"><p>ILorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            </p>
            </div>
          </div>
          <div className="container mt-5">
            {/* {isLoading ? (
              <center className="spinner">
                <SyncLoader color={"#36D7B7"} loading={isLoading} />
              </center >
            ) : ( */}
            <div className="col-12 highlight_col">
              <div className="row">
                {productArr.map((product) => (
                  <div
                    key={product.key}
                    className="col-md-4"
                    data-aos="slide-right"
                  >
                    <Link href="/ProductCatlogue">
                      <div className="card">
                        <Image
                          src={`/Assets/images/Home-page/${product.image_name}`}
                          alt={product.image}
                          width={100}
                          height={100}
                          layout="responsive"
                          objectFit="cover"
                        />
                        <div className="card-body">
                          <h5 className="card-title">{product.product_name}</h5>
                          <p className="card-text">
                            {product.short_description}
                          </p>
                          <div className="btn btn-dark text-white rounded-circle highArrow">
                            <i
                              className="fa fa-arrow-right"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            {/* )} */}
          </div>
        </div>
      </div>
    </section>
  );
}
