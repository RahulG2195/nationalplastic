"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const Notice = () => {
  const [Notices, setNotice] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/GetInvestor`,
          { type: "notice" }
        );
        const parsedData = response.data.results.reduce((acc, item) => {
          acc[item.years] = JSON.parse("[" + item.documents + "]");
          return acc;
        }, {});


        setNotice(parsedData);
      } catch (error) {
        console.error("Error fetching Corporate results data:", error);
        setError("Failed to load data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section className="investor_sec my-5 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="inn-content-wrap">
                {Object.entries(Notices).map(([year, yearData]) => (
                  <div key={year}>
                    <h3>Year {year}</h3>
                    <table className="table table-responsive table-striped table-light">
                      <tbody>
                        {yearData.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <a target="_blank" href={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${item.file_name}`}>
                                <i
                                  className="fa fa-file-pdf-o"
                                  aria-hidden="true"
                                ></i>{" "}
                                {item.title}
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

export default Notice;
