"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

const IEPF = () => {
  const [IEPFData, setIEPFData] = useState({
    nodalOfficer: {},
    transferOfShares: [],
    unclaimedDividend: { info: '', years: [] }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/Investor/InvestorPage`, { Id: 24 });
        setIEPFData(JSON.parse(response.data.results[0].content));
      } catch (error) {
        console.error('Error fetching shareholding data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section className='investor_sec my-5 py-5'>
        <div className='container'>
          <div className='row'>
            <div className="inn-content-wrap">
              <p><strong>Details of Nodal Officer under IEPF Rules, 2016</strong></p>

              <p>Name: <span>{IEPFData.nodalOfficer.name}</span></p>

              <p>E-mail ID: <a target='_blank' href={`mailto:${IEPFData.nodalOfficer.email}`}>{IEPFData.nodalOfficer.email}</a></p>

              <h3>Transfer of Shares to IEPF</h3>

              {IEPFData.transferOfShares.map((year, index) => (
                <div key={index}>
                  <h3>{year.year}</h3>
                  <table border="0" cellPadding="0" cellSpacing="0" className="nb-table" rules="all" width="100%">
                    <tbody>
                      {year.documents.map((doc, docIndex) => (
                        <tr key={docIndex}>
                          <td><a target='_blank' href={doc.url}>{doc.title}</a></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}

              <h3>Unclaimed Dividend</h3>

              <p>{IEPFData.unclaimedDividend.info}</p>

              <div className="investor-table">
                <table border="0" cellPadding="0" cellSpacing="0" className="grid-table grid-table-striped table-condensed cf" id="grid_detail" rules="all" width="100%">
                  <tbody>
                    {IEPFData.unclaimedDividend.years.map((year, index) => (
                      <tr key={index}>
                        <td data-title="Year" width="25%"><strong>{year.year}</strong></td>
                        <td data-title="Report" width="75%"><a target='_blank' href={year.url}>{year.title}</a></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default IEPF