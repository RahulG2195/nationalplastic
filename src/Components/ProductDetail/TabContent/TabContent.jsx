import React from "react";
import Image from "next/image";
import "../../../styles/TabContent.css";

const TabContent = ({ activeTab, prodDetail }) => {
  
  let heading = "";
  let content = "";
  let img = "";
  const faq_disclaimer = `
  Frequently Asked Questions (FAQs) - Plastic Chair:
  
  Q: Is this chair suitable for outdoor use?
  A: Yes, this chair is designed for both indoor and outdoor use. However, prolonged exposure to extreme weather conditions may cause damage.
  
  Q: Can I leave this chair outside in all weather conditions?
  A: While this chair is weather-resistant, we recommend storing it indoors during harsh weather conditions to prolong its lifespan.
  
  If you have any further questions, please feel free to contact us.
  `;
  switch (activeTab) {
    case "description":
      heading = "Description";
      content = prodDetail?.descp || "NA";
      img = prodDetail.dimension_img ? `${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}${prodDetail.dimension_img}` : ''
      break;
    case "merchant-details":
      heading = "Merchant Details";
      content = prodDetail?.features || "NA";
      img = prodDetail.dimension_img ? `${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}${prodDetail.dimension_img}` : ''
      break;
    case "care-instruction":
      heading = "Care & Instruction";
      content = prodDetail?.careAndInstruct || "NA";
      img = prodDetail.dimension_img ? `${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}${prodDetail.dimension_img}` : ''
      break;
    case "delivery-instructions":
      heading = "Delivery Instructions";
      content = prodDetail?.deliveryInsct || "NA";
      img = prodDetail.dimension_img ? `${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}${prodDetail.dimension_img}` : ''
      break;
    case "warranty":
      heading = "Warranty";
      content = prodDetail?.warranty || "2 Year WARRANTY";
      img = prodDetail.dimension_img ? `${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}${prodDetail.dimension_img}` : ''

      break;
    case "t-and-c":
      heading = "T & C";
      content = prodDetail?.descp || "NA";
      img = prodDetail.dimension_img ? `${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}${prodDetail.dimension_img}` : ''

      break;
    case "faqs":
      heading = "FAQ'S";
      content = faq_disclaimer || "NA";

      img = prodDetail.dimension_img ? `${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}${prodDetail.dimension_img}` : ''
      break;
    case "disclaimer":
      heading = "Disclaimer";
      content =
        "Environment: Avoid placing the chair on uneven surfaces or on slippery floors to prevent accidents.";
      img = prodDetail.dimension_img ? `${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}${prodDetail.dimension_img}` : ''

      break;
    default:
      heading = "Default Heading";
      content = "Default content goes here.";
      break;
  }

  return (
    <>
      <div className="tab-content" id="myTabContent">
        <div className="row justify-content-center">
          <div
            className="col-sm-12 col-md-8 p-5 tab-pane fade show active fw-bold mt-3"
            id={activeTab}
            role="tabpanel"
            aria-labelledby={`${activeTab}-tab`}
          >
            <h3>{heading}</h3>
            <p>{content}</p>
          </div>

          <div className="col-sm-12 col-md-6 imgCont">
            {img && <Image
              src={img}
              width={100}
              height={100}
              layout="responsive"
              objectFit="cover"
              alt="img"
            />}
          </div>
        </div>
      </div>
    </>
  );
};

export default TabContent;
