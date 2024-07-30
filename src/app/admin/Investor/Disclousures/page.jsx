"use client";
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const DisclosureCMS = () => {
    const [disclosures, setDisclosures] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingId, setEditingId] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetchDisclosures();
    }, []);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };


    const fetchDisclosures = async () => {
        const response = await fetch('/api/admin/Investors/ldCMS');
        const data = await response.json();

        if (data.status === 200) {
            const flattenedDisclosures = data.disclosures.flat();
            setDisclosures(flattenedDisclosures);
        } else {
            message.error('Failed to fetch disclosures');
        }
    };

    const handleAdd = () => {
        setEditingId(null);
        form.resetFields();
        setModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingId(record.id);
        form.setFieldsValue(record);
        setModalVisible(true);
    };

    const handleDelete = async (record) => {
        try {
            const params = new URLSearchParams();
            params.append('id', record.id);
            params.append('file', record.document_url);
    
            const response = await fetch(`/api/admin/Investors/ldCMS?${params.toString()}`, {
                method: 'DELETE'
            });
    
            const data = await response.json();
            if (data.status === 200) {
                message.success('Disclosure deleted successfully');
                fetchDisclosures();
            } else {
                message.error('Failed to delete disclosure');
            }
        } catch (error) {
            message.error('An error occurred while deleting the disclosure');
        }
    };
    

    const handleModalOk = () => {
        form.validateFields().then(async (values) => {
            try {
                const url = editingId ? `/api/admin/Investors/ldCMS` : '/api/admin/Investors/ldCMS';
                const method = editingId ? 'PUT' : 'POST';
                const formData = new FormData();
    
                for (const key in values) {
                    formData.append(key, values[key]);
                }
                if(editingId){
                    formData.append('id', editingId);
                }
                if (image) {
                    formData.append('file', image);
                }
    
                const response = await fetch(url, {
                    method,
                    body: formData,
                });
    
                const data = await response.json();
                if (data.status === 200) {
                    message.success(`Disclosure ${editingId ? 'updated' : 'added'} successfully`);
                    setModalVisible(false);
                    fetchDisclosures();
                } else {
                    message.error(`Failed to ${editingId ? 'update' : 'add'} disclosure`);
                }
            } catch (error) {
                message.error(`An error occurred while ${editingId ? 'updating' : 'adding'} the disclosure`);
            }
        });
    };
    

    const columns = [
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
            sorter: (a, b) => a.year.localeCompare(b.year)
        },
        {
            title: 'Quarter',
            dataIndex: 'quarter',
            key: 'quarter',
            sorter: (a, b) => a.quarter - b.quarter
        },
        { title: 'Document Type', dataIndex: 'document_type', key: 'document_type' },
        {
            title: 'Document URL',
            dataIndex: 'document_url',
            key: 'document_url',
            render: (text) => <a href={text} target="_blank" rel="noopener noreferrer">View Document</a>
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record)} danger />
                </>
            ),
        },
    ];

    return (
        <div>
            <Button icon={<PlusOutlined />} onClick={handleAdd} style={{ marginBottom: 16 }}>
                Add Disclosure
            </Button>
            <Table
                columns={columns}
                dataSource={disclosures}
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />
            <Modal
                title={editingId ? 'Edit Disclosure' : 'Add Disclosure'}
                visible={modalVisible}
                onOk={handleModalOk}
                onCancel={() => setModalVisible(false)}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="year" label="Year" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="quarter" label="Quarter" rules={[{ required: true }]}>
                        <Select>
                            <Option value={1}>Q1</Option>
                            <Option value={2}>Q2</Option>
                            <Option value={3}>Q3</Option>
                            <Option value={4}>Q4</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="document_type" label="Document Type" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Image">
                        <input type="file" onChange={handleFileChange} required />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default DisclosureCMS;