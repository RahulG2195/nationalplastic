import Image from "next/image";
import "./TopPicsCard.css";
import Link from "next/link";
import { useState } from "react";

const TopPicsCard = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleGetQuote = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (props.onGetQuote) {
      props.onGetQuote(props.imgtext);
    }
  };

  const CardContent = () => (
    <div
      className="circularCard d-flex flex-column align-items-center position-relative text-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="circularimg mb-3 ">
        <Image
          className="image"
          src={props.imgSrc}
          width={100}
          height={100}
          layout="responsive"
          objectFit="cover"
          alt="Picture of the author"
        />
      </div>

      {props.imgtext.trim() === "" ? (
        <div className="z-5 no-hover">
          <div className="GqRmbtnRes">
            <button className="btn small bg-danger p-1 fw-semibold text-white" onClick={handleGetQuote}>
              Get Quote
            </button>
            <button className="btn small bg-black p-1 fw-semibold text-white mx-2">
              Read More
            </button>
            <i className="fa fa-heart-o" aria-hidden="true"></i>
          </div>
        </div>
      ) : (
        <div className="mx-2 mb-4">
          <span className=" d-inline small fw-bold text-danger" >National Plastic</span>
          <p className="circularText ms-1 fw-bold d-inline">
            {props.imgtext}
          </p>
          <span className=" d-inline small fw-bold " >{`(${props.color})`}</span>

        </div>
      )}

      {isHovered && props.imgtext.trim() !== "" && (
        <button onClick={handleGetQuote} className="get-quote-btn">
          Get Quote
        </button>
      )}
      {/* {isHovered && props.imgtext.trim() !== "" && !isSelected && (
  <button onClick={handleGetQuote} className="get-quote-btn">
    Get Quote
  </button>
)} */}
    </div>
  );

  return (
    <div className="main">
      {props.ReDirect ? (
        <CardContent />
      ) : (
        <Link href="/ProductDetail" id="nav-link">
          <CardContent />
        </Link>
      )}
    </div>
  );
};

export default TopPicsCard;