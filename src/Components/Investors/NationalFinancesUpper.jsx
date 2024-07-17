// import Image from "next/image";
import "../../styles/investor.css";

const NationalFitnessUpper = ({title, description}) => {
  return (
        <div className="NationalFitnessUpp-text  py-5 mx-5">
          <h2>{title}</h2>
          <p className="text-center m-0 medium ">{description}</p>
        </div>
      
  );
}
export default NationalFitnessUpper;