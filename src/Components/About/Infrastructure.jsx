"use client";
import { useState, useEffect,useRef } from "react";
import axios from "axios";
import "../../styles/about.css";
import Image from "next/image";
import ComapnyProfileSidebar from "./ComapnyProfileSidebar";
import "@/app/(Aboutus)/company-profile/companyprofile.css"
import ContactUsCard from "@/Components/ContactUs/ContactUsCard";

function Infrastructure() {
  const [infrastructureData, setInfrastructureData] = useState([]);
  const factoryUnitsRef = useRef(null);

  const FactoryUnitsArr = [
    {
      key: 1,
      title: "Silvassa",
      location:
        "Plot No. 263, Village Dadra, Silvassa Union Territory of Dadra Nagarhaveli, (Near Dadra 66 KVA Sub-station, 6 KM from Vapi)",
      phone: "+91-9978444982",
      email: "info@nationalplastic.com",
    },
    {
      key: 2,
      title: "Patna",
      location: "Plot No. B-1 to B-7, Industrial Area,Fatuha, Patna",
      phone: "+91-8929813491",
      email: "info@nationalplastic.com",
    },
    {
      key: 3,
      title: "Nellore",
      location:
        "SY. No. 283, 297, 298, APIIC Indl. Park, Menakur, Village Naidupeth Mandal, SPSR, Nellore - 524126.",
      phone: "+91-9908798433",
      email: "info@nationalplastic.com",
    },
    // {
    //   key: 4,
    //   title: "Lorem ipsum",
    //   location: "D-92, Meerut Road, Indl Area, Ghaziabad, U.P. India",
    //   phone: "+91-9219220368, +91- 9213090354",
    //   email: "info@nationalplastic.com",
    // },
  ];

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
      <div className="col-12 col-md-8 order-2 order-md-1 order-lg-1 mob_content">
        <div className="text-center mb-md-5 py-md-5 py-2">
          <div className="fs-1 darkBlue fw-normal">
            Infra<span className="fs-1 fw-bold text-danger">structure</span>{" "}
          </div>
          <div className="mt-1 fw-medium subCptRes w-70">
            <p className="mx-5 my-5 text-justify ">{mainInfo.description}</p>
          </div>
        </div>
        <div className="row infrastructure-row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <div className="india-map-image float-end">
              <a href={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_ABOUT_PATH_DIR}${mainInfo.image_url}`} target="blank">
              {/* <a href={`/#`}> */}
              <Image
                src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_ABOUT_PATH_DIR}${mainInfo.image_url}`}
                className="img-fluid d-block w-100"
                alt="map image"
                width={100}
                height={100}
                layout="responsive"
                objectFit="cover  "
              />
              </a>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-8 col-xs-8 india-map-text float-start w-20">
            {additionalInfo.map((info, index) => (
              <p key={index} className=" text-justify fs-6 fw-semibold infraTextrsp">
                {info.description}
              </p>
            ))}
          </div>
        </div>
        <div className="row BranchOfficescards ">
          {FactoryUnitsArr.map((val) => (
            <div className="col-md-6 col-lg-4 col-12" key={val.key}>
              <ContactUsCard
                title={val.title}
                location={val.location}
                phone={val.phone}
                email={val.email}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="col-12 col-md-4 order-1 order-md-2 order-lg-2 d-flex d-md-block d-lg-block justify-content-center ">
        <ComapnyProfileSidebar title={mainInfo.title} />
      </div>
    </div>
    
  );
}

export default Infrastructure;