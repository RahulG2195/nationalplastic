"use client";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AddIcon from "@mui/icons-material/Add";
import "./Faqs.css";

import React, { useState, useEffect } from 'react';
import { Collapse, Typography } from 'antd';
import axios from "axios";
const { Panel } = Collapse;
const { Title } = Typography;

const Faqs = () => {
  const [faqData, setFaqData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeKey, setActiveKey] = useState(['1']); 

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/faqs`);
        const transformedData = transformFaqData(response.data.faqs);
        setFaqData(transformedData);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaqs();
  }, []);
  const onCollapseChange = (keys) => {
    setActiveKey(keys);
  };

  // Transform flat data into nested structure
  const transformFaqData = (faqs) => {
    // Get root categories (where root_id is null)
    const rootCategories = faqs.filter(faq => faq.root_id === null);
    
    // Create nested structure
    return rootCategories.map(category => ({
      ...category,
      children: faqs.filter(faq => faq.root_id === category.id)
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-lg">Loading FAQs...</div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
    <Title level={2} className="text-center mb-4">Frequently Asked Questions</Title>
    <div className="row">
      <div className="col-md-10 offset-md-1">
        <Collapse activeKey={activeKey} onChange={onCollapseChange}>
          {faqData.map((category) => (
            <Panel header={category.question} key={category.id}>
              <Collapse accordion>
                {category.children.map((faq) => (
                  <Panel header={faq.question} key={faq.id}>
                    <p>{faq.answer}</p>
                  </Panel>
                ))}
              </Collapse>
            </Panel>
          ))}
        </Collapse>
      </div>
    </div>
  </div>
  );
};

export default Faqs;