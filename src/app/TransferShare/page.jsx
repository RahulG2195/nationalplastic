"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

const TransferShare = () => {
  const [transferShareData, setTransferShareData] = useState({ title: '', entries: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/Investor/InvestorPage`, { Id: 13 });
        setTransferShareData(JSON.parse(response.data.results[0].content));
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
              <div className="investor-table">
                <h3>{transferShareData.title}</h3>

                {transferShareData.entries.map((entry, index) => (
                  <div key={index}>
                    <p>&nbsp;</p>
                    <p><strong>{entry.date}</strong></p>
                    <table className='table table-responsive table-striped table-light'>
                      <tbody>
                        {entry.items.map((item, itemIndex) => (
                          <tr key={itemIndex}>
                            <td>
                              <a target='_blank' href={item.href} rel="noopener noreferrer">
                                {item.text}
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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