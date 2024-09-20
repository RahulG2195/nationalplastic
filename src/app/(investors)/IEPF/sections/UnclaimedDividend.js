import React from 'react';
import './UnclaimedDividend.css';

const UnclaimedDividend = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>Loading...</div>;
  }

  const { content, reports } = data[0];

  return (
    <div className="card">
      <h3 className="card-title">Unclaimed Dividend</h3>
      <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '</p><p>') }} />
      <table className="table">
        <thead>
          <tr>
            <th>Year</th>
            <th>Report</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(item => (
            <tr key={item.id}>
              <td>{item.year}</td>
              <td>
                <a href={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${item.report_link}`}>{item.report_title}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UnclaimedDividend;