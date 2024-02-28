"use client"
import "../../../styles/MoreProducts.css"
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TabContent from "../TabContent/TabContent";
import { useState } from "react";

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

    const [activeTab, setActiveTab] = useState(tabs[0].id);

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <>
            <div className="text-center">
                <div className="darkBlue fs-1 fw-bold"> More Product <span className="text-danger">Details</span> </div>
                <div className=" mt-1 fw-normal subCptRes">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has </p>
                    <p> been the industry's standard dummy text ever since the 1500s,</p>
                </div>
            </div>

            <div className="product-info-tabs ">
                <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
                    {tabs.map((tab, index) => (
                        <li className="nav-item" key={tab.id}>
                            <a
                                className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                                id={`${tab.id}-tab`}
                                data-toggle="tab"
                                href={`#${tab.id}`}
                                role="tab"
                                aria-controls={tab.id}
                                aria-selected={activeTab === tab.id}
                                onClick={() => handleTabChange(tab.id)}
                            >
                                {tab.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="listTabContent">
                <TabContent activeTab={activeTab} />
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
                            <TabContent activeTab={activeTab} />
                            </div>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
        </>
    )
}

export default MoreProduct;
