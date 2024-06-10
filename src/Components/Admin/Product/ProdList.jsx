"use client"
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, FormGroup, Input, Button } from 'reactstrap';
import axios from 'axios';
import { Table, Switch } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

const ProdList = () => {
    const [productArray, setProductArray] = useState([]);
    const [filteredProductArray, setFilteredProductArray] = useState([]);
    const [fixedTop, setFixedTop] = useState(false);
    const [searchText, setSearchText] = useState('');
    const searchInput = useRef(null);

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
    }

    const handleSearch = (e) => {
      const value = e.target.value.toLowerCase();
      setSearchText(value);
      const filteredData = productArray.filter(product =>
          product.product_name.toLowerCase().includes(value)
      );
      setFilteredProductArray(filteredData);
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
            dataIndex: 'category_id',
            key: 'category_id',
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
            <h1 className="my-4">Logo</h1>
            <Row className="mb-3 align-items-start justify-content-between">
                <Col xs={4} md={4} lg={2} className="mb-2 mb-md-0 col-12">
                    <FormGroup>
                        <Input type="select" name="entries" id="entriesSelect">
                            <option>10</option>
                            <option>25</option>
                            <option>50</option>
                            <option>100</option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col xs={4} md={4} lg={4} className="text-md-right col-12">
                    <Input
                        type="text"
                        name="Product Name"
                        id="search"
                        placeholder="Search"
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
                summary={() => (
                    <Table.Summary fixed={fixedTop ? 'top' : 'bottom'}>
                        <Table.Summary.Row>
                            <Table.Summary.Cell index={0} colSpan={2}>
                                <Switch
                                    checkedChildren="Fixed Top"
                                    unCheckedChildren="Fixed Top"
                                    checked={fixedTop}
                                    onChange={() => {
                                        setFixedTop(!fixedTop);
                                    }}
                                />
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={2} colSpan={8}>
                                Scroll Context
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={10}>Fix Right</Table.Summary.Cell>
                        </Table.Summary.Row>
                    </Table.Summary>
                )}
                sticky={{ offsetHeader: 64 }}
            />
            <div className="d-flex justify-content-between flex-column flex-md-row align-items-center">
                <span>Showing 1 to {filteredProductArray.length} of {filteredProductArray.length} entries</span>
                <nav className="mt-3 mt-md-0">
                    <ul className="pagination mb-0">
                        <li className="page-item disabled">
                            <a className="page-link" href="#">Previous</a>
                        </li>
                        <li className="page-item active">
                            <a className="page-link" href="#">1</a>
                        </li>
                        <li className="page-item disabled">
                            <a className="page-link" href="#">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </Container>
    );
}

export default ProdList;
