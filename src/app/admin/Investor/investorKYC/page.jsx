"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, FormGroup, Label, Input, Button, Card, CardBody } from 'reactstrap';

const EditDataComponent = () => {
  const [message, setMessage] = useState('');
  const [circularLink, setCircularLink] = useState('');
  const [rtaData, setRtaData] = useState([{ heading: '', file: null }]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Fetch existing data when the component mounts
    axios.get('/api/investorKYC')  // Replace with your API endpoint
      .then(response => {
        const { message, circularLink, rta_heading, rta_link } = response.data;
        setMessage(message);
        setCircularLink(circularLink);

        // Combine headings and links into a single array of objects
        const headings = rta_heading.split(',').filter(Boolean);
        const links = rta_link.split(',').filter(Boolean);
        const combinedData = headings.map((heading, index) => ({
          heading,
          file: links[index] || null, // This will be the filename or URL
        }));
        setRtaData(combinedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleHeadingChange = (index, event) => {
    const newRtaData = [...rtaData];
    newRtaData[index].heading = event.target.value;
    setRtaData(newRtaData);
  };

  const handleFileChange = (index, event) => {
    const newRtaData = [...rtaData];
    const file = event.target.files[0];
    newRtaData[index].file = file;
    setRtaData(newRtaData);
    setSelectedFiles(prevFiles => {
      const updatedFiles = [...prevFiles];
      updatedFiles[index] = file;
      return updatedFiles;
    });
  };

  const handleAddGroup = () => {
    setRtaData([...rtaData, { heading: '', file: null }]);
  };

  const handleRemoveGroup = (index) => {
    const newRtaData = rtaData.filter((_, i) => i !== index);
    setRtaData(newRtaData);
    setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('message', message);
    formData.append('circularLink', circularLink);
    formData.append('id', '1'); // Example ID

    rtaData.forEach((data, index) => {
      formData.append('rta_headings[]', data.heading);
      if (data.file) {
        formData.append('rtaFiles[]', data.file);
      }
    });
  
    try {
      const response = await fetch('/api/investorKYC', {
        method: 'PUT',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      setEditMode(false);
      toast.success(`Data updated successfully!`, { autoClose: 1000 });
      
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Failed to update data');
    }
  };
  
  const handleCancel = () => {
    // Reset state or fetch data again if needed
    setEditMode(false);
    // Optionally re-fetch data if needed
    axios.get('/api/investorKYC')  // Re-fetch data to reset form values
      .then(response => {
        const { message, circularLink, rta_heading, rta_link } = response.data;
        setMessage(message);
        setCircularLink(circularLink);

        // Combine headings and links into a single array of objects
        const headings = rta_heading.split(',').filter(Boolean);
        const links = rta_link.split(',').filter(Boolean);
        const combinedData = headings.map((heading, index) => ({
          heading,
          file: links[index] || null, // This will be the filename or URL
        }));
        setRtaData(combinedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  return (
    <Card>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="message">Message</Label>
            <Input
              type="text"
              id="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              readOnly={!editMode}
            />
          </FormGroup>

          <FormGroup>
            <Label for="circularLink">Circular Link</Label>
            <Input
              type="text"
              id="circularLink"
              value={circularLink}
              onChange={e => setCircularLink(e.target.value)}
              readOnly={!editMode}
            />
          </FormGroup>

          {rtaData.map((data, index) => (
            <div key={index} className="mb-3">
              <FormGroup>
                <Label className='fw-bold' for={`rtaHeading${index}`}>RTA Heading {index + 1}</Label>
                <Input
                  type="text"
                  id={`rtaHeading${index}`}
                  value={data.heading}
                  onChange={e => editMode && handleHeadingChange(index, e)}
                  readOnly={!editMode}
                />
              </FormGroup>

              <FormGroup>
                {/* <Label for={`rtaFile${index}`}>Upload PDF for Heading {index + 1}</Label> */}
                {data.file ? (
                  !editMode ? (
                    <div><span className='fw-bold'>PDF</span>: {data.file}</div> // Display the PDF file name or URL
                  ) : (
                    <Input
                      type="file"
                      id={`rtaFile${index}`}
                      onChange={e => handleFileChange(index, e)}
                    />
                  )
                ) : (
                  editMode && (
                    <Input
                      type="file"
                      id={`rtaFile${index}`}
                      onChange={e => handleFileChange(index, e)}
                    />
                  )
                )}
              </FormGroup>

              {editMode && (
                <Button color="danger" onClick={() => handleRemoveGroup(index)}>
                  Remove
                </Button>
              )}
            </div>
          ))}
          {editMode && (
            <Button color="primary" onClick={handleAddGroup}>
              Add RTA Group
            </Button>
          )}

          {!editMode ? (
            <Button color="primary"  onClick={() => setEditMode(true)}>
              Edit
            </Button>
          ) : (
            <>
              <Button type="submit" color="success" className='mx-3'>Update Data</Button>
              <Button type="button" color="secondary" onClick={handleCancel}>Cancel</Button>
            </>
          )}
        </Form>
      </CardBody>
    </Card>
  );
};

export default EditDataComponent;
