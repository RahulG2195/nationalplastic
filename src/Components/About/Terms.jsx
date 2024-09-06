"use client";
import { useEffect, useState } from 'react';
import ComapnyProfileSidebar from "@/Components/About/ComapnyProfileSidebar";
import axios from 'axios';

function TermsAndConditions() {
  const [content, setContent] = useState('');

  useEffect(() => {
    async function loadContent() {
      try {
        const termsContent = await fetchPageContent("terms");
        if (termsContent) {
          setContent(termsContent[0]?.content || '');
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
    <div className="container mt-4 py-5">
      <div className="row">
        <div className="col-12 col-md-8  order-2 order-md-1 order-lg-1 mob_content">
          <h2 className="company-profile-title">Terms and Conditions</h2>
          <div className='text-justify' dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        <div className="col-12 col-md-4 order-1 order-md-2 order-lg-2">
          <ComapnyProfileSidebar title={'Terms & Conditions'} />
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditions;