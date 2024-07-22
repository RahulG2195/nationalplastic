"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const initialFinancialResults = [
  {
    year: "20232024",
    quarters: [
      { title: "30th June 2023", link: "/Assets/pdf/Financial%20Results%20-%20Ind%20AS.pdf" },
      { title: "30th September 2023", link: "/Assets/pdf/financials.pdf" },
      { title: "31st December 2023", link: "/Assets/pdf/31st%20December%202023.pdf" }
    ]
  },
  {
    year: "2022-2023",
    quarters: [
      { title: "30th June 2022", link: "/Assets/pdf/30th%20June%202022(1).pdf" },
      { title: "30th September 2022", link: "/Assets/pdf/30th%20September%202022(3).pdf" },
      { title: "31st December 2022", link: "/Assets/pdf/31st%20December%202022(3).pdf" }
    ]
  },
  {
    year: "2021-2022",
    quarters: [
      { title: "30th June 2021", link: "" },
      { title: "30th September 2021", link: "" },
      { title: "31st December 2021", link: "/Assets/pdf/31st%20December,%202021.pdf" }
    ]
  },
  {
    year: "2020-2021",
    quarters: [
      { title: "30th June 2020", link: "/Assets/pdf/Q1(1).pdf" },
      { title: "30th September 2020", link: "/Assets/pdf/30th%20Sept%202020.pdf" },
      { title: "31st December 2020", link: "/Assets/pdf/31th%20Dec%202020.pdf" }
    ]
  },
  {
    year: "2019-2020",
    quarters: [
      { title: "30th June 2019", link: "/Assets/pdf/Q1(1).pdf" },
      { title: "30th September 2019", link: "/Assets/pdf/Unaudited_Financial_Results_30_Sept_2018.pdf" },
      { title: "31st December 2019", link: "/Assets/pdf/31st%20December%202019.pdf" }
    ]
  },
  {
    year: "2018-2019",
    quarters: [
      { title: "30th June 2018", link: "/Assets/pdf/Unaudited_Financial_Results_30.06.2018.pdf" },
      { title: "30th September 2018", link: "/Assets/pdf/Unaudited_Financial_Results_30_Sept_2018.pdf" },
      { title: "31st December 2018", link: "/Assets/pdf/Unaudited_Financial_Results_31_December%202018.pdf" }
    ]
  },
  {
    year: "2017-2018",
    quarters: [
      { title: "30th June 2017", link: "/Assets/pdf/Unaudited_Financial_Results_30.06.2017.pdf" },
      { title: "30th September 2017", link: "/Assets/pdf/Unaudited_Financial_Results_30.09.2017.pdf" },
      { title: "31st December 2017", link: "/Assets/pdf/Unaudited_Financial_Results_31.12.2017.pdf" }
    ]
  },
  {
    year: "2016-2017",
    quarters: [
      { title: "30th June 2016", link: "/Assets/pdf/Unaudited_Financial_Results_30.06.2016.pdf" },
      { title: "30th September 2016", link: "/Assets/pdf/Unaudited_Financial_Results_30.09.2016.pdf" },
      { title: "31st December 2016", link: "/Assets/pdf/Unaudited_Financial_Results_31.12.2016.pdf" }
    ]
  },
  {
    year: "2015-2016",
    quarters: [
      { title: "30th June 2015", link: "/Assets/pdf/Unaudited_Financial_Results_30.06.2015.pdf" },
      { title: "30th September 2015", link: "/Assets/pdf/Unaudited_Financial_Results_30.09.2015.pdf" },
      { title: "31st December 2015", link: "/Assets/pdf/Unaudited_Financial_Results_31.12.2015.pdf" }
    ]
  },
  {
    year: "2014-2015",
    quarters: [
      { title: "30th June 2014", link: "/Assets/pdf/Unaudited_Financial_Results_30.06.2014.pdf" },
      { title: "30th September 2014", link: "/Assets/pdf/Unaudited_Financial_Results_30.09.2014.pdf" },
      { title: "31st December 2014", link: "/Assets/pdf/Unaudited_Financial_Results_31.12.2014.pdf" }
    ]
  },
  {
    year: "2013-2014",
    quarters: [
      { title: "30th June 2013", link: "/Assets/pdf/Unaudited_Financial_Results_30.06.2013.pdf" },
      { title: "30th September 2013", link: "/Assets/pdf/Unaudited_Financial_Results_30.09.2013.pdf" },
      { title: "31st December 2013", link: "/Assets/pdf/Unaudited_Financial_Results_31.12.2013.pdf" }
    ]
  },
  {
    year: "2012-2013",
    quarters: [
      { title: "30th June 2012", link: "/Assets/pdf/Unaudited_Financial_Results_30.06.2012.pdf" },
      { title: "30th September 2012", link: "/Assets/pdf/Unaudited_Financial_Results_30.09.2012.pdf" },
      { title: "31st December 2012", link: "/Assets/pdf/Unaudited_Financial_Results_31.12.2012.pdf" }
    ]
  },
  {
    year: "2011-2012",
    quarters: [
      { title: "30th June 2011", link: "/Assets/pdf/Unaudited_Financial_Results_30.06.2011.pdf" },
      { title: "30th September 2011", link: "/Assets/pdf/Unaudited_Financial_Results_30.09.2011.pdf" },
      { title: "31st December 2011", link: "/Assets/pdf/Unaudited_Financial_Results_31.12.2011.pdf" }
    ]
  },
  {
    year: "2010-2011",
    quarters: [
      { title: "30th June 2010", link: "/Assets/pdf/Unaudited_Financial_Results_30.06.2010.pdf" },
      { title: "30th September 2010", link: "/Assets/pdf/Unaudited_Financial_Results_30.09.2010.pdf" },
      { title: "31st December 2010", link: "/Assets/pdf/Unaudited_Financial_Results_31.12.2010.pdf" }
    ]
  }
];

const Unaudited = () => {
  const [FinancialResults, setFinancialResults] = useState(initialFinancialResults);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/Investor/Unaudited`)
      .then((response) => {
        if (Array.isArray(response.data.results)) {
          const updatedResults = response.data.results.map(result => ({
            ...result,
            quarters: Array.isArray(JSON.parse(result.quarters)) ? JSON.parse(result.quarters) : []
          }));
          setFinancialResults(updatedResults);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <section className='investor_sec my-5 py-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <table className="table table-responsive table-striped table-light table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">Year</th>
                  <th scope="col">Financial Results - Q1</th>
                  <th scope="col">Financial Results - Q2</th>
                  <th scope="col">Financial Results - Q3</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(FinancialResults) ? FinancialResults.map((result, index) => (
                  <tr key={index}>
                    <td data-title="Year">{result.year}</td>
                    {Array.isArray(result.quarters) ? result.quarters.map((quarter, qIndex) => (
                      <td key={qIndex} data-title={`Quarter - ${qIndex + 1}`}>
                        {quarter.link ? (
                          <a target='_blank' rel="noopener noreferrer" href={quarter.link}>
                            {quarter.title}
                          </a>
                        ) : (
                          <span>{quarter.title}</span>
                        )}
                      </td>
                    )) : (
                      <td colSpan="3">No data available</td>
                    )}
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4">Loading...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Unaudited;
