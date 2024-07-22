"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import "../Disclosure/Disclosure.css"
const Disclosure = () => {
  const [disclosureData, setDisclosureData] = useState({ years: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/Investor/InvestorPage`, { Id: 15 });
        console.log("response: ", response.data);
        setDisclosureData(JSON.parse(response.data.results[0].content));
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
              {disclosureData.years.map((yearData, yearIndex) => (
                <div key={yearIndex} className="mb-5">
                  <h3 className="mb-4">Year {yearData.year}</h3>
                  <div className="table-responsive">
                    <table className='table table-bordered table-hover'>
                      <thead className="thead-light">
                        <tr>
                          {yearData.quarters.map((quarter, quarterIndex) => (
                            <th key={quarterIndex} className='col'>{quarter.quarter}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {yearData.quarters.map((quarter, quarterIndex) => (
                            <td key={quarterIndex} className="align-top">
                              <ul className="list-unstyled">
                                {quarter.items.map((item, itemIndex) => (
                                  <li key={itemIndex} className="mb-2">
                                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="d-flex align-items-center">
                                      <i className="fa fa-file-pdf-o mr-2" aria-hidden="true"></i>
                                      <span>{item.text}</span>
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Disclosure;