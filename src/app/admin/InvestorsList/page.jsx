"use client";
import React, { useState } from 'react';
import { Form, Select, Input, Upload, Button, message, DatePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
const { Option } = Select;

const CmsForm = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const SliderCardArr = [
    {
      key: 1,
      title: "Financials",
      image: "/Assets/svg/Group 829/Group 829.png",
    },
    {
      key: 2,
      title: "Shareholding Pattern",
      image: "/Assets/svg/Group 830/Group 830.png",
    },
    {
      key: 3,
      title: "Corporate Governance",
      image: "/Assets/svg/Group 831/Group 831.png",
    },
    {
      key: 4,
      title: "Investor Contact ",
      image: "/Assets/svg/Group 832/Group 832.png",
    },
    {
      key: 5,
      title: "AGM Compliance",
      image: "/Assets/svg/Group 833/Group 833.png",
    },
    {
      key: 6,
      title: "Transfer Of Share Notice",
      image: "/Assets/svg/Group 834/Group 834.png",
    },
    {
      key: 7,
      title: "Outcome Of Board Meeting",
      image: "/Assets/svg/Group 835/Group 835.png",
    },
    {
      key: 8,
      title: "Listing Disclosure",
      image: "/Assets/svg/Group 836/Group 836.png",
    },
  ];

  const onFinish = async (values) => {
    const formData = new FormData();
    Object.keys(values).forEach(key => {
      if (values[key] !== undefined) {
        formData.append(key, values[key]);
      }
    });
    if (fileList[0]) {
      formData.append('file', fileList[0].originFileObj);
    }

    try {
        const response = await axios.post(`${process.env.BASE_URL}/adminInvestor`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (response.data.success) {
          message.success(response.data.message);
          form.resetFields();
          setFileList([]);
        } else {
          message.error(response.data.error);
        }
    } catch (error) {
      console.error('Error:', error);
      message.error('An error occurred');
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleTitleChange = (value) => {
    setSelectedTitle(value);
    form.setFieldsValue({ subCategory: undefined, year: undefined });
  };

  const renderAdditionalFields = () => {
    switch (selectedTitle) {
      case 'Financials':
        return (
          <Form.Item
            name="subCategory"
            label="Sub Category"
            rules={[{ required: true, message: 'Please select a sub category' }]}
          >
            <Select placeholder="Select a sub category">
              <Option value="Annual Return">Annual Return</Option>
              <Option value="Annual Report">Annual Report</Option>
              <Option value="Audited Financial Results">Audited Financial Results</Option>
              <Option value="Unaudited Financial Results">Unaudited Financial Results</Option>
            </Select>
          </Form.Item>
        );
      case 'AGM Compliance':
        return (
          <Form.Item
            name="subCategory"
            label="Sub Category"
            rules={[{ required: true, message: 'Please select a sub category' }]}
          >
            <Select placeholder="Select a sub category">
              <Option value="Outcome of AGM">Outcome of AGM</Option>
              <Option value="Notices">Notices</Option>
            </Select>
          </Form.Item>
        );
      case 'General Disclosure':
        return (
          <Form.Item
            name="year"
            label="Year"
            rules={[{ required: true, message: 'Please select a year' }]}
          >
            <DatePicker picker="year" />
          </Form.Item>
        );
      default:
        return null;
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: 'Please select a title' }]}
      >
        <Select placeholder="Select a title" onChange={handleTitleChange}>
          {SliderCardArr.map((item) => (
            <Option key={item.key} value={item.title}>
              {item.title}
            </Option>
          ))}
          <Option value="General Disclosure">General Disclosure</Option>
        </Select>
      </Form.Item>

      {renderAdditionalFields()}

      <Form.Item
        name="file"
        label="File"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[{ required: true, message: 'Please upload a file' }]}
      >
        <Upload
          beforeUpload={() => false}
          fileList={fileList}
          onChange={({ fileList }) => setFileList(fileList)}
        >
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please enter a name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Please enter a description' }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CmsForm;