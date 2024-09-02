"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/about.css";
import Image from "next/image";
import ComapnyProfileSidebar from "./ComapnyProfileSidebar";
import "../../app/Companyprofile/companyprofile.css";

function Infrastructure() {
  const [infrastructureData, setInfrastructureData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/admin/Aboutus/infra');
        setInfrastructureData(response.data.data);
      } catch (error) {
        console.error("Error fetching infrastructure data:", error);
      }
    };

    fetchData();
  }, []);

  if (infrastructureData.length === 0) {
    return <div>Loading...</div>;
  }

  const mainInfo = infrastructureData[0];
  const additionalInfo = infrastructureData.slice(1);

  return (
    <div className="py-5 mx-auto row justify-content-center">
      <div className="col-12 col-md-8 order-2 order-md-1 order-lg-1">
        <div className="text-center mb-md-5">
          <div className="fs-1 darkBlue fw-normal">
            Infra<span className="fs-1 fw-bold text-danger">structure</span>{" "}
          </div>
          <div className="mt-1 fw-medium subCptRes w-70">
            <p className="p-0">{mainInfo.description}</p>
          </div>
        </div>
        <div className="row infrastructure-row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <div className="india-map-image float-end">
              <Image
                src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_ABOUT_PATH_DIR}${mainInfo.image_url}`}
                className="img-fluid d-block w-70"
                alt="map image"
                width={100}
                height={100}
                layout="responsive"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-8 col-xs-8 india-map-text float-start w-20">
            {additionalInfo.map((info, index) => (
              <p key={index} className="fs-6 fw-semibold infraTextrsp">
                {info.description}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="col-12 col-md-4 order-1 order-md-2 order-lg-2">
        <ComapnyProfileSidebar title={mainInfo.title} />
      </div>
    </div>
  );
}

export default Infrastructure;