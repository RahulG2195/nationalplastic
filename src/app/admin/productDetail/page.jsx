"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, message, Upload } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const ProductDetail = () => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/admin/productDetailCMS');
      if (response.data && response.data.product_details) {
        const formattedData = formatDataForTable(response.data.product_details);
        setProducts(formattedData);
      } else {
        console.error('Unexpected response structure:', response.data);
        message.error('Unexpected data structure received from server');
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
      message.error('Failed to fetch product details: ' + (error.response?.data?.message || error.message));
    }
  };

  const formatDataForTable = (data) => {
    return data.map(item => ({
      key: item.pd_id,
      prod_id: item.prod_id,
      features: item.features,
      dimensions: item.dimenions, // Note: There's a typo in the original data structure
      descp: item.descp,
      careAndInstruct: item.careAndInstruct,
      deliveryInsct: item.deliveryInsct,
      manufacturing: item.manufacturing,
      warranty: item.warranty,
      dimension_img: item.dimension_img
    }));
  };

  const showModal = (record = null) => {
    if (record) {
      form.setFieldsValue(record);
      setEditingId(record.key);
      setFileList(record.dimension_img ? [{ uid: '-1', name: 'Current Image', status: 'done', url: record.dimension_img }] : []);
    } else {
      form.resetFields();
      setEditingId(null);
      setFileList([]);
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      try {
        const formData = new FormData();
        Object.keys(values).forEach(key => {
          if (key !== 'dimension_img') {
            formData.append(key, values[key]);
          }
        });
        if (fileList[0] && fileList[0].originFileObj) {
          formData.append('dimension_img', fileList[0].originFileObj);
        }
        if (editingId) {
          formData.append('pd_id', editingId);
          await axios.put(`/api/admin/productDetailCMS`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          message.success('Product detail updated successfully');
        } else {
          await axios.post('/api/admin/productDetailCMS', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          message.success('Product detail added successfully');
        }
        setIsModalVisible(false);
        fetchProducts();
      } catch (error) {
        message.error('Failed to save product detail');
      }
    });
  };

  const handleDelete = async (record) => {
    try {
      await axios.delete('/api/admin/productDetailCMS', { 
        data: { pd_id: record.key } 
      });
      message.success('Product detail deleted successfully');
      fetchProducts();
    } catch (error) {
      message.error('Failed to delete product detail');
    }
  };

  const columns = [
    {
      title: "Sr No",
      dataIndex: "srNo",
      key: "srNo",
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Product ID',
      dataIndex: 'prod_id',
      key: 'prod_id',
    },
    {
      title: 'Description',
      dataIndex: 'descp',
      key: 'descp',
      ellipsis: true,
    },
    {
      title: 'Dimension Image',
      dataIndex: 'dimension_img',
      key: 'dimension_img',
      render: (text) => text ? <a href={text} target="_blank" rel="noopener noreferrer">View Image</a> : 'No Image',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => showModal(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record)} danger />
        </>
      ),
    },
  ];

  const handleFileChange = ({ fileList }) => setFileList(fileList);

  return (
    <div style={{ padding: '20px' }}>
      <Button icon={<PlusOutlined />} onClick={() => showModal()} style={{ marginBottom: '20px' }}>
        Add Product Detail
      </Button>
      <Table columns={columns} dataSource={products} />
      <Modal
        title={editingId ? 'Edit Product Detail' : 'Add Product Detail'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        width={800}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="prod_id" label="Product ID" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="features" label="Features" rules={[{ required: true }]}>
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item name="dimensions" label="Dimensions">
            <Input />
          </Form.Item>
          <Form.Item name="descp" label="Description" rules={[{ required: true }]}>
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item name="careAndInstruct" label="Care and Instructions">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item name="deliveryInsct" label="Delivery Instructions">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item name="manufacturing" label="Manufacturing Details">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item name="warranty" label="Warranty Information">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item name="dimension_img" label="Dimension Image">
            <Upload 
              beforeUpload={() => false}
              onChange={handleFileChange}
              fileList={fileList}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductDetail;