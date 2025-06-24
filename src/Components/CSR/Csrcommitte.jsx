"use client";
import React, { useState, useEffect } from "react";

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
    return <div className="p-4 bg-light rounded">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 bg-light text-danger rounded">Error: {error}</div>;
  }

  return (
    <div className="container my-4">
      <div className="text-black" style={{backgroundColor: "#f8f8f8", padding: "10px"}}>
        <h4 className="mb-0">CSR Committee</h4>
      </div>
      <div className="bg-white p-4 ">
        {members.map((member, index) => (
          <p key={index} className="mb-2">
            Mr. {member.full_name}, {member.position}
            {member.member_type ? `, ${member.member_type}` : ""}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CSRCommittee;
