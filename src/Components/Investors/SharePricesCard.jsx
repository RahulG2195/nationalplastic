import Image from "next/image";
import "../../styles/about.css";

const SharePricesCard = ({image, title, description}) => {
    return (
      <div className="vmcontainer py-5 px-5"> 
        <Image
              src={image}
              className="img-fluid " // Use w-100 to make the image fill the entire col-lg col-md-3 col-sm-12umn
              alt="Team Member"
              width={100}
              height={50}
              layout="responsive"
              objectFit="contain"
            />
            <p className="share-pricei-title py-3">{title}</p>
           <p className="pb-5 fw-medium">{description}</p>
      </div>
    );
  };
  
  export default SharePricesCard;