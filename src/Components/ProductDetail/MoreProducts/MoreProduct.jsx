import "../../../styles/MoreProducts.css"
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TabContent from "./TabContent/TabContent";


const MoreProduct = () => {
    const tabs = [
        { id: "description", title: "Description" },
        { id: "merchant-details", title: "Merchant Details" },
        { id: "care-instruction", title: "Care & Instruction" },
        { id: "delivery-instructions", title: "Delivery Instructions" },
        { id: "warranty", title: "Warranty" },
        { id: "t-and-c", title: "T & C" },
        { id: "faqs", title: "FAQ'S" },
        { id: "disclaimer", title: "Disclaimer" }
    ];

    return (
        <>

            <div className="text-center">
                <div className="darkBlue fs-1 fw-bold"> More Product <span className="text-danger">Details</span> </div>
                <div className=" mt-1 fw-normal subCptRes"><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has </p>
                    <p> been the industry's standard dummy text ever since the 1500s,</p>
                </div>
            </div>

            <div className="product-info-tabs ">
                <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            id="description-tab"
                            data-toggle="tab"
                            href="#description"
                            role="tab"
                            aria-controls="description"
                            aria-selected="true"
                        >
                            Description
                        </a>
                    </li>

                    <li className="nav-item">
                        <a
                            className="nav-link"
                            id="review-tab"
                            data-toggle="tab"
                            href="#review"
                            role="tab"
                            aria-controls="review"
                            aria-selected="false"
                        >
                            Merchant Details
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            id="review-tab"
                            data-toggle="tab"
                            href="#review"
                            role="tab"
                            aria-controls="review"
                            aria-selected="false"
                        >
                            Care & Instruction
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            id="review-tab"
                            data-toggle="tab"
                            href="#review"
                            role="tab"
                            aria-controls="review"
                            aria-selected="false"
                        >
                            Delivery Instructions
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            id="review-tab"
                            data-toggle="tab"
                            href="#review"
                            role="tab"
                            aria-controls="review"
                            aria-selected="false"
                        >
                            Warranty
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            id="review-tab"
                            data-toggle="tab"
                            href="#review"
                            role="tab"
                            aria-controls="review"
                            aria-selected="false"
                        >
                            T & C
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            id="review-tab"
                            data-toggle="tab"
                            href="#review"
                            role="tab"
                            aria-controls="review"
                            aria-selected="false"
                        >
                            FAQ'S
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            id="review-tab"
                            data-toggle="tab"
                            href="#review"
                            role="tab"
                            aria-controls="review"
                            aria-selected="false"
                        >
                            Disclaimer
                        </a>
                    </li>
                </ul>
            </div>

            <div className="AccorProductInfo">
                {tabs.map((tab, index) => (
                    <Accordion key={index}>
                        <AccordionSummary
                            expandIcon={<ArrowDownwardIcon />}
                            aria-controls={`panel${index + 1}-content`}
                            id={`panel${index + 1}-header`}
                        >
                            <div className="fw-bold">{tab.title}</div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div>
                                <TabContent />
                            </div>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>

        </>
    )
}
export default MoreProduct