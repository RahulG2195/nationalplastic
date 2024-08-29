"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Col, Statistic, Spin, Typography } from "antd";
import {
  ShoppingCartOutlined,
  DollarOutlined,
  UserOutlined,
  AppstoreOutlined,
  TagsOutlined
} from "@ant-design/icons";
import numberWithCommas from "@/utils/formatnumber";
const { Title } = Typography;


const Dashboard = () => {
  const [stats, setStats] = useState({
    orders: 0,
    revenue: 0,
    users: 0,
    products: 0,
    categories: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/Count`);
      const data = response.data;

      if (data.status === 200) {
        setStats({
          orders: data.OrderCount[0].order_count,
          revenue: data.OrderCount[0].order_amt,
          users: data.TotalUser[0].cust_count,
          products: data.allProducts[0].prod_count,
          categories: data.TotalCat[0].cat_count,
        });
      } else {
        throw new Error(data.message || "Failed to fetch statistics");
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
      // Here you might want to show an error message to the user
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, prefix, icon }) => (
    <Card style={{ height: '100%' }}>
      <Statistic
        title={<Title level={4}>{title}</Title>}
        value={value}
        prefix={icon}
        valueStyle={{ color: '#3f8600', fontSize: '24px' }}
        formatter={(value) => {
          let formattedValue;

          if (title === "Total Revenue") {
            // Convert the value to a number, then format it as currency with commas and two decimal places
            formattedValue = `Rs ${numberWithCommas(parseFloat(value).toFixed(2))}`;
          } else {
            // Round the value for "Total Orders" and remove decimals for other statistics
            formattedValue = Math.round(value);
          }

          // Return the formatted value with or without a prefix
          return prefix ? `${prefix} ${formattedValue}` : formattedValue;
        }}
      />
    </Card>

  );

  if (loading) {
    return <Spin size="large" style={{ display: 'block', margin: '20% auto' }} />;
  }

  return (
    <div className="container" style={{ padding: '24px' }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <StatCard
            title="Total Orders"
            value={stats.orders}
            icon={<ShoppingCartOutlined style={{ fontSize: '24px' }} />}
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <StatCard
            title="Total Revenue"
            value={stats.revenue}
            prefix="Rs"
            icon={<DollarOutlined style={{ fontSize: '24px' }} />}
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <StatCard
            title="Total Users"
            value={stats.users}
            icon={<UserOutlined style={{ fontSize: '24px' }} />}
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <StatCard
            title="Total Products"
            value={stats.products}
            icon={<AppstoreOutlined style={{ fontSize: '24px' }} />}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <StatCard
            title="Total Categories"
            value={stats.categories}
            icon={<TagsOutlined style={{ fontSize: '24px' }} />}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;