import React from "react";
import Card from "../Cards/Card"

const EventsAndActivities = () => {



    return (

        <div className="main_container mt-5">

            <div className="text-center">
                <div className="title2 fs-1"> Events & <span className="fw-bold text-danger">Activities</span> </div>
                <div className=" mt-1 fw-normal">join us in the pursuit of a cleaner world - our plastic furniture <br />
                    embodies ,style, comfort and environmental responsibilities.
                </div>
            </div>

            <div className="container text-center mt-5">
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

export default EventsAndActivities ;