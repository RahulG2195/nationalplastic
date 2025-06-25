"use client";
import React, { useState, useEffect } from "react";

const PDFViewerComponent = () => {
  const [pdfData, setPdfData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchpdf = async () => {
      try {
        const response = await fetch("/api/csr-committee");
        const result = await response.json();
        if (result.success) {
          setPdfData(result.pdfs);
        } else {
          setError(result.message || "Unknown error");
        }
      } catch (err) {
        setError("Failed to fetch committee data");
      } finally {
        setLoading(false);
      }
    };

    fetchpdf();
  }, []);

  const openPdf = (fileName) => {
    const pdfUrl = `${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${fileName}`;
    console.log(`Opening PDF: ${pdfUrl}`);
    window.open(pdfUrl, '_blank');
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="text-danger text-center py-5">{error}</div>;

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8 col-md-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="text-center mb-4">Corporate Reports & Disclosures</h1>
              
              <div className="list-group">
                {pdfData.map(pdf => (
                  <a 
                    key={pdf.id}
                    href="#" 
                    className="list-group-item list-group-item-action d-flex align-items-center p-3"
                    onClick={(e) => {
                      e.preventDefault();
                      openPdf(pdf.file_name);
                    }}
                  >
                    <div className="me-3">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="#FF4D4D" />
                        <path d="M14 2V8H20L14 2Z" fill="#FF8080" />
                        <path d="M12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18Z" fill="white" />
                        <path d="M12 14C12.5523 14 13 12.5523 13 12C13 11.4477 12.5523 10 12 10C11.4477 10 11 11.4477 11 12C11 12.5523 11.4477 14 12 14Z" fill="white" />
                      </svg>
                    </div>
                    <span className="fw-bold">{pdf.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFViewerComponent;