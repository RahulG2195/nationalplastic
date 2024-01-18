import React from "react";
import "./Page2.css";
import Card from "../../Components/Cards/Card"


const Page2 = () => {

    return (
        < div className="main_container mt-5">

            <div className="text-center">
                <div className=" title2 fs-1"> Awards & <span class="fw-bold text-danger">Certificates</span> </div>
                <div className=" mt-1 fw-normal">National has been awarded as per the number of one exporter of Plastic Furniture category for three <br />
                    consecutive by year by The Plastic Export Promotion Council(Popularly known as PLEXCOCIL) <br />
                    Sponsored by the Ministry of Commerce & Industry, Department of Commerce, Govermentof India.
                </div>
            </div>

            {/* <div className=" d-flex flex-wrap justify-content-center gap-3 mt-5">
                <Card imgsrc="https://picsum.photos/536/354" />
                <Card imgsrc="https://picsum.photos/537/354" />
                <Card imgsrc="https://picsum.photos/538/354" />
                <Card imgsrc="https://picsum.photos/542/354" />
            </div>

            <div className=" d-flex flex-wrap justify-content-center gap-3 mt-4">
                <Card imgsrc="https://picsum.photos/539/354" />
                <Card imgsrc="https://picsum.photos/540/354" />
                <Card imgsrc="https://picsum.photos/541/354" />
                <Card imgsrc="https://picsum.photos/543/354" />
            </div> */}


<div class="container text-center">
      <div class="row">
        <div class="col-md-2"><Card imgsrc="https://picsum.photos/539/354" /></div>
        <div class="col-md-2"><Card imgsrc="https://picsum.photos/539/354" /></div>
        <div class="col-md-2"><Card imgsrc="https://picsum.photos/539/354" /></div>
        <div class="col-md-2"><Card imgsrc="https://picsum.photos/539/354" /></div>
        <div class="col-md-2"><Card imgsrc="https://picsum.photos/539/354" /></div>
        <div class="col-md-2"><Card imgsrc="https://picsum.photos/539/354" /></div>
        <div class="col-md-2"><Card imgsrc="https://picsum.photos/539/354" /></div>
        <div class="col-md-2"><Card imgsrc="https://picsum.photos/539/354" /></div>
      </div>
    </div>

         </div>
    )

}

export default Page2; 