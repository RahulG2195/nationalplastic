//Register/page.jsx this 
"use client"
// Import the required modules
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import '../../styles/profilepage.css';

function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Perform form validation
        const errors = {};
        if (!formData.firstName.trim()) {
            errors.firstName = 'First name is required';
        }
        if (!formData.lastName.trim()) {
            errors.lastName = 'Last name is required';
        }
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!isValidEmail(formData.email)) {
            errors.email = 'Invalid email address';
        }
        if (!formData.phone.trim()) {
            errors.phone = 'Phone number is required';
        } else if (!isValidPhone(formData.phone)) {
            errors.phone = 'Invalid phone number';
        }
        if (!formData.password.trim()) {
            errors.password = 'Password is required';
        }
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
        
        if (Object.keys(errors).length === 0) {
            try {

                // Check if email already exists
                const { data } = await axios.get(`http://localhost:3000/api/Users?email=${formData.email}`);
                if (data.length > 0) {
                    setFormErrors({ email: 'Email already exists' });
                } else {
                    const response = await axios.post('http://localhost:3000/api/Users', formData);
                    console.log('Form submitted:', response);
                }
                    // Clear form data on successful submission
                    setFormData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        phone: '',
                        password: '',
                        confirmPassword: '',
                    });
                    
                    // Display success message
                    setSuccessMessage('Registration successful!');
                }
             catch (error) {
                console.error('Error submitting form:', error);
                // Handle error, e.g., show error message to the user
            }
          }
        // } else {
        //     setFormErrors(errors);
        // }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        
        // Real-time validation
        if (name === 'phone') {
            const phoneError = validatePhone(value);
            setFormErrors(prevErrors => ({
                ...prevErrors,
                phone: phoneError,
            }));
        }
    };

    const isValidEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const isValidPhone = (phone) => {
        const phonePattern = /^\d{10}$/;
        return phonePattern.test(phone);
    };

    const validatePhone = (phone) => {
        const phonePattern = /^\d{10}$/;
        return phonePattern.test(phone) ? '' : 'Invalid phone number';
    };

    return (
        <div className="container">
            <div className="row Login-Page-ImgForm">
                <div className="col-md-6 login-image">
                    <Image
                        src="/assets/images/catalogue/loginPage.png"
                        className="img-fluid d-block w-100"
                        alt="Team Member"
                        width={100}
                        height={100}
                        layout="responsive"
                        objectFit="cover"
                    />
                </div>
                <div className="col-md-6">
                    <div className="Login-Form">
                        <form onSubmit={handleSubmit}>
                            <h3 className="text-center mb-2">Register</h3>
                            {successMessage && <div className="alert alert-success">{successMessage}</div>}
                            <div className="row mb-3 mt-3">
                                <label htmlFor="inputFirstName" className="col-sm-2 col-form-label">First Name:</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="inputFirstName" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                                    {formErrors.firstName && <div className="text-danger">{formErrors.firstName}</div>}
                                </div>
                            </div>
                            <div className="row mb-3 mt-3">
                                <label htmlFor="inputLastName" className="col-sm-2 col-form-label">Last Name:</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="inputLastName" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                                    {formErrors.lastName && <div className="text-danger">{formErrors.lastName}</div>}
                                </div>
                            </div>
                            <div className="row mb-3 mt-3">
                                <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email:</label>
                                <div className="col-sm-10">
                                    <input type="email" className="form-control" id="inputEmail" name="email" value={formData.email} onChange={handleInputChange} />
                                    {formErrors.email && <div className="text-danger">{formErrors.email}</div>}
                                </div>
                            </div>
                            <div className="row mb-3 mt-3">
                                <label htmlFor="inputPhone" className="col-sm-2 col-form-label">Phone:</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="inputPhone" name="phone" value={formData.phone} onChange={handleInputChange} />
                                    {formErrors.phone && <div className="text-danger">{formErrors.phone}</div>}
                                </div>
                            </div>
                            <div className="row mb-3 mt-3">
                                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password:</label>
                                <div className="col-sm-10">
                                    <input type="password" className="form-control" id="inputPassword" name="password" value={formData.password} onChange={handleInputChange} />
                                    {formErrors.password && <div className="text-danger">{formErrors.password}</div>}
                                </div>
                            </div>
                            <div className="row mb-3 mt-3">
                                <label htmlFor="inputConfirmPassword" className="col-sm-2 col-form-label">Confirm Password:</label>
                                <div className="col-sm-10">
                                    <input type="password" className="form-control" id="inputConfirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} />
                                    {formErrors.confirmPassword && <div className="text-danger">{formErrors.confirmPassword}</div>}
                                </div>
                            </div>
                            <div className="form-btn-login-div">
                                <button type="submit" className="btn form-btn-login">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
