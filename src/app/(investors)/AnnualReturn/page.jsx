"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';

const AnnualReturn = () => {
  const [annualReturns, setAnnualReturns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/GetInvestor`, { type: 'returns' });
        setAnnualReturns(response.data.results); 

      } catch (error) {
        console.error('Error fetching Audited financial results data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!Array.isArray(annualReturns) || annualReturns.length === 0) {
    return <div>No annual returns data available.</div>;
  }

  return (
    <section className='investor_sec my-5 py-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <table className='table table-responsive table-striped table-light table-bordered'>
              <tbody>
                {annualReturns.map((report, index) => (
                  <tr key={index}>
                    <td data-title="Year" width="25%"><strong>{report.years}</strong></td>
                    <td data-title="Report" width="75%">
                      <a target='_blank' href={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${report.file_name}`} rel="noopener noreferrer">
                        <i className="fa fa-file-pdf-o" aria-hidden="true"></i> {report.title}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnnualReturn;
