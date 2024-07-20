"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

const OutcomeMeet = () => {
  const [outcomeData, setOutcomeData] = useState({ years: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/Investor/InvestorPage`, { Id: 14 });
        console.log("response: ", response.data);
        setOutcomeData(JSON.parse(response.data.results[0].content));
      } catch (error) {
        console.error('Error fetching shareholding data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <section className='investor_sec my-5 py-5'>
      <div className='container'>
        <div className='row'>
          <div className="col-12">
            <div className="inn-content-wrap">
              {outcomeData.years.map((yearData, index) => (
                <div key={index}>
                  <h3>Year {yearData.year}</h3>
                  <div className="investor-table">
                    <table className='table table-responsive table-striped table-light table-bordered'>
                      <tbody>
                        {yearData.meetings.map((meeting, meetingIndex) => (
                          <tr key={meetingIndex}>
                            <td>
                              <a target='_blank' href={meeting.href} rel="noopener noreferrer">
                                <i className="fa fa-file-pdf-o" aria-hidden="true"></i> {meeting.text}
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {index < outcomeData.years.length - 1 && <h3>&nbsp;</h3>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OutcomeMeet;