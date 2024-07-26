"use client";
import React, { useState, useEffect } from "react";
import "./management.css";
import ComapnyProfileSidebar from "@/Components/About/ComapnyProfileSidebar";

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

function Manage() {
  const [committees, setCommittees] = useState([]);
  const [management, setManagement] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/admin/committees-and-management');
        const data = await response.json();
        if (data.status === 200) {
          setCommittees(data.data.filter(item => item.type === 'committee'));
          setManagement(data.data.filter(item => item.type === 'management'));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row py-5 justify-content-center">
        <div className="col-12 col-md-7">
          <div className="committee-section mb-4">
            <h2>Committee</h2>
          </div>
          {committees.map((committee, index) => (
            <Committee key={index} title={committee.category} members={committee.members} />
          ))}
          <div className="management-section">
            <h2>Management</h2>
            {management.map((item, index) => (
              <p key={index}>{item.members.join(', ')}</p>
            ))}
          </div>
        </div>
        <div className="col-12 col-md-3">
          <ComapnyProfileSidebar title="MANAGEMENT AND BOARD COMMITTEES" />
        </div>
      </div>
    </div>
  );
}

export default Manage;