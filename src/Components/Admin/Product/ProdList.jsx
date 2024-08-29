"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import axios from "axios";
import { Table, Tooltip, Select, Tag, Switch } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ProdList = () => {
  const router = useRouter();
  const [productArray, setProductArray] = useState([]);
  const [ProdTagsData, setProdTagsData] = useState([]);
  const [filteredProductArray, setFilteredProductArray] = useState([]);
  const [searchText, setSearchText] = useState("");
  const searchInput = useRef(null);
  const [modalContent, setModalContent] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentItemToDelete, setCurrentItemToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const rawData = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/adminProducts`
      );

      const { allProducts, prod_tags_api_data } = rawData.data;
      setProductArray(allProducts);
      setProdTagsData(prod_tags_api_data);
      setFilteredProductArray(allProducts);
    };
    fetchData();
  }, []);

  const handleOnclick = (type, index) => {
    if (type == "Edit") {
      const productToEdit = productArray.find(
        (product) => product.product_id === index
      );
      localStorage.setItem("productToEdit", JSON.stringify(productToEdit));
      localStorage.setItem("pDataToEdit", JSON.stringify(productToEdit));
      router.push("/admin/editProductForm");
    } else if (type == "Delete") {
      setCurrentItemToDelete(index);
      setDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (currentItemToDelete !== null) {
      try {
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_BASE_URL}/adminProducts`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            data: JSON.stringify({ product_id: currentItemToDelete }),
          }
        );
        // Update product array after deletion
        const updatedProducts = productArray.filter(
          (product) => product.product_id !== currentItemToDelete
        );
        setProductArray(updatedProducts);
        setFilteredProductArray(updatedProducts);
      } catch (error) {
        console.error("Delete failed", error);
        // Optionally handle error, like showing an error message
      }
    }
    setDeleteModalOpen(false);
    setCurrentItemToDelete(null);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filteredData = productArray.filter((product) =>
      product.product_name.toLowerCase().includes(value)
    );
    setFilteredProductArray(filteredData);
  };

  const toggleModal = () => {
    setModalContent("");
  };

  const toggleDeleteModal = () => {
    setDeleteModalOpen(!deleteModalOpen);
  };

  //   add toggle in prod table
  const handleTagChange = async (tagIds, record) => {
    try {
      // Remove duplicates and convert to comma-separated string
      const uniqueTagIds = [...new Set(tagIds)];
      const tagString = uniqueTagIds.join(", ");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/adminProdTag`,
        {
          productId: record.product_id,
          tagId: tagString,
        }
      );

      if (response.data.tags) {
        // Update local state
        setProductArray((prevArray) =>
          prevArray.map((product) =>
            product.product_id === record.product_id
              ? { ...product, tag_cat: response.data.tags }
              : product
          )
        );
        setFilteredProductArray((prevArray) =>
          prevArray.map((product) =>
            product.product_id === record.product_id
              ? { ...product, tag_cat: response.data.tags }
              : product
          )
        );
      }
    } catch (error) {
      console.error("Error updating product tag:", error);
      // Handle error (e.g., show a notification to the user)
    }
  };

  const handleTagRemove = async (tagId, record) => {
    try {
      const currentTags = record.tag_cat ? record.tag_cat.split(",") : [];
      const updatedTags = currentTags.filter((id) => Number(id) !== tagId);

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/adminProdTag`,
        {
          productId: record.product_id,
          tags: updatedTags.join(","),
        }
      );

      if (response.data.tags) {
        // Update local state
        setProductArray((prevArray) =>
          prevArray.map((product) =>
            product.product_id === record.product_id
              ? { ...product, tag_cat: response.data.tags }
              : product
          )
        );
        setFilteredProductArray((prevArray) =>
          prevArray.map((product) =>
            product.product_id === record.product_id
              ? { ...product, tag_cat: response.data.tags }
              : product
          )
        );
      }
    } catch (error) {
      console.error("Error removing product tag:", error);
      // Handle error (e.g., show a notification to the user)
    }
  };
  // New function to handle toggling product status
  const handleToggleStatus = async (productId, checked) => {
    try {
      const newStatus = checked ? 1 : 0;
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/adminProducts`, {
        product_id: productId,
        prod_status: newStatus
      });
      if (response.data.success) {
        // Update local state
        const updatedProducts = productArray.map(product =>
          product.product_id === productId
            ? { ...product, prod_status: newStatus }
            : product
        );
        setProductArray(updatedProducts);
        setFilteredProductArray(updatedProducts);
      } else {
        console.error('Failed to update product status');
      }
    } catch (error) {
      console.error('Failed to update product status', error);
    }
  };

  const columns = [
    {
      title: "Index",
      key: "index",
      render: (text, record, index) => index + 1,
      fixed: "left",
    },
    {
      title: "Product ID",
      dataIndex: "product_id",
      key: "product_id",
      fixed: "left",
      hidden: true,
    },
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name",
      render: (text) => (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ),
    },
    {
      title: "SEO URL",
      dataIndex: "seo_url",
      key: "seo_url",
    },
    {
      title: "Category Name",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Arm Type",
      dataIndex: "armType",
      key: "armType",
    },
    {
      title: "Product Status",
      dataIndex: "prod_status",
      key: "prod_status",
      render: (status, record) => (
        <Switch
          checked={record.prod_status === 1}
          onChange={(checked) => handleToggleStatus(record.product_id, checked)}
        />
      ),
    },
    {
      title: "Image",
      dataIndex: "image_name",
      key: "image_name",
      render: (text) => {
        const images = text.split(",");
        return (
          <div style={{ display: "flex", gap: "5px" }}>
            {images.map((image, index) => (
              <Tooltip
                key={`image-${index}`}
                overlayInnerStyle={{ backgroundColor: "transparent" }}
                color="transparent"
                arrowPointAtCenter={false}
                title={
                  <div
                    style={{
                      width: "200px",
                      height: "300px",
                      position: "relative",
                    }}
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR
                        }${image.trim()}`}
                      alt={image}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                }
              >
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    position: "relative",
                  }}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR
                      }${image.trim()}`}
                    alt={image}
                    layout="fill"
                    objectFit="cover"
                    className="admin-product-img"
                  />
                </div>
              </Tooltip>
            ))}
          </div>
        );
      },
    },
    {
      title: "Tags",
      key: "tags",
      render: (text, record) => (
        <div>
          <Select
            mode="tags"
            style={{ width: 150, marginBottom: 8 }}
            placeholder="Select Tags"
            value={[]} // Always empty to prevent showing selected tags in dropdown
            onChange={(values) => handleTagChange(values, record)}
            onDeselect={(tagId) => handleTagRemove(tagId, record)}
          >
            {ProdTagsData.map((tag) => (
              <Select.Option key={tag.tag_id} value={tag.tag_id}>
                {tag.tag_name}
              </Select.Option>
            ))}
          </Select>
          <div>
            {record.tag_cat &&
              record.tag_cat.split(",").map((tagId) => {
                const tag = ProdTagsData.find(
                  (t) => t.tag_id === Number(tagId)
                );
                return tag ? (
                  <Tag
                    key={`${record.product_id}-${tag.tag_id}`}
                    closable
                    onClose={() => handleTagRemove(tag.tag_id, record)}
                    style={{ marginBottom: 4 }}
                  >
                    {tag.tag_name}
                  </Tag>
                ) : null;
              })}
          </div>
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      //   fixed: 'right',
      render: (text, record, index) => (
        <div className="d-flex justify-content-between gap-2">
          <Button
            onClick={() => handleOnclick("Edit", record.product_id)}
            color="primary"
            className="mr-2"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleOnclick("Delete", record.product_id)}
            color="danger"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Container fluid>
      <h1 className="my-4">National Plastic Products Table</h1>
      <Row className="mb-3 align-items-start justify-content-between">
        <Col xs={4} md={4} lg={2} className="mb-2 mb-md-0 col-12"></Col>
        <Col xs={4} md={4} lg={4} className="text-md-right col-12">
          <Input
            type="text"
            name="Product Name"
            id="search"
            placeholder="Search Product_name"
            value={searchText}
            onChange={handleSearch}
          />
        </Col>
        <Col className="col-2">
          <Link
            href="/admin/addProductForm"
            className="mx-auto btn btn-secondary"
          >
            Add New
          </Link>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={filteredProductArray.map((product) => ({
          ...product,
          key: product.product_id,
        }))}
        scroll={{ x: 1500 }}
      />
      <Modal isOpen={modalContent !== ""} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Image Name</ModalHeader>
        <ModalBody>{modalContent}</ModalBody>
      </Modal>
      <Modal isOpen={deleteModalOpen} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>Confirm Deletion</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this item? This action cannot be
          undone.
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
          <Button color="secondary" onClick={toggleDeleteModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <div className="d-flex justify-content-between flex-column flex-md-row align-items-center">
        <span>
          Showing 1 to {filteredProductArray.length} of{" "}
          {filteredProductArray.length} entries
        </span>
      </div>
    </Container>
  );
};

export default ProdList;
