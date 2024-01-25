import Image from "next/image";

const AboutCTA = ({title, description}) => {
    return (
      <div className="vmcontainer"> 
        {/* {(image!== "") ? <Image src= {image}/> : ''} */}
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    );
  };
  
  export default AboutCTA;