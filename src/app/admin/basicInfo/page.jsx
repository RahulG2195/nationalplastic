"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Row, Col, Container, Alert, FormFeedback, Card } from 'reactstrap';

const BasicInfoEditor = () => {
    const [basicInfo, setBasicInfo] = useState({
        logo: '',
        brand1_link: '',
        brand2_link: '',
        instagram: '',
        youtube: '',
        twitter: '',
        facebook: '',
        mobile_number1: '',
        mobile_number2: '',
        address: '',
        email: '',
        email_2: '',
        map_url: '',
        indiamart: '',
        wpNumber: '',
    });

    const [initialBasicInfo, setInitialBasicInfo] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch the existing basic info
        axios.get('/api/basicInfo')
            .then(response => {
                setBasicInfo(response.data.basicInfo);
                setInitialBasicInfo(response.data.basicInfo);
            })
            .catch(error => {
                console.error('There was an error fetching the basic info!', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBasicInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setBasicInfo(prevState => ({
            ...prevState,
            logo: e.target.files[0]
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (editMode) {
            if (!basicInfo.mobile_number1) {
                newErrors.mobile_number1 = 'Mobile Number 1 is required';
            } else if (!/^\d{10}$/.test(basicInfo.mobile_number1)) {
                newErrors.mobile_number1 = 'Mobile Number 1 must be a 10-digit number';
            }


            if (!basicInfo.email) {
                newErrors.email = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(basicInfo.email)) {
                newErrors.email = 'Email is invalid';
            }
        }


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formData = new FormData();
        Object.entries(basicInfo).forEach(([key, value]) => {
            formData.append(key, value);
        });

        try {
            const response = await axios.post('/api/basicInfo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('Basic info updated successfully');
            setEditMode(false);
            setInitialBasicInfo(basicInfo); // Update initial state
        } catch (error) {
            console.error('There was an error updating the basic info!', error);
            setMessage('There was an error updating the basic info');
        }
    };

    const handleCancel = () => {
        setBasicInfo(initialBasicInfo);
        setEditMode(false);
        setErrors({});
    };

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Basic Information</h1>
                <Button color="primary" onClick={() => setEditMode(!editMode)}>
                    {editMode ? 'Cancel' : 'Edit'}
                </Button>
            </div>
            {message && <Alert color={message.includes('error') ? 'danger' : 'success'}>{message}</Alert>}
            <Card className='p-5'>
                <Form onSubmit={handleSubmit}>
                    <Row className='align-items-center'>
                        <Col md="6">
                            <FormGroup>
                                <Label className='fw-semibold' for="logo">Logo</Label>
                                {editMode ? (
                                    <>
                                        <Input
                                            type="file"
                                            name="logo"
                                            id="logo"
                                            onChange={handleFileChange}
                                            invalid={!!errors.logo}
                                        />
                                        <FormFeedback>{errors.logo}</FormFeedback>
                                    </>
                                ) : (
                                    basicInfo.logo && <img className='w-25 mx-3' src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_UPLOAD_PATH_DIR}${basicInfo.logo}`} alt="Logo" style={{ maxWidth: '100%' }} />
                                )}
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label className='fw-semibold' for="brand1_link">Brand 1 Link</Label>
                                <Input
                                    type="text"
                                    name="brand1_link"
                                    id="brand1_link"
                                    value={basicInfo.brand1_link}
                                    onChange={handleChange}
                                    readOnly={!editMode}
                                    invalid={!!errors.brand1_link}
                                />
                                <FormFeedback>{errors.brand1_link}</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label className='fw-semibold' for="brand2_link">Brand 2 Link</Label>
                                <Input
                                    type="text"
                                    name="brand2_link"
                                    id="brand2_link"
                                    value={basicInfo.brand2_link}
                                    onChange={handleChange}
                                    readOnly={!editMode}
                                    invalid={!!errors.brand2_link}
                                />
                                <FormFeedback>{errors.brand2_link}</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label className='fw-semibold' for="instagram">Instagram</Label>
                                <Input
                                    type="text"
                                    name="instagram"
                                    id="instagram"
                                    value={basicInfo.instagram}
                                    onChange={handleChange}
                                    readOnly={!editMode}
                                />
                                <FormFeedback>{errors.instagram}</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label className='fw-semibold' for="youtube">YouTube</Label>
                                <Input
                                    type="text"
                                    name="youtube"
                                    id="youtube"
                                    value={basicInfo.youtube}
                                    onChange={handleChange}
                                    readOnly={!editMode}
                                />
                                <FormFeedback>{errors.youtube}</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label className='fw-semibold' for="twitter">Twitter</Label>
                                <Input
                                    type="text"
                                    name="twitter"
                                    id="twitter"
                                    value={basicInfo.twitter}
                                    onChange={handleChange}
                                    readOnly={!editMode}
                                />
                                <FormFeedback>{errors.twitter}</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label className='fw-semibold' for="facebook">Facebook</Label>
                                <Input
                                    type="text"
                                    name="facebook"
                                    id="facebook"
                                    value={basicInfo.facebook}
                                    onChange={handleChange}
                                    readOnly={!editMode}
                                />
                                <FormFeedback>{errors.facebook}</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label className='fw-semibold' for="indiamart">Indiamart link</Label>
                                <Input
                                    type="text"
                                    name="indiamart"
                                    id="indiamart"
                                    value={basicInfo.indiamart}
                                    onChange={handleChange}
                                />
                                <FormFeedback>{errors.facebook}</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label className='fw-semibold' for="google">Google Review</Label>
                                <Input
                                    type="text"
                                    name="google"
                                    id="google"
                                    value={basicInfo.google}
                                    onChange={handleChange}
                                    readOnly={!editMode}
                                />
                                <FormFeedback>{errors.facebook}</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label className='fw-semibold' for="mobile_number1">Mobile Number 1</Label>
                                <Input
                                    type="text"
                                    name="mobile_number1"
                                    id="mobile_number1"
                                    value={basicInfo.mobile_number1}
                                    onChange={handleChange}
                                    readOnly={!editMode}
                                    invalid={!!errors.mobile_number1}
                                />
                                <FormFeedback>{errors.mobile_number1}</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label className='fw-semibold' for="mobile_number2">Mobile Number 2</Label>
                                <Input
                                    type="text"
                                    name="mobile_number2"
                                    id="mobile_number2"
                                    value={basicInfo.mobile_number2}
                                    onChange={handleChange}
                                    readOnly={!editMode}
                                />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label className='fw-semibold' for="wpNumber">WhatsApp number</Label>
                                <Input
                                    type="text"
                                    name="wpNumber"
                                    id="wpNumber"
                                    value={basicInfo.wpNumber}
                                    onChange={handleChange}
                                    readOnly={!editMode}
                                />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label className='fw-semibold' for="address">Address</Label>
                                <Input
                                    type="text"
                                    name="address"
                                    id="address"
                                    value={basicInfo.address}
                                    onChange={handleChange}
                                    readOnly={!editMode}
                                    invalid={!!errors.address}
                                />
                                <FormFeedback>{errors.address}</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label className='fw-semibold' for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={basicInfo.email}
                                    onChange={handleChange}
                                    readOnly={!editMode}
                                    invalid={!!errors.email}
                                />
                                <FormFeedback>{errors.email}</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label className='fw-semibold' for="email_2">Email_2</Label>
                                <Input
                                    type="email2"
                                    name="email_2"
                                    id="email_2"
                                    value={basicInfo.email_2}
                                    onChange={handleChange}
                                    readOnly={!editMode}
                                    invalid={!!errors.email}
                                />
                                <FormFeedback>{errors.email}</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label className='fw-semibold' for="map_url">Map_url</Label>
                                <Input
                                    type="text"
                                    name="map_url"
                                    id="map_url"
                                    value={basicInfo.map_url}
                                    onChange={handleChange}
                                    readOnly={!editMode}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    {editMode && (
                        <div className="d-flex justify-content-end">
                            <Button type="submit" color="success" className="me-2">Save</Button>
                            <Button type="button" color="secondary" onClick={handleCancel}>Cancel</Button>
                        </div>
                    )}
                </Form>
            </Card>
        </Container>
    );
};

export default BasicInfoEditor;
