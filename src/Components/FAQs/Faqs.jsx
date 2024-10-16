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
    question: "Are your products environmentally friendly?",
    answer:
      "Yes, we are committed to sustainability. Our products are made from recyclable materials,and we continuously strive to minimize our environmental impact.",
  },
  {
    question: "Do you customize plastic furniture according to specific requirements?",
    answer:
      "Yes, we offer customization options for plastic furniture to meet your specific needs and preferences.",
  },
  {
    question: "Do you have a catalogue of your products?",
    answer:
      "Yes, we provide a comprehensive catalogue showcasing our full range of products. You can request a copy through our website or customer service.",
  },
  {
    question: "Can I purchase products directly from your website?",
    answer:
      "Yes, our website offers a user-friendly shopping experience where you can browse and purchase our products directly.",
  },
  {
    question: "Do you offer bulk purchasing options?",
    answer:
      "Yes, we cater to wholesalers and bulk buyers. Please contact our sales team for special pricing and availability.",
  },
  {
    question: "What is the warranty on your products?",
    answer:
      "We offer a 1 Year warranty on many of our products. The specific terms can vary, so please check the product details or contact customer service for more information.",
  },
  {
    question: "How can I clean and maintain my plastic products?",
    answer:
      "Most of our products are easy to clean with mild soap and water. Avoid harsh chemicals that can damage the surface. For specific care instructions, refer to the product label..",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we offer international shipping. Shipping costs and times may vary based on location. Please contact us for specific details.",
  },
  {
    question: "Do you offer bulk purchasing options?",
    answer:
      "Yes, we cater to wholesalers and bulk buyers. Please contact our sales team for special pricing and availability.",
  },
  {
    question: "What should I do if I receive a damaged product?",
    answer:
      "If you receive a damaged product, please contact our customer service within 48 hours of delivery. We will assist you with the return or exchange process.",
  },
  {
    question: "How can I stay updated on new products and promotions?",
    answer:
      "You can subscribe to our newsletter on our website to receive updates and also follow us on social media (Facebook, Instagram, LinkedIn, Twitter, Pinterest and YouTube) for new products,promotions, and special offers.",
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
          <div key={index} className="mt-2 w-75">
            <Accordion className="py-2 "> 
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
