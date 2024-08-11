"use client";
import  { useState, useEffect } from 'react';
import { Table, Typography } from 'antd';
import axios from 'axios';

const { Title } = Typography;

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('/api/admin/Investors/Transactions');
        setTransactions(response.data.transactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const columns = [
    {
      title: 'Document',
      dataIndex: 'document',
      key: 'document',
      render: (text, record) => (
        <a href={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${record.url}`} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
  ];

  return (
    <section className="investor-sec my-5 py-5">
      <div className="container">
        <Title level={2} className="text-center mb-4">
          RELATED PARTY TRANSACTION
        </Title>
        <Table
          dataSource={transactions}
          columns={columns}
          rowKey="id"
          pagination={false}
          bordered
        />
      </div>
    </section>
  );
};

export default Transaction;