import Image from "next/image";
import "../../styles/contactus.css"

const ContactUsCard = ({ title, location, phone, email }) => {
  return (
    <div className="BranchOfficesCardCont">
      <h5>{title}</h5>
      <div className="BranchOfficesCard pt-4">
        <div className="BranchOfficesCardIcon">
          <i className="fa fa-map-marker fa-icons" aria-hidden="true"></i>
          <p>
            <a href={`https://maps.google.com/?q=${encodeURIComponent(location)}`}>
              {location}
            </a>
          </p>
        </div>
        <div className="BranchOfficesCardIcon">
          <i className="fa fa-phone fa-icons2" aria-hidden="true"></i>
          <p>
            <a href={`tel:${phone.replace(/\D/g, '')}`}>
              {phone}
            </a>
          </p>
        </div>
        <div className="BranchOfficesCardIcon">
          <i className="fa fa-envelope-open fa-icons2" aria-hidden="true"></i>
          <p>
            <a href={`mailto:${email}`}>
              {email}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUsCard;