"use client"
import {
    Card,
    Row,
    Col,
    CardTitle,
    CardBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
  } from "reactstrap";
  // import { MultiSelect } from "primereact/multiselect";s
  import { useState } from "react";
  
  const Addproducts = () => {
    const [selectedRooms, setSelectedRooms] = useState(null);
  
    const rooms = [
      { name: "Bathroom" },
      { name: "Bedroom" },
      { name: "Childrensroom" },
      { name: "Dining room" },
      { name: "Hallway" },
      { name: "Kitchen" },
      { name: "Living room" },
      { name: "Office" },
    ];
  
    const roomTemplate = (option) => {
      return <div>{option.name}</div>;
      const panelFooterTemplate = () => {
        const length = selectedRooms ? selectedRooms.length : 0;
  
        return (
          <div className="py-2 px-3">
            <b>{length}</b> item{length > 1 ? "s" : ""} selected.
          </div>
        );
      };
    };
    return (
      <Row>
        <Col>
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-1*/}
          {/* --------------------------------------------------------------------------------*/}
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-bell me-2"> </i>
              Add product
            </CardTitle>
            <CardBody>
              <Form className="row justify-content-center">
                <FormGroup className="col-6">
                  <Label for="productname">Product Name</Label>
                  <Input
                    id="productname"
                    name="productname"
                    placeholder="Enter Product Name"
                    type="text"
                  />
                </FormGroup>
                <FormGroup className="col-6">
                  <Label for="category">Category</Label>
                  <Input
                    id="type"
                    name="category"
                    placeholder="Enter category SPC/LVT"
                    type="text"
                  />
                </FormGroup>
                <FormGroup className="col-6">
                  <Label for="catalogue">Catalogue</Label>
                  <Input
                    id="catalogue"
                    name="catalogue"
                    placeholder="Enter catalogue Sicilian/Tuscany/LVT 1/LVT 2"
                    type="text"
                  />
                </FormGroup>
                {/* variation */}
                <FormGroup className="col-6">
                  <Label for="productType">Product Type</Label> 
                  <Input
                    id="catalogue"
                    name="catalogue"
                    placeholder="Enter Product Type wood/stone/marbel"
                    type="text"
                  />
                </FormGroup>
                <FormGroup className="col-6">
                  <Label for="color">Color</Label>
                  <Input
                    id="color"
                    name="color"
                    placeholder="Enter Product color"
                    type="text"
                  />
                </FormGroup>
                <FormGroup className="col-6">
                  <Label for="code">Code</Label>
                  <Input
                    id="code"
                    name="code"
                    placeholder="Enter Product Code"
                    type="text"
                  />
                </FormGroup>
  
                <FormGroup className="col-6">
                  <Label for="exampleSelectMulti">Select Places</Label>
                  <Input id="exampleSelectMulti" name="selectMulti" type="select">
                    <option>Bedroom</option>
                    <option>Bathroom</option>
                    <option>Childrensroom</option>
                    <option>Dining room</option>
                    <option>Hallway</option>
                    <option>Kitchen</option>
                    <option>Living room</option>
                    <option>Office</option>
                  </Input>
                </FormGroup>
                {/* <FormGroup className="col-6">
                  <Label for="variation">variation</Label>
                  <Input
                    id="variation"
                    name="variation"
                    placeholder="Enter Product variation"
                    type="text"
                  />
                </FormGroup> */}
                <FormGroup className="col-6">
                  <Label for="thikness">thikness</Label>
                  <Input
                    id="thikness"
                    name="thikness"
                    placeholder="Enter Product thikness"
                    type="text"
                  />
                </FormGroup>
                <FormGroup className="col-6">
                  <Label for="layer">layer</Label>
                  <Input
                    id="layer"
                    name="layer"
                    placeholder="Enter Product layer"
                    type="text"
                  />
                </FormGroup>
                <FormGroup className="col-6">
                  <Label for="prod_finish">prod_finish</Label>
                  <Input
                    id="prod_finish"
                    name="prod_finish"
                    placeholder="Enter product finishing"
                    type="text"
                  />
                </FormGroup>
                <FormGroup className="col-6">
                  <Label for="size">prod_size</Label>
                  <Input
                    id="size"
                    name="size"
                    placeholder="Enter Product size"
                    type="text"
                  />
                </FormGroup>
                <FormGroup className="col-6">
                  <Label for="spiece">prod_spiece</Label>
                  <Input
                    id="spiece"
                    name="spiece"
                    placeholder="Enter Product spiece"
                    type="text"
                  />
                </FormGroup>
                <FormGroup className="col-6">
                  <Label for="grove">no_of_grove</Label>
                  <Input
                    id="grove"
                    name="cogrovelor"
                    placeholder="Enter Product's grove number"
                    type="text"
                  />
                </FormGroup>
                <FormGroup className="col-6">
                  <Label for="m2pack">m2pack</Label>
                  <Input
                    id="m2pack"
                    name="m2pack"
                    placeholder="Enter Product m2pack"
                    type="text"
                  />
                </FormGroup>
                <FormGroup className="col-6">
                  <Label for="plank">plank</Label>
                  <Input
                    id="plank"
                    name="plank"
                    placeholder="Enter Product plank"
                    type="text"
                  />
                </FormGroup>
                <FormGroup className="col-6">
                  <Label for="Status">Status</Label>
                  <Input
                    id="Status"
                    name="Status"
                    placeholder="Enter Product Status 1/0"
                    type="text"
                  />
                </FormGroup>
  
                {/* <FormGroup className="col-6">
                  <Label for="exampleSelectMulti">Select Places</Label>
                  <Input id="exampleSelectMulti" multiple name="selectMulti" type="select">
                    <option>Bathroom</option>
                    <option>Bedroom</option>
                    <option>Childrensroom</option>
                    <option>Dining room</option>
                    <option>Hallway</option>
                    <option>Kitchen</option>
                    <option>Living room</option>
                    <option>Office</option>
                  </Input>
                </FormGroup> */}
  
                <FormGroup className="col-6">
                  <Label for="exampleFile">Front image</Label>
                  <Input id="exampleFile" name="file" type="file" />
                  <FormText>
                   Upload front image here.
                  </FormText>
                </FormGroup>
                <FormGroup className="col-6">
                  <Label for="exampleFile">Other images</Label>
                  <Input id="exampleFile" name="file" type="file" />
                  <FormText>
                    Upload interior image of product.
                  </FormText>
                </FormGroup>
  
              </Form>
               <center><Button className="col-2">Submit</Button></center> 
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  };
  
  export default Addproducts;
  