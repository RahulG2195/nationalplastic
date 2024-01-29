import Image from "next/image";
import "../../styles/about.css";

const SharePricesCard = ({image, title, description}) => {
    return (
      <div className="vmcontainer"> 
        <Image
              src={image}
              className="img-fluid d-block w-100" // Use w-100 to make the image fill the entire col-lg col-md-3 col-sm-12umn
              alt="Team Member"
              width={100}
              height={100}
              layout="responsive"
              objectFit="cover"
            />
            <p className="share-pricei-title">{title}</p>
           <p>{description}</p>
      </div>
    );
  };
  
  export default SharePricesCard;