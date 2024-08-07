// Faqs.js
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import "./Faqs.css";

const faqData = [
  {
    question: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt.",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
  {
    question: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt.",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
  {
    question: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt.",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
  {
    question: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt.",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
  {
    question: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt.",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
];

const Faqs = () => {
  return (
    <>
      <div className="mt-5 ">
        <div className="text-center">
          <div className="fs-1 fw-bold darkBlue">
            FAQ'<span className="text-danger">S</span>{" "}
          </div>
        </div>
      </div>

      <div className="d-flex flex-column align-items-center">
        {faqData.map((faq, index) => (
          <div key={index} className="mt-2">
            <Accordion className="py-2">
              <AccordionSummary
                expandIcon={
                  <div className="border border-2 border-black rounded-circle text-black fw-bold">
                    <AddIcon />
                  </div>
                }
                aria-controls={`panel${index + 1}-content`}
                id={`panel${index + 1}-header`}
              >
                <Typography className="fw-semibold FAQresponsive">
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="RespFAQans">{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
      </div>
    </>
  );
};

export default Faqs;
