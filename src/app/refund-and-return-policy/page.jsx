"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";



const RefundPolicy = () => {
  const [pageContents, setPageContents] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bannerImage, setBannerImage] = useState("");

  useEffect(() => {
    async function fetchPageContent() {
      try {
        const response = await axios.get("/api/Termsandcondition?page=Refund");
        if (response.status === 200 && response.data.results.length > 0) {
          const { content , banner_image} = response.data.results[0];
          setPageContents(content);
          setBannerImage(banner_image);

        } else {
          setError("No content available.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPageContent();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Image
        src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_BANNERS_PATH_DIR}${bannerImage}`}
        width={100}
        height={80}
        layout="responsive"
        objectFit="cover"
        alt="Privacy Policy Banner"
      />
      <div className="text-center fw-bold my-5">
        <div className="title2 fs-1">Refund Policy</div>
      </div>
      <div
        className="privacyText p-5 mt-5 px-md-5 TCTxt"
        dangerouslySetInnerHTML={{ __html: pageContents }}
      />
    </>
  );
};

export default RefundPolicy;
