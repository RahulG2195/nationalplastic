"use client"
import React, { useEffect, useState } from "react";
import Image from 'next/image'
import './Banner.css'
import axios from "axios";


const Banner = () => {

    const [bannerData, setBannerData] = useState(null);

    // Fetch banner data
    const fetchBannerData = async () => {
        try {
            const id = 4;
            const response = await axios.get(`/api/heroBanners`, { params: { id } });
            setBannerData(response.data.bannerData.image);

        } catch (err) {
            setError('Error fetching banner data');
            console.error('Error fetching banner data:', err);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchBannerData();
    }, []);


    return (
        <>

            <div className="main_Container">


                <div className="Img_cont position-relative" >
                    <Image
                        src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_BANNERS_PATH_DIR}${bannerData}`}
                        width={100}
                        height={80}
                        layout='responsive'
                        objectFit='cover'
                        alt="Picture of the author"
                    />
                    <button type="button" className="CareerButton fw-bold">VIEW OPENIGS</button>
                </div>

            </div>




        </>
    )

}
export default Banner;