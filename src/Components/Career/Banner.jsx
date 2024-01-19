"use client"
import React from "react";
import Image from 'next/image'
import './Banner.css'


const Banner = () => {

    return (
        <>

            <div className="main_Container">


                <div className="Img_cont" >
                    <Image
                        src="/Assets/images/Career-pg-banner.jpg-V2/Career-pg-banner.jpg-V2.png"
                        width={100}
                        height={80}
                        layout='responsive'
                        objectFit='cover'
                        alt="Picture of the author"
                    />
                    <button type="button" class="btn btn-danger Btn px-5 py-2 mt-2">VIEW OPENIGS</button>
                </div>

            </div>




        </>
    )

}
export default Banner;