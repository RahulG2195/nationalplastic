"use client";
import TopPics from "../ProductsCatlogue/TopPics";
import TopPicsCard from "../TopPicsCard/TopPicsCard";
import GetQuoteForm from "./GetQuoteForm";
import "./GetQuote.css";
import { useState } from "react";
import { notifyError } from "@/utils/notify";
const GetQuote = ({ proddata }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imageName) => {
    // Split the selectedImage string into an array of image names
    const selectedImages = selectedImage ? selectedImage.split(",") : [];

    // Check if the new image is already present in the array
    if (!selectedImages.includes(imageName)) {
      // If not present, append the new image name
      setSelectedImage((prevSelectedImage) =>
        prevSelectedImage ? `${prevSelectedImage},${imageName}` : imageName
      );
    } else {
      // Handle the case where the image is already selected (optional)
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

  //   console.log('quotes' + proddata);
  const imageData = [
    {
      imgSrc:
        "/Assets/images/circular/Karnival-Chair.jpg-2/Karnival-Chair.jpg-2.png",
      imgText: "KARNIVAL CHAIR",
    },
    {
      imgSrc: "/Assets/images/circular/Saab-Chair/Saab-Chair.jpg-2@2x.png",
      imgText: "SAAB CHAIR",
    },
    {
      imgSrc: "/Assets/images/circular/Storm-Chair/Storm-Chair.png",
      imgText: "STROM CHAIR",
    },
    {
      imgSrc: "/Assets/images/circular/Solace-chair/Solace-chair.png",
      imgText: "SOLACE CHAIR",
    },
    {
      imgSrc: "/Assets/images/circular/Orca-Chair 2/Orca-Chair 2.png",
      imgText: "ORCA CHAIR",
    },
    {
      imgSrc: "/Assets/images/circular/Karen-Chair/Karen-Chair.jpg-2.png",
      imgText: "KAREN CHAIR",
    },
    {
      imgSrc: "/Assets/images/circular/Ghost-Chair/Ghost-Chair.png",
      imgText: "GHOST CHAIR",
    },
    {
      imgSrc: "/Assets/images/circular/Magna-Chair/Magna-Chair.jpg-2.png",
      imgText: "MAGNA CHAIR",
    },
    {
      imgSrc:
        "/Assets/images/circular/Merc-Sofa-Chair/Merc-Sofa-Chair.jpg-2.png",
      imgText: "MERC SOFA",
    },
  ];
  //   console.log('datas' + chunkArray(proddata, 9));
  return (
    <>
      <div className="main_container">
        <div className="row Qt_cont mt-5">
          <div className="col-lg-6 col-md-12 round_prod">
            <div className="row">
              {imageData.map((data, index) => (
                <div
                  key={index}
                  onClick={() => handleImageClick(data.imgText)}
                  className="col-lg-4 col-md-4 col-sm-4 col-xs-6 mt-5"
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
      </div>
    </>
  );
};

export default GetQuote;
