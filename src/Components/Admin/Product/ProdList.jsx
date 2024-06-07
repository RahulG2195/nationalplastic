"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { Container, Table, Button, Input, Row, Col, FormGroup } from 'reactstrap';
import { useEffect } from 'react';
import axios from 'axios';

const ProdList = () => {
    const products = [
        {
            image: 'https://www.proventuseducation.com/logo.png',
            name: 'smoky'
        },
        {
            image: 'https://www.proventuseducation.com/logo.png',
            name: 'Honey'
        },
        // Add more product objects here
    ];

    const [productArray , setProductArray] = useState(products)
    useEffect(() =>{
        // product_name,seo_url,category_id,imae_name,price,discount_price,color,color_code,armType,prod_status.
        console.log('component did mount');
        const  productData = async  () => {
            const rawData = await axios.get("/api/Products")
            const {products} = rawData.data
            console.log(JSON.stringify(products));
            setProductArray(products)
        } 
        productData();
    },[]);
    const handleOnclick = (type, index) => {
        console.log(`${type} clicked on item ${index}`);
    }

 

    return (
        <Container fluid>
            <h1 className="my-4">Logo</h1>
            <Row className="mb-3 align-items-start justify-content-between">
                    <Col xs={4} md={4} lg={2} className="mb-2 mb-md-0 col-12 ">
                        <FormGroup>
                            <Input type="select" name="entries" id="entriesSelect">
                                <option>10 </option>
                                <option>25</option>
                                <option>50</option>
                                <option>100</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xs={4} md={4} lg={4} className="text-md-right col-12">
                        <Input type="text" name="search" id="search" placeholder="Search" />
                    </Col>
                <Col className='col-2'>
                    <Link href='/admin/addProductForm' className='mx-auto btn btn-secondary' >Add New</Link>
                </Col>
            </Row>
            <Table bordered responsive>
      <thead>
        <tr>
          <th>Sr.No</th>
          <th>Product Name</th>
          <th>seo_url</th>
          <th>category_id</th>
          <th>price</th>
          <th>color</th>
          <th>armType</th>
          <th>prod_status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {productArray.map((product, index) => (
          <tr key={index}>
            <td>
              <p className="d-block text-truncate">
                {index + 1}
              </p>
            </td>
            <td>
              <p className="d-block text-truncate" style={{ maxWidth: '200px' }}>
                {product.product_name}
              </p>
            </td>
            <td className="text-center">
              <p className="d-block text-truncate" style={{ maxWidth: '200px' }}>
                {product.seo_url}
              </p>
            </td>
            <td>
              <p className="d-block text-truncate" style={{ maxWidth: '200px' }}>
                {product.category_id}
              </p>
            </td>
            <td>
              <p className="d-block text-truncate" style={{ maxWidth: '200px' }}>
                {product.price}
              </p>
            </td>
            <td>
              <p className="d-block text-truncate" style={{ maxWidth: '200px' }}>
                {product.color}
              </p>
            </td>
            <td>
              <p className="d-block text-truncate" style={{ maxWidth: '200px' }}>
                {product.armType}
              </p>
            </td>
            <td>
              <p className="d-block text-truncate" style={{ maxWidth: '200px' }}>
                {product.prod_status}
              </p>
            </td>
            <td className='d-flex gap-2 flex-wrap'>
              <Button onClick={() => handleOnclick('Edit', index)} color="primary" className="mr-2">Edit</Button>
              <Button onClick={() => handleOnclick('Delete', index)} color="danger">Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
            <div className="d-flex justify-content-between flex-column flex-md-row align-items-center">
                <span>Showing 1 to {products.length} of {products.length} entries</span>
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
    )
}

export default ProdList;
