"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { Alert, Skeleton } from "antd";
import "../../styles/productCatalogue.css";

const Catalogue = () => {
  const [bannerData, setBannerData] = useState(null);
  const [brochures, setBrochures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch banner data
        const id = 5;
        const response = await axios.get(`/api/heroBanners`, {
          params: { id },
        });
        setBannerData(response.data.bannerData);

        // Fetch brochures
        const brochuresResponse = await axios.get("/api/admin/brochures");
        if (brochuresResponse.data.success) {
          setBrochures(brochuresResponse.data.brochures);
        }
      } catch (err) {
        setError("Failed to load catalogue data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <Skeleton.Image active style={{ width: "100%", height: "300px" }} />
        <div className="row mt-4">
          {[1, 2].map((item) => (
            <div className="col-md-6" key={item}>
              <div className="productCatalogue">
                <div className="row">
                  <div className="col-md-4 productCatalogueImage">
                    <Skeleton.Image
                      active
                      style={{ width: "100%", height: "150px" }}
                    />
                  </div>
                  <div className="col-md-8 productCatalogueData">
                    <Skeleton active paragraph={{ rows: 2 }} />
                    <Skeleton.Button active style={{ width: "120px" }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  return (
    <div className="container">
      {bannerData && (
        <div className="">
          <Image
            src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_BANNERS_PATH_DIR}${bannerData.image}`}
            className="img-fluid d-block w-100"
            alt={bannerData.alt_text || "Product Catalogue Banner"}
            width={100}
            height={100}
            layout="responsive"
            objectFit="cover"
            priority
          />

        </div>
      )}

      <div className="row">
        {brochures.map((brochure) => (
          <div className="col-md-6" key={brochure.id}>
            <div className="productCatalogue">
              <div className="row">
                <div className="col-md-4 productCatalogueImage">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_BROCHURE}${brochure.image}`}
                    width={100}
                    height={100}
                    layout="responsive"
                    objectFit="cover"
                    alt={brochure.title}
                  />
                  {/* <img src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_BROCHURE}${brochure.image}`} alt="" /> */}
                </div>
                <div className="col-md-8 productCatalogueData">
                  <h2>{brochure.title}</h2>
                  <p>
                    <i>
                      Updated on{" "}
                      {new Date(brochure.created_at).toLocaleDateString(
                        "en-US",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </i>
                  </p>
                  <a
                    href={`/Assets/images/catalogue/pdf/${brochure.pdf}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="catalogueButton">View Brochure</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogue;
