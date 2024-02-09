"use client"
import React, { useState } from 'react'
import Image from 'next/image'

const Banner = () => {
    return (
        <>
            <Image
                src="/Assets/images/CSR-Banner/CSR-Banner.png"
                width={100}
                height={80}
                layout='responsive'
                objectFit='cover'
                alt="Picture of the author"
            />


        </>
    )
}

export default Banner ;
