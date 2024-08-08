"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditableBanner from '@/Components/Admin/heroBanners/heroBanners';

const ExamplePage = () => {
  const [bannerData, setBannerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const id = 3;
        const response = await axios.get(`/api/heroBanners`, { params: { id } });
        setBannerData(response.data.bannerData);
      } catch (err) {
        setError('Error fetching banner data');
        console.error('Error fetching banner data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBannerData();
  }, []); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {bannerData ? (
        <EditableBanner data={bannerData} />
      ) : (
        <p>No banner data available.</p>
      )}
    </div>
  );
};

export default ExamplePage;
