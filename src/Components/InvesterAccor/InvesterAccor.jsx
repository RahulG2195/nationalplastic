"use client";
import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import axios from "axios"; // Don't forget to import axios

const InvestorAccor = ({ handleShow }) => {
  const [categories, setCategories] = useState([]);

  const handleOnClick = (productName) => {
    localStorage.setItem("productName", productName);
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion className="prdctAccr" style={{ backgroundColor: "#FFE000" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel0-content`}
          id={`panel0-header`}
        >
          <Typography className="m-0 ">
            <li className="">
              <p className="mobHeader fw-bold ">Investors (Reg. 46)</p>
            </li>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <Accordion
              expanded={expanded === `panel${1}`}
              onChange={handleChange(`panel${1}`)}
              style={{ backgroundColor: "#F1EF99" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${1}bh-content`}
                id={`panel${1}bh-header`}
              >
                <Typography className="fw-semibold fs-6">
                  Financials
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  <p style={{borderBottom: "1px solid lightgrey"}}>
                    <Link
                      className="nav-link"
                      href={`/Unaudited`}
                      onClick={() => {
                        handleOnClick(product);
                        handleShow();
                      }}
                    >
                      Unaudited Financial Results
                    </Link>
                  </p>
                  <p style={{borderBottom: "1px solid lightgrey"}}>
                    <Link
                      className="nav-link"
                      href={`/Unaudited`}
                      onClick={() => {
                        handleOnClick(product);
                        handleShow();
                      }}
                    >
                      Audited Financial Results
                    </Link>
                  </p>
                  <p style={{borderBottom: "1px solid lightgrey"}}>
                    <Link
                      className="nav-link"
                      href={`/Unaudited`}
                      onClick={() => {
                        handleOnClick(product);
                        handleShow();
                      }}
                    >
                      Annual Report
                    </Link>
                  </p>
                  <p>
                    <Link
                      className="nav-link"
                      href={`/Unaudited`}
                      onClick={() => {
                        handleOnClick(product);
                        handleShow();
                      }}
                    >
                      Annual Return
                    </Link>
                  </p>
                </div>
              </AccordionDetails>

            </Accordion>
            <div style={{ backgroundColor: "#F1EF99", borderBottom: "1px solid lightgrey" }}>
              <p>
                <Link
                  className="nav-link"
                  href={`/ShareHolding`}
                >
                  Shareholding Pattern
                </Link>
              </p>
            </div>
            <div style={{ backgroundColor: "#F1EF99", borderBottom: "1px solid lightgrey" }}>
              <p>
                <Link
                  className="nav-link"
                  href={`/Corporate`}
                >
                  Corporate Governance
                </Link>
              </p>
            </div>
            <div style={{ backgroundColor: "#F1EF99", borderBottom: "1px solid lightgrey" }}>
              <p>
                <Link
                  className="nav-link"
                  href={`/InvestorContact`}
                >
                  Investor Contact
                </Link>
              </p>
            </div>
            <Accordion
              expanded={expanded === `panel${2}`}
              onChange={handleChange(`panel${2}`)}
              style={{ backgroundColor: "#F1EF99" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${2}bh-content`}
                id={`panel${2}bh-header`}
              >
                <Typography className="fw-semibold fs-6">
                AGM Compliance
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  <p  style={{borderBottom: "1px solid lightgrey" }}>
                    <Link
                      className="nav-link"
                      href={`/OutcomeAGM`}
                      onClick={() => {
                        handleOnClick(product);
                        handleShow();
                      }}
                    >
                      Outcome of AGM
                    </Link>
                  </p>
                  <p>
                    <Link
                      className="nav-link"
                      href={`/Notice`}
                      onClick={() => {
                        handleOnClick(product);
                        handleShow();
                      }}
                    >
                      Notices
                    </Link>
                  </p>
                </div>
              </AccordionDetails>

            </Accordion>
            <div style={{ backgroundColor: "#F1EF99", borderBottom: "1px solid lightgrey" }}>
              <p>
                <Link
                  className="nav-link"
                  href={`/TransferShare`}
                >
                  Transfer Of Share Notice
                </Link>
              </p>
            </div>
            <div style={{ backgroundColor: "#F1EF99", borderBottom: "1px solid lightgrey" }}>
              <p>
                <Link
                  className="nav-link"
                  href={`/OutcomeMeet`}
                >
                  Outcome Of Board Meeting
                </Link>
              </p>
            </div>
            <div style={{ backgroundColor: "#F1EF99", borderBottom: "1px solid lightgrey" }}>
              <p>
                <Link
                  className="nav-link"
                  href={`/Disclosure`}
                >
                  Listing Disclosure
                </Link>
              </p>
            </div>
            <div style={{ backgroundColor: "#F1EF99", borderBottom: "1px solid lightgrey" }}>
              <p>
                <Link
                  className="nav-link"
                  href={`/Transaction`}
                >
                  Related Party Transaction
                </Link>
              </p>
            </div>
            <Accordion
              expanded={expanded === `panel${3}`}
              onChange={handleChange(`panel${3}`)}
              style={{ backgroundColor: "#F1EF99" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${3}bh-content`}
                id={`panel${3}bh-header`}
              >
                <Typography className="fw-semibold fs-6">
                General Disclosure
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  <p style={{borderBottom: "1px solid lightgrey" }}>
                    <Link
                      className="nav-link"
                      href={`/Twenty`}
                      onClick={() => {
                        handleOnClick(product);
                        handleShow();
                      }}
                    >
                      2020
                    </Link>
                  </p>
                  <p style={{borderBottom: "1px solid lightgrey" }}>
                    <Link
                      className="nav-link"
                      href={`/TwentyOne`}
                      onClick={() => {
                        handleOnClick(product);
                        handleShow();
                      }}
                    >
                      2021
                    </Link>
                  </p>
                  <p style={{borderBottom: "1px solid lightgrey" }}>
                    <Link
                      className="nav-link"
                      href={`/TwentyTwo`}
                      onClick={() => {
                        handleOnClick(product);
                        handleShow();
                      }}
                    >
                      2022
                    </Link>
                  </p>
                  <p style={{borderBottom: "1px solid lightgrey" }}>
                    <Link
                      className="nav-link"
                      href={`/TwentyThree`}
                      onClick={() => {
                        handleOnClick(product);
                        handleShow();
                      }}
                    >
                      2023
                    </Link>
                  </p>
                  <p >
                    <Link
                      className="nav-link"
                      href={`/TwentyFour`}
                      onClick={() => {
                        handleOnClick(product);
                        handleShow();
                      }}
                    >
                      2024
                    </Link>
                  </p>
                </div>
              </AccordionDetails>

            </Accordion>
            <div style={{ backgroundColor: "#F1EF99", borderBottom: "1px solid lightgrey"}}>
              <p>
                <Link
                  className="nav-link"
                  href={`/InvestorKYC`}
                >
                  Investor KYC
                </Link>
              </p>
            </div>
            <div style={{ backgroundColor: "#F1EF99", borderBottom: "1px solid lightgrey" }}>
              <p>
                <Link
                  className="nav-link"
                  href={`/IEPF`}
                >
                  IEPF
                </Link>
              </p>
            </div>
            <div style={{ backgroundColor: "#F1EF99", borderBottom: "1px solid lightgrey" }}>
              <p>
                <Link
                  className="nav-link"
                  href={`/Advertisements`}
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
