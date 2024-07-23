"use client";
import TopPics from "../ProductsCatlogue/TopPics";
import TopPicsCard from "../TopPicsCard/TopPicsCard";
import GetQuoteForm from "./GetQuoteForm";
import "./GetQuote.css";
import { useState, useEffect } from "react";
import { notifyError } from "@/utils/notify";
import { imageData } from "./getQuoteConfig.js";
import GetQuoteCustomForm from "./GetQuoteCustomForm";
import { Modal } from 'bootstrap';

const GetQuote = ({ proddata }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [modalProductName, setModalProductName] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleImageClick = (imageName) => {
    const selectedImages = selectedImage ? selectedImage.split(",") : [];

    if (isMobile) {
      // On mobile, just add the image to the selection without checking if it's already added
      setSelectedImage((prevSelectedImage) =>
        prevSelectedImage ? `${prevSelectedImage},${imageName}` : imageName
      );
      setModalProductName(imageName);
      const modalElement = document.getElementById("exampleModal");
      if (modalElement) {
        const modal = new Modal(modalElement);
        modal.show();
      }
    } else {
      // On non-mobile, check if the image is already selected
      if (!selectedImages.includes(imageName)) {
        setSelectedImage((prevSelectedImage) =>
          prevSelectedImage ? `${prevSelectedImage},${imageName}` : imageName
        );
      } else {
        notifyError("Already Added to Form");
      }
    }
  };

  const handleProductRemove = (productToRemove) => {
    const selectedImages = selectedImage ? selectedImage.split(",") : [];
    const newSelectedImages = selectedImages.filter((product) => product !== productToRemove).join(",");
    setSelectedImage(newSelectedImages);
  };

  const firstSixImages = imageData.slice(0, 6);
  const remainingImages = imageData.slice(6);

  return (
    <>
      <div className="main_container my-5">
        <div className="row Qt_cont">
          <div className="col-lg-8 col-md-12 col-12 round_prod p-0 p-md-5 p-lg-5 pt-0">
            <div className="row top_products">
              {firstSixImages.map((data, index) => (
                <div
                  key={index}
                  onClick={() => handleImageClick(data.imgText)}
                  className="col-lg-4 col-xl-4 col-md-4 col-sm-12 col-xs-12 col-12 mt-5 d-flex justify-content-center"
                >
                  <TopPicsCard
                    imgSrc={data.imgSrc}
                    imgtext={data.imgText}
                    color={data.color}
                    ReDirect={true}
                    onGetQuote={handleImageClick}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* multi prod form */}
          <div className={`col-lg-4 col-md-12 mt-5 ${isMobile ? 'd-none' : 'd-block'}`}>
            <div className="text-center fw-bold">
              <div className="form_title">
                GET <span className="text-danger">QUOTE</span>
              </div>
            </div>
            <GetQuoteForm product={selectedImage} onProductRemove={handleProductRemove} />
          </div>
        </div>

        {/* Remaining products */}
        <div className="row gap-3 justify-content-center align-items-center mt-0 mt-md-5 mt-lg-5">
          {remainingImages.map((data, index) => (
            <div
              key={index}
              onClick={() => handleImageClick(data.imgText)}
              className="col-lg-2 col-md-4 col-sm-4 col-8 mt-5"
            >
              <TopPicsCard
                imgSrc={data.imgSrc}
                imgtext={data.imgText}
                color={data.color}
                ReDirect={true}
                onGetQuote={handleImageClick}
                data-bs-toggle={isMobile ? "modal" : undefined}
                data-bs-target={isMobile ? "#exampleModal" : undefined}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isMobile && (
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content modal-content-mypopup">
              <div className="modal-body">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
                <GetQuoteCustomForm prodName={modalProductName} read={"true"} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GetQuote;
