import React from 'react';

const Committee = ({ title, members }) => {
  return (

    
    <div className="committee-section">
    <h3>{title}</h3>
    <ul className="committee-list">
      {members.map((member, index) => (
        <li key={index}>{member}</li>
      ))}
    </ul>
  </div>
  );
};

export default Committee;
