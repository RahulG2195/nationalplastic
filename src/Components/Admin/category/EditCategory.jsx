"use client";
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Input, Button, InputNumber } from 'antd';
import axios from 'axios';
import "./EditCategory.css";

export default function EditCategory() {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm();

  // const validateCategory = async (data) => {
  //   try {
  //     const response = await axios.post("/api/adminCategories", data);
  //     console.log('Validation response:', response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Validation Error:', error.message);
  //     throw error; // Re-throw the error to be caught in the onSubmit function
  //   }
  // };

  const updateCategory = async (data) => {
    try {
      // Prepare form data
      const formData = new FormData();
      formData.append('category_name', data.category_name);
      formData.append('image_name', data.image_name);
      formData.append('navshow', data.navshow);
      formData.append('status', data.status);
      formData.append('category_id', data.category_id);
      formData.append('topPick', data.topPick);


      if (data.image) {
        formData.append('image', data.image);
      }

      const response = await axios.put("/api/adminCategories", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
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
      // await validateCategory(data);
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error('Submission Error:', error.message);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setValue('image', file);
    setValue('image_name', file ? file.name : '');
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
      <Form.Item
        label="Top Pick"
        validateStatus={errors.topPick ? 'error' : ''}
        help={errors.topPick ? 'Please input the topPick show value!' : ''}
      >
        <Controller
          name="topPick"
          control={control}
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
