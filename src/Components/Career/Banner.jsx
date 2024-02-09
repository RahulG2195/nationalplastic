"use client"
import React from "react";
import Image from 'next/image'
import './Banner.css'


const Banner = () => {

    return (
        <>

            <div className="main_Container">


                <div className="Img_cont position-relative" >
                    <Image
                        src="/assets/images/Career-pg-banner.jpg-V2/Career-pg-banner.jpg-V2.png"
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