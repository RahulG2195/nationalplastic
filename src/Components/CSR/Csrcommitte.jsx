"use client";
import React, { useState, useEffect } from "react";

const CSRCommittee = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("/api/admin/csr-committee");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        // Debug: Log the actual response to console
        console.log('API Response:', result);
        
        // Handle different possible response formats
        if (result.success && result.members && Array.isArray(result.members)) {
          setMembers(result.members);
        } else if (result.data && Array.isArray(result.data)) {
          // Alternative format with just data array
          setMembers(result.data);
        } else if (Array.isArray(result)) {
          // Direct array response
          setMembers(result);
        } else {
          console.error('Unexpected response format:', result);
          setError(result.message || `Invalid response format. Expected members array but got: ${JSON.stringify(result)}`);
        }
      } catch (err) {
        console.error('Error fetching committee data:', err);
        setError(`Failed to fetch committee data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const getPrefix = (member) => {
    // Basic logic to determine prefix based on name or you can add a gender field to your data
    const femaleNames = ['ranganayaki', 'priya', 'sunita', 'kavita', 'meera', 'anjali'];
    const firstName = member.full_name.toLowerCase().split(' ')[0];
    return femaleNames.includes(firstName) ? 'Ms.' : 'Mr.';
  };

  if (loading) {
    return <div className="p-4 bg-light rounded">Loading committee members...</div>;
  }

  if (error) {
    return <div className="p-4 bg-light text-danger rounded">Error: {error}</div>;
  }

  return (
    <div className="container my-4">
      <div className="text-black" style={{backgroundColor: "#f8f8f8", padding: "10px"}}>
        <h4 className="mb-0">CSR Committee</h4>
      </div>
      <div className="bg-white p-4">
        {members.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-muted">No committee members available at the moment.</p>
          </div>
        ) : (
          members.map((member) => (
            <div key={member.id} className="mb-2">
              <p className="mb-2">
                {getPrefix(member)} {member.full_name}, {member.position}
                {member.member_type && `, ${member.member_type}`}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CSRCommittee;