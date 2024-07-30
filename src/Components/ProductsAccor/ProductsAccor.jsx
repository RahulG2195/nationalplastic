"use client";
import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import axios from "axios"; // Don't forget to import axios

const ProductsAccr = ({ handleShow }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/Products`);
        const allproducts = res.data.products;
        const categoryIds = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

        const categoryData = categoryIds.map((categoryId) => {
          return {
            categoryId: categoryId,
            category: getCategoryName(categoryId),
            products: allproducts.filter(
              (product) => product.category_id === categoryId
            ),
          };
        });

        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getCategoryName = (categoryId) => {
    // Implement your logic to get category names based on category ID
    // This is just a placeholder function
    switch (categoryId) {
      case 13:
        return "Premium Event Chairs";
      case 14:
        return "Without Arm Tents";
      case 15:
        return "Premium Chairs";
      case 16:
        return "Popular Chairs";
      case 17:
        return "Cabinet";
      case 18:
        return "Baby Chairs";
      case 19:
        return "Stool";
      case 20:
        return "Table";
      case 21:
        return "Box";
      case 22:
        return "Drawer";
      default:
        return "Unknown Category";
    }
  };

  const handleOnClick = (productName) => {
    localStorage.setItem("productName", productName);
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion className="prdctAccr" style={{ backgroundColor: "#FFFFFF" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel0-content`}
          id={`panel0-header`}
          className="px-2"

        >
          <Typography className="m-0 ">
            <li className="">
              <p className=" fw-bold mobHeader">Products</p>
            </li>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            {categories.map((categoryItem, index) => (
              <Accordion
                expanded={expanded === `panel${index + 1}`}
                onChange={handleChange(`panel${index + 1}`)}
                key={index}
                style={{ backgroundColor: "#FFF" }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index + 1}bh-content`}
                  id={`panel${index + 1}bh-header`}
                >
                  <Typography className="fw-semibold fs-6">
                    {categoryItem.category}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                    {categoryItem.products.map((product, subIndex) => (
                      <p key={subIndex}>
                        <Link
                          className="nav-link"
                          href={`/ProductDetail/${product.seo_url}`}
                          onClick={() => {
                            handleOnClick(product);
                            handleShow();
                          }}
                        >
                          {product.product_name}
                        </Link>
                      </p>
                    ))}
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ProductsAccr;
