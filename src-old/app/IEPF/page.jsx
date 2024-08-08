'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NodalOfficerDetails from './sections/NodalOfficerDetails';
import ShareTransfer from './sections/ShareTransfer';
import UnclaimedDividend from './sections/UnclaimedDividend';
import './IEPF.css';

const IEPF = () => {
  const [nodalOfficerData, setNodalOfficerData] = useState(null);
  const [shareTransferData, setShareTransferData] = useState(null);
  const [unclaimedDividendData, setUnclaimedDividendData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [nodalResponse, shareResponse, dividendResponse] = await Promise.all([
          axios.get('/api/admin/Investors/iepf?section=NodalOfficerDetails'),
          axios.get('/api/admin/Investors/iepf?section=ShareTransfer'),
          axios.get('/api/admin/Investors/iepf?section=UnclaimedDividend')
        ]);

        setNodalOfficerData(nodalResponse.data.pageData);
        setShareTransferData(shareResponse.data.pageData);
        setUnclaimedDividendData(dividendResponse.data.pageData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="layout">
      <h2>Investor Education and Protection Fund (IEPF)</h2>
      <div className="space">
        <NodalOfficerDetails data={nodalOfficerData} />
        <ShareTransfer data={shareTransferData} />
        <UnclaimedDividend data={unclaimedDividendData} />
      </div>
    </div>
  );
};

export default IEPF;