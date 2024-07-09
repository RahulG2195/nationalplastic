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
      const response = await axios.get(`${process.env.BASE_URL}/Products`);

      // const filteredData = response.data.heighlightProd.filter(
      //   (item) => item.categoryType === "highlights"
      // );
      setProductArr(response.data.heighlightProd);
      // setIsLoading(false);
    };
    fetchdata();
  }, []);
  return (
    <section className="top_pick_sec position-relative common_section position-relative">
      <div className="container">
        <div className="row">
          <div className="text-center highlightCont">
            <div className="darkBlue fs-1 fw-medium">
            Our Must-Have &nbsp;
               <span className="fs-1 lh-small fw-bolder text-danger ">
              Collection!
              </span>
            </div>
            <div className="mt-1 fw-medium subCptRes w-50">
              <p>
              Upgrade your seating with our unique designs! Discover our range of Popular Chairs.
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
              <div className="row">
                {productArr.map((product) => {
                  const images = product.image_name ? product.image_name.split(', ').map(image => image.trim()) : [];
                  return <div key={product.product_name} className="col-md-4 my-2 prodHcard">
                    <Link href={`/ProductDetail/${product.product_id}`}>
                      <div className="card highlightcard">
                        <Image
                          className="imagetop"
                          src={`/Assets/images/products/${images[0]}`}
                          alt={product.image}
                          width={50}
                          height={100}
                          layout="responsive"
                          objectFit="cover"
                        />
                        <div className="card-body cardbtm">
                          <h5 className="card-title">{product.product_name}</h5>
                          <p className="card-text py-2">
                            {product.short_description}
                          </p>
                          <div className="btn btn-dark text-white rounded-circle highArrow mt-md-5">
                            <i
                              className="fa fa-arrow-right"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                })}
              </div>
            </div>
            {/* )} */}
          </div>
        </div>
      </div>
    </section>
  );
}
