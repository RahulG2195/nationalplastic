"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const HealthCare = () => {
  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/news_media', { params: { id: 2 } });
        const { heading, subheading } = response.data.newsMedia[0];

        setHeading(heading || '');
        setSubheading(subheading || '');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const splitHeading = heading.split(" ");

  return (
    <div className="mt-5">
      <div className="text-center mb-5">
        <div className="fs-1 fw-normal">
          {splitHeading.length >= 3 ? (
            <>
              <span className="fs-1 darkBlue fw-normal">{splitHeading[0]}</span>{" "}
              <span className="fw-bold text-danger">
                {splitHeading.slice(1).join(" ")}
              </span>
            </>
          ) : (
            <span className="text-danger">{heading}</span>
          )}{" "}
        </div>
        <div className="mt-1 fw-medium subCptRes w-md-50 mx-auto">
          <p>{subheading}</p>
        </div>
      </div>
    </div>
  );
};

export default HealthCare;
