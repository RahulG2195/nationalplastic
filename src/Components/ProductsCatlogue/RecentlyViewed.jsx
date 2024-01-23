"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import PreChairsCard from '../preChairsCard/preChairsCard';
import Image from 'next/image';

const RecentlyViewed = () => {
    const RecentlyViewedData = [
        { ChairImg: "/assets/images/New-launches-1/New-launches-1.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
        { ChairImg: "/Assets/images/New-launches-2/New-launches-2.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
        { ChairImg: "/Assets/images/New-launches-3/New-launches-3.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
        { ChairImg: "/assets/images/New-launches-4/New-launches-4.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
        { ChairImg: "/assets/images/New-launches-1/New-launches-1.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
        { ChairImg: "/Assets/images/New-launches-2/New-launches-2.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
        { ChairImg: "/Assets/images/New-launches-3/New-launches-3.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
        { ChairImg: "/assets/images/New-launches-4/New-launches-4.png", Title: "SHAMIYANA", Discription: "Lorem ipsum dolor sit amet.", Price: "00,000", orignalPrice: "00,000", Discount: "20%" },
    ];
    return (
        <>

            <div className="mt-5">
                <div className="text-center">
                    <div className="fs-1 fw-bold text-danger">Recently Viewed <span className="title2 fw-normal">Products</span> </div>
                    <div className="mt-1 fw-semibold">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has <br />
                        been the industry's standard dummy text ever since the 1500s,</div>
                </div>
            </div>

            <div className="container my-5">
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                    spaceBetween={50}
                    slidesPerView={4}
                    navigation
                    loop={true}
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 4000,
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
                            slidesPerView: 4,
                            spaceBetween: 50,
                        },
                    }}
                >
                    {
                        RecentlyViewedData.map((chair, index) => (
                            <SwiperSlide key={index}>

                                <PreChairsCard
                                    ChairImg={chair.ChairImg}
                                    Title={chair.Title}
                                    Discription={chair.Discription}
                                    Price={chair.Price}
                                    orignalPrice={chair.orignalPrice}
                                    Discount={chair.Discount} />

                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div >

            <div className="features d-flex justify-content-center gap-5 flex-wrap m-5 px-5">

                <div className="shop d-flex justify-content-center feature " >
                    <div className="icon">
                        <img src="/Assets/images/shop/shop.png" alt="" />
                    </div>
                    <div className="FeatureText mx-2 ">
                        <h5 className='fw-semibold'>50+</h5>
                        <h6>Experienced Stores <br />across India</h6>
                    </div>
                </div>



                <div className="shop d-flex justify-content-center feature " >
                    <div className="icon">
                        <img src="/Assets/images/Shipping-01/Shipping-01.png" alt="" />
                    </div>
                    <div className="FeatureText mx-2 ">
                        <h5 className='fw-semibold'>350+</h5>
                        <h6> Delivery Centres <br /> Across India</h6>
                    </div>
                </div>



                <div className="shop d-flex justify-content-center feature " >
                    <div className="icon">
                        <img src="/Assets/images/reputation/reputation.png" alt="" />
                    </div>
                    <div className="FeatureText mx-2 ">
                        <h5 className='fw-semibold'>20 lakh+</h5>
                        <h6>Satisfied<br />Customer</h6>
                    </div>
                </div>



                <div className="shop d-flex justify-content-center feature " >
                    <div className="icon">
                        <img src="/Assets/images/warranty/warranty.png" alt="" />
                    </div>
                    <div className="FeatureText mx-2 ">
                        <h5 className='fw-semibold'>1 year*</h5>
                        <h6>Guaranteed <br />Warranty</h6>
                    </div>
                </div>
            </div>


            <div className="mt-5">
                <Image
                    className="mt-5"
                    src={"/Assets/images/CTA-banner-2.jpg-v2/CTA-banner-2.jpg-v2.png"}
                    width={100}
                    height={80}
                    layout='responsive'
                    objectFit='cover'
                    alt="Picture of the author"
                />
            </div>



        </>
    )
}
export default RecentlyViewed;