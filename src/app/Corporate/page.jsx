"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CorporateGovernance = () => {
  const [corporateData, setCorporateData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/Investor/InvestorPage`, { Id: 8 });
        setCorporateData(JSON.parse(response.data.results[0].content));
      } catch (error) {
        console.error('Error fetching shareholding data:', error);
      }
    };

    fetchData();
  }, []);

  if (!corporateData) {
    return <div>Loading...</div>;
  }

  return (
    <section className='investor_sec my-5 py-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <div className='investor_table'>
              <table className="table table-responsive table-striped table-light table-bordered">
                <tbody>
                  {corporateData.policies.map((policy, index) => (
                    <tr key={index}>
                      <td>
                        <a href={policy.pdfLink} target="_blank" rel="noopener noreferrer">
                          <i className="fa fa-file-pdf-o" aria-hidden="true"></i> {policy.title}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3>Compliance With Corporate Governance</h3>
            <h4>Annual Secretarial Compliance Certificate</h4>
            <div className="investor_table">
              <table className='table table-responsive table-striped table-light table-bordered'>
                <tbody>
                  {corporateData.annualSecretarialComplianceCertificates.map((certificate, index) => (
                    <tr key={index}>
                      <td>
                        <a href={certificate.pdfLink} target='_blank' rel="noopener noreferrer">
                          Annual Secretarial Compliance Certificate - {certificate.year}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h4>Quarterly Compliance Reports</h4>
            <div className="investor-table">
              <table className='table table-responsive table-striped table-light table-bordered'>
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Quarter - 1</th>
                    <th>Quarter - 2</th>
                    <th>Quarter - 3</th>
                    <th>Quarter - 4</th>
                  </tr>
                </thead>
                <tbody>
                  {corporateData.quarterlyComplianceReports.map((yearData, index) => (
                    <tr key={index}>
                      <td data-title="Year"><strong>{yearData.year}</strong></td>
                      {yearData.quarters.map((quarter, qIndex) => (
                        <td key={qIndex} data-title={`Quarter - ${quarter.quarter}`}>
                          <a href={quarter.pdfLink} target='_blank' rel="noopener noreferrer">
                            <i className="fa fa-file-pdf-o" aria-hidden="true"></i> {quarter.date}
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

export default CorporateGovernance;