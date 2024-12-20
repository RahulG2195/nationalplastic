"use client";

import React, { useState, useEffect } from 'react';

const Advertisements = () => {
  const [advertisementData, setAdvertisementData] = useState({});

  useEffect(() => {
    fetchAdvertisementData();
  }, []);

  const fetchAdvertisementData = async () => {
    try {
      const response = await fetch('/api/admin/Investors/Advertisements');
      const data = await response.json();
      setAdvertisementData(data);
    } catch (error) {
      console.error('Error fetching advertisement data:', error);
    }
  };

  const renderQuarterData = (yearData) => {
    return ['Q1', 'Q2', 'Q3', 'Q4'].map((quarter) => (
      <td key={quarter} style={{ width: '25%', maxWidth: '25%' }}>
        <ul className='list-unstyled'>
          {yearData[quarter]?.map((ad, index) => (
            <li key={index}>
              <a href={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${ad.pdf}`} target='_blank' rel='noopener noreferrer'>
                {`${quarter} ${ad.newspaper}`}
              </a>
            </li>
          ))}
        </ul>
      </td>
    ));
  };
  
  return (
    <section className='investor_sec my-5 py-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <div className='bg-light p-4 rounded shadow-sm'>
              <h3 className='mb-4'>Newspaper Advertisements</h3>
  
              {Object.entries(advertisementData).map(([year, yearData]) => (
                <div className='mb-4' key={year}>
                  <h4 className='mb-3'>{`FY ${year}`}</h4>
                  <div className='table-responsive'>
                    <table className='table table-striped table-bordered' style={{ tableLayout: 'fixed' }}>
                      <thead>
                        <tr>
                          <th style={{ width: '25%' }}>Q1</th>
                          <th style={{ width: '25%' }}>Q2</th>
                          <th style={{ width: '25%' }}>Q3</th>
                          <th style={{ width: '25%' }}>Q4</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>{renderQuarterData(yearData)}</tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advertisements;