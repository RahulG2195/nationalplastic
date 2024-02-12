// AboutSlider.js
import Image from "next/image";
import React from "react";
import './InvestorsSliderCard.css'

const InvestorSliderCard = (props) => {
  const isEven = props.index % 2 === 0;


  return (
    <>
      <div className="h-100 w-100 bgimginvestors position-relative mt-5">

        <Image
          src={props.bgimage}
          className="image"
          alt="Team Member"
          width={100}
          height={100}
          layout="responsive"
          objectFit="cover"
        />
        <div className={props.isEven ? 'even-image' : 'odd-image' }>
          <p className="darkBlue fw-bold ">{props.title}</p>
          <button className="ReadmoreButtonInvestors btn-danger"> Read More</button>
        </div>

      </div>
    </>
  );
};

export default InvestorSliderCard;