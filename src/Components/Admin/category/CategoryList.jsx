"use client";
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import { Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { useRouter } from "next/navigation";

const CategoryList = () => {
  const router = useRouter();
  const [categoryArray, setCategoryArray] = useState([]);
  const [filteredCategoryArray, setFilteredCategoryArray] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentItemToDelete, setCurrentItemToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const rawData = await axios.get("/api/adminCategories");
      const { allCategories } = rawData.data;
      setCategoryArray(allCategories);
      setFilteredCategoryArray(allCategories);
    };
    fetchData();
  }, []);

  const handleOnclick = (type, index) => {
    if (type === 'Edit') {
      const categoryToEdit = categoryArray.find(category => category.category_id === index);
      localStorage.setItem('categoryToEdit', JSON.stringify(categoryToEdit));
      router.push("/admin/editCategoryForm");
    } else if (type === 'Delete') {
      setCurrentItemToDelete(index);
      setDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (currentItemToDelete !== null) {
      try {
        const response = await axios.delete("/api/adminCategories", {
          headers: {
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({ category_id: currentItemToDelete })
        });
        // Update category array after deletion
        const updatedCategories = categoryArray.filter(category => category.category_id !== currentItemToDelete);
        setCategoryArray(updatedCategories);
        setFilteredCategoryArray(updatedCategories);
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
    const filteredData = categoryArray.filter(category =>
      category.category_name.toLowerCase().includes(value)
    );
    setFilteredCategoryArray(filteredData);
  };

  const toggleDeleteModal = () => {
    setDeleteModalOpen(!deleteModalOpen);
  };

  const columns = [
    {
      title: 'Category ID',
      dataIndex: 'category_id',
      key: 'category_id',
      fixed: 'left',
    },
    {
      title: 'Category Name',
      dataIndex: 'category_name',
      key: 'category_name',
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
      title: 'Image Name',
      dataIndex: 'image_name',
      key: 'image_name',
    },
    {
      title: 'Navshow',
      dataIndex: 'navshow',
      key: 'navshow',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      render: (text, record) => (
        <div className='d-flex justify-content-between gap-2'>
          <Button onClick={() => handleOnclick('Edit', record.category_id)} color="primary" className="mr-2">Edit</Button>
          <Button onClick={() => handleOnclick('Delete', record.category_id)} color="danger">Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <Container fluid>
      <h1 className="my-4">Category Table</h1>
      <Row className="mb-3 align-items-start justify-content-between">
        <Col xs={4} md={4} lg={2} className="mb-2 mb-md-0 col-12">
        </Col>
        <Col xs={4} md={4} lg={4} className="text-md-right col-12">
          <Input
            type="text"
            name="Category Name"
            id="search"
            placeholder="Search Category Name"
            value={searchText}
            onChange={handleSearch}
          />
        </Col>
        <Col className='col-2'>
          <Link href='/admin/addCategoryForm' className='mx-auto btn btn-secondary'>Add New</Link>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={filteredCategoryArray.map(category => ({ ...category, key: category.category_id }))}
        scroll={{ x: 1500 }}
      />
      <Modal isOpen={deleteModalOpen} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>Confirm Deletion</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this item? This action cannot be undone.
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleConfirmDelete}>Delete</Button>
          <Button color="secondary" onClick={toggleDeleteModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
      <div className="d-flex justify-content-between flex-column flex-md-row align-items-center">
        <span>Showing 1 to {filteredCategoryArray.length} of {filteredCategoryArray.length} entries</span>
      </div>
    </Container>
  );
}

export default CategoryList;
