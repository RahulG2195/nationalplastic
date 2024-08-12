"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const CorporateGovernance = () => {
  const [polics, setPolics] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [reports, setReports] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/CorporateFront`, { type: 'corp' });

        const policys = response.data.results.filter(item => item.cor_type === 'Policy');
        console.log('policy', policys);
        const cert = response.data.results.filter(item => item.cor_type === 'Compliance Certifica');
        setPolics(policys);
        setCertificate(cert);
        setReports(response.data.reports);
      } catch (error) {
        console.error('Error fetching Corporate results data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

  }, []);

  if (!polics) {
    return <div>Loading...</div>;
  }

  return (
    <section className='investor_sec my-5 py-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <div className='table-responsive'>
              <h3>Policies</h3>
              <table className="table table-striped table-light table-bordered">
                <tbody>
                  {polics.map((policy, index) => (
                    <tr key={index}>
                      <td>
                        <a href={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${policy.file_name}`} target="_blank" rel="noopener noreferrer">
                          <i className="fa fa-file-pdf-o" aria-hidden="true"></i> {policy.title}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className='table-responsive'>
              <h3>Compliance With Corporate Governance</h3>
              <h4>Annual Secretarial Compliance Certificate</h4>
              <table className='table table-striped table-light table-bordered'>
                <tbody>
                  {certificate.map((certificate, index) => (
                    <tr key={index}>
                      <td>
                        <a href={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${certificate.file_name}`} target='_blank' rel="noopener noreferrer">
                          {certificate.title}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className='table-responsive'>
              <h4>Quarterly Compliance Reports</h4>
              <table className='table table-striped table-light table-bordered'>
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
                  {reports.map((result, index) => (
                    <tr key={index}>
                      <td><strong>{result.years}</strong></td>
                      <td>
                        <Link
                          href={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${result.Q1?.file_name || ''}`}
                          target='_blank'
                          rel="noopener noreferrer">
                          {result.Q1?.title}
                        </Link>
                      </td>
                      <td>
                        <Link
                          href={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${result.Q2?.file_name || ''}`}
                          target='_blank'
                          rel="noopener noreferrer">
                          {result.Q2?.title}
                        </Link>
                      </td>
                      <td>
                        <Link
                          href={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${result.Q3?.file_name || ''}`}
                          target='_blank'
                          rel="noopener noreferrer">
                          {result.Q3?.title}
                        </Link>
                      </td>
                      <td>
                        <Link
                          href={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${result.Q4?.file_name || ''}`}
                          target='_blank'
                          rel="noopener noreferrer">
                          {result.Q4?.title}
                        </Link>
                      </td>

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
