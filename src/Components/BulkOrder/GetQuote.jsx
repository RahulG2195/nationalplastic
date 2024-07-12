"use client";
import TopPics from "../ProductsCatlogue/TopPics";
import TopPicsCard from "../TopPicsCard/TopPicsCard";
import GetQuoteForm from "./GetQuoteForm";
import "./GetQuote.css";
import { useState } from "react";
import { notifyError } from "@/utils/notify";
import { imageData } from "./getQuoteConfig.js";
const GetQuote = ({ proddata }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imageName) => {
    const selectedImages = selectedImage ? selectedImage.split(",") : [];

    if (!selectedImages.includes(imageName)) {
      setSelectedImage((prevSelectedImage) =>
        prevSelectedImage ? `${prevSelectedImage},${imageName}` : imageName
      );
    } else {
      notifyError("Already Added to Form");
    }
  };

  const chunkArray = (arr, size) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArray.push(arr.slice(i, i + size));
    }
    return chunkedArray;
  };



  
  const firstSixImages = imageData.slice(0, 6);
  const remainingImages = imageData.slice(6);

  return (
    <>
      <div className="main_container">
        <div className="row Qt_cont mt-5">
          <div className="col-lg-6 col-md-12 round_prod">
            <div className="row top_products">
              {firstSixImages.map((data, index) => (
                <div
                  key={index}
                  onClick={() => handleImageClick(data.imgText)}
                  className="col-lg-4 col-md-4 col-sm-4 col-xs-6 col-6 mt-5"
                >
                  <TopPicsCard
                    imgSrc={data.imgSrc}
                    imgtext={data.imgText}
                    ReDirect={true}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* multi prod form  */}
          <div className="col-lg-6 col-md-12 mt-5">
            <div className="text-center fw-bold">
              <div className="form_title">
                GET <span className="text-danger">QUOTE</span>
              </div>
            </div>
            <GetQuoteForm product={selectedImage} />
          </div>
        </div>

        {/* Remaining products */}
        <div className="row remaining_products mt-5 container-fluid mx-auto">
          {remainingImages.map((data, index) => (
            <div
              key={index}
              onClick={() => handleImageClick(data.imgText)}
              className="col-lg-2 col-md-4 col-sm-4 col-xs-6 col-6 mt-5"
            >
              <TopPicsCard
                imgSrc={data.imgSrc}
                imgtext={data.imgText}
                ReDirect={true}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GetQuote;