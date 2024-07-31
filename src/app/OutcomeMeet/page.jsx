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
        const response = await axios.get('/api/boardOutcome');
        setOutcomeData(response.data);
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
    const year = item.year_heading || 'Unknown Year';
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
                                  {meeting.pdf.split(',').map((pdf, pdfIndex) => (
                                    <a key={pdfIndex} target='_blank' href={pdf} rel="noopener noreferrer" className='d-block'>
                                      <i className="fa fa-file-pdf-o" aria-hidden="true"></i> {pdf}
                                    </a>
                                  ))}
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


// {
//   "years": [
//     {
//       "year": "2024-2025",
//       "meetings": [
//         {
//           "href": "/Assets/pdf/BSE%20Upload-3-13_merged.pdf",
//           "text": "Outcome of Board Meeting 21st May 2024"
//         }
//       ]
//     },
//     {
//       "year": "2023-2024",
//       "meetings": [
//         {
//           "href": "/Assets/pdf/BSE%20Upload(15).pdf",
//           "text": "Outcome of Board Meeting 12th February 2024"
//         },
//         {
//           "href": "/Assets/pdf/BSE%20Upload(8).pdf",
//           "text": "Outcome of Board Meeting 9th November 2023"
//         },
//         {
//           "href": "/Assets/pdf/BSE%20Upload(3).pdf",
//           "text": "Outcome of Board Meeting 11th August 2023"
//         },
//         {
//           "href": "/Assets/pdf/Outcome%20of%20Board%20Meeting%2026th%20May%202023(2).pdf",
//           "text": "Outcome of Board Meeting 26th May 2023"
//         }
//       ]
//     },
//     {
//       "year": "2022-2023",
//       "meetings": [
//         {
//           "href": "/Assets/pdf/Outcome%20of%20Board%20Meeting%20February%2013,%202023.pdf",
//           "text": "Outcome of Board Meeting 13th February 2023"
//         },
//         {
//           "href": "/Assets/pdf/Outcome%20of%20Board%20Meeting%2028th%20May%202022.pdf",
//           "text": "Outcome of Board Meeting 28th May 2022"
//         },
//         {
//           "href": "/Assets/pdf/Outcome%20of%20Board%20Meeting%20August%2011,%202022.pdf",
//           "text": "Outcome of Board Meeting 11th August 2022"
//         },
//         {
//           "href": "/Assets/pdf/Outcome%20of%20Board%20Meeting%20November%2014,%202022.pdf",
//           "text": "Outcome of Board Meeting 14th November 2022"
//         }
//       ]
//     }
//   ]
// }