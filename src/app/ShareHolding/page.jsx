"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ShareholdingPattern = () => {
  const [shareholdingData, setShareholdingData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/Investor/InvestorPage`,
          { Id: 7 }
        );
        setShareholdingData(JSON.parse(response.data.results[0].content));
      } catch (error) {
        console.error("Error fetching shareholding data:", error);
      }
    };

    fetchData();
  }, []);

  if (!shareholdingData) {
    return <div>Loading...</div>;
  }

  return (
    <section className="investor_sec my-5 py-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="table-responsive">
              <table className="table table-striped table-light table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Year</th>
                    <th scope="col">Quarter - 1</th>
                    <th scope="col">Quarter - 2</th>
                    <th scope="col">Quarter - 3</th>
                    <th scope="col">Quarter - 4</th>
                  </tr>
                </thead>
                <tbody>
                  {shareholdingData.years.map((yearData) => (
                    <tr key={yearData.year}>
                      <td data-title="Year">{yearData.year}</td>
                      {yearData.quarters.map((quarter) => (
                        <td
                          key={quarter.quarter}
                          data-title={`Quarter - ${quarter.quarter}`}
                        >
                          <a
                            href={quarter.pdfLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {quarter.date}
                          </a>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShareholdingPattern;
