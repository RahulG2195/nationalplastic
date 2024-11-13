"use client"
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, Space, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import Image from 'next/image';

const { Option } = Select;

const BrochureManagement = () => {
    const [brochures, setBrochures] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingBrochure, setEditingBrochure] = useState(null);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const [imageFile, setImageFile] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);

    useEffect(() => {
        fetchBrochures();
    }, []);

    // Fetch brochures from the backend
    const fetchBrochures = async () => {
        try {
            const response = await axios.get('/api/admin/brochures');
            setBrochures(response.data.brochures);
            setLoading(false);
        } catch (error) {
            message.error('Failed to fetch brochures');
            setLoading(false);
        }
    };

    // Open modal to add new brochure
    const handleAdd = () => {
        setEditingBrochure(null);
        form.resetFields();
        setImageFile(null);
        setPdfFile(null);
        setIsModalVisible(true);
    };

    // Open modal to edit existing brochure
    const handleEdit = (record) => {
        setEditingBrochure(record);
        form.setFieldsValue({
            title: record.title,
            status: record.status,
        });
        setImageFile(null); // Clear the new file if editing
        setPdfFile(null);   // Clear the new file if editing
        setIsModalVisible(true);
    };

    // Handle brochure deletion
    const handleDelete = async (id) => {
        try {
            await axios.delete('/api/admin/brochures', { data: { id } });
            message.success('Brochure deleted successfully');
            fetchBrochures();
        } catch (error) {
            message.error('Failed to delete brochure');
        }
    };

    // Handle form submission (both create and update)
    const handleSubmit = async (values) => {

        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('status', values.status);

        // Append image if selected
        if (imageFile) {
            formData.append('image', imageFile);
        } else if (editingBrochure && editingBrochure.image) {
            // If no new image is selected, keep the old image path
            formData.append('image', editingBrochure.image);
        }

        // Append PDF if selected
        if (pdfFile) {
            formData.append('pdf', pdfFile);
        } else if (editingBrochure && editingBrochure.pdf) {
            // If no new PDF is selected, keep the old PDF path
            formData.append('pdf', editingBrochure.pdf);
        }

        try {
            let response;
            if (editingBrochure) {
                // For editing an existing brochure, append the ID
                formData.append('id', editingBrochure.id);
                console.log(formData, "s2ss")
                response = await axios.put('/api/admin/brochures', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                message.success('Brochure updated successfully');
            } else {
                // For creating a new brochure
                response = await axios.post('/api/admin/brochures', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                message.success('Brochure created successfully');
            }

            // Refresh brochure list after add/edit
            fetchBrochures();

            // Close modal after submission
            setIsModalVisible(false);
        } catch (error) {
            message.error('Operation failed');
        }
    };

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image) => image ? (
                <Image
                    src={`/Assets/uploads/${image}`}  // Path to the image
                    alt={image}
                    width={100}  // Specify width for image
                    height={100} // Specify height for image
                    style={{ objectFit: 'contain' }} // Optional: Ensure the image maintains aspect ratio
                />
            ) : null
        },
        {
            title: 'PDF',
            dataIndex: 'pdf',
            key: 'pdf',
            render: (pdf) => pdf ? (
                <a href={`${process.env.NEXT_PUBLIC_UPLOAD_PATH_DIR}/${pdf}`} target="_blank" rel="noopener noreferrer">
                    View PDF
                </a>
            ) : null,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => <span>{status === 1 ? 'Active' : 'Inactive'}</span>,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button type="primary" onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Button danger onClick={() => handleDelete(record.id)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    // Handle image upload change
    const handleImageChange = (info) => {
        console.log(info, "sds")

        setImageFile(info.file);

    };

    // Handle PDF upload change
    const handlePdfChange = (info) => {
        // if (info.file.status === 'done') {
        setPdfFile(info.file);
        // }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">Brochure Management</h1>
                <Button type="primary" onClick={handleAdd}>
                    Add New Brochure
                </Button>
            </div>

            <Table
                loading={loading}
                columns={columns}
                dataSource={brochures}
                rowKey="id"
            />

            {/* Modal for adding/editing brochures */}
            <Modal
                title={editingBrochure ? 'Edit Brochure' : 'Add New Brochure'}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="title"
                        label="Brochure Title"
                        rules={[{ required: true, message: 'Please enter the brochure title' }]}
                    >
                        <Input />
                    </Form.Item>

                    {/* Image Upload */}
                    <Form.Item
                        name="image"
                        label="Upload Image (JPEG, PNG)"
                    >
                        {editingBrochure?.image && (
                            <div>
                                <Image
                                    src={`/${process.env.NEXT_PUBLIC_UPLOAD_PATH_DIR}/${editingBrochure.image}`}  // Path to the image
                                    alt="current-image"
                                    width={100}  // Specify the width
                                    height={100} // Specify the height
                                    style={{ objectFit: 'contain' }} // Optional: Ensure the image maintains aspect ratio
                                />
                                <p>Current Image</p>
                            </div>
                        )}
                        <Upload
                            name="image"
                            listType="picture"
                            beforeUpload={() => false}  // Prevent default upload behavior
                            onChange={handleImageChange}
                            showUploadList={{ showRemoveIcon: true }}
                        >
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>

                    {/* PDF Upload */}
                    <Form.Item
                        name="pdf"
                        label="Upload PDF"
                    >
                        {editingBrochure?.pdf && (
                            <div>
                                <a href={`${process.env.NEXT_PUBLIC_UPLOAD_PATH_DIR}/${editingBrochure.pdf}`} target="_blank" rel="noopener noreferrer">
                                    Current PDF
                                </a>
                                <p>Current PDF</p>
                            </div>
                        )}
                        <Upload
                            name="pdf"
                            accept="application/pdf"
                            beforeUpload={() => false}  // Prevent default upload behavior
                            onChange={handlePdfChange}
                            showUploadList={{ showRemoveIcon: true }}
                        >
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        name="status"
                        label="Status"
                        initialValue={1}
                    >
                        <Select>
                            <Option value={1}>Active</Option>
                            <Option value={0}>Inactive</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                {editingBrochure ? 'Update' : 'Create'}
                            </Button>
                            <Button onClick={() => setIsModalVisible(false)}>
                                Cancel
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default BrochureManagement;
