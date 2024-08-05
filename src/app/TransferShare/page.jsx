"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

const TransferShare = () => {
  const [transferShareData, setTransferShareData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/GetInvestor`,{ type: "transfer" });
        console.log('response', response);

        const parsedData = response.data.results.reduce((acc, item) => {
          acc[item.years] = JSON.parse("[" + item.documents + "]");
          return acc;
        }, {});

        console.log('parsedData', parsedData);
        setTransferShareData(parsedData);
      } catch (error) {
        console.error("Error fetching transfers results data:", error);
        setError("Failed to load data. Please try again later.");
      } finally {
        setIsLoading(false);
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
              <div className="investor-table">
                <h3 className='pb-4'>Newspaper Publication - Transfer of Share Notice</h3>

                {Object.entries(transferShareData).map(([year, yearData]) => (
                  <div key={year}>
                    <h3>Year {year}</h3>
                    <table className="table table-responsive table-striped table-light">
                      <tbody>
                        {yearData.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <a target="_blank" href={item.file_name}>
                                <i
                                  className="fa fa-file-pdf-o"
                                  aria-hidden="true"
                                ></i> {item.title}
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
      </div>
    </section>
  );
};

export default TransferShare;