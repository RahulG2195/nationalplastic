import React from "react";
import Card from "../Cards/Card"

const EventsAndActivities = () => {



    return (

        <div className="main_container mt-5">

            <div className="text-center">
                <div className="title2 fs-1"> Events & <span className="fw-bold text-danger">Activities</span> </div>
                <div className=" mt-1 fw-normal subCptRes"><p>join us in the pursuit of a cleaner world - our plastic furniture </p>
                    <p>embodies ,style, comfort and environmental responsibilities.</p>
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
                    <div class="container text-center mt-5">
                        <div class="row">
                            <div class="col-md-4 col-sm-6 my-3"><Card imgsrc="https://picsum.photos/539/354" /></div>
                            <div class="col-md-4 col-sm-6 my-3"><Card imgsrc="https://picsum.photos/539/354" /></div>
                            <div class="col-md-4 col-sm-6 my-3"><Card imgsrc="https://picsum.photos/539/354" /></div>
                            <div class="col-md-4 col-sm-6 my-3"><Card imgsrc="https://picsum.photos/539/354" /></div>
                            <div class="col-md-4 col-sm-6 my-3"><Card imgsrc="https://picsum.photos/539/354" /></div>
                            <div class="col-md-4 col-sm-6 my-3"><Card imgsrc="https://picsum.photos/539/354" /></div>
                        </div>
                    </div>
                </div>
            </div>



        </div>

    )
}

export default EventsAndActivities;