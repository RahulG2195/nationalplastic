import React from "react";
import Card from "../../Components/Cards/Card";
import './Environmental.css';

const EnvironmentalConservation = () => {
    const cardImages = [
        "/assets/images/planting-mangroves-environment-conservation-habitat-restoration-earth-day/planting-mangroves-environment-conservation-habitat-restoration-earth-day.png",
        "/assets/images/cleaning-plastic-waste-river-bank-by-volunteer-helping-nature-protecting-environment/cleaning-plastic-waste-river-bank-by-volunteer-helping-nature-protecting-environment.png",
        "/assets/images/rag-pickers-search-recyclable-material-garbage-land-air-pollution-india/rag-pickers-search-recyclable-material-garbage-land-air-pollution-india.png",
        "/assets/images/we-all-need-play-our-part-nurturing-nature-closeup/we-all-need-play-our-part-nurturing-nature-closeup-shot-group-unrecognizable-people-holding-plant-growing-out-soil.png",
        "/assets/images/happy-volunteer-looking-donation-box/happy-volunteer-looking-donation-box.png",
        "/assets/images/kids-holding-their-hands-clover/kids-holding-their-hands-clover.png",
    ];

    return (
        <>

            <div className="text-center ">
                <div className="darkBlue fs-1">Environmental<span className="fw-bold text-danger">  Conservation</span> </div>
                <div className=" mt-1 fw-normal">Join us in the pursuit of a cleaner world – our plastic furniture <br />
                    embodies style, comfort, and environmental responsibility.
                </div>
            </div>
            <div className="container text-center mt-5 d-flex justify-content-center">
                <div className="row CsrCard">
                    <div className="col-md-4 my-3"><Card imgsrc="/assets/images/planting-mangroves-environment-conservation-habitat-restoration-earth-day/planting-mangroves-environment-conservation-habitat-restoration-earth-day.png" /></div>
                    <div className="col-md-4 my-3"><Card imgsrc="/assets/images/cleaning-plastic-waste-river-bank-by-volunteer-helping-nature-protecting-environment/cleaning-plastic-waste-river-bank-by-volunteer-helping-nature-protecting-environment.png" /></div>
                    <div className="col-md-4 my-3"><Card imgsrc="/assets\images\rag-pickers-search-recyclable-material-garbage-land-air-pollution-india\rag-pickers-search-recyclable-material-garbage-land-air-pollution-india.png" /></div>
                    <div className="col-md-4 my-3"><Card imgsrc="/assets/images/we-all-need-play-our-part-nurturing-nature-closeup/we-all-need-play-our-part-nurturing-nature-closeup-shot-group-unrecognizable-people-holding-plant-growing-out-soil.png" /></div>
                    <div className="col-md-4 my-3"><Card imgsrc="/assets/images/happy-volunteer-looking-donation-box/happy-volunteer-looking-donation-box.png" /></div>
                    <div className="col-md-4 my-3"><Card imgsrc="/assets\images\kids-holding-their-hands-clover\kids-holding-their-hands-clover.png" /></div>
                    
                </div>
            </div>
        </>
    )
};

export default EnvironmentalConservation
