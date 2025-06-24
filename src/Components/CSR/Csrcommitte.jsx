"use client";
import React, { useState, useEffect } from "react";
import "./Environmental.css";

const CSRCommittee = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("/api/csr-committee");
        const result = await response.json();
        if (result.success) {
          setMembers(result.members);
        } else {
          setError(result.message || "Unknown error");
        }
      } catch (err) {
        setError("Failed to fetch committee data");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return <div className="committee-box">Loading...</div>;
  }

  if (error) {
    return <div className="committee-box text-danger">Error: {error}</div>;
  }

  return (
    <div className="committee-box">
      <div className="committee-header">CSR Committee</div>
      {members.map((member, index) => (
        <p key={index} className="committee-entry">
          Mr. {member.full_name}, {member.position}, {member.member_type}
        </p>
      ))}
    </div>
  );
};

export default CSRCommittee;
