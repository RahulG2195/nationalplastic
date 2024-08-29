"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, Switch, message, Upload } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import Image from "next/image";
import "./tagCSS.css";

const TagList = () => {
  const [tagArray, setTagArray] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [subBannerFileList, setSubBannerFileList] = useState([]);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/adminProdTag/crud`);
      if (response.data && response.data.AllTag) {
        const formattedData = formatDataForTable(response.data.AllTag);
        setTagArray(formattedData);
      } else {
        console.error('Unexpected response structure:', response.data);
        message.error('Unexpected data structure received from server');
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
      message.error('Failed to fetch tags: ' + (error.response?.data?.message || error.message));
    }
  };

  const formatDataForTable = (data) => {
    return data.map(tag => ({
      key: tag.tag_id,
      tag_name: tag.tag_name,
      tag_seo: tag.tag_seo,
      tag_image: tag.tag_image,
      tag_sub_banner: tag.tag_sub_banner,
      tag_status: tag.tag_status === 1,
      visible: tag.visible === 1
    }));
  };

  const showModal = (record = null) => {
    if (record) {
      form.setFieldsValue({
        ...record,
        tag_status: record.tag_status,
        visible: record.visible
      });
      setEditingId(record.key);
      setFileList([]);
      setSubBannerFileList([]);
    } else {
      form.resetFields();
      setEditingId(null);
      setFileList([]);
      setSubBannerFileList([]);
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      try {
        const formData = new FormData();
        formData.append('tag_name', values.tag_name);
        formData.append('tag_seo', values.tag_seo || '');
        formData.append('tag_status', values.tag_status ? 1 : 0);
        formData.append('visible', values.visible ? 1 : 0);
        
        if (fileList[0]) {
          formData.append('tag_image', fileList[0].originFileObj);
        }
        if (subBannerFileList[0]) {
          formData.append('tag_sub_banner', subBannerFileList[0].originFileObj);
        }
  
        let response;
        if (editingId) {
          formData.append('tag_id', editingId);
          response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/adminProdTag/crud`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
        } else {
          response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/adminProdTag/crud`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
        }
  
        if (response.status === 200) {
          message.success(editingId ? 'Tag updated successfully' : 'Tag added successfully');
          setIsModalVisible(false);
          fetchTags();
        } else {
          throw new Error(response.data.error || 'Failed to save tag');
        }
      } catch (error) {
        if (error.response) {
          message.error(`Error: ${error.response.data.error || 'Failed to save tag'}`);
        } else if (error.request) {
          message.error('No response received from server. Please try again.');
        } else {
          message.error(`Error: ${error.message}`);
        }
      }
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  };

  const handleDelete = async (record) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/adminProdTag/crud`, {
        data: { tag_id: record.key }
      });
      message.success('Tag deleted successfully');
      fetchTags();
    } catch (error) {
      message.error('Failed to delete tag');
    }
  };

  const handleSwitchChange = async (record, field) => {
    try {
      const updatedValue = !record[field];
      const formData = new FormData();
      formData.append('tag_id', record.key);
      formData.append(field, updatedValue ? 1 : 0);
  
      await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/adminProdTag/crud`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      message.success(`Tag ${field} updated successfully`);
      fetchTags();
    } catch (error) {
      message.error(`Failed to update tag ${field}`);
    }
  };
  

  const columns = [
    {
      title: 'Index',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Tag Name',
      dataIndex: 'tag_name',
      key: 'tag_name',
    },
    {
      title: 'SEO URL',
      dataIndex: 'tag_seo',
      key: 'tag_seo',
    },
    {
      title: 'Image',
      dataIndex: 'tag_image',
      key: 'tag_image',
      render: (text) => (
        <div style={{ width: '110px', height: '55px', position: 'relative' }}>
          <Image
            src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}${text}`}
            alt={text}
            layout="fill"
            objectFit="cover"
            className='admin-product-img'
          />
        </div>
      ),
    },
    {
      title: 'Sub Banner Image',
      dataIndex: 'tag_sub_banner',
      key: 'tag_sub_banner',
      render: (text) => (
        <div style={{ width: '110px', height: '55px', position: 'relative' }}>
          <Image
            src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}${text}`}
            alt={text}
            layout="fill"
            objectFit="cover"
            className='admin-product-img'
          />
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'tag_status',
      key: 'tag_status',
      render: (status, record) => (
        <Switch
          checked={status}
          onChange={() => handleSwitchChange(record, 'tag_status')}
        />
      ),
    },
    {
      title: 'Visible',
      dataIndex: 'visible',
      key: 'visible',
      render: (visible, record) => (
        <Switch
          checked={visible}
          onChange={() => handleSwitchChange(record, 'visible')}
        />
      ),
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
  const handleSubBannerFileChange = ({ fileList }) => setSubBannerFileList(fileList);

  return (
    <div style={{ padding: '20px' }}>
      <Button icon={<PlusOutlined />} onClick={() => showModal()} style={{ marginBottom: '20px' }}>
        Add Tag
      </Button>
      <Table columns={columns} dataSource={tagArray} />
      <Modal
        title={editingId ? 'Edit Tag' : 'Add Tag'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="tag_name" label="Tag Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="tag_seo" label="SEO URL" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="tag_status" label="Status" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item name="visible" label="Visible" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item name="tag_image" label="Tag Image" rules={[{ required: !editingId }]}>
            <Upload
              beforeUpload={() => false}
              onChange={handleFileChange}
              fileList={fileList}
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="tag_sub_banner" label="Sub Banner Image" rules={[{ required: !editingId }]}>
            <Upload
              beforeUpload={() => false}
              onChange={handleSubBannerFileChange}
              fileList={subBannerFileList}
            >
              <Button icon={<UploadOutlined />}>Select Sub Banner Image</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TagList;