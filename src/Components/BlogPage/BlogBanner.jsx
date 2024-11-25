"use client"
import Link from 'next/link'
import './BlogBanner.css'
import Image from "next/image"
import axios from "axios";
import React, { useEffect, useState } from "react";


const BlogBanner = () => {
    const [bannerData, setBannerData] = useState(null);

    // Fetch banner data
    const fetchBannerData = async () => {
        try {
            const id = 6;
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
            <div className='position-relative'>
                <Link href="/BlogDetails">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_BANNERS_PATH_DIR}${bannerData}`}
                        width={100}
                        height={70}
                        layout='responsive'
                        objectFit='cover' />

                    <button type="button" className="BlogButton fw-semibold">Read Story</button>
                </Link>


            </div>
        </>
    )
}
export default BlogBanner