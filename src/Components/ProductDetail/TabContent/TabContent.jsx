import React from "react";
import Image from "next/image";
import "../../../styles/TabContent.css";

const TabContent = ({ activeTab, prodDetail }) => {
  let heading = "";
  let content = "";
  let img = "";
  const firstProductData = prodDetail?.[0]; // Use optional chaining
  // console.log("-1-", prodDetail);
  // console.log(firstProductData?.features);
  const productData = prodDetail[0];

  // console.dir(prodDetail[0]);
  // prodDetail.map((data) => {
  //   console.log("inner data" + data);
  // });
  // console.log("first product", firstProductData);
  // console.log("first product", firstProductData?.descp);
  const faq_disclaimer = `
  Frequently Asked Questions (FAQs) - Plastic Chair:
  
  Q: Is this chair suitable for outdoor use?
  A: Yes, this chair is designed for both indoor and outdoor use. However, prolonged exposure to extreme weather conditions may cause damage.
  
  Q: Can I leave this chair outside in all weather conditions?
  A: While this chair is weather-resistant, we recommend storing it indoors during harsh weather conditions to prolong its lifespan.
  
  If you have any further questions, please feel free to contact us.
  `;
  const deliveryInstructions = `
  **Delivery Instructions:**

  - Your plastic chair will be delivered to the address provided during checkout.
  
  - Please ensure that someone is available to receive the delivery at the specified address.
  
  - The delivery team will not be responsible for any installation or assembly of the chair.
  `;

  // Care Instructions
  const careInstructions = `
  **Care & Maintenance:**

  - Regularly inspect the chair for any signs of damage or wear.
  
  - Clean with mild soap and water as needed. Avoid using harsh chemicals or abrasive materials as they may damage the chair's surface.
  
  - Avoid placing the chair on uneven surfaces or on slippery floors to prevent accidents.
  
  - While this chair is weather-resistant, prolonged exposure to extreme weather conditions may cause damage. Store indoors during harsh weather conditions.
  
  - Always supervise children while they are using the chair. 
  `;
  switch (activeTab) {
    case "description":
      heading = "Description";
      content = firstProductData?.descp;
      img = "/Assets/images/Image 5/Image 5.png";
      break;
    case "merchant-details":
      heading = "Merchant Details";
      content = firstProductData?.features;
      img = "/Assets/images/Image 5/Image 5.png";
      break;
    case "care-instruction":
      heading = "Care & Instruction";
      content = firstProductData?.careAndInstruct || careInstructions;
      img = "/Assets/images/Image 5/Image 5.png";
      break;
    case "delivery-instructions":
      heading = "Delivery Instructions";
      content = firstProductData?.deliveryInsct || deliveryInstructions;
      img = "/Assets/images/Image 5/Image 5.png";
      break;
    case "warranty":
      heading = "Warranty";
      content = firstProductData?.warranty || "2 Year WARRANTY";
      img = "/Assets/images/Image 5/Image 5.png";

      break;
    case "t-and-c":
      heading = "T & C";
      content = firstProductData?.descp;
      img = "/Assets/images/Image 5/Image 5.png";

      break;
    case "faqs":
      heading = "FAQ'S";
      content = faq_disclaimer;

      img = "/Assets/images/Image 5/Image 5.png";
      break;
    case "disclaimer":
      heading = "Disclaimer";
      content =
        "Environment: Avoid placing the chair on uneven surfaces or on slippery floors to prevent accidents.";
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
              alt="img"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TabContent;
