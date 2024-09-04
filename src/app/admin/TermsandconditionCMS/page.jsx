"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Input, Button } from 'reactstrap';
import axios from 'axios';
import { Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { useRouter } from "next/navigation";
import moment from 'moment';
import Image from "next/image";
import { notifyError } from '@/utils/notify';

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
    console.log("termsToEdit" + JSON.stringify(termsToEdit) );
    router.push("/admin/TextEditor");
  };
  const handleImageUpdate = async (id, file) => {
    console.log("file"+ file);
    console.log("id"+ id);

    const formData = new FormData();
    formData.append('banner_image', file);
    formData.append('id', id);

  
      const response =  await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/TermsandconditionCMS`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("data " +  response)
  }

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
      render: (banner_image) => banner_image ? 
        <Image src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_BANNERS_PATH_DIR}${banner_image}`} alt="Infrastructure" width={100}  height={100}/> : 
        <span>Not uploaded</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Button onClick={() => handleOnclick(record.id)} color="primary">
            Edit Content
          </Button>
          <input
            type="file"
            style={{ display: 'none' }}
            id={`upload_${record.id}`}
            onChange={(e) => handleImageUpdate(record.id, e.target.files[0])}
          />
          <Button
            color="secondary"
            onClick={() => document.getElementById(`upload_${record.id}`).click()}
            className="ml-2"
          >
            Update Image
          </Button>
        </>
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
