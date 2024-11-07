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
import { fetchInvestorConfig } from "@/Components/layouts/investorConfig";

const InvestorAccor = ({ handleShow }) => {
  const [expandedPanels, setExpandedPanels] = useState({}); // Use an object to manage expansion states
  const [config, setConfig] = useState([]);

  useEffect(() => {
    const loadConfig = async () => {
      const data = await fetchInvestorConfig();
      setConfig(data);
    };
    loadConfig();
  }, []);

  const handleOnClick = (label) => {
    localStorage.setItem("productName", label);
    handleShow();
  };

  const handleAccordionToggle = (panelKey) => (event, isExpanded) => {
    setExpandedPanels((prev) => ({
      ...prev,
      [panelKey]: isExpanded ? panelKey : false,
    }));
  };

  const renderSubItems = (items, panelKey) => (
    <AccordionDetails>
      {items.map((item, index) => {
        const subPanelKey = `${panelKey}-${index}`;

        return item.subItems ? (
          <Accordion
            key={subPanelKey}
            expanded={expandedPanels[subPanelKey] === subPanelKey}
            onChange={handleAccordionToggle(subPanelKey)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className="fw-semibold fs-6 darkBlue">
                {item.label}
              </Typography>
            </AccordionSummary>
            {renderSubItems(item.subItems, subPanelKey)}
          </Accordion>
        ) : (
          <div key={subPanelKey} style={{ borderBottom: "1px solid lightgrey" }}>
            <Link
              className="nav-link darkBlue"
              href={item.link}
              onClick={() => handleOnClick(item.label)}
            >
              {item.label}
            </Link>
          </div>
        );
      })}
    </AccordionDetails>
  );

  return (
    <div>
      {config.map((item, index) => {
        const panelKey = `panel${index}`;

        return (
          <Accordion
            key={panelKey}
            expanded={expandedPanels[panelKey] === panelKey}
            onChange={handleAccordionToggle(panelKey)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className="m-0 p-0 darkBlue">
                <li>
                  <p className="mobHeader fw-bold">{item.label}</p>
                </li>
              </Typography>
            </AccordionSummary>
            {item.subItems && renderSubItems(item.subItems, panelKey)}
          </Accordion>
        );
      })}
    </div>
  );
};

export default InvestorAccor;
