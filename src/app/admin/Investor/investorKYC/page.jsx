"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditDataComponent = () => {
  const [message, setMessage] = useState("");
  const [circularLink, setCircularLink] = useState("");
  const [rtaData, setRtaData] = useState([{ heading: "", file: null }]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get("/api/investorKYC")
      .then((response) => {
        const { message, circularLink, rta_heading, rta_link } = response.data;
        setMessage(message);
        setCircularLink(circularLink);

        const headings = rta_heading?.split(",").filter(Boolean) || [];
        const links = rta_link?.split(",").filter(Boolean) || [];

        const combined = headings.map((heading, index) => ({
          heading,
          file: links[index] || null,
        }));
        setRtaData(combined);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const handleHeadingChange = (index, e) => {
    const updated = [...rtaData];
    updated[index].heading = e.target.value;
    setRtaData(updated);
  };

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    const updated = [...rtaData];
    updated[index].file = file;
    setRtaData(updated);

    const updatedFiles = [...selectedFiles];
    updatedFiles[index] = file;
    setSelectedFiles(updatedFiles);
  };

  const handleAddGroup = () => {
    setRtaData([...rtaData, { heading: "", file: null }]);
  };

  const handleRemoveGroup = (index) => {
    setRtaData(rtaData.filter((_, i) => i !== index));
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    setEditMode(false);
    axios.get("/api/investorKYC").then((response) => {
      const { message, circularLink, rta_heading, rta_link } = response.data;
      setMessage(message);
      setCircularLink(circularLink);

      const headings = rta_heading?.split(",").filter(Boolean) || [];
      const links = rta_link?.split(",").filter(Boolean) || [];

      const combined = headings.map((heading, index) => ({
        heading,
        file: links[index] || null,
      }));
      setRtaData(combined);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("message", message);
    formData.append("circularLink", circularLink);
    formData.append("id", "1");

    rtaData.forEach((data) => {
      formData.append("rta_headings[]", data.heading);
      if (data.file instanceof File) {
        formData.append("rtaFiles[]", data.file);
      }
    });

    try {
      const response = await axios.post("/api/investorKYC", formData);
      if (response.status === 200) {
        toast.success("Data updated successfully!", { autoClose: 1000 });
        setEditMode(false);
      }
    } catch (err) {
      toast.error("Failed to update data.", { autoClose: 1000 });
    }
  };

  return (
    <Container>
      <ToastContainer />
      <h1 className="mb-4">Edit KYC Data</h1>
      {!editMode ? (
        <Button color="primary" onClick={() => setEditMode(true)}>
          Edit
        </Button>
      ) : (
        <div className="d-flex gap-2">
          <Button color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      )}

      <Card className="mb-4">
        <CardBody>
          <CardTitle tag="h5">Main Information</CardTitle>
          <FormGroup>
            <Label for="message">Message</Label>
            <Input
              type="text"
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              readOnly={!editMode}
            />
          </FormGroup>
          <FormGroup>
            <Label for="circularLink">Circular Link</Label>
            <Input
              type="text"
              id="circularLink"
              value={circularLink}
              onChange={(e) => setCircularLink(e.target.value)}
              readOnly={!editMode}
            />
          </FormGroup>
        </CardBody>
      </Card>

      {rtaData.map((data, index) => (
        <Card className="mb-4" key={index}>
          <CardBody>
            <CardTitle tag="h5" className="fw-semibold">
              RTA Group {index + 1}
            </CardTitle>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label>Heading</Label>
                  <Input
                    type="text"
                    value={data.heading}
                    onChange={(e) => editMode && handleHeadingChange(index, e)}
                    readOnly={!editMode}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>PDF File</Label>
                  {data.file && !editMode ? (
                    <div>
                      {typeof data.file === "string"
                        ? data.file
                        : data.file.name}
                    </div>
                  ) : (
                    editMode && (
                      <Input
                        type="file"
                        onChange={(e) => handleFileChange(index, e)}
                      />
                    )
                  )}
                </FormGroup>
              </Col>
            </Row>
            {editMode && (
              <Button color="danger" onClick={() => handleRemoveGroup(index)}>
                Remove Group
              </Button>
            )}
          </CardBody>
        </Card>
      ))}

      {editMode && (
        <Button color="info" className="mb-4" onClick={handleAddGroup}>
          Add RTA Group
        </Button>
      )}

      {!editMode ? (
        <Button color="primary" onClick={() => setEditMode(true)}>
          Edit
        </Button>
      ) : (
        <div className="d-flex gap-2">
          <Button color="success" onClick={handleSubmit}>
            Update
          </Button>
          <Button color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      )}
    </Container>
  );
};

export default EditDataComponent;
