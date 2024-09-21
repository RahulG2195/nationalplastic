"use client"
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Input, Button, Select, Spin, Space } from 'antd';
import axios from 'axios';
import "./EditCategory.css";
import { useNavigate } from 'react-router-dom';
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { Option } = Select;

export default function AddCategory() {
  const { control, handleSubmit, setValue, getValues, reset, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/admin/category', { replace: true });
    window.location.reload();
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    const submitLoader = async () => {
      try {
        const { category_name, image_name, navshow, status, image, topPick, seo_url, banner, header_position } = data;

        const formData = new FormData();
        const entries = { category_name, image_name, navshow, status, image, topPick, seo_url, banner, header_position };

        for (const [key, value] of Object.entries(entries)) {
          formData.append(key, value);
        }

      


        await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/adminCategories`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        reset();
        handleNavigation();
        return 'Category added successfully';
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    toast.promise(
      submitLoader(),
      {
        pending: "Adding category...",
        success: "Category added successfully!",
        error: "Failed to add category",
      },
      {
        position: "top-center",
        transition: Bounce,
      }
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setValue('image', file);
    setValue('image_name', file ? file.name : '');
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    setValue('banner', file);
  };


  return (
    <Spin spinning={isLoading}>
      <Form
        onFinish={handleSubmit(onSubmit)}
        className='Form'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label="Category Name"
          validateStatus={errors.category_name ? 'error' : ''}
          help={errors.category_name ? 'Please input the category name!' : ''}
        >
          <Controller
            name="category_name"
            control={control}
            rules={{ required: true, minLength: 1, maxLength: 255 }}
            render={({ field }) => (
              <Input {...field} />
            )}
          />
        </Form.Item>
        <Form.Item
          label="SEO URL"
          validateStatus={errors.seo_url ? 'error' : ''}
          help={errors.seo_url ? 'SEO URL is invalid! Dont add space between words only underscore or hyphens are allowed.' : ''}
        >
          <Controller
            name="seo_url"
            control={control}
            rules={{
              required: true,
              pattern: /^[a-zA-Z0-9-_]+$/,
              minLength: 1,
              maxLength: 255,
            }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>
        <Form.Item
          label="Image"
          validateStatus={errors.image ? 'error' : ''}
          help={errors.image ? 'Please upload an image!' : ''}
        >
          <input
            type="file"
            onChange={handleFileChange}
          />
        </Form.Item>
        <Controller
          name="image_name"
          control={control}
          render={({ field }) => <Input {...field} type="hidden" />}
        />
        <Controller
          name="image"
          control={control}
          render={({ field }) => <input {...field} type="hidden" />}
        />
        <Form.Item
          label="banner"
          validateStatus={errors.image ? 'error' : ''}
          help={errors.image ? 'Please upload an image!' : ''}
        >
          <input
            type="file"
            onChange={handleBannerChange}
          />
        </Form.Item>
        <Form.Item
          label="Nav Show"
          validateStatus={errors.navshow ? 'error' : ''}
          help={errors.navshow ? 'Please select a value for Nav Show!' : ''}
        >
          <Controller
            name="navshow"
            control={control}
            defaultValue={1}
            rules={{ required: true }}
            render={({ field }) => (
              <Select {...field}>
                <Option value={1}>Active </Option>
                <Option value={0}>Disable</Option>
              </Select>
            )}
          />
        </Form.Item>
        <Form.Item
          label="Status"
          validateStatus={errors.status ? 'error' : ''}
          help={errors.status ? 'Please select a value for Status!' : ''}
        >
          <Controller
            name="status"
            control={control}
            defaultValue={1}
            rules={{ required: true }}
            render={({ field }) => (
              <Select {...field}>
                <Option value={1}>Active </Option>
                <Option value={0}>Inactive </Option>
              </Select>
            )}
          />
        </Form.Item>
        <Form.Item
          label="Top Pick"
          validateStatus={errors.topPick ? 'error' : ''}
          help={errors.topPick ? 'Please select a value for Top Pick!' : ''}
        >
          <Controller
            name="topPick"
            control={control}
            defaultValue={1}
            render={({ field }) => (
              <Select {...field}>
                <Option value={1}>Active </Option>
                <Option value={0}>Disable</Option>
              </Select>
            )}
          />
        </Form.Item>
        <Form.Item
          label="Header positioning"
          validateStatus={errors.header_position ? 'error' : ''}
          help={errors.header_position ? 'Please enter a valid number!' : ''}
        >
          <Controller
            name="header_position"
            control={control}
            rules={{
              required: true,
              validate: (value) => !isNaN(value) && value.trim() !== '',
            }}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                min={0}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^\d+$/.test(value)) {
                    field.onChange(value);
                  }
                }}
              />
            )}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Space>
            <Button onClick={handleNavigation}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Spin>
  );
}