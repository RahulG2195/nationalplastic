"use client";
import  { useState, useEffect } from "react";
import axios from "axios";

const Audited = () => {
  const [auditedData, setAuditedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/Investor/InvestorPage`, { Id: 4 });
        const parsedContent = JSON.parse(response.data.results[0].content);
        setAuditedData(parsedContent.auditedReports || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching audited financial results data:', error);
        setError('Failed to load data. Please try again later.');
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div className="text-center my-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center my-5 text-danger">{error}</div>;
  }

  return (
    <section className="investor_sec my-5 py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <div className="investor-table">
              <h2 className="text-center mb-4">Audited Financial Results</h2>
              {auditedData.length > 0 ? (
                <table className="table table-responsive table-striped table-light table-bordered">
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th>Report</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditedData.map((item, index) => (
                      <tr key={index}>
                        <td data-title="Year">
                          <strong>{item.year}</strong>
                        </td>
                        <td data-title="Report">
                          <a href={item.pdfLink} target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-file-pdf-o" aria-hidden="true" />{" "}
                            {item.reportTitle}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center">No audited financial results available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Audited;