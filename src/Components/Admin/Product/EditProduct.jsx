"use client";
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Input, Button, InputNumber } from 'antd';
import "./EditProduct.css";
import axios from 'axios';

export default function App() {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm();

  const validateProduct = async (formData) => {
    try {
      const response = await axios.post("/api/adminProducts", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Validation response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Validation Error:', error.message);
      throw error;
    }
  };

  const updateProduct = async (formData) => {
    try {
      const response = await axios.put("/api/adminProducts", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Update response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Update Error:', error.message);
      throw error;
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      
      // Append all form fields to FormData
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });

      await updateProduct(formData);
      await validateProduct(formData);
    } catch (error) {
      console.error('Submission Error:', error.message);
    }
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("productToEdit"));
    if (data) {
      console.log("data: ", data);
      Object.keys(data).forEach(key => {
        setValue(key, data[key]);
      });
    }
  }, [setValue]);

  // The rest of the component remains the same

  return (
    <Form
      onFinish={handleSubmit(onSubmit)}
      className='Form'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      {/* Form fields here, unchanged */}
      {/* Form field Components remain the same */}
      <Form.Item
        label="Product Name"
        validateStatus={errors.product_name ? 'error' : ''}
        help={errors.product_name ? 'Please input the product name!' : ''}
      >
        <Controller
          name="product_name"
          control={control}
          rules={{ required: true, minLength: 1, maxLength: 65, pattern: /^[a-zA-Z-]+$/i }}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item
        label="Meta Title"
      >
        <Controller
          name="meta_title"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item
        label="Meta Description"
      >
        <Controller
          name="meta_description"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item
        label="Short Description"
      >
        <Controller
          name="short_description"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item
        label="Long Description"
      >
        <Controller
          name="long_description"
          control={control}
          render={({ field }) => <Input.TextArea {...field} />}
        />
      </Form.Item>

      <Form.Item
        label="SEO Title"
      >
        <Controller
          name="seo_title"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item
        label="SEO URL"
        validateStatus={errors.seo_url ? 'error' : ''}
        help={errors.seo_url ? 'Please input the SEO URL!' : ''}
      >
        <Controller
          name="seo_url"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item
        label="Category Name"
        validateStatus={errors.category_name ? 'error' : ''}
        help={errors.category_name ? 'Please input the category name!' : ''}
      >
        <Controller
          name="category_name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item
        label="Image Name"
        validateStatus={errors.image_name ? 'error' : ''}
        help={errors.image_name ? 'Please input the image name!' : ''}
      >
        <Controller
          name="image_name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input.TextArea {...field} />}
        />
      </Form.Item>

      <Form.Item
        label="Price"
        validateStatus={errors.price ? 'error' : ''}
        help={errors.price ? 'Please input the price!' : ''}
      >
        <Controller
          name="price"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <InputNumber {...field} style={{ width: '100%' }} />}
        />
      </Form.Item>

      <Form.Item
        label="Discount Price"
        validateStatus={errors.discount_price ? 'error' : ''}
        help={errors.discount_price ? 'Please input the discount price!' : ''}
      >
        <Controller
          name="discount_price"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <InputNumber {...field} style={{ width: '100%' }} />}
        />
      </Form.Item>

      <Form.Item
        label="Discount Percentage"
        validateStatus={errors.discount_percentage ? 'error' : ''}
        help={errors.discount_percentage ? 'Please input the discount percentage!' : ''}
      >
        <Controller
          name="discount_percentage"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <InputNumber {...field} style={{ width: '100%' }} />}
        />
      </Form.Item>

      <Form.Item
        label="Duration"
      >
        <Controller
          name="duration"
          control={control}
          render={({ field }) => <InputNumber {...field} style={{ width: '100%' }} />}
        />
      </Form.Item>

      <Form.Item
        label="Installation Charges"
        validateStatus={errors.InstallationCharges ? 'error' : ''}
        help={errors.InstallationCharges ? 'Please input the installation charges!' : ''}
      >
        <Controller
          name="InstallationCharges"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item
        label="Color"
        validateStatus={errors.color ? 'error' : ''}
        help={errors.color ? 'Please input the color!' : ''}
      >
        <Controller
          name="color"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item
        label="Arm Type"
        validateStatus={errors.armType ? 'error' : ''}
        help={errors.armType ? 'Please input the arm type!' : ''}
      >
        <Controller
          name="armType"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item
        label="Product Status"
        validateStatus={errors.prod_status ? 'error' : ''}
        help={errors.prod_status ? 'Please input the product status!' : ''}
      >
        <Controller
          name="prod_status"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
  );
}
