"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Layout, Space, Card, List, Alert, Spin, Table } from 'antd';
import { FileOutlined, WarningOutlined } from '@ant-design/icons';

const { Title, Paragraph, Link } = Typography;
const { Content } = Layout;

const SaakshamNiveshakSection = () => {
  const [data, setData] = useState([]);
  const [heading, setHeading] = useState({ sn_heading: '', sn_sub_para: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/admin/saaksham-niveshak');
        setData(response.data.results);
        setHeading(response.data.heading);
      } catch (error) {
        console.error('Error fetching Saaksham Niveshak data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Card>
      <Title level={3}>{heading.sn_heading}</Title>
      <Paragraph>{heading.sn_sub_para}</Paragraph>
      <Table
        dataSource={data}
        columns={[
          {
            title: 'Title',
            dataIndex: 'sn_content',
            key: 'sn_content',
          },
          {
            title: 'Download',
            key: 'action',
            render: (text, record) => (
              <a href={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${record.sn_pdf}`} target="_blank" rel="noopener noreferrer">
                <i className="fa fa-download" aria-hidden="true"></i>
              </a>
            ),
          },
        ]}
        pagination={false}
      />
    </Card>
  );
};

const InvestorKYC = () => {
  const [data, setData] = useState({
    message: '',
    circularLink: '',
    rta_heading: '',
    rta_link: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/investorKYC')
      .then(response => {
        const { message, circularLink, rta_heading, rta_link } = response.data;
        setData({ message, circularLink, rta_heading, rta_link });
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const rtaHeadings = data.rta_heading.split(',').map(heading => heading.trim());
  const rtaLinks = data.rta_link.split(',').map(link => link.trim());

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Layout>
      <Content>
        <Space direction="vertical" size="large" style={{ display: 'flex' }}>
          <Card>
            <Title level={2}>Investor KYC Information</Title>
            <Paragraph>{data.message}</Paragraph>
            <Paragraph>
              The said circular can be accessed through this link:{' '}
              <Link href={data.circularLink} target="_blank">
                {data.circularLink}
              </Link>
            </Paragraph>
          </Card>

          <Card title="Forms to be filed with Company / RTA">
            <List
              dataSource={rtaHeadings}
              renderItem={(heading, index) => (
                <List.Item>
                  <Space>
                    <FileOutlined />
                    <span>{heading} – </span>
                    <Link href={`/Assets/uploads/${rtaLinks[index]}`} target="_blank">
                      {rtaLinks[index]}
                    </Link>
                  </Space>
                </List.Item>
              )}
            />
          </Card>

          <SaakshamNiveshakSection />

          <Alert
            message="Important Notice"
            description={
              <div>
                <Paragraph strong>
                  If you fail to update the above-mentioned details, in terms of
                  the aforesaid circular, your shares shall be frozen from October 01,
                  2023.
                </Paragraph>
                <Paragraph strong>
                  Frozen folios shall be referred by the RTA / listed Company to the
                  administering authority under the Benami Transactions (Prohibitions)
                  Act, 1988 and/or Prevention of Money Laundering Act, 2002, if they
                  continue to remain frozen as on December 31, 2025.
                </Paragraph>
              </div>
            }
            type="warning"
            showIcon
            icon={<WarningOutlined />}
          />
        </Space>
      </Content>
    </Layout>
  );
}

export default InvestorKYC;