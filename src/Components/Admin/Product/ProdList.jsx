"use client"
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, FormGroup, Input, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';
import { Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { useRouter } from "next/navigation";

const ProdList = () => {
  const router = useRouter();
    const [productArray, setProductArray] = useState([]);
    const [filteredProductArray, setFilteredProductArray] = useState([]);
    const [searchText, setSearchText] = useState('');
    const searchInput = useRef(null);
    const [modalContent, setModalContent] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            const rawData = await axios.get("/api/adminProducts");
            const { allProducts } = rawData.data;
            console.log(JSON.stringify(allProducts));
            setProductArray(allProducts);
            setFilteredProductArray(allProducts);
        }
        fetchData();
    }, []);

    const handleOnclick = (type, index) => {
        console.log(`${type} clicked on item ${index}`);
        if(type == 'Edit'){
          console.log(`${type} clicked oIFn item ${index}`);
          const productToEdit = productArray.find(product => product.product_id === index);
          console.log("data: ", JSON.stringify(productToEdit))
          localStorage.setItem('productToEdit', JSON.stringify(productToEdit));
        localStorage.setItem("pDataToEdit", JSON.stringify(productToEdit));

          router.push("/admin/editProductForm")
        }else if(type == 'Delete'){
        console.log(`${type} clicked oelsen item ${index}`);

        }
    }

    const handleSearch = (e) => {
      const value = e.target.value.toLowerCase();
      setSearchText(value);
      const filteredData = productArray.filter(product =>
          product.product_name.toLowerCase().includes(value)
      );
      setFilteredProductArray(filteredData);
  };
  const toggleModal = () => {
    setModalContent('');
};

    const columns = [
        {
            title: 'Sr.No',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => <span>{index + 1}</span>,
        },
        {
            title: 'Product ID',
            dataIndex: 'product_id',
            key: 'product_id',
            fixed: 'left',
        },
        {
            title: 'Product Name',
            dataIndex: 'product_name',
            key: 'product_name',
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
          title: 'SEO URL',
          dataIndex: 'seo_url_clr',
          key: 'seo_url_clr',
      },
        {
            title: 'Category ID',
            dataIndex: 'category_name',
            key: 'category_name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Color',
            dataIndex: 'color',
            key: 'color',
        },
        {
            title: 'Arm Type',
            dataIndex: 'armType',
            key: 'armType',
        },
        {
            title: 'Product Status',
            dataIndex: 'prod_status',
            key: 'prod_status',
        },
        {
          title: 'Image Name',
          dataIndex: 'image_name',
          key: 'image_name',
          render: (text) => (
            <div className="image-name-cell">
                {text.length > 20 ? (
                    <>
                        <span>{text.substring(0, 20)}...</span>
                        <Button
            type="link"
            size="small"
            style={{ fontSize: '12px', padding: '2px' }}
            onClick={() => setModalContent(text)}
          >
            View More 
          </Button>
                    </>
                ) : (
                    <span>{text}</span>
                )}
            </div>
        ),
      },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            render: (text, record, index) => (
                <div className='d-flex justify-content-between gap-2'>
                    <Button onClick={() => handleOnclick('Edit', record.product_id)} color="primary" className="mr-2">Edit</Button>
                    <Button onClick={() => handleOnclick('Delete', record.product_id)} color="danger">Delete</Button>
                </div>
            ),
        },
    ];

    return (
        <Container fluid>
            <h1 className="my-4">National Plastic Products Table</h1>
            <Row className="mb-3 align-items-start justify-content-between">
                <Col xs={4} md={4} lg={2} className="mb-2 mb-md-0 col-12">
                   
                </Col>
                <Col xs={4} md={4} lg={4} className="text-md-right col-12">
                    <Input
                        type="text"
                        name="Product Name"
                        id="search"
                        placeholder="Search Product_name"
                        value={searchText}
                        onChange={handleSearch}
                    />
                </Col>
                <Col className='col-2'>
                    <Link href='/admin/addProductForm' className='mx-auto btn btn-secondary'>Add New</Link>
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={filteredProductArray.map(product => ({ ...product, key: product.product_id }))}
                scroll={{ x: 1500 }}
            />
             <Modal isOpen={modalContent !== ''} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Image Name</ModalHeader>
            <ModalBody>
                {modalContent}
            </ModalBody>
        </Modal>
            <div className="d-flex justify-content-between flex-column flex-md-row align-items-center">
                <span>Showing 1 to {filteredProductArray.length} of {filteredProductArray.length} entries</span>
            </div>
        </Container>
    );
}

export default ProdList;
