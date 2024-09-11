"use client";
import React, { useEffect, useState } from "react";
import "./PreChairCards.css";
import axios from "axios";
import Image from "next/image";
import "./CatlogueBanner.css";

const CatlogueBanner = ({ catName }) => {
  const [CatBanner, setCatBanner] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/Category`,
        { seo_url: catName }
      );
      const bannerName = response.data.banner_name;
      setCatBanner(bannerName);
    } catch (error) {
      console.error("Error fetching cat banner:", error);
    }
  };

  return (
    <>
      {CatBanner && (
        <div className="main_continer">
          <div className="karen_container position-relative">
            <Image
              src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_BANNERS_PATH_DIR}${CatBanner}`}
              width={100}
              height={60}
              layout="responsive"
              objectFit="cover"
              alt="Picture of the author"
            />
          </div>
        </div>
      )}
    </>
  );
};
export default CatlogueBanner;
