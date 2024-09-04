"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Input, Button } from 'reactstrap';
import axios from 'axios';
import { Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { useRouter } from "next/navigation";
import moment from 'moment';

const TermsandconditionCMS = () => {
  const router = useRouter();
  const [termsData, setTermsData] = useState([]);
  const [filteredTermsData, setFilteredTermsData] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const rawData = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/TermsandconditionCMS`);
      const { results } = rawData.data;
      setTermsData(results);
      setFilteredTermsData(results);
    };
    fetchData();
  }, []);

  const handleOnclick = (id) => {
    const termsToEdit = termsData.find(item => item.id === id);
    localStorage.setItem('termsToEdit', JSON.stringify(termsToEdit));
    router.push("/admin/EditTermsAndConditions");
  };


  const columns = [
    {
      title: 'Index',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Page',
      dataIndex: 'page',
      key: 'page',
      render: (text) => (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ),
    },
    {
      title: 'Banner Image',
      dataIndex: 'banner_image',
      key: 'banner_image',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button onClick={() => handleOnclick(record.id)} color="primary">
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Container fluid>
      <h1 className="my-4">Terms and Conditions</h1>
      <Table
        columns={columns}
        dataSource={filteredTermsData.map(item => ({ ...item, key: item.id }))}
      />
    </Container>
  );
}

export default TermsandconditionCMS;
