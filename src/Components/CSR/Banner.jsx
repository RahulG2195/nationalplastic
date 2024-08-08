"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

const Banner = () => {
    const [bannerData, setBannerData] = useState(null);
    const [error, setError] = useState(null);

    // Fetch banner data
    const fetchBannerData = async () => {
        try {
            const id = 1;
            const response = await axios.get(`/api/heroBanners`, { params: { id } });
            setBannerData(response.data.bannerData);
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
            {error && <p>{error}</p>}
            {bannerData && (
                <Image
                    src={`/Assets/uploads/${bannerData.image}`}
                    width={100}
                    height={80}
                    layout='responsive'
                    objectFit='cover'
                    className='banner'
                    alt="Banner image"
                />
            )}
        </>
    );
};

export default Banner;
