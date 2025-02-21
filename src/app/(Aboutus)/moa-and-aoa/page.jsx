"use client";

import React, { useState } from 'react';
import ComapnyProfileSidebar from "@/Components/About/ComapnyProfileSidebar";

const DocumentViewer = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const documents = [
    { id: 1, name: "Memorandum of Association", path: "/Assets/uploads/moa/memorandum.pdf" },
    { id: 2, name: "Article of Association", path: "/Assets/uploads/moa/article.pdf" }
  ];

  const openPdf = (path) => {
    console.log(`Opening PDF: ${path}`);
    setSelectedFile(path);
    window.open(path, '_blank');
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8 col-md-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="text-center mb-4">Memorandum and Article of Association</h1>
              
              <div className="list-group">
                {documents.map(doc => (
                  <a 
                    key={doc.id}
                    href="#" 
                    className="list-group-item list-group-item-action d-flex align-items-center p-3"
                    onClick={(e) => {
                      e.preventDefault();
                      openPdf(doc.path);
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
                    <span className="fw-bold">{doc.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4 col-md-4">
          <ComapnyProfileSidebar title="Memorandum and Article of Association" />
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;