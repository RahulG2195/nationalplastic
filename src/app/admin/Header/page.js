'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout, Button, Dropdown, Modal, Input, Form, Space, Spin, Typography } from "antd";
import { UserOutlined, LogoutOutlined, LockOutlined } from "@ant-design/icons";
import { signOut } from "next-auth/react";
import { notify, notifyError } from "@/utils/notify";

const { Header: AntHeader } = Layout;
const { Title, Text } = Typography;

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const secretKey = process.env.NEXT_PUBLIC_secretKey

  useEffect(() => {
    const storedUsername = localStorage.getItem('userData');
    if (storedUsername) {
      const parsedUserData = JSON.parse(storedUsername).email;
      setUsername(parsedUserData);
    }
  }, []);

  const handleLogout = async () => {
    try {
      localStorage.clear();
      signOut();
      window.location.href = "/adminlogin";
    } catch (error) {
      console.error("Logout error:", error);
      notifyError("Logout failed", error.message);
    }
  };
  function encrypt(text, key) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return btoa(result); // Convert to base64
  }
  function decrypt(encoded, key) {
    const text = atob(encoded); // Convert from base64
    let result = '';
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
  }

  const handleReset = () => {
    setIsResettingPassword(true);
    axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/sendOTP`, { email: username })
      .then(res => {
        setIsResettingPassword(false);
        const { otp, otpExpiry } = res.data;
        const encryptedOTP = encrypt(otp.toString(), secretKey);
        const encryptedExpiry = encrypt(otpExpiry.toString(), secretKey);
        localStorage.setItem('otp', encryptedOTP);
        localStorage.setItem('otpExpiry', encryptedExpiry);
        notify("Please check your email, OTP sent successfully.");
        setIsModalVisible(true);
      })
      .catch(err => {
        setIsResettingPassword(false);
        console.error("Error in sending OTP:", err);
        notifyError("Failed to reset password", err.message);
      });
  };

  const handleOTPSubmit = (values) => {
    const otp = values.otp.join('');
    setIsLoading(true);
    verifyOTP(otp)
  };

  const verifyOTP = async (otp) => {
    try {

      const storedEncryptedOTP = localStorage.getItem('otp');

      const storedOtp = decrypt(storedEncryptedOTP, secretKey);

      const storedEncryptedExpiry = localStorage.getItem('otpExpiry');

      const storedOtpExpiry = decrypt(storedEncryptedExpiry, secretKey);

      const currentTime = new Date();
      const expiryTime = new Date(storedOtpExpiry);

      if (expiryTime < currentTime) {
        throw new Error('OTP has expired.');
      }
      if (storedOtp !== otp) {
        throw new Error('Invalid OTP.');
      }
      localStorage.removeItem('otp');
      localStorage.removeItem('otpExpiry');
      setIsLoading(false);

      setIsPasswordModalVisible(true)
      return true;

    } catch (err) {
      console.error('Error in verifyOTP:', err);
      setIsLoading(false);
      notifyError("Not a valid OTP", err.message);
      return false;
    }
  }
  const handlePasswordSubmit = (values) => {
    setIsLoading(true);
    const data = {
      email: username,
      password: values.password,
    }
    axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/profile`, { data })
      .then(res => {
        // setIsLoading(false);
        notify("Password reset successfully.");
        setIsPasswordModalVisible(false);
      })
    // Here you would typically send the password to your backend
    setTimeout(() => {
      setIsLoading(false);
      setIsModalVisible(false);
      form.resetFields();
    }, 2000);
  };

  const menuItems = [
    {
      key: 'info',
      label: <Text strong>{username || 'Admin'}</Text>,
      disabled: true,
    },
    {
      key: 'reset',
      label: 'Reset Password',
      icon: <LockOutlined />,
      onClick: handleReset,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <>
      <AntHeader style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <div className="logo">
          {/* <img src="/assets/images/logo/main-logo.png" alt="logo" /> */}
        </div>
        <div>
          <Dropdown menu={{ items: menuItems }} trigger={['click']} onOpenChange={setDropdownOpen}>
            <Button icon={<UserOutlined />} type="primary" size="large" loading={isResettingPassword}>
              {username || 'Admin'}
            </Button>
          </Dropdown>
        </div>
      </AntHeader>

      <OTPModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSubmit={handleOTPSubmit}
        form={form}
        isLoading={isLoading}
      />
      <PasswordModal
        visible={isPasswordModalVisible}
        onCancel={() => setIsPasswordModalVisible(false)}
        onSubmit={handlePasswordSubmit}
        form={form}
        isLoading={isLoading}
      />
    </>
  );
};

const OTPModal = ({ visible, onCancel, onSubmit, form, isLoading }) => {
  return (
    <Modal
      title={<Title level={3} style={{ textAlign: 'center' }}>Enter OTP</Title>}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={400}
    >
      <Spin spinning={isLoading} tip="Verifying OTP...">
        <Form form={form} onFinish={onSubmit}>
          <Form.Item
            name="otp"
            rules={[{ required: true, message: 'Please input the OTP!' }]}
          >
            <OTPInput />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading} block>
              Verify OTP
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

const OTPInput = () => {
  const [form] = Form.useForm();
  const inputRefs = Array(6).fill(0).map(() => React.createRef());

  // Initialize the 'otp' field
  React.useEffect(() => {
    form.setFieldsValue({ otp: Array(6).fill('') });
  }, [form]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.length > 1) {
      return;
    }

    const currentOtp = form.getFieldValue('otp') || Array(6).fill('');
    form.setFieldsValue({
      otp: currentOtp.map((v, i) => i === index ? value : v)
    });

    if (value && index < 5) {
      inputRefs[index + 1].current.focus();
    }

    if (index === 5 && value) {
      form.submit();
    }
  };

  // ... rest of the component code


  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !form.getFieldValue('otp')[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  return (
    <Space size="small" style={{ display: 'flex', justifyContent: 'center' }}>
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <Form.Item
          key={index}
          name={['otp', index]}
          noStyle
        >
          <Input
            ref={inputRefs[index]}
            style={{
              width: '40px',
              height: '40px',
              textAlign: 'center',
              fontSize: '18px',
              borderRadius: '8px'
            }}
            maxLength={1}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        </Form.Item>
      ))}
    </Space>
  );
};

const PasswordModal = ({ visible, onCancel, onSubmit, form, isLoading }) => {
  return (
    <Modal
      title={<Title level={3} style={{ textAlign: 'center' }}>Enter New Password</Title>}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={400}
    >
      <Spin spinning={isLoading} tip="Processing...">
        <Form form={form} onFinish={onSubmit}>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input the new password!' },
              { min: 8, message: 'Password must be at least 8 characters long' },
              {
                pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])/,
                message: 'Password must include at least one number and one symbol'
              }
            ]}
          >
            <PasswordInput form={form} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading} block>
              Set New Password
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

const PasswordInput = ({ form }) => {
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    form.setFieldsValue({ password: value });
    form.validateFields(['password']);
  };

  return (
    <div>
      <Input.Password
        value={password}
        onChange={handleChange}
        style={{ width: '100%' }}
        placeholder="Enter new password"
      />
    </div>
  );
};



export default Header;