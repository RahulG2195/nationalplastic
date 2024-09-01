"use client";

import { useEffect, useState } from 'react';
import Link from "next/link";
import "./companyprofile.css";
import ComapnyProfileSidebar from "@/Components/About/ComapnyProfileSidebar";
import axios from 'axios';

function Company() {
  const [content, setContent] = useState({});

  useEffect(() => {
    async function loadContent() {
      try {
        const pageContent = await fetchPageContent("company");
        if (pageContent) {
          const contentObj = {};
          pageContent.forEach(item => {
            contentObj[item.section_name] = item.content;
          });
          setContent(contentObj);
        }
      } catch (error) {
        console.error("Error loading content:", error);
      }
    }
    loadContent();
  }, []);

  async function fetchPageContent(pageName) {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/Aboutus`, { page_name: pageName });
      if (response.data.status === 200) {
        return response.data.content;
      } else {
        throw new Error(response.data.message || "Failed to fetch page content");
      }
    } catch (error) {
      console.error("Error fetching page content:", error);
      throw error;
    }
  }

  return (
    <>
      <div className="container company-profile-container my-5">
        <div className="row pt-5 gap-5 justify-content-center">
          <div className="col-12 col-md-8 order-2 order-md-1 order-lg-1 company-profile-content mob_content">
            <div className="mb-4">
              <h2 className="company-profile-title">Our History</h2>
              <div dangerouslySetInnerHTML={{ __html: content.history || '' }} />
            </div>
            <div className="mb-4">
              <h2 className="company-profile-title">Our Brand</h2>
              <div dangerouslySetInnerHTML={{ __html: content.brand || '' }} />
            </div>
          </div>
          <div className="col-12 col-md-4 order-1 order-md-2 order-lg-2">
            <ComapnyProfileSidebar title={'Company Profile'} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Company;