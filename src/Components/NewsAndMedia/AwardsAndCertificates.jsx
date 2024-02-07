import React from "react";
import "./AwardsAndCertificates.css"
import Card from "../Cards/Card"


const AwardsAndCertificates = () => {

    return (
        < div className="main_container mt-5">

            <div className="text-center">
                <div className=" title2 fs-1"> Awards & <span className="fw-bold text-danger">Certificates</span> </div>
                <div className=" mt-1 fw-normal subCptRes"><p>National has been awarded as per the number of one exporter of Plastic Furniture category for three </p>
                    <p>consecutive by year by The Plastic Export Promotion Council(Popularly known as PLEXCOCIL) </p>
                    <p>Sponsored by the Ministry of Commerce & Industry, Department of Commerce, Govermentof India.</p>
                </div>
            </div>

            <div className="container text-center mt-5">
                <div className="row">
                    <div className="col-md-3 my-2"><Card imgsrc="https://picsum.photos/539/354" /></div>
                    <div className="col-md-3 my-2"><Card imgsrc="https://picsum.photos/539/354" /></div>
                    <div className="col-md-3 my-2"><Card imgsrc="https://picsum.photos/539/354" /></div>
                    <div className="col-md-3 my-2"><Card imgsrc="https://picsum.photos/539/354" /></div>
                </div>
                <div className="row">
                    <div className="col-md-3 my-2"><Card imgsrc="https://picsum.photos/539/354" /></div>
                    <div className="col-md-3 my-2"><Card imgsrc="https://picsum.photos/539/354" /></div>
                    <div className="col-md-3 my-2"><Card imgsrc="https://picsum.photos/539/354" /></div>
                    <div className="col-md-3 my-2"><Card imgsrc="https://picsum.photos/539/354" /></div>
                </div>
                <div className="row">
                    <div className="col-md-3 my-2"><Card imgsrc="https://picsum.photos/539/354" /></div>
                    <div className="col-md-3 my-2"><Card imgsrc="https://picsum.photos/539/354" /></div>
                    <div className="col-md-3 my-2"><Card imgsrc="https://picsum.photos/539/354" /></div>
                    <div className="col-md-3 my-2"><Card imgsrc="https://picsum.photos/539/354" /></div>
                    <div class="container text-center mt-5">
                        <div class="row">
                            <div class="col-md-3 col-sm-6 my-2"><Card imgsrc="https://picsum.photos/539/354" /></div>
                            <div class="col-md-3 col-sm-6 my-2"><Card imgsrc="https://picsum.photos/539/354" /></div>
                            <div class="col-md-3 col-sm-6 my-2"><Card imgsrc="https://picsum.photos/539/354" /></div>
                            <div class="col-md-3 col-sm-6 my-2"><Card imgsrc="https://picsum.photos/539/354" /></div>
                        </div>
                        <div class="row">
                            <div class="col-md-3 col-sm-6 my-2"><Card imgsrc="https://picsum.photos/539/354" /></div>
                            <div class="col-md-3 col-sm-6 my-2"><Card imgsrc="https://picsum.photos/539/354" /></div>
                            <div class="col-md-3 col-sm-6 my-2"><Card imgsrc="https://picsum.photos/539/354" /></div>
                            <div class="col-md-3 col-sm-6 my-2"><Card imgsrc="https://picsum.photos/539/354" /></div>
                        </div>
                        <div class="row">
                            <div class="col-md-3 col-sm-6 my-2"><Card imgsrc="https://picsum.photos/539/354" /></div>
                            <div class="col-md-3 col-sm-6 my-2"><Card imgsrc="https://picsum.photos/539/354" /></div>
                            <div class="col-md-3 col-sm-6 my-2"><Card imgsrc="https://picsum.photos/539/354" /></div>
                            <div class="col-md-3 col-sm-6 my-2"><Card imgsrc="https://picsum.photos/539/354" /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default AwardsAndCertificates; 