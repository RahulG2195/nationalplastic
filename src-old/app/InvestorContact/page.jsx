"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const InvestorContact = () => {
  const [investorContacts, setInvestorContacts] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios.get('/api/investorsContact')
    .then(response => {
      setInvestorContacts(response.data.investorContact)  // Note: it's investorContact, not investorContacts
    })
    .catch(error => {
      console.error('Error fetching investor contacts:', error);
    });
  }, []);

  // Separate data by id
  const investorServices = investorContacts?.find(contact => contact.id === 1) || {};
  const investorRelations = investorContacts?.find(contact => contact.id === 2) || {};
  const registrarsAndAgents = investorContacts?.find(contact => contact.id === 3) || {};
  return (
    <section className="investor-sec custom-section p-0 p-md-5">
      <div className="container">
        <div className="row">
          {/* Investor Services Section */}
          {investorServices && investorServices.heading && (
            <div className="col-12">
              <div className="inn-content-wrap custom-content p-4 shadow-sm rounded">
                <h3 className="custom-title">{investorServices.heading}</h3>
                <p className="custom-description">{investorServices.subheading}</p>
                {investorServices.cs_name && (
                  <div className="contact-info mb-4">
                    <p className="contact-name"><strong>{investorServices.cs_name}</strong></p>
                    {investorServices.designation && <p>{investorServices.designation}</p>}
                    {investorServices.email_1 && (
                      <p>
                        <strong>Email: </strong>
                        <a href={`mailto:${investorServices.email_1}`} className="custom-link">{investorServices.email_1}</a>
                      </p>
                    )}
                    {investorServices.phoneno_1 && (
                      <p>
                        <strong>Ph. No.: </strong>{investorServices.phoneno_1}
                      </p>
                    )}
                    {investorServices.fax_no && (
                      <p>
                        <strong>Fax: </strong>{investorServices.fax_no}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Investor Relations Section */}
          {investorRelations && (
            <div className="col-12">
              <div className="inn-content-wrap custom-content p-4 shadow-sm rounded">
                <h3 className="custom-title">{investorRelations.heading}</h3>
                {investorRelations.address && (
                  <p className="custom-address">
                   <span className="fw-bold"> {investorRelations.company_name && <strong>{investorRelations.company_name}</strong>}<br /></span>
                    {investorRelations.address}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Registrars & Share Transfer Agents Section */}
          {registrarsAndAgents && (
            <div className="col-12">
              <div className="inn-content-wrap custom-content p-4 shadow-sm rounded">
                <h3 className="custom-title">{registrarsAndAgents.heading}</h3>

                {registrarsAndAgents.company_name && (
                  <p className="custom-contact">
                    <strong>{registrarsAndAgents.company_name}</strong>
                  </p>
                )}
                {registrarsAndAgents.address && (
                  <p className="custom-contact">
                    {registrarsAndAgents.address}
                  </p>
                )}

                {registrarsAndAgents.email_1 && (
                  <p className="custom-contact">
                    <strong>Email:</strong> <a href={`mailto:${registrarsAndAgents.email_1}`} target="_blank" rel="noopener noreferrer" className="custom-link">{registrarsAndAgents.email_1}</a>
                  </p>
                )}
                {registrarsAndAgents.phoneno_1 && (
                  <p className="custom-contact">
                    <strong>Tel No:</strong> {registrarsAndAgents.phoneno_1}{registrarsAndAgents.phoneno_2 && `/${registrarsAndAgents.phoneno_2}`}
                  </p>
                )}
                {registrarsAndAgents.toll_free_no && (
                  <p className="custom-contact">
                    <strong>Toll Free No:</strong> {registrarsAndAgents.toll_free_no}
                  </p>
                )}
                {registrarsAndAgents.website && (
                  <p className="custom-contact">
                    <strong>Website:</strong> <a href={registrarsAndAgents.website} target="_blank" rel="noopener noreferrer" className="custom-link">{registrarsAndAgents.website}</a>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InvestorContact;
