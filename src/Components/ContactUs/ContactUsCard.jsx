import Image from "next/image";
import "../../styles/contactus.css"

const ContactUsCard = ({title, location, phone, email }) => {
    return (
       <div className="BranchOfficesCardCont">
            <h5>{title}</h5>
            <div className="BranchOfficesCard">
            <div className="BranchOfficesCardIcon">
                <i class="fa fa-map-marker fa-icons" aria-hidden="true"></i>
                <p>
                {location}
                </p>
              </div>
              <div className="BranchOfficesCardIcon">
                <i class="fa fa-phone fa-icons2" aria-hidden="true"></i>
                <p>{phone}</p>
              </div>
              <div className="BranchOfficesCardIcon">
                <i class="fa fa-envelope-open fa-icons2" aria-hidden="true"></i>
                <p>{email}</p>
              </div>
            </div>
        </div>
    );
  };
  
  export default ContactUsCard;