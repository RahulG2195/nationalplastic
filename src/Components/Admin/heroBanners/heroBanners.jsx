"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Alert, Card } from 'reactstrap';

const EditableBanner = ({ data }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [formData, setFormData] = useState({
        id: data.id,
        image: data.image,
        redirection_link: data.redirection_link,
    });
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSave = async () => {
        setLoading(true);
        setError(null);

        const updatedData = new FormData();
        updatedData.append('id', formData.id); // Add the ID to FormData
        updatedData.append('image', imageFile);
        updatedData.append('redirection_link', formData.redirection_link);

        try {
            await axios.post('/api/heroBanners', updatedData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setIsEditMode(false);
        } catch (err) {
            setError('Error updating banner data');
            console.error('Error updating banner data:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h4 className="mb-4 fw-bold">{data.pageName} banner</h4>
            <Card className='p-5'>
                {isEditMode ? (
                    <Form>
                        <FormGroup>
                            <Label for="image">Image:</Label>
                            <Input type="file" id="image" onChange={handleImageChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="redirection_link">Redirection Link:</Label>
                            <Input
                                type="text"
                                id="redirection_link"
                                name="redirection_link"
                                value={formData.redirection_link}
                                onChange={handleInputChange}
                                placeholder="Enter redirection link"
                            />
                        </FormGroup>
                        <Button color="primary mx-3" onClick={handleSave} disabled={loading}>
                            {loading ? 'Saving...' : 'Save'}
                        </Button>
                        <Button color="secondary" onClick={() => setIsEditMode(false)} className="ml-2">
                            Cancel
                        </Button>
                        {error && <Alert color="danger" className="mt-3">{error}</Alert>}
                    </Form>
                ) : (
                    <div className="text-center">
                        <img src={`/Assets/uploads/${formData.image}`} alt="Banner" className="img-fluid mb-3" style={{ maxWidth: '300px' }} />
                        <p className='fw-bold'>Redirection Link: <span className='fw-normal'>{formData.redirection_link}</span></p>
                        <Button color="primary" onClick={() => setIsEditMode(true)}>
                            Edit
                        </Button>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default EditableBanner;
