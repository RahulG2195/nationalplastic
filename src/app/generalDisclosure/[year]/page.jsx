"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Layout, Typography, Table, Spin, Alert } from 'antd';
import { FileOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title } = Typography;

const YearPage = ({ params }) => {
  const { year } = params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/Investor/disclosure?year=${year}`);
        setData(response.data.results.map((item, index) => ({ ...item, key: index })));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [year]);

  const columns = [
    {
      title: 'Document',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <a
          href={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${record.file_path}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-600 hover:underline"
        >
          <FileOutlined style={{ marginRight: 8, color: '#1890ff' }} />
          {text}
        </a>
      ),
    },
  ];

  if (error) return <Alert message="Error" description={error.message} type="error" showIcon />;

  return (
    <Layout className="min-h-screen bg-white">
      <Content className="container mx-auto px-4 py-8">
        <Title level={2} className="mb-6 text-center">Investor Disclosures - {year}</Title>
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={false}
          className="shadow-md"
        />
      </Content>
    </Layout>
  );
};

export default YearPage;