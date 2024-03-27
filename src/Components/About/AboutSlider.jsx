// AboutSlider.js
import Image from "next/image";
import React from "react";

const AboutSlider = ({ image, title, description }) => {
  return (
    <>
      <div className="about-slider-yellow px-3">
        <div className="about-slider-image ">
          <Image
            src={image}
            className="img-fluid d-block w-10" // Use w-100 to make the image fill the entire col-lg col-md-3 col-sm-12umn
            alt="Team Member"
            width={100}
            height={100}
            layout="responsive"
            objectFit="cover"
          />
        </div>
        <h2 className="fw-bold text-center">{title}</h2>
        <p className="fw-medium">{description}</p>
        <button>READ MORE</button>
      </div>
    </>
  );
};

export default AboutSlider;