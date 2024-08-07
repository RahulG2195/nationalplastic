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
      <td key={quarter}>
        <ul className='list-unstyled'>
          {yearData[quarter]?.map((ad, index) => (
            <li key={index}>
              <a href={ad.pdf} target='_blank' rel='noopener noreferrer'>
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
                    <table className='table table-striped table-bordered'>
                      <thead>
                        <tr>
                          <th>Q1</th>
                          <th>Q2</th>
                          <th>Q3</th>
                          <th>Q4</th>
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