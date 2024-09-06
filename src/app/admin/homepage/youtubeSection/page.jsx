"use client";
import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Modal, Form, Upload, message, Space } from 'antd';
import { SearchOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import Image from "next/image";

const YouTubeCMS = () => {
    const [youtubeData, setYoutubeData] = useState([]);
    const [filteredYoutubeData, setFilteredYoutubeData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingVideo, setEditingVideo] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/Youtube`);
            const { results } = response.data;
            setYoutubeData(results);
            setFilteredYoutubeData(results);
        } catch (error) {
            message.error('Failed to fetch video data');
        }
    };

    const handleSearch = (value) => {
        setSearchText(value);
        const filtered = youtubeData.filter(item =>
            item.title.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredYoutubeData(filtered);
    };

    const handleAdd = () => {
        setEditingVideo(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingVideo(record);
        form.setFieldsValue(record);
        setIsModalVisible(true);
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleModalOk = () => {
        form.validateFields().then(async (values) => {
            try {
                const formData = new FormData();
                Object.keys(values).forEach(key => {
                    formData.append(key, values[key]);
                });

                if (selectedFile) {
                    formData.append('images', selectedFile);
                }

                let response;
                if (editingVideo) {
                    response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/Youtube?id=${editingVideo.id}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    message.success('Video updated successfully');
                } else {
                    response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/Youtube`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    message.success('Video added successfully');
                }
                setIsModalVisible(false);
                fetchData();
            } catch (error) {
                message.error('Failed to save video');
            }
        });
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };
    const handleDelete = async (id) => {
        try {
          await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/Youtube?id=${id}`);
          message.success('Youtube  section deleted successfully');
          fetchData();
        } catch (error) {
          message.error('Delete operation failed');
        }
      };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image) => (
                <Image src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_BANNERS_PATH_DIR}${image}`} alt="Video thumbnail" width={100} height={100} />
            ),
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            filteredValue: [searchText],
            onFilter: (value, record) => record.title.toLowerCase().includes(value.toLowerCase()),
        },
        {
            title: 'Short Description',
            dataIndex: 'short_desc',
            key: 'short_desc',
            ellipsis: true,
        },
        {
            title: 'YouTube URL',
            dataIndex: 'url',
            key: 'url',
            render: (url) => <a href={url} target="_blank" rel="noopener noreferrer">Watch Video</a>,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
              <Space>
                <Button onClick={() => handleEdit(record)}>Edit</Button>
                <Button onClick={() => handleDelete(record.id)}>Delete</Button>
              </Space>
            ),
          },
    ];

    return (
        <div>
            <h1>National Plastic YouTube Video Management</h1>
            <Input
                placeholder="Search videos"
                onChange={(e) => handleSearch(e.target.value)}
                style={{ width: 200, marginBottom: 16 }}
                prefix={<SearchOutlined />}
            />
            <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16, marginLeft: 16 }}>
                <PlusOutlined /> Add Video
            </Button>
            <Table columns={columns} dataSource={filteredYoutubeData} />

            <Modal
                title={editingVideo ? "Edit Video" : "Add Video"}
                visible={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="title" label="Video Title" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="short_desc" label="Short Description" rules={[{ required: true }]}>
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item name="url" label="YouTube URL" rules={[{ required: true, type: 'url' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Image">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            key={editingVideo ? 'edit' : 'add'}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default YouTubeCMS;