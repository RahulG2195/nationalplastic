import React from "react";
import Image from "next/image";
import "../../../styles/TabContent.css";

const TabContent = ({ activeTab, prodDetail }) => {
  let heading = "";
  let content = "";
  let img = "";
  const firstProductData = prodDetail?.[0]; // Use optional chaining

  //  console.log(firstProductData?.features);
  // const productData = prodDetail[0];

  // console.dir(prodDetail[0]);
  // prodDetail.map(data => {
  //     console.log('inner data' + data);
  // })
  console.log("first product", firstProductData);
  console.log("first product", firstProductData?.descp);

  switch (activeTab) {
    case "description":
      heading = "Description";
      content = firstProductData?.descp;
      img = "/Assets/images/Image 5/Image 5.png";
      break;
    case "merchant-details":
      heading = "Merchant Details";
      content = firstProductData?.descp;
      img = "/Assets/images/Image 5/Image 5.png";
      break;
    case "care-instruction":
      heading = "Care & Instruction";
      content = firstProductData?.careAndInstruct;
      img = "/Assets/images/Image 5/Image 5.png";
      break;
    case "delivery-instructions":
      heading = "Delivery Instructions";
      content = firstProductData?.deliveryInsct;
      img = "/Assets/images/Image 5/Image 5.png";
      break;
    case "warranty":
      heading = "Warranty";
      content = firstProductData?.warranty;
      img = "/Assets/images/Image 5/Image 5.png";

      break;
    case "t-and-c":
      heading = "T & C";
      content = firstProductData?.descp;
      img = "/Assets/images/Image 5/Image 5.png";

      break;
    case "faqs":
      heading = "FAQ'S";
      content = firstProductData?.descp;

      img = "/Assets/images/Image 5/Image 5.png";
      break;
    case "disclaimer":
      heading = "Disclaimer";
      content = firstProductData?.descp;
      img = "/Assets/images/Image 5/Image 5.png";

      break;
    default:
      heading = "Default Heading";
      content = "Default content goes here.";
      break;
  }

  return (
    <>
      <div class="tab-content" id="myTabContent">
        <div class="row justify-content-center">
          <div
            class="col-sm-12 col-md-8 p-5 tab-pane fade show active fw-bold mt-3"
            id={activeTab}
            role="tabpanel"
            aria-labelledby={`${activeTab}-tab`}
          >
            <h3>{heading}</h3>
            <p>{content}</p>
          </div>

          <div class="col-sm-12 col-md-6 imgCont">
            <Image
              src={img}
              width={100}
              height={100}
              layout="responsive"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TabContent;
