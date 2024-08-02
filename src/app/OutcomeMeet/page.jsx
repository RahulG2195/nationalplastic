"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

const OutcomeMeet = () => {
  const [outcomeData, setOutcomeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/admin/Investors/Outcome');
        setOutcomeData(response.data.outcomeData); // Access the outcomeData property
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const groupedData = outcomeData.reduce((acc, item) => {
    const year = item.years || 'Unknown Year'; // Use 'years' instead of 'year_heading'
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(item);
    return acc;
  }, {});

  return (
    <section className='investor_sec my-5 py-5'>
      <div className='container'>
        <div className='row'>
          <div className="col-12">
            <div className="inn-content-wrap">
              {Object.keys(groupedData).length > 0 ? (
                Object.keys(groupedData).map((year, index) => (
                  <div key={index}>
                    <h3>Year {year}</h3>
                    <div className="investor-table">
                      <table className='table table-responsive table-striped table-light table-bordered'>
                        <tbody>
                          {groupedData[year].length > 0 ? (
                            groupedData[year].map((meeting, meetingIndex) => (
                              <tr key={meetingIndex}>
                                <td>
                                  <a target='_blank' href={meeting.file_name} rel="noopener noreferrer" className='d-block'>
                                    <i className="fa fa-file-pdf-o" aria-hidden="true"></i> {meeting.title}
                                  </a>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td>No meetings available</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    {index < Object.keys(groupedData).length - 1 && <h3>&nbsp;</h3>}
                  </div>
                ))
              ) : (
                <p>No data available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OutcomeMeet;