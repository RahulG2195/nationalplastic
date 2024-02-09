// AboutSlider.js
import Image from "next/image";
import React from "react";
import './InvestorsSliderCard.css'

const InvestorSliderCard = (props) => {
  return (
    <>
      <div className="h-100 w-100 bgimginvestors position-relative mt-5">

        <Image
          src={props.bgimage}
          className="image" // Use w-100 to make the image fill the entire col-lg col-md-3 col-sm-12umn
          alt="Team Member"
          width={100}
          height={100}
          layout="responsive"
          objectFit="cover"
        />
        <div>
          <p className="darkBlue fw-bold ">{props.title}</p>
          <button className="btn btn-danger"> Read More</button>
        </div>
        <div className="InvestorSrNo ">
          <Image
            src="/Assets/images/investors/Card-Top-1.png"
            className="img-fluid d-block w-10" // Use w-100 to make the image fill the entire col-lg col-md-3 col-sm-12umn
            alt="Team Member"
            width={100}
            height={100}
            layout="responsive"
            objectFit="cover"
          />
        </div>

      </div>
    </>
  );
};

export default InvestorSliderCard;