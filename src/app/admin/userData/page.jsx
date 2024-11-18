"use client";
import React, { useState, useEffect } from 'react';
import { Table, Input, Switch, Button, Modal, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [currentCustomer, setCurrentCustomer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/usersData`);
            const { customer } = response.data;
            console.log(JSON.stringify(customer));
            setCustomers(customer);
            setFilteredCustomers(customer);
        } catch (error) {
            Modal.error({
                title: 'Error',
                content: 'Failed to fetch customers',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchText(value);
        const filtered = customers.filter(customer =>
            customer.FirstName?.toLowerCase().includes(value) ||
            customer.LasttName?.toLowerCase().includes(value) ||
            customer.Email?.toLowerCase().includes(value)
        );
        setFilteredCustomers(filtered);
    };

    const handleStatusChange = async (checked, customerId) => {
        try {
            await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/usersData`, {
                customer_id: customerId,
                status: checked ? 1 : 0
            });

            const updatedCustomers = customers.map(customer =>
                customer.customer_id === customerId
                    ? { ...customer, status: checked ? 1 : 0 }
                    : customer
            );

            setCustomers(updatedCustomers);
            setFilteredCustomers(updatedCustomers);
        } catch (error) {
            Modal.error({
                title: 'Error',
                content: 'Failed to update customer status',
            });
        }
    };

    const showDeleteConfirm = (customer) => {
        setCurrentCustomer(customer);
        setDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        if (currentCustomer) {
            try {
                await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/usersData`, {
                    data: { customer_id: currentCustomer.customer_id }
                });

                const updatedCustomers = customers.filter(
                    customer => customer.customer_id !== currentCustomer.customer_id
                );
                setCustomers(updatedCustomers);
                setFilteredCustomers(updatedCustomers);
                Modal.success({
                    content: 'Customer deleted successfully',
                });
            } catch (error) {
                Modal.error({
                    title: 'Error',
                    content: 'Failed to delete customer',
                });
            }
        }
        setDeleteModalOpen(false);
        setCurrentCustomer(null);
    };

    const columns = [
        {
            title: "Index",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: 'ID',
            dataIndex: 'customer_id',
            key: 'customer_id',
            width: 80,
            fixed: 'left',
            hidden: true,
        },
        {
            title: 'First Name',
            dataIndex: 'FirstName',
            key: 'FirstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'LasttName',
            key: 'LasttName',
        },
        {
            title: 'Email',
            dataIndex: 'Email',
            key: 'Email',
        },
        {
            title: 'Phone',
            dataIndex: 'Phone',
            key: 'Phone',
        },
        {
            title: 'Address',
            dataIndex: 'Address',
            key: 'Address',
            render: (text, record) => (
                <>
                    <div>{text}</div>
                    {record.Address2 && <div>{record.Address2}</div>}
                </>
            ),
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Google ID',
            dataIndex: 'google_id',
            key: 'google_id',
            render: (text) => text || 'N/A',
        },
        {
            title: 'Status',
            key: 'status',
            render: (_, record) => (
                <Switch
                    checked={record.status == 1}
                    onChange={(checked) => handleStatusChange(checked, record.customer_id)}
                />
            ),
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 100,
            render: (_, record) => (
                <Button danger onClick={() => showDeleteConfirm(record)}>
                    Delete
                </Button>
            ),
        },
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl mb-4">Customer list</h1>

            <div className="mb-4">
                <Input
                    placeholder="Search by name or email"
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={handleSearch}
                    style={{ width: 300 }}
                />
            </div>

            <Table
                columns={columns}
                dataSource={filteredCustomers}
                rowKey="customer_id"
                scroll={{ x: 'max-content' }}
                loading={loading}
                pagination={{
                    total: filteredCustomers.length,
                    pageSize: 10,
                    showTotal: (total) => `Total ${total} customers`,
                    showSizeChanger: true,
                    showQuickJumper: true,
                }}
            />

            <Modal
                title="Confirm Delete"
                open={deleteModalOpen}
                onOk={handleDelete}
                onCancel={() => setDeleteModalOpen(false)}
                okText="Delete"
                cancelText="Cancel"
                okButtonProps={{ danger: true }}
            >
                <p>Are you sure you want to delete {currentCustomer?.FirstName} {currentCustomer?.LasttName}?</p>
                <p>This action cannot be undone.</p>
            </Modal>
        </div>
    );
};

export default CustomerList;