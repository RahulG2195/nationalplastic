import "../../styles/investor.css";
import Image from "next/image";
const FinancialResults = ({ date, text, image }) => {
  return (
    <>
      <h5>{date}</h5>
      <div className="download-btn">
        <div className="Download-p">
          <p>{text}</p>
        </div>
        <div className="Download-img">
          <Image
            src={image}
            classname=" d-block w-70"
            alt="map image"
            width={100}
            height={100}
            layout="responsive"
            objectFit="cover"
          />
        </div>
      </div>
    </>
  );
};
export default FinancialResults;
