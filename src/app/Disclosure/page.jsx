"use client";
import React, { useEffect, useState } from 'react';
import { Table, Typography, Space, Card, Row, Col, Spin } from 'antd';
import { FilePdfOutlined } from '@ant-design/icons';
import styles from './Disclosure.css';
import axios from 'axios';
const { Title } = Typography;

const Disclosure = () => {
  const [disclosures, setDisclosures] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDisclosures = async () => {
      try {
        const response = await axios.get('/api/admin/Investors/ldCMS');
        if (response.status === 200) {
          setDisclosures(response.data.disclosures);
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
        <a key={index} href={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${link.url}`} target="_blank" rel="noopener noreferrer">
          <FilePdfOutlined /> {link.text}
        </a>
      ))}
    </Space>
  );

  const processDisclosures = (yearDisclosures) => {
    if (yearDisclosures.length === 0) return null;

    const year = yearDisclosures[0].year;
    const processedData = {
      year: year,
      quarter1: [],
      quarter2: [],
      quarter3: [],
      quarter4: [],
    };

    yearDisclosures.forEach(disclosure => {
      processedData[`quarter${disclosure.quarter}`].push({
        text: disclosure.document_type,
        url: disclosure.document_url,
      });
    });

    return processedData;
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div className="disclosure-container" style={{ padding: '24px' }}>
      <Row gutter={[16, 16]}>
        {Object.entries(disclosures).map(([year, yearDisclosures]) => {
          const processedYearData = processDisclosures(yearDisclosures);
          if (!processedYearData) return null;
          return (
            <Col xs={24} key={year}>
              <Card>
                <Title level={3}>{processedYearData.year}</Title>
                <Table
                  columns={columns}
                  dataSource={[processedYearData]}
                  pagination={false}
                  scroll={{ x: true }}
                  bordered
                  className={styles.disclosureTable}
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Disclosure;