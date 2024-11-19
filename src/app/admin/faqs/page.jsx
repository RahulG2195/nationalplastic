"use client";

import React, { useState, useEffect } from 'react';
import {
    Table,
    Button,
    Modal,
    Form,
    Input,
    Select,
    Space,
    message,
    Switch
} from 'antd';
import axios from 'axios';

const { Option } = Select;
const { TextArea } = Input;

const FaqsCMS = () => {
    const [faqs, setFaqs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisiblec, setIsModalVisiblec] = useState(false);
    const [form] = Form.useForm();
    const [editingFaq, setEditingFaq] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFaqs();
    }, []);

    const fetchFaqs = async () => {
        try {
            const response = await axios.get('/api/faqs');
            const allFaqs = response.data.faqs;

            // Separate categories and regular FAQs
            const cats = allFaqs.filter(faq => faq.root_id === null);
            setCategories(cats);
            setFaqs(allFaqs);
            setLoading(false);
        } catch (error) {
            message.error('Failed to fetch FAQs');
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setEditingFaq(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingFaq(record);
        form.setFieldsValue(record);
        setIsModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete('/api/faqs', { data: { id } });
            message.success('FAQ deleted successfully');
            fetchFaqs();
        } catch (error) {
            message.error('Failed to delete FAQ');
        }
    };

    const handleSubmit = async (values) => {
        try {
            if (editingFaq) {
                await axios.put('/api/faqs', { ...values, id: editingFaq.id });
                message.success('FAQ updated successfully');
            } else {
                await axios.post('/api/faqs', values);
                message.success('FAQ created successfully');
            }
            setIsModalVisible(false);
            fetchFaqs();
        } catch (error) {
            message.error('Operation failed');
        }
    };

    //   Category Code


    const showModalc = () => {
        setIsModalVisiblec(true);
    };

    const handleCancelc = () => {
        form.resetFields();
        setIsModalVisiblec(false);
    };

    const handleSubmitc = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post('/api/faqs', {
                question: values.categoryName,
                root_id: null,
                answer: null,
                status: 1,
                category: true
            });

            if (response.data.success) {
                message.success('Category added successfully');
                form.resetFields();
                setIsModalVisible(false);
            }
        } catch (error) {

            message.error('Failed to add category');
        } finally {
            setLoading(false);
        }
    };












    const columns = [
        {
            title: 'Question',
            dataIndex: 'question',
            key: 'question',
        },
        {
            title: 'Answer',
            dataIndex: 'answer',
            key: 'answer',
            render: (text) => text || 'Category',
        },
        {
            title: 'Type',
            key: 'type',
            render: (_, record) => record.root_id === null ? 'Category' : 'FAQ',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => <Switch checked={status === 1} disabled />,
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

    return (
        <div className="p-6">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">FAQ Management</h1>
                <Button type="primary" onClick={handleAdd}>
                    Add New FAQ
                </Button>
                <Button type="primary" onClick={showModalc}>
                    Add New Category
                </Button>
            </div>

            <Table
                loading={loading}
                columns={columns}
                dataSource={faqs}
                rowKey="id"
            />

            <Modal
                title={editingFaq ? 'Edit FAQ' : 'Add New FAQ'}
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
                        name="question"
                        label="Question"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="root_id"
                        label="Category"
                    >
                        <Select allowClear>
                            {categories.map(cat => (
                                <Option key={cat.id} value={cat.id}>
                                    {cat.question}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="answer"
                        label="Answer"
                    >
                        <TextArea rows={4} />
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
                                {editingFaq ? 'Update' : 'Create'}
                            </Button>
                            <Button onClick={() => setIsModalVisible(false)}>
                                Cancel
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>


            <Modal
                title="Add New FAQ Category"
                open={isModalVisiblec}
                onCancel={handleCancelc}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmitc}
                >
                    <Form.Item
                        name="categoryName"
                        label="Category Name"
                        rules={[
                            { required: true, message: 'Please enter category name' },
                            { max: 255, message: 'Category name is too long' }
                        ]}
                    >
                        <Input placeholder="Enter category name" />
                    </Form.Item>

                    <Form.Item>
                        <div className="flex justify-end gap-2">
                            <Button onClick={handleCancelc}>
                                Cancel
                            </Button>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Add Category
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </div>

    );
};

export default FaqsCMS;