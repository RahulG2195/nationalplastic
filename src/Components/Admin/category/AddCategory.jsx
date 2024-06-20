"use client"
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Input, Button, InputNumber } from 'antd';
import axios from 'axios';
import "./EditCategory.css";

export default function AddCategory() {
  const { control, handleSubmit, setValue, getValues, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      // Prepare form data
      const formData = new FormData();
      formData.append('category_name', data.category_name);
      formData.append('image_name', data.image_name);
      formData.append('navshow', data.navshow);
      formData.append('status', data.status);
      formData.append('image', data.image);
      formData.append('topPick', data.topPick);


      // Send data to the API
      const response = await axios.post('/api/adminCategories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // Handle the response, e.g., show a success message
      console.log('Response:', response.data);
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error('Error:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setValue('image', file);
    setValue('image_name', file ? file.name : '');
  };

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
          render={({ field }) => (
            <Input {...field} />
          )}
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
        label="Nav Show"
        validateStatus={errors.navshow ? 'error' : ''}
        help={errors.navshow ? 'Please input the navigation show value!' : ''}
      >
        <Controller
          name="navshow"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <InputNumber {...field} style={{ width: '100%' }} />
          )}
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
            <InputNumber {...field} style={{ width: '100%' }} />
          )}
        />
      </Form.Item>
      <Form.Item
        label="Top pick"
        validateStatus={errors.topPick ? 'error' : ''}
        help={errors.topPick ? 'Please input the topPick  value!' : ''}
      >
        <Controller
          name="topPick"
          control={control}
          render={({ field }) => (
            <InputNumber {...field} style={{ width: '100%' }} />
          )}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
