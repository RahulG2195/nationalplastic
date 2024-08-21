"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const OutcomeAGM = () => {
  const [agmOutcomes, setAgmOutcomes] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/admin/Investors/OutcomeAGM`
        );
        
        const parsedData = response.data.outcomeAGMData.reduce((acc, item) => {
          if (!acc[item.financial_year]) {
            acc[item.financial_year] = [];
          }
          acc[item.financial_year].push(item);
          return acc;
        }, {});

        setAgmOutcomes(parsedData);
      } catch (error) {
        console.error("Error fetching OutcomeAGM data:", error);
        setError("Failed to load data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <section className="investor_sec my-5 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="inn-content-wrap">
                {Object.entries(agmOutcomes).map(([year, yearData]) => (
                  <div key={year}>
                    <h3>{year}</h3>
                    <table className="table table-responsive table-striped table-light">
                      <tbody>
                        {yearData.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <a target="_blank" href={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${item.file_path}`}>
                                <i
                                  className="fa fa-file-pdf-o"
                                  aria-hidden="true"
                                ></i>{" "}
                                {item.notice_title}
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