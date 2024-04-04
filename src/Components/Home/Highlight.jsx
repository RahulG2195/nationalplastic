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
      const response = await axios.get("http://localhost:3000/api/Products");
      const filteredData = response.data.products.filter(
        (item) => item.categoryType === "highlights"
      );
      setProductArr(filteredData);
      // setIsLoading(false);
    };
    fetchdata();
  }, []);

  return (
    <section className="top_pick_sec position-relative common_section position-relative">
      <div className="">
        <div className="row">
          <div className="text-center highlightCont">
            <div className="darkBlue fs-1 fw-medium">
              Specific{" "}
              <span className="fs-1 lh-small fw-bolder text-danger ">
                {" "}
                Product Highlight
              </span>{" "}
            </div>
            <div className="mt-1 fw-medium subCptRes w-50">
              <p>
                ILorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industrys
                standard dummy text ever since the 1500s,
              </p>
            </div>
          </div>
          <div className=" mt-5">
            {/* {isLoading ? (
              <center className="spinner">
                <SyncLoader color={"#36D7B7"} loading={isLoading} />
              </center >
            ) : ( */}
            <div className=" highlight_col mb-5">
              <div className="d-flex justify-content-center gap-4 flex-wrap">
                {productArr.map((product) => (
                  <div key={product.key} className="mt-5 pt-5 pb-5">
                    <Link href="/ProductCatlogue">
                      <div className="card highlightcard">
                        <Image
                          className="imagetop"
                          src={`/Assets/images/Home-page/${product.image_name}`}
                          alt={product.image}
                          width={50}
                          height={100}
                          layout="responsive"
                          objectFit="cover"
                        />
                        <div className="card-body cardbtm">
                          <h5 className="card-title">{product.product_name}</h5>
                          <p className="card-text  mb-5 pb-4">
                            {product.short_description}
                          </p>
                          <div className="btn btn-dark text-white rounded-circle highArrow mt-5">
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
