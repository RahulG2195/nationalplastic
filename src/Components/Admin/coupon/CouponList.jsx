"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import { Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { useRouter } from "next/navigation";
import "./CouponList.css";

const CouponList = () => {
  const router = useRouter();
  const [couponArray, setCouponArray] = useState([]);
  const [filteredCouponArray, setFilteredCouponArray] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentItemToDelete, setCurrentItemToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const rawData = await axios.get("/api/adminCoupons");
      const { allCoupons } = rawData.data;
      setCouponArray(allCoupons);
      setFilteredCouponArray(allCoupons);
    };
    fetchData();
  }, []);

  const handleOnclick = (type, index) => {
    if (type === 'Edit') {
      const couponToEdit = couponArray.find(coupon => coupon.coupon_id === index);
      localStorage.setItem('couponToEdit', JSON.stringify(couponToEdit));
      router.push("/admin/editCouponForm");
    } else if (type === 'Delete') {
      setCurrentItemToDelete(index);
      setDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (currentItemToDelete !== null) {
      try {
        await axios.delete("/api/adminCoupons", {
          headers: {
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({ coupon_id: currentItemToDelete })
        });
        const updatedCoupons = couponArray.filter(coupon => coupon.coupon_id !== currentItemToDelete);
        setCouponArray(updatedCoupons);
        setFilteredCouponArray(updatedCoupons);
      } catch (error) {
        console.error('Delete failed', error);
      }
    }
    setDeleteModalOpen(false);
    setCurrentItemToDelete(null);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filteredData = couponArray.filter(coupon =>
      coupon.coupon_code.toLowerCase().includes(value)
    );
    setFilteredCouponArray(filteredData);
  };

  const toggleDeleteModal = () => {
    setDeleteModalOpen(!deleteModalOpen);
  };

  const columns = [
    {
      title: 'Index',
      key: 'index',
      render: (text, record, index) => index + 1,
      fixed: 'left',
    },
    {
      title: 'Coupon ID',
      dataIndex: 'coupon_id',
      key: 'coupon_id',
      fixed: 'left',
      hidden: true
    },
    {
      title: 'Coupon Code',
      dataIndex: 'coupon_code',
      key: 'coupon_code',
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
      title: 'Percentage',
      dataIndex: 'percentage',
      key: 'percentage',
    },
    {
      title: 'Create Date',
      dataIndex: 'create_date',
      key: 'create_date',
    },
    {
      title: 'Expire Date',
      dataIndex: 'expire_date',
      key: 'expire_date',
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      render: (text, record) => (
        <div className='d-flex justify-content-between gap-2'>
          <Button onClick={() => handleOnclick('Edit', record.coupon_id)} color="primary" className="mr-2">Edit</Button>
          <Button onClick={() => handleOnclick('Delete', record.coupon_id)} color="danger">Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <Container fluid>
      <h1 className="my-4">Coupon Code Table</h1>
      <Row className="mb-3 align-items-start justify-content-between">
        <Col xs={4} md={4} lg={2} className="mb-2 mb-md-0 col-12">
        </Col>
        <Col xs={4} md={4} lg={4} className="text-md-right col-12">
          <Input
            type="text"
            name="Coupon Code"
            id="search"
            placeholder="Search Coupon Code"
            value={searchText}
            onChange={handleSearch}
          />
        </Col>
        <Col className='col-2'>
          <Link href='/admin/addCouponForm' className='mx-auto btn btn-secondary'>Add New</Link>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={filteredCouponArray.map(coupon => ({ ...coupon, key: coupon.coupon_id }))}
        scroll={{ x: 1500 }}
      />
      <Modal isOpen={deleteModalOpen} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>Confirm Deletion</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this coupon? This action cannot be undone.
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleConfirmDelete}>Delete</Button>
          <Button color="secondary" onClick={toggleDeleteModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
      <div className="d-flex justify-content-between flex-column flex-md-row align-items-center">
        <span>Showing 1 to {filteredCouponArray.length} of {filteredCouponArray.length} entries</span>
      </div>
    </Container>
  );
}

export default CouponList;