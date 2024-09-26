"use client";
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Unaudited = () => {
  const [financialResults, setFinancialResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/GetInvestor`, { type: 'unaudited' });

        setFinancialResults(response.data.results); // Assuming data is in response.data
      } catch (error) {
        console.error('Error fetching unaudited financial results data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
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
            <div className="table-responsive w-100">
              <table className="table table-striped table-light table-bordered table-hover">
                <thead>
                  <tr>
                    <th scope="col">Year</th>
                    <th scope="col">Financial Results - Q1</th>
                    <th scope="col">Financial Results - Q2</th>
                    <th scope="col">Financial Results - Q3</th>
                  </tr>
                </thead>
                <tbody>
                  {financialResults.map((result, index) => (
                    <tr key={index}>
                      <td>{result.years}</td>
                      <td><Link href={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${result.Q1?.file_name ? result.Q1?.file_name : ''}`} target='_blank'>{result.Q1?.title}</Link></td>
                      <td><Link href={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${result.Q2?.file_name ? result.Q2?.file_name : ''}`} target='_blank'>{result.Q2?.title}</Link></td>
                      <td><Link href={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${result.Q3?.file_name ? result.Q3?.file_name : ''}`} target='_blank'>{result.Q3?.title}</Link></td>
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