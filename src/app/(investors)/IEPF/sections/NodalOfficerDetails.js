import React from 'react';
import './NodalOfficerDetails.css';

const NodalOfficerDetails = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card">
      <h3 className="card-title">Details of Nodal Officer under IEPF Rules, 2016</h3>
      <p>
        <strong>Name:</strong> {data[0].name}
      </p>
      <p>
        <strong>E-mail ID:</strong> <a href={`mailto:${data[0].email}`}>{data[0].email}</a>
      </p>
    </div>
  );
};

export default NodalOfficerDetails;