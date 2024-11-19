import React from "react";
import "./AwardsAndCertificates.css";
import Card from "../Cards/Card";

const AwardsAndCertificates = () => {
  return (
    <div className="main_container mt-5">
      <div className="text-center mb-5 ">
        <div className="fs-1 fw-bold text-danger">
          Awards & <span className="darkBlue fw-normal">Certifiactes</span>{" "}
        </div>
        <div className="mt-1 fw-medium subCptRes w-md-50">
          <p>
            National has been awarded as the number one exporter in the Plastic
            Furniture category by The Plastics Export Promotion Council
            (popularly known as PLEXCONCIL) sponsored by the Ministry of
            Commerce & Industry, Department of Commerce, Government of India.
            National is also accredited as a One Star Export House, the most
            distinguished title by the Ministry of Commerce & Industry,
            Directorate General of Foreign Trade, Government of India.
          </p>
        </div>
      </div>

      <div className="container text-center mt-5 px-md-5">
        <div className="row">
          <div className="col-md-3 my-2">
            <Card imgsrc="https://picsum.photos/539/354" />
          </div>
          <div className="col-md-3 my-2">
            <Card imgsrc="https://picsum.photos/539/354" />
          </div>
          <div className="col-md-3 my-2">
            <Card imgsrc="https://picsum.photos/539/354" />
          </div>
          <div className="col-md-3 my-2">
            <Card imgsrc="https://picsum.photos/539/354" />
          </div>
          <div className="col-md-3 my-2">
            <Card imgsrc="https://picsum.photos/539/354" />
          </div>
          <div className="col-md-3 my-2">
            <Card imgsrc="https://picsum.photos/539/354" />
          </div>
          <div className="col-md-3 my-2">
            <Card imgsrc="https://picsum.photos/539/354" />
          </div>
          <div className="col-md-3 my-2">
            <Card imgsrc="https://picsum.photos/539/354" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwardsAndCertificates;
