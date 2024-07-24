"use client";
import  { useState, useEffect } from 'react';
import axios from 'axios';
//Annual Report
const Annual = () => {
  const [annualReports, setAnnualReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/Investor/InvestorPage`, { Id: 5 });
        const parsedContent = JSON.parse(response.data.results[0].content);
        setAnnualReports(parsedContent.annualReports || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching annual reports data:', error);
        setError('Failed to load data. Please try again later.');
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className='investor_sec my-5 py-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <table className='table table-responsive table-striped table-light table-bordered'>
              <tbody>
                {annualReports.map((report, index) => (
                  <tr key={index}>
                    <td data-title="Year" width="25%"><strong>{report.year}</strong></td>
                    <td data-title="Report" width="75%">
                      <a target='_blank' href={report.pdfUrl} rel="noopener noreferrer">
                        <i className="fa fa-file-pdf-o" aria-hidden="true"></i> Annual Report
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

export default Annual;