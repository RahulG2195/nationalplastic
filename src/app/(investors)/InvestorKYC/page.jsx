"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InvestorKYC = () => {
  const [data, setData] = useState({
    message: '',
    circularLink: '',
    rta_heading: '',
    rta_link: ''
  });

  useEffect(() => {
    // Fetch data from API when component mounts
    axios.get('/api/investorKYC')  // Replace with your API endpoint
      .then(response => {
        const { message, circularLink, rta_heading, rta_link } = response.data;
        setData({
          message,
          circularLink,
          rta_heading,
          rta_link
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const rtaHeadings = data.rta_heading.split(',').map(heading => heading.trim());
  const rtaLinks = data.rta_link.split(',').map(link => link.trim());

  return (
    <section className='investor_sec my-5 py-5'>
      <div className='container'>
        <div className='row'>
          <div className="inn-content-wrap">
            <p style={{ margin: "0cm 0cm 0.0001pt" }}>
              <span style={{ fontSize: "11pt" }}>
                <span style={{ color: "#494949" }}>{data.message}</span>
              </span>
            </p>
            <p style={{ margin: "0cm 0cm 0.0001pt" }}>&nbsp;</p>
            <p style={{ margin: "0cm 0cm 0.0001pt" }}>
              <span style={{ fontSize: "11pt" }}>
                <span style={{ color: "#494949" }}>
                  The said circular can be accessed through link -{" "}
                  <a
                    href={data.circularLink}
                    style={{ color: "blue", textDecoration: "underline" }}
                  >
                    {data.circularLink}
                  </a>{" "}
                </span>
              </span>
            </p>
            <p style={{ margin: "0cm 0cm 0.0001pt" }}>&nbsp;</p>
            <p style={{ margin: "0cm 0cm 0.0001pt" }}>
              <span style={{ fontSize: "11pt" }}>
                <span style={{ color: "#494949" }}>
                  Forms to be filed with Company / RTA :{" "}
                </span>
              </span>
            </p>
            <p style={{ margin: "0cm 0cm 0.0001pt" }}>&nbsp;</p>

            {rtaHeadings.map((heading, index) => (
              <p key={index} style={{ margin: "0cm 0cm 0.0001pt" }}>
                <span style={{ fontSize: "11pt" }}>
                  <span style={{ color: "#494949" }}>
                    {heading} –{" "}
                    <a
                      target='_blank'
                      href={`/Assets/uploads/${rtaLinks[index]}`}
                    >
                      {rtaLinks[index]}
                    </a>
                  </span>
                </span>
              </p>
            ))}

            <p style={{ margin: "0cm 0cm 0.0001pt" }}>&nbsp;</p>
            <p>
              <b>
                <span style={{ fontSize: "14.0pt" }}>
                  <span style={{ fontSize: "12pt" }}>
                    <span style={{ color: "#494949" }}>
                      If you fail to update the above-mentioned details, in terms of
                      the aforesaid circular, your shares shall be frozen from October 01,
                      2023.&nbsp;
                    </span>
                  </span>
                </span>
              </b>
              <b>
                <span style={{ fontSize: "14.0pt" }}>
                  <span style={{ fontSize: "12pt" }}>
                    <span style={{ color: "#494949" }}>
                      Frozen folios shall be referred by the RTA / listed Company to the
                      administering authority under the Benami Transactions (Prohibitions)
                      Act, 1988 and/or Prevention of Money Laundering Act, 2002, if they
                      continue to remain frozen as on December 31, 2025.
                    </span>
                  </span>
                </span>
              </b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InvestorKYC;
