"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Team from "@/Components/About/team";
import ComapnyProfileSidebar from "../ComapnyProfileSidebar";

const Promoters = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get("/api/admin/promotors");
      if (response.data.status === 200) {
        setTeamMembers(response.data.teamMembers);
      } else {
        console.error("Failed to fetch team members:", response.data.message);
      }
    } catch (error) {
      console.error("Failed to fetch team members:", error);
    }
  };

  return (
    <>
      <div className="py-5" id="managementBoardCommittees">
        <div className="row mx-auto team-members justify-content-center">
          <div className="col-12 col-md-8 order-2 order-md-1 order-lg-1">
            <div className="row section_header team-header">
              <h2>Team</h2>
              <h3 className='text-danger'>PROMOTERS/DIRECTORS</h3>
            </div>
            {teamMembers.map((member, index) => (
              <div key={member.id} className='mob_content'>
                <div className="team-members-container">
                  <div
                    className={`row team-member align-items-center ${
                      index % 2 === 0 ? "left-image" : "right-image"
                    }`}
                  >
                    <div
                      className={`col-md-4 ${
                        index % 2 === 0
                          ? "order-md-1 order-xs-1"
                          : "order-md-2 order-xs-2"
                      }`}
                    >
                      <Team image={member.image_url} />
                    </div>
                    <div
                      className={`col-md-8 ${
                        index % 2 === 0 ? "order-2" : "order-1"
                      }`}
                    >
                      <div className="team-detail">
                        <h3 className="team-title">{member.name}</h3>
                        <h4 className="team-designation">
                          {member.designation}
                        </h4>
                        <p className=" text-justify team-description">{member.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-12 col-md-3 order-1 order-md-2 order-lg-2 justify-content-end">
            <ComapnyProfileSidebar title={"PROMOTERS/DIRECTORS"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Promoters;
