"use client"
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Input, Button, InputNumber } from 'antd';
import "./EditProduct.css";
import axios from 'axios';
export default function App() {
  const { control, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    try {
      // Validate category name and get category_id
      const isValidCategoryName = await axios.post("/api/adminValidationP", {
        category_name: data.category_name
      });
      console.log("resPonse:--------------", isValidCategoryName)
      console.log("resPonse:--------------", isValidCategoryName)

      const category_id = isValidCategoryName.data.category_id;
      console.log("category_id:--------------------------- " + category_id);
      data.category_id = category_id;
  
      if (isValidCategoryName) {
        // Prepare the form data
        const { product_name, meta_title, meta_description, short_description, long_description,
          seo_title, seo_url, category_name, image_name, navshow, status, image, topPick,
          price, discount_price, discount_percentage, duration, InstallationCharges,category_id,
          color, armType, prod_status } = data;
        const formData = new FormData();
        const entries = { product_name, meta_title, meta_description, short_description, long_description,category_id,
          seo_title, seo_url, category_name, image_name, navshow, status, image, topPick,
          price, discount_price, discount_percentage, duration, InstallationCharges,
          color, armType, prod_status};
  
        for (const [key, value] of Object.entries(entries)) {
          formData.append(key, value);
        }
  
        // Send data to the API
        const response = await axios.post('/api/adminProducts', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
  
        // Handle the response, e.g., show a success message
        console.log('Response:', response.data);
      }
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error('Error:', error.response ? error.response.data : error.message);
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
        label="Product Name"
        validateStatus={errors.product_name ? 'error' : ''}
        help={errors.product_name ? 'Please input the product name!' : ''}
      >
        <Controller
          name="product_name"
          control={control}
          rules={{ required: true, minLength: 1, maxLength: 65 }}
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
      >
        <Controller
          name="seo_url"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>
      <Form.Item
        label="Category Name"
        validateStatus={errors.category_name ? 'error' : ''}
      >
        <Controller
          name="category_name"
          control={control}
          rules={{ required: true, minLength: 1, maxLength: 65}}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>
      <Form.Item
        label="Images"
        validateStatus={errors.image ? 'error' : ''}
        help={errors.image ? 'Please upload an image!' : ''}
      >
        <input
          type="file"
          onChange={handleFileChange}
        />
      </Form.Item>
      <Form.Item
        label="Price"
        validateStatus={errors.price ? 'error' : ''}
      >
        <Controller
          name="price"
          control={control}
          rules={{ required: true}}
          render={({ field }) => <InputNumber {...field} style={{ width: '100%' }} />}
        />
      </Form.Item>
      <Form.Item
        label="Discount Price"
        validateStatus={errors.discount_price ? 'error' : ''}
      >
        <Controller
          name="discount_price"
          control={control}
          rules={{ required: true}}
          render={({ field }) => <InputNumber {...field} style={{ width: '100%' }} />}
        />
      </Form.Item>
      <Form.Item
        label="Discount Percentage"
      >
        <Controller
          name="discount_percentage"
          control={control}
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
      >
        <Controller
          name="InstallationCharges"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>
      <Form.Item
        label="Color"
        validateStatus={errors.color ? 'error' : ''}

      >
        <Controller
          name="color"
          control={control}
          rules={{ required: true}}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>
      <Form.Item
        label="Arm Type"
      >
        <Controller
          name="armType"
          control={control}
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
          rules={{ required: true}}

          render={({ field }) => <Input {...field} />}
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
