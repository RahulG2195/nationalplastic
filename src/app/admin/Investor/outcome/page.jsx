"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Table,
  Button,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form
} from 'reactstrap';

const BoardOutcome = () => {
  const [boardOutcomes, setBoardOutcomes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [currentYearHeading, setCurrentYearHeading] = useState('');
  const [pdfFiles, setPdfFiles] = useState([]);
  const [newPdfFiles, setNewPdfFiles] = useState([]);
  const [status, setStatus] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalYearHeading, setModalYearHeading] = useState('');
  const [modalPdfFiles, setModalPdfFiles] = useState([]);
  const [modalStatus, setModalStatus] = useState(1);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/boardOutcome');
      setBoardOutcomes(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (data) => {
    setEditingId(data.id);
    setCurrentYearHeading(data.year_heading || '');
    setPdfFiles((data.pdf || '').split(','));
    setStatus(data.status || 1);
    setNewPdfFiles([]);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setCurrentYearHeading('');
    setPdfFiles([]);
    setNewPdfFiles([]);
    setStatus(1);
  };

  const handleFileChange = (e) => {
    setNewPdfFiles(Array.from(e.target.files));
  };

  const handleModalFileChange = (e) => {
    setModalPdfFiles(Array.from(e.target.files));
  };

  const handleSave = async (id) => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('yearHeading', currentYearHeading);
    formData.append('status', status);
  
    pdfFiles.forEach((file, index) => {
      if (typeof file === 'string') {
        formData.append('existingPdfFiles[]', file); // Send existing files that remain
      } else {
        formData.append('pdfFiles', file);
      }
    });
  
    newPdfFiles.forEach(file => {
      formData.append('newPdfFiles', file);
    });
  
    try {
      await axios.put('/api/boardOutcome', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      fetchData();
      handleCancelEdit();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  

  const handleAddNew = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('yearHeading', modalYearHeading);
    formData.append('status', modalStatus);

    modalPdfFiles.forEach(file => {
      formData.append('pdfFiles', file);
    });

    try {
      await axios.post('/api/boardOutcome', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      fetchData();
      toggleModal();
    } catch (error) {
      console.error('Error adding new data:', error);
    }
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    if (modalOpen) {
      setModalYearHeading('');
      setModalPdfFiles([]);
      setModalStatus(1);
    }
  };

  // Group board outcomes by year heading
  const groupedData = boardOutcomes.reduce((acc, item) => {
    if (!acc[item.year_heading]) {
      acc[item.year_heading] = [];
    }
    acc[item.year_heading].push(item);
    return acc;
  }, {});

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Board Outcomes</h1>
      <Card className='p-5'>
        <div>
          <Button color="primary" onClick={toggleModal} className="mb-4">Add New</Button>
        </div>
        <Table striped responsive className="mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Year Heading</th>
              <th>PDF Files</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(groupedData).map((yearHeading) => (
              groupedData[yearHeading].map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    {editingId === item.id ? (
                      <Input
                        type="text"
                        value={currentYearHeading}
                        onChange={(e) => setCurrentYearHeading(e.target.value)}
                      />
                    ) : (
                      yearHeading
                    )}
                  </td>
                  <td>
                    {editingId === item.id ? (
                      <div>
                        <ListGroup>
                          {pdfFiles.map((pdf, index) => (
                            <ListGroupItem key={index}>
                              {index + 1}. {pdf}
                              <Button
                                color="danger"
                                size="sm"
                                onClick={() => setPdfFiles(pdfFiles.filter((_, i) => i !== index))}
                                className="mx-2"
                              >
                                Remove
                              </Button>
                            </ListGroupItem>
                          ))}
                        </ListGroup>
                        <FormGroup className="mt-2">
                          <Label for="newPdfFiles">Add More PDF Files</Label>
                          <Input
                            type="file"
                            id="newPdfFiles"
                            multiple
                            onChange={handleFileChange}
                          />
                        </FormGroup>
                      </div>
                    ) : (
                      <ListGroup>
                        {item.pdf.split(',').map((pdf, index) => (
                          <ListGroupItem key={index}>
                            {index + 1}. {pdf}
                          </ListGroupItem>
                        ))}
                      </ListGroup>
                    )}
                  </td>
                  <td>
                    {editingId === item.id ? (
                      <Input
                        type="number"
                        value={status}
                        onChange={(e) => setStatus(Number(e.target.value))}
                        style={{ width: '80px' }}
                      />
                    ) : (
                      item.status
                    )}
                  </td>
                  <td>
                    {editingId === item.id ? (
                      <div className="d-flex align-items-center">
                        <Button color="success" onClick={() => handleSave(item.id)} className="me-2">
                          Save
                        </Button>
                        <Button color="secondary" onClick={handleCancelEdit}>
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button color="warning" onClick={() => handleEdit(item)}>
                        Edit
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            ))}
          </tbody>
        </Table>
      </Card>

      {/* Add New Modal */}
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Add New Data</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleAddNew}>
            <FormGroup>
              <Label for="modalYearHeading">Year Heading</Label>
              <Input
                type="text"
                id="modalYearHeading"
                value={modalYearHeading}
                onChange={(e) => setModalYearHeading(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="modalPdfFiles">Upload PDF Files</Label>
              <Input
                type="file"
                id="modalPdfFiles"
                multiple
                onChange={handleModalFileChange}
                required
              />
              {modalPdfFiles.length > 0 && (
                <ListGroup className="mt-2">
                  {Array.from(modalPdfFiles).map((file, index) => (
                    <ListGroupItem key={index}>
                      {index + 1}. {file.name}
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="modalStatus">Status</Label>
              <Input
                type="number"
                id="modalStatus"
                value={modalStatus}
                onChange={(e) => setModalStatus(Number(e.target.value))}
                required
              />
            </FormGroup>
            <ModalFooter>
              <Button color="secondary" onClick={toggleModal}>Cancel</Button>
              <Button color="primary" type="submit">Add</Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default BoardOutcome;
