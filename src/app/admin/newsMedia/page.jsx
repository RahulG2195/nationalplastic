"use client";
import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Card, CardImg, CardBody } from 'reactstrap';
import axios from 'axios';

const EditNews = ({ newsId }) => {
    const [heading, setHeading] = useState('');
    const [subheading, setSubheading] = useState('');
    const [images, setImages] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const id = 1;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/news_media', {
                    params: {
                        id: id
                    }
                });
                const { heading, subheading, images } = response.data.newsMedia[0];

                setHeading(heading || '');
                setSubheading(subheading || '');
                setImages(images ? images.split(',') : []);
            } catch (error) {
                console.error('Error fetching news data:', error);
            }
        };

        fetchData();
    }, [isEditing]);

    const handleAddImage = (e) => {
        const files = Array.from(e.target.files);
        setImages([...images, ...files.map(file => URL.createObjectURL(file))]);
        setImageFiles([...imageFiles, ...files]);
    };

    const handleImageChange = (index, newImgFile) => {
        const updatedFiles = [...imageFiles];
        updatedFiles[index] = newImgFile;
        setImageFiles(updatedFiles);

        const updatedImages = updatedFiles.map(file => URL.createObjectURL(file));
        setImages(updatedImages);
    };

    const handleDeleteImage = async (index) => {
        try {
            // Get the image to delete
            const imageToDelete = images[index];
            const imageName = imageToDelete.split('/').pop();

            const response = await axios.put('/api/news_media', {
                imageName: imageName,
                id: id,
            });

            if (response.data.success) {
                // Remove the image from the local state
                const updatedFiles = imageFiles.filter((_, i) => i !== index);
                const updatedImages = images.filter((_, i) => i !== index);

                // Clean up URLs created with URL.createObjectURL
                images.forEach((img) => URL.revokeObjectURL(img));

                setImageFiles(updatedFiles);
                setImages(updatedImages);
            } else {
                alert('Failed to delete image');
            }
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('id', id);
        formData.append('heading', heading.trim());
        formData.append('subheading', subheading.trim());

        imageFiles.forEach((file, index) => {
            formData.append(`images[${index}]`, file);
        });

        try {
            await axios.post(`/api/news_media`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('news updated successfully');
            setIsEditing(false); // Exit edit mode after saving
        } catch (error) {
            console.error('Error updating news:', error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Optionally, re-fetch data to revert changes
    };

    return (

            <Container className='pt-5'>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="fs-3 fw-bold">Edit News Section</h1>
                    {!isEditing && (
                        <Button onClick={() => setIsEditing(true)} color="primary">
                            <i className="bi bi-pencil"></i> Edit
                        </Button>
                    )}
                </div>
                {isEditing ? (
                    <Form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
                        <FormGroup>
                            <Label for="heading">Heading</Label>
                            <Input
                                type="text"
                                name="heading"
                                id="heading"
                                value={heading}
                                onChange={(e) => setHeading(e.target.value)}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="subheading">Subheading</Label>
                            <Input
                                type="text"
                                name="subheading"
                                id="subheading"
                                value={subheading}
                                onChange={(e) => setSubheading(e.target.value)}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="images">Images</Label>
                            <Input
                                type="file"
                                name="images"
                                id="images"
                                multiple
                                onChange={handleAddImage}
                                className="mb-2"
                            />
                            <Row>
                                {images.map((img, index) => (
                                    <Col md="2" key={index} className="mb-3">
                                        <Card>
                                            <CardImg top width="50%" src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_UPLOAD_PATH_DIR}${img}`} alt={`img-${index}`} />
                                            <CardBody>
                                                <Input
                                                    type="file"
                                                    onChange={(e) => handleImageChange(index, e.target.files[0])}
                                                    className="mb-2"
                                                />
                                                <Button type="button" onClick={() => handleDeleteImage(index)} color="danger">
                                                    <i className="bi bi-trash"></i> Delete
                                                </Button>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </FormGroup>
                        <div className="d-flex justify-content-between">
                            <Button type="submit" color="success">
                                <i className="bi bi-save"></i> Save
                            </Button>
                            <Button type="button" color="secondary" onClick={handleCancel}>
                                <i className="bi bi-x-circle"></i> Cancel
                            </Button>
                        </div>
                    </Form>
                ) : (
                    <div className="bg-light p-4 rounded shadow">
                        <p><strong>Heading:</strong> {heading}</p>
                        <p><strong>Subheading:</strong> {subheading}</p>
                        <div>
                            <strong>Images:</strong>
                            <Row>
                                {images.map((img, index) => (
                                    <Col md="2" key={index} className="mb-3">
                                        <Card>
                                            <CardImg top width="100%" src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_UPLOAD_PATH_DIR}${img}`} alt={`img-${index}`} />
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </div>
                )}
            </Container>
    );
};

export default EditNews;
