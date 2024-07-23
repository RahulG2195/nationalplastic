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
        setIsLoading(true);
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/Investor/InvestorPage`, { Id: 6 });
        const parsedContent = JSON.parse(response.data.results[0].content);
        setAnnualReturns(parsedContent.annual_returns || []);
      } catch (error) {
        console.error('Error fetching annual returns data:', error);
        setError('Failed to load annual returns data. Please try again later.');
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
            <div className="table-responsive">
              <table className='table table-striped table-light table-bordered'>
                <tbody>
                  {annualReturns.map((yearData, yearIndex) =>
                    yearData.reports.map((report, reportIndex) => (
                      <tr key={`${yearIndex}-${reportIndex}`}>
                        <td className="data-title=&quot;Year&quot;" width="25%">
                          <a target='_blank' href="/Assets/pdf/NATIONAL%20PLASTIC%20INDUSTRIES%20LIMITED%2019-20.pdf" rel="noopener noreferrer">
                            <b>Year {yearData.year}</b>
                          </a>
                        </td>
                        <td data-title="Report" width="75%">
                          <a target='_blank' href={report.url} rel="noopener noreferrer">
                            <i className="fa fa-file-pdf-o" aria-hidden="true"></i> {report.title}
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnnualReturn;
