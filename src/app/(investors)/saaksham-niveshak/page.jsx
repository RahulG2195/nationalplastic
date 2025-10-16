
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const SaakshamNiveshak = () => {
  const [data, setData] = useState([]);
  const [heading, setHeading] = useState({ sn_heading: '', sn_sub_para: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/admin/saaksham-niveshak');
        setData(response.data.results);
        setHeading(response.data.heading);
      } catch (error) {
        console.error('Error fetching Saaksham Niveshak data:', error);
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

  return (
    <section className='investor_sec my-5 py-5 '>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <div className='table-responsive'>
              <h3>{heading.sn_heading}</h3>
              <p>{heading.sn_sub_para}</p>
              <table className="table tabler-border table-striped table-light table-bordered">
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {item.sn_content}
                      </td>
                      <td>
                        <a href={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${item.sn_pdf}`} target="_blank" rel="noopener noreferrer">
                          <i className="fa fa-download" aria-hidden="true"></i>
                        </a>
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

export default SaakshamNiveshak;
