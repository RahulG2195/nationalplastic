"use client";
import React, { useEffect } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { Form, Input, Button, InputNumber, DatePicker, Switch, Select, Space } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { notify, notifyError } from '@/utils/notify';
import { useRouter } from "next/navigation";

const { Option } = Select;

export default function AddCoupon() {
    const router = useRouter();

  const { control, handleSubmit, setValue, formState: { errors } } = useForm();

  const codeDiscount = useWatch({
    control,
    name: 'codeDiscount',
    defaultValue: '',
  });

  useEffect(() => {
    if (codeDiscount) {
      setValue('discount_value', Number(codeDiscount));
    }
  }, [codeDiscount, setValue]);

  const addCoupon = async (formData) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/adminCoupon`, formData);
      return response.data;
    } catch (error) {
      console.error('Add Error:', error.message);
      throw error;
    }
  };

  const onSubmit = async (data) => {
    try {
      // Combine coupon code parts
      data.code = `${data.codePrefix}${data.codeSpecialChar}${data.codeDiscount}`;
      
      // Convert moment objects to strings
      data.start_date = data.start_date.format('YYYY-MM-DD');
      data.end_date = data.end_date.format('YYYY-MM-DD');
      
      await addCoupon(data);
      notify("Coupon added successfully")
      router.push("/admin/CouponList");

            // Handle success (e.g., show a success message, redirect)
    } catch (error) {
        notifyError("Failed to add coupon")
      console.error('Submission Error:', error.message);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <Form
      onFinish={handleSubmit(onSubmit)}
      className='Form'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item label="Coupon Code">
        <Space>
          <Form.Item
            validateStatus={errors.codePrefix ? 'error' : ''}
            help={errors.codePrefix ? 'Required, 4-6 characters' : ''}
            style={{ marginBottom: 0 }}
          >
            <Controller
              name="codePrefix"
              control={control}
              rules={{ required: true, minLength: 4, maxLength: 6, pattern: /^[A-Za-z]+$/ }}
              render={({ field }) => <Input {...field} style={{ width: '120px' }} placeholder="Prefix" />}
            />
          </Form.Item>
          <Form.Item
            validateStatus={errors.codeSpecialChar ? 'error' : ''}
            help={errors.codeSpecialChar ? 'Required' : ''}
            style={{ marginBottom: 0 }}
          >
            <Controller
              name="codeSpecialChar"
              control={control}
              rules={{ required: true, pattern: /^[-!@#$%^&*()_+]$/ }}
              render={({ field }) => (
                <Select {...field} style={{ width: '80px' }}>
                  {'-!@#$%^&*()_+'.split('').map(char => (
                    <Option key={char} value={char}>{char}</Option>
                  ))}
                </Select>
              )}
            />
          </Form.Item>
          <Form.Item
            validateStatus={errors.codeDiscount ? 'error' : ''}
            help={errors.codeDiscount ? 'Required, 1-2 digits' : ''}
            style={{ marginBottom: 0 }}
          >
            <Controller
              name="codeDiscount"
              control={control}
              rules={{ 
                required: true, 
                pattern: /^[1-9][0-9]?$|^100$/,
                validate: value => parseInt(value) <= 100 || 'Max 100%'
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  style={{ width: '80px' }}
                  min={1}
                  max={100}
                  placeholder="%"
                />
              )}
            />
          </Form.Item>
        </Space>
      </Form.Item>

      <Form.Item
        label="Discount Value"
        validateStatus={errors.discount_value ? 'error' : ''}
        help={errors.discount_value ? 'Please input the discount value!' : ''}
      >
        <Controller
          name="discount_value"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <InputNumber {...field} style={{ width: '100%' }} step={0.01} precision={2} disabled  formatter={value => `${value}%`}
          parser={value => value.replace('%', '')}/>}
        />
      </Form.Item>

      <Form.Item
        label="Start Date"
        validateStatus={errors.start_date ? 'error' : ''}
        help={errors.start_date ? 'Please select the start date!' : ''}
      >
        <Controller
          name="start_date"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <DatePicker {...field} style={{ width: '100%' }} format="DD-MM-YYYY" />}
        />
      </Form.Item>

      <Form.Item
        label="End Date"
        validateStatus={errors.end_date ? 'error' : ''}
        help={errors.end_date ? 'Please select the end date!' : ''}
      >
        <Controller
          name="end_date"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <DatePicker {...field} style={{ width: '100%' }} format="DD-MM-YYYY" />}
        />
      </Form.Item>

      <Form.Item label="Is Active">
        <Controller
          name="is_active"
          control={control}
          render={({ field }) => <Switch {...field} checked={field.value} />}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Add Coupon
        </Button>
      </Form.Item>
    </Form>
  );
}
