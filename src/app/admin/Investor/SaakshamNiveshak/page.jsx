
"use client";
import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Table } from 'reactstrap';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const SaakshamNiveshakAdmin = () => {
    const [data, setData] = useState([]);
    const [sn_heading, setSnHeading] = useState('');
    const [sn_sub_para, setSnSubPara] = useState('');
    const [sn_content, setSnContent] = useState('');
    const [sn_pdf, setSnPdf] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [currentPdf, setCurrentPdf] = useState('');
    const fileInputRef = React.useRef(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/admin/saaksham-niveshak');
            setData(response.data.results);
            setSnHeading(response.data.heading.sn_heading);
            setSnSubPara(response.data.heading.sn_sub_para);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleFileChange = (e) => {
        setSnPdf(e.target.files[0]);
    };

    const handleHeadingSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch('/api/admin/saaksham-niveshak', { sn_heading, sn_sub_para });
            alert('Heading updated successfully');
        } catch (error) {
            console.error('Error updating heading:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('sn_content', sn_content);
        if(sn_pdf){
            formData.append('sn_pdf', sn_pdf);
        }

        try {
            if (isEditing) {
                formData.append('sn_id', editId);
                await axios.put('/api/admin/saaksham-niveshak', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } else {
                await axios.post('/api/admin/saaksham-niveshak', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }
            resetForm();
            fetchData();
            toast.success('Form submitted successfully!');
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('An error occurred while submitting the form.');
        }
    };

    const handleEdit = (item) => {
        setIsEditing(true);
        setEditId(item.sn_id);
        setSnContent(item.sn_content);
        setCurrentPdf(item.sn_pdf)
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete('/api/admin/saaksham-niveshak', { data: { sn_id: id } });
            fetchData();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const resetForm = () => {
        setSnContent('');
        setSnPdf(null);
        setIsEditing(false);
        setEditId(null);
        setCurrentPdf('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <Container className='pt-5'>
            <Toaster />
            <h1 className="fs-3 fw-bold">Saaksham Niveshak</h1>
            <Form onSubmit={handleHeadingSubmit} className="bg-light p-4 rounded shadow mb-5">
                <FormGroup>
                    <Label for="sn_heading">Heading</Label>
                    <Input
                        type="text"
                        name="sn_heading"
                        id="sn_heading"
                        value={sn_heading}
                        onChange={(e) => setSnHeading(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="sn_sub_para">Sub Paragraph</Label>
                    <Input
                        type="textarea"
                        name="sn_sub_para"
                        id="sn_sub_para"
                        value={sn_sub_para}
                        onChange={(e) => setSnSubPara(e.target.value)}
                        required
                    />
                </FormGroup>
                <Button type="submit" color="primary">Update Heading</Button>
            </Form>

            <Form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow mb-5">
                <FormGroup>
                    <Label for="sn_content">Title</Label>
                    <Input
                        type="text"
                        name="sn_content"
                        id="sn_content"
                        value={sn_content}
                        onChange={(e) => setSnContent(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="sn_pdf">File</Label>
                    <Input
                        type="file"
                        name="sn_pdf"
                        id="sn_pdf"
                        onChange={handleFileChange}
                        required={!isEditing}
                        ref={fileInputRef}
                    />
                    {isEditing && currentPdf && <p>Current file: {currentPdf}</p>}
                </FormGroup>
                <Button type="submit" color="primary">{isEditing ? 'Update' : 'Create'}</Button>
                {isEditing && <Button type="button" color="secondary" onClick={resetForm} className="ms-2">Cancel</Button>}
            </Form>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>File</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item.sn_id}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.sn_content}</td>
                            <td><a href={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${item.sn_pdf}`} target="_blank" rel="noopener noreferrer">View</a></td>
                            <td>
                                <Button color="info" size="sm" onClick={() => handleEdit(item)}>Edit</Button>
                                <Button color="danger" size="sm" onClick={() => handleDelete(item.sn_id)} className="ms-2">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default SaakshamNiveshakAdmin;
