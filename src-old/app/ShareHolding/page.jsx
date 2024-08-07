"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from 'next/link'

const ShareholdingPattern = () => {
  const [shareholdingData, setShareholdingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/Shareholding`, { type: 'shareholdings' });
        console.log('response', response.data.results);
        setShareholdingData(response.data.results); 
      } catch (error) {
        console.error('Error fetching Shareholding results data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setIsLoading(false);
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
                  {shareholdingData.map((result) => (
                    <tr key={result.sc_id}>
                      <td>{result.years}</td>
                      <td><Link href={result.Q1?.file_name ? result.Q1?.file_name : ''} target='_blank'>{result.Q1?.title}</Link></td>
                      <td><Link href={result.Q2?.file_name ? result.Q2?.file_name : ''} target='_blank'>{result.Q2?.title}</Link></td>
                      <td><Link href={result.Q3?.file_name ? result.Q3?.file_name : ''} target='_blank'>{result.Q3?.title}</Link></td>
                      <td><Link href={result.Q4?.file_name ? result.Q4?.file_name : ''} target='_blank'>{result.Q4?.title}</Link></td>
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
