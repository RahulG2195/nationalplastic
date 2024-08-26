"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Layout, Space, Card, List, Alert, Spin } from 'antd';
import { FileOutlined, WarningOutlined } from '@ant-design/icons';

const { Title, Paragraph, Link } = Typography;
const { Content } = Layout;

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
      <Content style={{ padding: '50px' }}>
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