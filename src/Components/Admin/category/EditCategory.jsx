"use client";
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Input, Button, InputNumber } from 'antd';
import "./EditCategory.css";
import axios from 'axios';

export default function EditCategory() {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm();

  const validateCategory = async (data) => {
    try {
      const response = await axios.post("/api/adminCategories", data);
      console.log('Validation response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Validation Error:', error.message);
      throw error; // Re-throw the error to be caught in the onSubmit function
    }
  };

  const updateCategory = async (data) => {
    try {
      const response = await axios.put("/api/adminCategories", data);
      console.log('Update response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Update Error:', error.message);
      throw error; // Re-throw the error to be caught in the onSubmit function
    }
  };

  const onSubmit = async (data) => {
    try {
      await updateCategory(data);
      await validateCategory(data);
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error('Submission Error:', error.message);
    }
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("categoryToEdit"));
    if (data) {
      // Set form values with data from localStorage
      console.log("data: ", data);
      Object.keys(data).forEach(key => {
        setValue(key, data[key]);
      });
    }
  }, [setValue]);

  return (
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
        label="Image Name"
        validateStatus={errors.image_name ? 'error' : ''}
        help={errors.image_name ? 'Please input the image name!' : ''}
      >
        <Controller
          name="image_name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>
      <Form.Item
        label="Nav Show"
        validateStatus={errors.navshow ? 'error' : ''}
        help={errors.navshow ? 'Please input the navigation show value!' : ''}
      >
        <Controller
          name="navshow"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <InputNumber {...field} style={{ width: '100%' }} />}
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
          render={({ field }) => <InputNumber {...field} style={{ width: '100%' }} />}
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
