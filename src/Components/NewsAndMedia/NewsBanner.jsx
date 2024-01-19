"use client"
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Image from 'next/image'




const NewsBanner = () => {
    return (

        <Image
        src="/Assets/images/Media_-News-banner/Media_-News-banner.png"
        width={100}
        height={80}
        layout='responsive'
        objectFit='cover'
        alt="Picture of the author"
      />

    )
}

export default NewsBanner
