"use client";
import React, { useEffect, useState } from 'react';
import { Table, Typography, Space, Card, Row, Col, Spin } from 'antd';
import { FilePdfOutlined } from '@ant-design/icons';
import styles from './Disclosure.css';
const { Title } = Typography;

const Disclosure = () => {
  const [disclosures, setDisclosures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDisclosures = async () => {
      try {
        const response = await fetch('/api/admin/Investors/l_disclosures');
        const data = await response.json();
        if (data.status === 200) {
          setDisclosures(data.disclosures);
        } else {
          console.error('Failed to fetch disclosures');
        }
      } catch (error) {
        console.error('Error fetching disclosures:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDisclosures();
  }, []);

  const columns = [
    {
      title: 'Quarter - 1',
      dataIndex: 'quarter1',
      key: 'quarter1',
      render: (links) => renderLinks(links),
    },
    {
      title: 'Quarter - 2',
      dataIndex: 'quarter2',
      key: 'quarter2',
      render: (links) => renderLinks(links),
    },
    {
      title: 'Quarter - 3',
      dataIndex: 'quarter3',
      key: 'quarter3',
      render: (links) => renderLinks(links),
    },
    {
      title: 'Quarter - 4',
      dataIndex: 'quarter4',
      key: 'quarter4',
      render: (links) => renderLinks(links),
    },
  ];

  const renderLinks = (links) => (
    <Space direction="vertical">
      {links.map((link, index) => (
        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
          <FilePdfOutlined /> {link.text}
        </a>
      ))}
    </Space>
  );

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div className="disclosure-container" style={{ padding: '24px' }}>
      <Row gutter={[16, 16]}>
        {disclosures.map((yearData, index) => (
          <Col xs={24} key={index}>
            <Card>
              <Title level={3}>{yearData.year}</Title>
              <Table
  columns={columns}
  dataSource={[yearData]}
  pagination={false}
  scroll={{ x: true }}
  bordered
  className={styles.disclosureTable}
/>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Disclosure;