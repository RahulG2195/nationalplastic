import React from "react";
import Card from "../../Components/Cards/Card";
import './Environmental.css'

const EnvironmentalConservation = () => {
     return (
        <>


            <div className="text-center ">
                <div className=" title2 fs-1">Environmental<span class="fw-bold text-danger">  Conservation</span> </div>
                <div className=" mt-1 fw-normal">Join us in the pursuit of a cleaner world – our plastic furniture <br />
                    embodies style, comfort, and environmental responsibility.
                </div>
            </div>
            <div class="container text-center mt-5 d-flex justify-content-center">
                <div class="row CsrCard">
                    <div class="col-md-4 my-3"><Card imgsrc="/Assets/images/planting-mangroves-environment-conservation-habitat-restoration-earth-day/planting-mangroves-environment-conservation-habitat-restoration-earth-day.png" /></div>
                    <div class="col-md-4 my-3"><Card imgsrc="/Assets/images/cleaning-plastic-waste-river-bank-by-volunteer-helping-nature-protecting-environment/cleaning-plastic-waste-river-bank-by-volunteer-helping-nature-protecting-environment.png" /></div>
                    <div class="col-md-4 my-3"><Card imgsrc="/Assets\images\rag-pickers-search-recyclable-material-garbage-land-air-pollution-india\rag-pickers-search-recyclable-material-garbage-land-air-pollution-india.png" /></div>
                    <div class="col-md-4 my-3"><Card imgsrc="/Assets/images/we-all-need-play-our-part-nurturing-nature-closeup/we-all-need-play-our-part-nurturing-nature-closeup-shot-group-unrecognizable-people-holding-plant-growing-out-soil.png" /></div>
                    <div class="col-md-4 my-3"><Card imgsrc="/Assets/images/happy-volunteer-looking-donation-box/happy-volunteer-looking-donation-box.png" /></div>
                    <div class="col-md-4 my-3"><Card imgsrc="/Assets\images\kids-holding-their-hands-clover\kids-holding-their-hands-clover.png" /></div>
                </div>
            </div>

        </>
    )

}

export default EnvironmentalConservation 