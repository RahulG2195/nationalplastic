import React from 'react';
import './ShareTransfer.css';

const ShareTransfer = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  // Group the data by year
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.year]) {
      acc[item.year] = [];
    }
    acc[item.year].push(item);
    return acc;
  }, {});

  return (
    <div className="card">
      <h3 className="card-title">Transfer of Shares to IEPF</h3>
      {Object.entries(groupedData).map(([year, documents]) => (
        <div key={year}>
          <h4>{year}</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Document</th>
              </tr>
            </thead>
            <tbody>
              {documents.map(item => (
                <tr key={item.id}>
                  <td>
                    <a href={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${item.document_link}`}>{item.document_name}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ShareTransfer;