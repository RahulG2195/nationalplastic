"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Form, FormGroup, Label, Input, Button, Card, CardBody, CardTitle, Row, Col } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

const EditInvestorContact = () => {
    const [rows, setRows] = useState([]);
    const [originalRows, setOriginalRows] = useState([]); // State to store the original data
    const [editingRowIndex, setEditingRowIndex] = useState(null); // State to manage which row is in edit mode

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/investorsContact');
                const filteredRows = response.data.investorContact.map(row =>
                    Object.fromEntries(Object.entries(row).filter(([_, value]) => value !== null && value !== ''))
                );
                setRows(filteredRows);
                setOriginalRows(filteredRows); // Store the original data
            } catch (error) {
                console.error('There was an error fetching the data!', error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e, rowIndex) => {
        const { name, value } = e.target;
        const updatedRows = [...rows];
        updatedRows[rowIndex][name] = value;
        setRows(updatedRows);
    };

    const handleSubmit = async (e, rowIndex) => {
        e.preventDefault();
        try {
            await axios.put('/api/investorsContact', { row: rows[rowIndex] });
            setEditingRowIndex(false); // Exit edit mode for the current row
            toast.success(`Data for Row ${rowIndex + 1} updated successfully!`, { autoClose: 1000 });
        } catch (error) {
            console.error('There was an error updating the data!', error);
            toast.error('There was an error updating the data!', { autoClose: 1000 });
        }
    };

    const handleCancel = (rowIndex) => {
        // Reset the row to its original state
        const updatedRows = [...rows];
        updatedRows[rowIndex] = { ...originalRows[rowIndex] };
        setRows(updatedRows);
        setEditingRowIndex(null); // Exit edit mode for the current row
    };

    return (
        <Container>
            <h1>Edit Investor Contact</h1>

            <ToastContainer /> {/* Toast notifications container */}
            <div>
                {rows.map((row, rowIndex) => (
                    <Card key={rowIndex} className="mb-4">
                        <CardBody>
                            <CardTitle className='fw-semibold' tag="h5">{row.heading}</CardTitle>
                            <Form onSubmit={(e) => handleSubmit(e, rowIndex)}>
                                <Row>
                                    <div>
                                        <Button
                                            color="primary"
                                            onClick={() => setEditingRowIndex(rowIndex)}
                                            className="mb-4"
                                        >
                                            Edit
                                        </Button>
                                    </div>

                                    {Object.keys(row).map((field) => (

                                        field !== 'id' && ( // Hide the id field
                                            <Col key={field} md={6} className="mb-3">
                                                <FormGroup>
                                                    <Label for={`${field}-${rowIndex}`}>{field.replace(/_/g, ' ')}</Label>
                                                    <Input
                                                        type="text"
                                                        id={`${field}-${rowIndex}`}
                                                        name={field}
                                                        value={row[field] || ''}
                                                        onChange={(e) => handleChange(e, rowIndex)}
                                                        readOnly={editingRowIndex !== rowIndex} // Set input as read-only if not in edit mode for this row
                                                    />
                                                </FormGroup>
                                            </Col>
                                        )
                                    ))}
                                </Row>
                                {editingRowIndex === rowIndex ? (
                                    <div className="d-flex justify-content-between">
                                        <Button type="submit" color="primary" className="mr-2">Update</Button>
                                        <Button type="button" color="secondary" onClick={() => handleCancel(rowIndex)}>Cancel</Button>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </Form>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </Container>
    );
};

export default EditInvestorContact;
