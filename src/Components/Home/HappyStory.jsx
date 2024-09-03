"use client";
import { useEffect } from "react";
import Image from "next/image";
import CatCards from "../CommonComp/catCards";
import "../../styles/home_prod.css";
// import FancyboxVideo from "./FancyboxVideo";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Autoplay,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import "swiper/swiper-bundle.css";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

export default function HappyStory() {

  useEffect(() => {
    // Initialize Fancybox
    Fancybox.bind("[data-fancybox]", {
      // Your Fancybox options here
    });

    // Cleanup
    return () => {
      Fancybox.close();
    };
  }, []);

  const productArr = [
    {
      key: 1,
      image: "/Assets/images/Home-page/Image 10.png",
      title: "Upgrade Your Event with Our Premium Event Chair",
      short_desc:
        "Planning an event? Make a lasting impression with the Premium Event Chair from National Plastic Industries Ltd. Our chair combines elegance, comfort, and durability, perfect for any occasion, from corporate conferences to weddings.",
      url: "https://youtu.be/UuBjSg6AJbw?feature=shared",
    },
    {
      key: 2,
      image: "/Assets/images/Home-page/Image 13.png",
      title: "National Plastic Industries Leisur",
      short_desc:
        "The Leisure chair is the Premium category furniture. National’s Leisure chair is defined by the comfortable sitting with relaxing back design and the extended seat which makes the chair comfortable to rest or to read books, napping, resting, sitting - giving it the look and feel of a handcrafted piece, but with the rich color options of a plastic chair.",
      url: "https://youtu.be/btRZLOU3VI8?feature=shared",
    },
    {
      key: 3,
      image: "/Assets/images/Home-page/Image 12.png",
      title: "National Plastic Chairs Collection",
      short_desc:
        "Welcome to our channel! Discover the diverse range of National Plastic chairs in our collection showcase. From the elegant Marble Chair to the sophisticated Ghost Chair, each piece combines style with durability. Learn about the features, designs, and versatility of our chairs, including favorites like the Pearl Chair and ICE Chair. Find the perfect addition to your home or office decor with National Plastic's innovative chair designs. Don't forget to like, subscribe, and click the bell icon for updates on our latest products! ",
      url: "https://youtu.be/SohDG8keAmo?feature=shared",
    },
    {
      key: 4,
      image: "/Assets/images/Home-page/Image 12.png",
      title: "National Plastic Premium Event Chairs",
      short_desc:
        "National Plastic started its production in a very humble manner in the year 1952 in a 500 sq.ft. premises, manufacturing plastic Buttons for shirts etc. Slowly and steadily it kept on innovating new and interesting homeware products which at a later date became the main thrust of innovation for the company. It did not take National Plastic long to become not only India's largest manufacturer of houseware products but also the largest exporter of plastic housewares in India. The Brand NATIONAL became a household name in Plastics in India.",
      url: "https://youtu.be/XKu_mgXQlSY?feature=shared",
    },
  ];
  return (
    <section className="happy_Story_sec common_section">
      <div className="container">
        <div className="row">
          <div className="text-center mb-5">
            <div className="darkBlue fs-1 fw-medium">
              Happy
              <span className="fs-1 lh-small fw-bolder text-danger ">
                Stories
              </span>
            </div>
            <div className="mt-1 fw-medium subCptRes w-50">
              <p>Their Words, Our Pride</p>
            </div>
          </div>
          <div className="col-12 products_col justify-content-center">
            <div className="row ">
              <Swiper
                style={{
                  "--swiper-navigation-color": "#787978",
                  "--swiper-pagination-color": "#787978",
                  // width: "75%",
                  height: "100%",
                }}
                className="swipper px-md-5 swpr "
                // style={{ width: "75%", height: "100%" }}
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={0}
                slidesPerView={3}
                navigation={{ clickable: true }}
                autoplay={{
                  delay: 2600,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  200: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  715: {
                    slidesPerView: 2,
                    spaceBetween: 0,
                  },
                  1018: {
                    slidesPerView: 2,
                    spaceBetween: 0,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 0,
                  },
                }}
              >
                {productArr.map((product) => (
                  // <div key={product.key} className="col-md-4">
                  <SwiperSlide className="px-3" key={product.key}>
                    <div className="card rounded-5 w-100 h-100">
                      <div className="card-img rounded-5">
                        {/* <FancyboxVideo
                          options={{
                            Carousel: {
                              friction: 0,
                            },
                          }}
                        > */}
                          <a
                            data-fancybox="gallery"
                            href={product.url}
                            data-type="video"
                          >
                            <Image
                              className="rounded-top-5"
                              src={product.image}
                              alt={product.image}
                              width={100}
                              height={50}
                              layout="responsive"
                              objectFit="cover"
                              // fill
                            />
                          </a>
                        {/* </FancyboxVideo> */}
                      </div>
                      <div className="respswpr card-body rounded-bottom-5 ">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text">{product.short_desc}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
