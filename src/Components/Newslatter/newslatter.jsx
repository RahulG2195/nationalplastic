"use client";
import Image from "next/image";
import "../../styles/footer.css";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { notify, notifyError } from "@/utils/notify";
function Newslatter() {
    const [form] = Form.useForm();
    const [submitting, setSubmitting] = useState(false);
    const handleSubmit = async (values) => {
        setSubmitting(true);
        try {
          // Validate email
          if (!values.email || !/\S+@\S+\.\S+/.test(values.email)) {
            throw new Error("Invalid email address");
          }
    
          const response = await axios.post("api/newsletter", {
            email: values.email,
          });
    
          if (!response.data.success) {
            throw new Error("Failed to subscribe");
          }
          notify("Subscribed successfully!");
          form.resetFields();
        } catch (error) {
          notifyError(error.message || "Failed to subscribe. Please try again.");
        } finally {
          setSubmitting(false);
        }
      };
  return (
    <div style={{ marginTop: "1rem" }} className="newslatter_sec">
        <div className="section_header mx-auto text-center text-capitalize ">
            <h2><span>our  </span> newslatter</h2>
            <p>Join our newslatter to receive updates on products annoucements and sales.</p>
        </div>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="inline"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          justifyContent: "center",
          alignItems: "center",
          
        }}
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
          style={{ flex: 1, minWidth: "200px", maxWidth: "400px" }}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="Enter your email for Newsletter"
            style={{
              backgroundColor: "white",
              borderColor: "white",
              borderWidth: "2px",
              borderRadius: "50px",
              color: "black",
              border: "1px solid",
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            // type="primary"
            htmlType="submit"
            loading={submitting}
            // style={{
            //   borderColor: "white",
            //   borderWidth: "2px",
            //   borderRadius: "50px",
            //   backgroundColor: "transparent",
            //   color: "white",
            // }}
            className="btn view_btn py-2"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Newslatter;
