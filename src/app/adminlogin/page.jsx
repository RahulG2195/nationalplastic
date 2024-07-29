"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { setUserData } from "@/redux/reducer/userSlice";
import { useDispatch } from "react-redux";

const { Title, Text } = Typography;

function AdminLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/Users`, values);
      const adminData = res.data.message[0];
      dispatch(
        setUserData({
          email: adminData.Email,
          customer_id: adminData.customer_id,
        })
      );

      if (adminData.role === 'admin') {
        localStorage.setItem("adminjwt", adminData.role);
        localStorage.setItem("isAdmin", "true");
        message.success("Admin login successful!");
        router.push("/admin");
      } else {
        throw new Error("Not authorized as admin");
      }
    } catch (error) {
      message.error(error.response?.data?.message || "Admin login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ flex: 1, background: '#f0f2f5', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Image
          src="/Assets/images/Blog-section-banner/Blog-section-banner.png"
          alt="Admin Login"
          width={500}
          height={500}
          objectFit="contain"
        />
      </div>
      <div style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Title level={2}>Admin Login</Title>
        <Text type="secondary" style={{ marginBottom: '2rem' }}>Access the admin dashboard</Text>
        <Form
          name="admin_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{ maxWidth: 400 }}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Admin Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Admin Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
              Log in as Admin
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default AdminLogin;