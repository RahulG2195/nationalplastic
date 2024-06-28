"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import { Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { useRouter } from "next/navigation";
import "./CouponList.css";
import moment from 'moment';
const CouponList = () => {
  const router = useRouter();
  const [couponArray, setCouponArray] = useState([]);
  const [filteredCouponArray, setFilteredCouponArray] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentItemToDelete, setCurrentItemToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const rawData = await axios.get("/api/adminCoupon");
      const { coupons } = rawData.data;
      console.log("coupons", coupons);
      setCouponArray(coupons);
      setFilteredCouponArray(coupons);
    };
    fetchData();
  }, []);

  const handleOnclick = (type, id) => {
    if (type === 'Edit') {
      const couponToEdit = couponArray.find(coupon => coupon.id === id);
      localStorage.setItem('couponToEdit', JSON.stringify(couponToEdit));
      router.push("/admin/EditCoupon");
    } else if (type === 'Delete') {
      setCurrentItemToDelete(id);
      setDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (currentItemToDelete !== null) {
      try {
        await axios.delete("/api/adminCoupon", {
          headers: {
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({ id: currentItemToDelete })
        });
        const updatedCoupons = couponArray.filter(coupon => coupon.id !== currentItemToDelete);
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
      coupon.code.toLowerCase().includes(value)
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
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      fixed: 'left',    
      hidden: true
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
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
      title: 'Discount Value',
      dataIndex: 'discount_value',
      key: 'discount_value',
    },
    {
      title: 'Start Date',
      dataIndex: 'start_date',
      key: 'start_date',
      render: (text) => moment(text).format('DD-MM-YYYY'),
    },
    {
      title: 'End Date',
      dataIndex: 'end_date',
      key: 'end_date',
      render: (text) => moment(text).format('DD-MM-YYYY'),
    },
    {
      title: 'Is Active',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (is_active) => is_active ? 'Yes' : 'No',
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      render: (text, record) => (
        <div className='d-flex justify-content-evenly'>
          <Button onClick={() => handleOnclick('Edit', record.id)} color="primary" className="mr-2">Edit</Button>
          <Button onClick={() => handleOnclick('Delete', record.id)} color="danger">Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <Container fluid>
      <h1 className="my-4">Coupon Code Table</h1>
      <Row className="mb-3 align-items-center">
        <Col xs={12} md={6} lg={4} className="mb-2 mb-md-0">
          <Input
            type="text"
            name="Coupon Code"
            id="search"
            placeholder="Search Coupon Code"
            value={searchText}
            onChange={handleSearch}
          />
        </Col>
        <Col xs={12} md={6} lg={8} className="text-md-end">
          <Link href='/admin/addCoupon' className='btn btn-secondary'>Add New</Link>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={filteredCouponArray.map(coupon => ({ ...coupon, key: coupon.id }))}
        scroll={{ x: 'max-content' }}
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
      <div className="mt-3">
        <span>Showing 1 to {filteredCouponArray.length} of {filteredCouponArray.length} entries</span>
      </div>
    </Container>
  );
}

export default CouponList;