"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AwardsCertificates from "@/Components/About/AwardsCertificates";
import ComapnyProfileSidebar from "@/Components/About/ComapnyProfileSidebar";

const Awards = () => {
  const [pageContent, setPageContent] = useState({
    title: "",
    description: "",
  });
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const formData = new FormData();
      formData.append('action', 'GET');
      const response = await axios.post('/api/admin/Aboutus/awardsCMS', formData);
        setPageContent(response.data.pageContent[0]);
        setCertificates(response.data.certificates);
      } catch (err) {
        setError("An error occurred while fetching data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="awards-certificates">
      <div className="container mt-5 mb-5">
        <div className="row team-members justify-content-evenly">
          <div className='col-12 col-md-6 order-2 order-md-1 order-lg-1'>
            <header className="text-center mb-5">
              <h1 className="fs-1 darkBlue fw-normal">
                {pageContent.title?.split('&')[0]}&nbsp;
                <span className="fw-bold text-danger">
                  {pageContent.title?.split('&')[1]}
                </span>
              </h1>
              <p className=" my-5 text-justify mt-1 fw-medium subCptRes w-70 certificate-para">
                {pageContent.description}
              </p>
            </header>
            <div className="row">
              {certificates.map(({ id, image_url, alt_text }) => (
                <div className="col-md-6 col-6" key={id}>
                  <AwardsCertificates image={image_url} alt={alt_text} />
                </div>
              ))}
            </div>
          </div>
          <div className='col-12 col-md-4 order-1 order-md-2 order-lg-2 d-flex d-md-block d-lg-block justify-content-center'>
            <ComapnyProfileSidebar title={pageContent.title || ''} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Awards;
