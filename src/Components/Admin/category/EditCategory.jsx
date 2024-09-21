"use client";
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Input, Button, InputNumber, Spin, Space, Select } from 'antd';
import axios from 'axios';
import "./EditCategory.css";
import { useNavigate } from 'react-router-dom';
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { Option } = Select;
export default function EditCategory() {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm();
  const [imagePreview, setImagePreview] = useState('');
  const [bannerPreview, setBannerPreview] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/admin/category', { replace: true });
    window.location.reload();
  };

  const updateCategory = async (data) => {
    try {
      const formData = new FormData();

      const entries = {
        category_name: data.category_name,
        image_name: data.image_name,
        navshow: data.navshow === "1" || data.navshow === "Active" ? "1" : "0",
        status: data.status === "1" || data.status === "Active" ? "1" : "0",
        topPick: data.topPick === "1" || data.topPick === "Active" ? "1" : "0",
        category_id: data.category_id,
        seo_url: data.seo_url,
        header_position: data.header_position

      };

      for (const [key, value] of Object.entries(entries)) {
        formData.append(key, value);
      }

      if (data.image) {
        formData.append('image', data.image);
      }
      if (data.banner) {
        formData.append('banner', data.banner);
      }

      const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/adminCategories`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Update Error:', error.message);
      throw error;
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    const submitLoader = async () => {
      try {
        await updateCategory(data);
        handleNavigation();
        return 'Category updated successfully';
      } catch (error) {
        console.error('Submission Error:', error.message);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    toast.promise(
      submitLoader(),
      {
        pending: "Updating category...",
        success: "Category updated successfully!",
        error: "Failed to update category",
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

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    setValue('banner', file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("categoryToEdit"));
    if (data) {
      const statusFields = ['navshow', 'topPick', 'status'];
      Object.keys(data).forEach(key => {
        if (statusFields.includes(key)) {
          setValue(key, data[key] == "0" ? "Disable" : "Active");
        } else {
          setValue(key, data[key]);
        }
      });
      if (data.image_name) {
        setImagePreview(`${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}${data.image_name}`);
      }
      if (data.banner_image) {
        setBannerPreview(`${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}${data.banner_image}`);
      }
    }
  }, [setValue]);
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
            render={({ field }) => <Input {...field} />}
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
          label="Header Positioning"
          validateStatus={errors.header_position ? 'error' : ''}
          help={errors.header_position ? 'header_position only Numbers' : ''}
        >
          <Controller
            name="header_position"
            control={control}
            rules={{
              required: true,
              pattern: /^[a-zA-Z0-9-_]+$/,
              minLength: 1,
              maxLength: 255,
            }}
            render={({ field }) => (
              <InputNumber
                {...field}
                style={{ width: '100%' }}
                min={0}
                max={999}
                step={1}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Image"
          validateStatus={errors.image ? 'error' : ''}
          help={errors.image ? 'Please upload an image!' : ''}
        >
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Current category image" title={control._formValues.image_name} style={{ maxWidth: '200px', marginBottom: '10px' }} />
            </div>
          )}
          <input
            type="file"
            onChange={handleFileChange}
          />
        </Form.Item>
        <Form.Item
          label="Banner Image"
          validateStatus={errors.banner ? 'error' : ''}
          help={errors.banner ? 'Please upload a banner image!' : ''}
        >
          {bannerPreview && (
            <div className="banner-preview">
              <img src={bannerPreview} alt="Current banner image" title={control._formValues.banner} style={{ maxWidth: '200px', marginBottom: '10px' }} />
            </div>
          )}
          <input
            type="file"
            onChange={handleBannerChange}
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
          label="Nav Show"
          validateStatus={errors.navshow ? 'error' : ''}
          help={errors.navshow ? 'Please input the navigation show value!' : ''}
        >
          <Controller
            name="navshow"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select {...field} style={{ width: '100%' }}>
                <Option value="0">Disable</Option>
                <Option value="1">Active</Option>
              </Select>
            )}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          label="Status"
          validateStatus={errors.status ? 'error' : ''}
          help={errors.status ? 'Please input the status!' : ''}
        >
          <Controller
            name="status"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select {...field} style={{ width: '100%' }}>
                <Option value="0">Disable</Option>
                <Option value="1">Active</Option>
              </Select>
            )}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          label="Top Pick"
          validateStatus={errors.topPick ? 'error' : ''}
          help={errors.topPick ? 'Please input the topPick show value!' : ''}
        >
          <Controller
            name="topPick"
            control={control}
            render={({ field }) => (
              <Select {...field} style={{ width: '100%' }}>
                <Option value="0">Disable</Option>
                <Option value="1">Active</Option>
              </Select>
            )}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Space>
            <Button onClick={handleNavigation}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Spin>
  );
}