"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Unaudited = () => {
  const [financialResults, setFinancialResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("useffect data");

        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/Investor/InvestorPage`, { Id: 3 });
        console.log("useffect data"+JSON.stringify(response));

        const parsedContent = JSON.parse(response.data.results[0].content);
        console.log("useffect data p"+ JSON.stringify(parsedContent));

        setFinancialResults(parsedContent.financialResults || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching unaudited financial results data:', error);
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
            <div className="table-responsive">
              <table className="table table-striped table-light table-bordered table-hover">
                <thead>
                  <tr>
                    <th scope="col">Year</th>
                    {financialResults[0]?.quarters.map((quarter, index) => (
                      <th key={index} scope="col">Financial Results - Q{index + 1}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {financialResults.map((result, index) => (
                    <tr key={index}>
                      <td>{result.year}</td>
                      {result.quarters.map((quarter, qIndex) => (
                        <td key={qIndex}>
                          {quarter.link ? (
                            <a href={quarter.link} target="_blank" rel="noopener noreferrer">
                              {quarter.title}
                            </a>
                          ) : (
                            quarter.title
                          )}
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

export default Unaudited;