"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container, Row, Col, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import { Table, Switch } from 'antd';
import Highlighter from 'react-highlight-words';
import { useRouter } from "next/navigation";
import Image from "next/image";
import "./CategoryList.css";
import { notify, notifyError } from '@/utils/notify';

const CategoryList = () => {
  const router = useRouter();
  const [categoryArray, setCategoryArray] = useState([]);
  const [filteredCategoryArray, setFilteredCategoryArray] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentItemToDelete, setCurrentItemToDelete] = useState(null);
  const [seoUrl, setSeoUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const rawData = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/adminCategories`);
      const { allCategories } = rawData.data;
      setCategoryArray(allCategories);
      setFilteredCategoryArray(allCategories);
    };
    fetchData();
  }, []);

  const handleToggleNavshow = async (categoryId, checked, data) => {

    try {
      const newNavshowValue = checked ? 1 : 0;

      const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/adminCategories`, {
        category_id: categoryId,
        value: newNavshowValue,
        field: data
      });
      
      if (response.data.success) {
        const updatedCategories = categoryArray.map(category =>
          category.category_id === categoryId
            ? { ...category, [data] : newNavshowValue }
            : category
        );
        setCategoryArray(updatedCategories);
        setFilteredCategoryArray(updatedCategories);
        
        notify("status updated successfully");
      } else {
        notifyError('Failed to update  status');
      }
    } catch (error) {
      console.error('Failed to update navshow', error);
      notifyError('An error occurred while updating navshow status');
    }
  };

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
        await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/adminCategories`, {
          headers: {
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({ category_id: currentItemToDelete })
        });
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

  const handleSeoUrlChange = (e) => {
    const value = e.target.value;
    const isValid = /^[a-zA-Z0-9-_]+$/.test(value);

    if (isValid || value === '') {
      setSeoUrl(value);
    } else {
      notifyError('SEO URL can only contain letters, numbers, underscores, and hyphens.');
    }
  };

  const columns = [
    {
      title: 'Index',
      key: 'index',
      render: (text, record, index) => index + 1,
      fixed: 'left',
    },
    {
      title: 'Category ID',
      dataIndex: 'category_id',
      key: 'category_id',
      fixed: 'left',
      hidden: true
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
      title: 'SEO URL',
      dataIndex: 'seo_url',
      key: 'seo_url',
    },
    {
      title: 'Image',
      dataIndex: 'image_name',
      key: 'image_name',
      render: (text) => (
        <Image
          src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}${text}`}
          className='admin-product-img'
          alt={text}
          style={{ width: '100px', height: '50px' }}
          width={3}
          height={3}
          layout="responsive"
          objectFit="cover"
        />
      ),
    },
    {
      title: 'Navshow',
      dataIndex: 'navshow',
      key: 'navshow',
      render: (navshow, record) => (
        <Switch
          checked={navshow === 1}
          onChange={(checked) => handleToggleNavshow(record.category_id, checked, "navshow")}
        />
      ),
    },
    {
      title: 'Image',
      dataIndex: 'banner_image',
      key: 'banner_image',
      render: (text) => (
        <Image
          src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}${text}`}
          className='admin-product-img'
          alt={text}
          style={{ width: '100px', height: '50px' }}
          width={3}
          height={3}
          layout="responsive"
          objectFit="cover"
        />
      ),
    },
    {
      title: 'Top Pick',
      dataIndex: 'topPick',
      key: 'topPick',
      render: (topPick, record) => (
        <Switch
          checked={topPick === 1}
          onChange={(checked) => handleToggleNavshow(record.category_id, checked, "topPick")}
        />
      ),
    },
    {
      title: 'HouseHold',
      dataIndex: 'household',
      key: 'household',
      render: (household, record) => (
        <Switch
          checked={household === 1}
          onChange={(checked) => handleToggleNavshow(record.category_id, checked, "household")}
        />
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Switch
          checked={status === 1}
          onChange={(checked) => handleToggleNavshow(record.category_id, checked, "status")}
        />
      ),
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
