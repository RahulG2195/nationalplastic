"use client"
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, Space, message, Switch } from 'antd';
import axios from 'axios';

const { Option } = Select;
const { TextArea } = Input;

const page = () => {
    const [jobs, setJobs] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingJob, setEditingJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await axios.get('/api/admin/jobs');
            setJobs(response.data.jobs);
            setLoading(false);
        } catch (error) {
            message.error('Failed to fetch jobs');
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setEditingJob(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingJob(record);  // Store the job data being edited, including the `id`
        form.setFieldsValue(record);  // Pre-fill the form with the job details, including `id`
        setIsModalVisible(true);  // Open the modal
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete('/api/admin/jobs', { data: { id } });
            message.success('Job deleted successfully');
            fetchJobs();
        } catch (error) {
            message.error('Failed to delete job');
        }
    };

    const handleSubmit = async (values) => {
        try {
          console.log("editing id is ",editingJob)
            if (editingJob) {
                await axios.put('/api/admin/jobs', { ...values, id: editingJob.id });
                message.success('Job updated successfully');
            } else {
                await axios.post('/api/admin/jobs', values);
                message.success('Job created successfully');
            }
            setIsModalVisible(false);
            fetchJobs();  // Refresh the jobs list after adding/updating
        } catch (error) {
            message.error('Operation failed');
        }
    };

    const columns = [
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
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
                <h1 className="text-2xl font-bold">Job Management</h1>
                <Button type="primary" onClick={handleAdd}>
                    Add New Job
                </Button>
            </div>

            <Table
                loading={loading}
                columns={columns}
                dataSource={jobs}
                rowKey="id"
            />

            <Modal
                title={editingJob ? 'Edit Job' : 'Add New Job'}
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
                        name="role"
                        label="Job Role"
                        rules={[{ required: true, message: 'Please enter the job role' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="type"
                        label="Job Type"
                        rules={[{ required: true, message: 'Please select the job type' }]}
                    >
                        <Select>
                            <Option value="Full Time">Full Time</Option>
                            <Option value="Part Time">Part Time</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="location"
                        label="Location"
                        rules={[{ required: true, message: 'Please enter the job location' }]}
                    >
                        <Input />
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
                                {editingJob ? 'Update' : 'Create'}
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

export default page;
