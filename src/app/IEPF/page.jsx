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
        console.error('Error fetching IEPF data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className='investor_sec my-5 py-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <div className='bg-light p-4 rounded shadow-sm'>
              <h2 className='mb-4'>IEPF Details</h2>

              <div className='mb-4'>
                <h3 className='mb-3'>Details of Nodal Officer under IEPF Rules, 2016</h3>
                <p><strong>Name:</strong> {IEPFData.nodalOfficer.name}</p>
                <p>
                  <strong>E-mail ID:</strong> 
                  <a href={`mailto:${IEPFData.nodalOfficer.email}`} className='text-primary'>
                    {IEPFData.nodalOfficer.email}
                  </a>
                </p>
              </div>

              <div className='mb-4'>
                <h3 className='mb-3'>Transfer of Shares to IEPF</h3>
                {IEPFData.transferOfShares.map((year, index) => (
                  <div key={index} className='mb-4'>
                    <h4 className='mb-2'>{year.year}</h4>
                    <table className='table table-bordered table-hover'>
                      <tbody>
                        {year.documents.map((doc, docIndex) => (
                          <tr key={docIndex}>
                            <td>
                              <a href={doc.url} target='_blank' rel='noopener noreferrer' className='text-primary'>
                                {doc.title}
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>

              <div className='mb-4'>
                <h3 className='mb-3'>Unclaimed Dividend</h3>
                <p>{IEPFData.unclaimedDividend.info}</p>
                <table className='table table-bordered table-striped'>
                  <thead>
                    <tr>
                      <th scope='col'>Year</th>
                      <th scope='col'>Report</th>
                    </tr>
                  </thead>
                  <tbody>
                    {IEPFData.unclaimedDividend.years.map((year, index) => (
                      <tr key={index}>
                        <td>{year.year}</td>
                        <td>
                          <a href={year.url} target='_blank' rel='noopener noreferrer' className='text-primary'>
                            {year.title}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IEPF;
