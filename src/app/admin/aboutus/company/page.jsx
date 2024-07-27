"use client";
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message, Table, Popconfirm } from 'antd';
import axios from 'axios';
import EditContentModal from './EditContentModal';
import AddContentModal from './AddContentModal';

const { Option } = Select;

const PageSelector = ({ onPageChange }) => (
  <Select
    style={{ width: 200, marginBottom: 20 }}
    placeholder="Select a page"
    onChange={onPageChange}
  >
    <Option value="company">Company</Option>
    <Option value="terms">Terms and Conditions</Option>
  </Select>
);

const ContentTable = ({ content, onEdit, onDelete }) => {
  const columns = [
    {
      title: 'Section Name',
      dataIndex: 'section_name',
      key: 'section_name',
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      render: text => <div dangerouslySetInnerHTML={{ __html: text }} />,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <span>
          <Button onClick={() => onEdit(record)} style={{ marginRight: 8 }}>Edit</Button>
          <Popconfirm title="Are you sure you want to delete this?" onConfirm={() => onDelete(record.id)}>
            <Button danger>Delete</Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <Table
      bordered
      dataSource={content}
      columns={columns}
      rowKey="id"
      pagination={false}
    />
  );
};

export default function CMS() {
  const [content, setContent] = useState([]);
  const [editingContent, setEditingContent] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);

  useEffect(() => {
    if (selectedPage) {
      fetchContent(selectedPage);
    }
  }, [selectedPage]);

  async function fetchContent(pageName) {
    try {
      const response = await axios.post('/api/admin/Aboutus', { page_name: pageName });
      if (response.data.status === 200) {
        setContent(response.data.content);
      } else {
        message.error('Failed to fetch content');
      }
    } catch (error) {
      message.error('Error fetching content');
    }
  }

  async function handleAdd(values) {
    try {
      const response = await axios.patch('/api/admin/Aboutus', { ...values, page_name: selectedPage });
        message.success('Content added successfully');
        setIsAddModalVisible(false);
        fetchContent(selectedPage);
    } catch (error) {
      message.error('Error adding content');
    }
  }

  async function handleUpdate(values) {
    try {
      const updatedContent = { ...editingContent, ...values };
      const response = await axios.put('/api/admin/Aboutus', updatedContent);
      if (response.data.status === 200) {
        message.success('Content updated successfully');
        setIsEditModalVisible(false);
        fetchContent(selectedPage);
      } else {
        message.error('Failed to update content');
      }
    } catch (error) {
      message.error('Error updating content');
    }
  }

  async function handleDelete(id) {
    try {
      const response = await axios.delete(`/api/admin/Aboutus`, { 
        data: { id: id } 
      });
      
      if (response.data.status === 200) {
        message.success('Content deleted successfully');
        fetchContent(selectedPage);
      } else {
        message.error('Failed to delete content');
      }
    } catch (error) {
      message.error('Error deleting content');
    }
  }

  const showEditModal = (record) => {
    setEditingContent(record);
    setIsEditModalVisible(true);
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 20 }}>
      <h1>Company profile and terms and condition</h1>
      <h2>To add new member select the following fields</h2>
      <PageSelector onPageChange={setSelectedPage} />
      <Button 
        type="primary" 
        onClick={() => setIsAddModalVisible(true)} 
        style={{ marginBottom: 20 }}
        disabled={!selectedPage}
      >
        Add New Content
      </Button>

      {selectedPage && (
        <ContentTable 
          content={content} 
          onEdit={showEditModal} 
          onDelete={handleDelete} 
        />
      )}

      <EditContentModal
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onUpdate={handleUpdate}
        initialValues={editingContent}
      />

      <AddContentModal
        open={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        onAdd={handleAdd}
      />
    </div>
  );
}