import Image from "next/image";

const AboutCTA = ({title, description}) => {
    return (
      <div className="vmcontainer py-5 "> 
        {/* {(image!== "") ? <Image src= {image}/> : ''} */}
        <h2 className="py-2">{title}</h2>
        <p  className="px-4 pb-4 medium fw-semibold vmcont">{description}</p>
      </div>
    );
  };
  
  export default AboutCTA;