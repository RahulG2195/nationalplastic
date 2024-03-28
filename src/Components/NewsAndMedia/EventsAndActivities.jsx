import React from "react";
import Card from "../Cards/Card"

const EventsAndActivities = () => {



    return (

        <div className="main_container mt-5">

            <div className="text-center mb-5 ">
                <div className="fs-1 fw-bold text-danger">
                    Events & <span className="darkBlue fw-normal">Activities</span>{" "}
                </div>
                <div className="mt-1 fw-medium subCptRes w-50">
                    <p>
                    Join us in the pursuit of a cleaner world – our plastic furniture embodies style, comfort, and environmental responsibility.
                    </p>
                </div>
            </div>

            <div className="container text-center mt-5 pb-5 mb-5">
                <div className="row">
                    <div className="col-md-4 my-3"><Card imgsrc="https://picsum.photos/539/354" /></div>
                    <div className="col-md-4 my-3"><Card imgsrc="https://picsum.photos/539/354" /></div>
                    <div className="col-md-4 my-3"><Card imgsrc="https://picsum.photos/539/354" /></div>
                    <div className="col-md-4 my-3"><Card imgsrc="https://picsum.photos/539/354" /></div>
                    <div className="col-md-4 my-3"><Card imgsrc="https://picsum.photos/539/354" /></div>
                    <div className="col-md-4 my-3"><Card imgsrc="https://picsum.photos/539/354" /></div>
                </div>
            </div>



        </div>

    )
}

export default EventsAndActivities;