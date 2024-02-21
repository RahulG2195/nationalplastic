"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import PreChairsCard from '../preChairsCard/preChairsCard';
import Image from 'next/image';
import FooterRow from '../FooterRow/FooterRow';
import axios from 'axios';
import { useEffect, useState } from 'react';

const RecentlyViewed = () => {
    // const RecentlyViewedData = [
    //     { ChairImg: "/Assets/images/New-launches-1/New-launches-1.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
    //     { ChairImg: "/Assets/images/New-launches-2/New-launches-2.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
    //     { ChairImg: "/Assets/images/New-launches-3/New-launches-3.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
    //     { ChairImg: "/Assets/images/New-launches-4/New-launches-4.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
    //     { ChairImg: "/Assets/images/New-launches-1/New-launches-1.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
    //     { ChairImg: "/Assets/images/New-launches-2/New-launches-2.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
    //     { ChairImg: "/Assets/images/New-launches-3/New-launches-3.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
    //     { ChairImg: "/Assets/images/New-launches-4/New-launches-4.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
    // ];

    const [RecentlyViewedData, setRecentlyViewedData] = useState([])

    useEffect(() => {
        const fetchdata = async () => {
            try {

                const response = await axios.get("http://localhost:3000/api/Products")
                const filteredproducts = response.data.products.filter(item => item.categoryType === "premium chairs")

                setRecentlyViewedData(filteredproducts)
            }


            catch (error) {
                alert("Error fetching data", error)
            }
        };
        fetchdata();
    }, [])


    return (
        <>

            <div className="mt-5">
                <div className="text-center">
                    <div className="fs-1 fw-bold text-danger">Recently Viewed <span className="darkBlue fw-normal">Products</span> </div>
                    <div className="mt-1 subCptRes fw-semibold">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has </p>
                        <p>been the industry's standard dummy text ever since the 1500s,</p>
                    </div>
                </div>
            </div>

            <div className="container my-5">
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                    spaceBetween={50}
                    slidesPerView={4}
                    navigation
                    loop={true}
                    // pagination={{ clickable: true }}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}


                    breakpoints={{

                        425: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
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
                            slidesPerView: 4,
                            spaceBetween: 50,
                        },
                    }}
                >
                    {
                        RecentlyViewedData.map((chair) => (
                            <SwiperSlide key={chair.product_id}>


                                <PreChairsCard
                                    ChairImg={`/Assets/images/New-launches-1/${chair.image_name}`}
                                    Title={chair.product_name}
                                    Discription={chair.short_description}
                                    Price={chair.price}
                                    orignalPrice={chair.discount_price}
                                    Discount={chair.discount_percentage} />

                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div >

        </>
    )
}
export default RecentlyViewed;