"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import axios from "axios";

const InvestorAccor = ({ handleShow }) => {
  const [expanded, setExpanded] = useState(false);

  const handleOnClick = (productName) => {
    localStorage.setItem("productName", productName);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion className="prdctAccr" style={{ backgroundColor: "#FFFFFF" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel0-content`}
          id={`panel0-header`}
          className="px-2"
        >
          <Typography className="m-0 p-0 darkBlue">
            <li className="">
              <p className="mobHeader fw-bold">Investors (Reg. 46)</p>
            </li>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <Accordion
              expanded={expanded === `panel1`}
              onChange={handleChange(`panel1`)}
              style={{ backgroundColor: "#fff" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel1bh-content`}
                id={`panel1bh-header`}
              >
                <Typography className="fw-semibold fs-6 darkBlue">
                  Financials
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  <p style={{ borderBottom: "1px solid lightgrey" }}>
                    <Link
                      className="nav-link"
                      href={`/Unaudited`}
                      onClick={() => {
                        handleOnClick("Unaudited Financial Results");
                        handleShow();
                      }}
                    >
                      Unaudited Financial Results
                    </Link>
                  </p>
                  <p style={{ borderBottom: "1px solid lightgrey" }}>
                    <Link
                      className="nav-link darkBlue"
                      href={`/Audited`}
                      onClick={() => {
                        handleOnClick("Audited Financial Results");
                        handleShow();
                      }}
                    >
                      Audited Financial Results
                    </Link>
                  </p>
                  <p style={{ borderBottom: "1px solid lightgrey" }}>
                    <Link
                      className="nav-link darkBlue"
                      href={`/Annual`}
                      onClick={() => {
                        handleOnClick("Annual Report");
                        handleShow();
                      }}
                    >
                      Annual Report
                    </Link>
                  </p>
                  <p>
                    <Link
                      className="nav-link darkBlue"
                      href={`/AnnualReturn`}
                      onClick={() => {
                        handleOnClick("Annual Return");
                        handleShow();
                      }}
                    >
                      Annual Return
                    </Link>
                  </p>
                </div>
              </AccordionDetails>
            </Accordion>
            <div
              style={{ backgroundColor: "#fff", borderBottom: "1px solid lightgrey" }}
            >
              <p>
                <Link
                  className="nav-link darkBlue"
                  href={`/ShareHolding`}
                  onClick={() => {
                    handleShow();
                  }}
                >
                  Shareholding Pattern
                </Link>
              </p>
            </div>
            <div
              style={{ backgroundColor: "#fff", borderBottom: "1px solid lightgrey" }}
            >
              <p>
                <Link 
                  className="nav-link darkBlue"
                  href={`/Corporate`}
                  onClick={() => {
                    handleShow();
                  }}
                >
                  Corporate Governance
                </Link>
              </p>
            </div>
            <div
              style={{ backgroundColor: "#fff", borderBottom: "1px solid lightgrey" }}
            >
              <p>
                <Link
                  className="nav-link darkBlue"
                  href={`/InvestorContact`}
                  onClick={() => {
                    handleShow();
                  }}
                >
                  Investor Contact
                </Link>
              </p>
            </div>
            <Accordion
              expanded={expanded === `panel2`}
              onChange={handleChange(`panel2`)}
              style={{ backgroundColor: "#fff" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel2bh-content`}
                id={`panel2bh-header`}
              >
                <Typography className="fw-semibold fs-6 darkBlue">
                  AGM Compliance
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  <p style={{ borderBottom: "1px solid lightgrey" }}>
                    <Link
                      className="nav-link darkBlue"
                      href={`/OutcomeAGM`}
                      onClick={() => {
                        handleOnClick("Outcome of AGM");
                        handleShow();
                      }}
                    >
                      Outcome of AGM
                    </Link>
                  </p>
                  <p>
                    <Link
                      className="nav-link darkBlue"
                      href={`/Notice`}
                      onClick={() => {
                        handleOnClick("Notices");
                        handleShow();
                      }}
                    >
                      Notices
                    </Link>
                  </p>
                </div>
              </AccordionDetails>
            </Accordion>
            <div
              style={{ backgroundColor: "#fff", borderBottom: "1px solid lightgrey" }}
            >
              <p>
                <Link
                  className="nav-link darkBlue"
                  href={`/TransferShare`}
                  onClick={() => {
                    handleShow();
                  }}
                >
                  Transfer Of Share Notice
                </Link>
              </p>
            </div>
            <div
              style={{ backgroundColor: "#fff", borderBottom: "1px solid lightgrey" }}
            >
              <p>
                <Link 
                  className="nav-link darkBlue"
                  href={`/OutcomeMeet`}
                  onClick={() => {
                    handleShow();
                  }}
                >
                  Outcome Of Board Meeting
                </Link>
              </p>
            </div>
            <div
              style={{ backgroundColor: "#fff", borderBottom: "1px solid lightgrey" }}
            >
              <p>
                <Link
                  className="nav-link darkBlue"
                  href={`/Disclosure`}
                  onClick={() => {
                    handleShow();
                  }}
                >
                  Listing Disclosure
                </Link>
              </p>
            </div>
            <div
              style={{ backgroundColor: "#fff", borderBottom: "1px solid lightgrey" }}
            >
              <p>
                <Link
                  className="nav-link darkBlue"
                  href={`/Transaction`}
                  onClick={() => {
                    handleShow();
                  }}
                >
                  Related Party Transaction
                </Link>
              </p>
            </div>
            <Accordion
              expanded={expanded === `panel3`}
              onChange={handleChange(`panel3`)}
              style={{ backgroundColor: "#fff" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel3bh-content`}
                id={`panel3bh-header`}
              >
                <Typography className="fw-semibold fs-6 darkBlue">
                  General Disclosure
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  <p style={{ borderBottom: "1px solid lightgrey" }}>
                    <Link
                      className="nav-link darkBlue"
                      href={`/Twenty`}
                      onClick={() => {
                        handleOnClick("2020");
                        handleShow();
                      }}
                    >
                      2020
                    </Link>
                  </p>
                  <p style={{ borderBottom: "1px solid lightgrey" }}>
                    <Link
                      className="nav-link darkBlue"
                      href={`/TwentyOne`}
                      onClick={() => {
                        handleOnClick("2021");
                        handleShow();
                      }}
                    >
                      2021
                    </Link>
                  </p>
                  <p style={{ borderBottom: "1px solid lightgrey" }}>
                    <Link
                      className="nav-link darkBlue"
                      href={`/TwentyTwo`}
                      onClick={() => {
                        handleOnClick("2022");
                        handleShow();
                      }}
                    >
                      2022
                    </Link>
                  </p>
                  <p style={{ borderBottom: "1px solid lightgrey" }}>
                    <Link
                      className="nav-link darkBlue"
                      href={`/TwentyThree`}
                      onClick={() => {
                        handleOnClick("2023");
                        handleShow();
                      }}
                    >
                      2023
                    </Link>
                  </p>
                  <p>
                    <Link
                      className="nav-link darkBlue"
                      href={`/TwentyFour`}
                      onClick={() => {
                        handleOnClick("2024");
                        handleShow();
                      }}
                    >
                      2024
                    </Link>
                  </p>
                </div>
              </AccordionDetails>
            </Accordion>
            <div
              style={{ backgroundColor: "#fff", borderBottom: "1px solid lightgrey" }}
            >
              <p>
                <Link
                  className="nav-link darkBlue"
                  href={`/InvestorKYC`}
                  onClick={() => {
                    handleShow();
                  }}
                >
                  Investor KYC
                </Link>
              </p>
            </div>
            <div
              style={{ backgroundColor: "#fff", borderBottom: "1px solid lightgrey" }}
            >
              <p>
                <Link
                  className="nav-link darkBlue"
                  href={`/IEPF`}
                  onClick={() => {
                    handleShow();
                  }}
                >
                  IEPF
                </Link>
              </p>
            </div>
            <div
              style={{ backgroundColor: "#fff", borderBottom: "1px solid lightgrey" }}
            >
              <p>
                <Link
                  className="nav-link darkBlue  "
                  href={`/Advertisements`}
                  onClick={() => {
                    handleShow();
                  }}
                >
                  
                  Advertisements
                </Link>
              </p>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default InvestorAccor;
