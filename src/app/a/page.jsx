
"use client";
import React, { useState , useEffect} from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { Form, Button } from 'antd';
import axios from 'axios';

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

function MyEditor() {
    const [value, setValue] = useState('');
    const existingContent = "<p>This is the existing content to edit.</p>";

    useEffect(() => {
        if (existingContent) {
          setValue(existingContent);
        }
      }, [existingContent]);
    const handleSave = async () => {
      try {
        const response = await axios.post('/api/save', { content: value }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response.data);
        alert('Content saved successfully!');
      } catch (error) {
        console.error('There was an error saving the content:', error);
      }
    };
  
    return (
      <Form layout="vertical">
        <Form.Item label="Content">
          <ReactQuill value={value} onChange={setValue} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSave}>Save</Button>
        </Form.Item>
      </Form>
    );
  }
  
  export default MyEditor;