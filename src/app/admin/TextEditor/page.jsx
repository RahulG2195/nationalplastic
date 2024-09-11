
"use client";
import React, { useState , useEffect} from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { Form, Button, Space } from 'antd';
import axios from 'axios';
import { notify, notifyError } from '@/utils/notify';
import { useRouter } from "next/navigation";


const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

function MyEditor() {
    const [value, setValue] = useState('');
    const [id, setId] = useState('');
    const router = useRouter();

    const existingContent = "<p>This is the existing content to edit.</p>";

    useEffect(() => {
      const termsToEdit = localStorage.getItem('termsToEdit');
      if (termsToEdit) {
        const parsedTerms = JSON.parse(termsToEdit);
        setValue(parsedTerms.content || '');
        setId(parsedTerms.id || '');
      }
      }, []);
      const handleNavigation = () =>{
      router.push("/admin/TermsandconditionCMS");
      }

    const handleSave = async () => {
      try {
        const response = await axios.post('/api/TermsandconditionCMS', { id: id, content: value }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response.data);
        notify('Content saved successfully!');
        handleNavigation()

      } catch (error) {
        notifyError("There was an error saving the content:")
        console.error('There was an error saving the content:', error.message);
      }
    };
    return (
      <Form layout="vertical">
        <Form.Item label="Content">
          <ReactQuill value={value} onChange={setValue} />
        </Form.Item>
        <Form.Item>
          <Space> 
          <Button type="primary" onClick={()=>handleNavigation()}>Cancel</Button>
          <Button type="primary" onClick={handleSave}>Save</Button>
          </Space>
        </Form.Item>
      </Form>
    );
  }
  
  export default MyEditor;