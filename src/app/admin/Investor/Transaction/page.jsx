"use client";
import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const TransactionCMS = () => {
    const [transactions, setTransactions] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [form] = Form.useForm();
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const response = await axios.get('/api/admin/Investors/Transactions');
            setTransactions(response.data.transactions);
        } catch (error) {
            console.error('Error fetching transactions:', error);
            message.error('Failed to fetch transactions');
        }
    };

    const showModal = (record = null) => {
        setEditingTransaction(record);
        form.setFieldsValue(record || {});
        setIsModalVisible(true);
    };

    const handleOk = () => {
        form.validateFields().then(values => {
            if (editingTransaction) {
                handleUpdate(values);
            } else {
                handleCreate(values);
            }
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditingTransaction(null);
        form.resetFields();
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleCreate = async (values) => {
        try {
            const formData = new FormData();
            formData.append('document', values.document);
            formData.append('file', image);
            await axios.post('/api/admin/Investors/Transactions', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            message.success('Transaction created successfully');
            setIsModalVisible(false);
            fetchTransactions();
        } catch (error) {
            console.error('Error creating transaction:', error);
            message.error('Failed to create transaction');
        }
    };

    const handleUpdate = async (values) => {
        try {
            const formData = new FormData();
            formData.append('document', values.document);
            if (image) {
                formData.append('file', image);
            }
            formData.append('id', editingTransaction.id);
            await axios.put(`/api/admin/Investors/Transactions`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            message.success('Transaction updated successfully');
            setIsModalVisible(false);
            fetchTransactions();
        } catch (error) {
            console.error('Error updating transaction:', error);
            message.error('Failed to update transaction');
        }
    };

    const handleDelete = async (record) => {
        try {
            const params = new URLSearchParams();
            params.append('id', record.id);
            params.append('fileName', record.url);

            if (image) {
                console.warn('Sending files with DELETE requests may not work as expected');
            }

            await axios.delete(`/api/admin/Investors/Transactions`, {
                params: params
            });

            message.success('Transaction deleted successfully');
            fetchTransactions();
        } catch (error) {
            console.error('Error deleting transaction:', error);
            message.error('Failed to delete transaction');
        }
    };
    const columns = [
        {
            title: 'Document',
            dataIndex: 'document',
            key: 'document',
        },
        {
            title: 'PDF',
            key: 'pdf',
            render: (_, record) => (
                <Button
                    type="primary"
                    onClick={() => window.open(`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${text}`, '_blank')}
                >
                    PDF
                </Button>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button onClick={() => showModal(record)}>Edit</Button>
                    <Button danger onClick={() => handleDelete(record)}>Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Button type="primary" onClick={() => showModal()} style={{ marginBottom: 16 }}>
                Create New Transaction
            </Button>
            <Table dataSource={transactions} columns={columns} rowKey="id" />
            <Modal
                title={editingTransaction ? "Edit Transaction" : "Create New Transaction"}
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="document"
                        label="Document"
                        rules={[{ required: true, message: 'Please input the document name!' }]}
                    >
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

export default TransactionCMS;
