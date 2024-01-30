import Image from "next/image";

const CatalogueCard = ({ image, title, description }) => {
  
  return (
    <>
     <Image
       //   src="/assets/images/catalogue/dummy.png"
       src={image}
       width={100}
       height={100}
       layout="responsive"
       objectFit="cover"
     />
     <h2>{title}</h2>
     <p>
       <i>{description}</i>
     </p>
     <button className="catalogueButton">View Brochure</button>
             
    </>
    )}

export default CatalogueCard;

