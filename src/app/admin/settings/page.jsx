
"use client";
import React, { useState, useEffect } from 'react';
import { Switch, Card, Typography } from 'antd';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const { Title } = Typography;

const SettingsPage = () => {
  const [priceVisible, setPriceVisible] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPriceVisibility = async () => {
      try {
const response = await axios.get(
          '/api/settings/price-visibility',
          {
            // Add these headers to prevent caching
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0',
            },
          }
        );
        setPriceVisible(response.data.set_status === 1);
      } catch (error) {
        console.error('Error fetching price visibility:', error);
        toast.error('Failed to fetch price visibility setting.');
      } finally {
        setLoading(false);
      }
    };

    fetchPriceVisibility();
  }, []);

  const handlePriceVisibilityChange = async (checked) => {
    try {
      await axios.post('/api/admin/settings/price-visibility', {
        set_status: checked ? 1 : 0,
      });
      setPriceVisible(checked);
      toast.success(`Prices are now ${checked ? 'visible' : 'hidden'}.`);
    } catch (error) {
      console.error('Error updating price visibility:', error);
      toast.error('Failed to update price visibility setting.');
    }
  };

  return (
    <Card>
      <Toaster />
      <Title level={2}>Settings</Title>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Title level={4}>Show Prices</Title>
        <Switch
          checked={priceVisible}
          onChange={handlePriceVisibilityChange}
          loading={loading}
        />
      </div>
    </Card>
  );
};

export default SettingsPage;
