"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

const Notice = () => {
  const [notices, setNotices] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/Investor/InvestorPage`, { Id: 12 });
        setNotices(JSON.parse(response.data.results[0].content));
      } catch (error) {
        console.error('Error fetching notice data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section className='investor_sec my-5 py-5'>
        <div className='container'>
          <div className='row'>
            <div className="col-12">
              <div className="inn-content-wrap">
                {Object.entries(notices).map(([year, yearData]) => (
                  <div key={year}>
                    <h3>Year {year}</h3>
                    <table className='table table-responsive table-striped table-light'>
                      <tbody>
                        {yearData.map((notice, index) => (
                          <tr key={index}>
                            <td>
                              {notice.file_path ? (
                                <a target='_blank' href={notice.file_path} rel="noopener noreferrer">
                                  {notice.notice_title}
                                </a>
                              ) : (
                                notice.notice_title
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p>&nbsp;</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Notice;