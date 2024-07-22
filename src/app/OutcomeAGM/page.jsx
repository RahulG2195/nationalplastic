"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

const OutcomeAGM = () => {
  const [agmOutcomes, setAgmOutcomes] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/Investor/InvestorPage`, { Id: 11 }); // Assuming 8 is the Id for AGM Outcomes
        setAgmOutcomes(JSON.parse(response.data.results[0].content));
      } catch (error) {
        console.error('Error fetching AGM outcome data:', error);
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
                {Object.entries(agmOutcomes).map(([year, yearData]) => (
                  <div key={year}>
                    <h3>Year {year}</h3>
                    <table className='table table-responsive table-striped table-light'>
                      <tbody>
                        {yearData.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <a target='_blank' href={item.file_path}>
                                <i className="fa fa-file-pdf-o" aria-hidden="true"></i> {item.notice_title}
                              </a>
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

export default OutcomeAGM;