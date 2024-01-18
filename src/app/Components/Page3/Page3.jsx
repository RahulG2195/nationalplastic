import React from "react";
import './Page3.css'
import Card from "../../Components/Cards/Card"

const Page3 = () => {



    return (

        <div className="main_container mt-5">

            <div className="text-center">
                <div className="title2 fs-1"> Events & <span class="fw-bold text-danger">Activities</span> </div>
                <div className=" mt-1 fw-normal">join us in the pursuit of a cleaner world - our plastic furniture <br />
                    embodies ,style, comfort and environmental responsibilities.
                </div>
            </div>


            <div className=" d-flex flex-wrap justify-content-center gap-3 mt-5">

                <Card imgsrc="https://picsum.photos/id/123/367/267" />
                <Card imgsrc="https://picsum.photos/id/124/367/267" />
                <Card imgsrc="https://picsum.photos/id/125/367/267" />

            </div>
            <div className=" d-flex flex-wrap justify-content-center gap-3 mt-5">

                <Card imgsrc="https://picsum.photos/id/122/367/267" />
                <Card imgsrc="https://picsum.photos/id/123/367/267" />
                <Card imgsrc="https://picsum.photos/id/124/367/267" />

            </div>


        </div>

    )
}

export default Page3;