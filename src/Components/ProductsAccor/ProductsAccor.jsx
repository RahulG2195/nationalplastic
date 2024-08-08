"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import axios from "axios";

const ProductsAccr = ({ handleShow }) => {
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [expanded, setExpanded] = useState(false);

  // Fetch categories and products data
  const fetchData = useCallback(async () => {
    try {
      const [productsRes, navRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/Products`),
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/NavCategory`),
      ]);
      setAllProducts(productsRes.data.products);
      setCategories(navRes.data.navshow);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOnClick = useCallback((productName) => {
    localStorage.setItem("productName", productName);
  }, []);

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
              <p className="fw-bold mobHeader">Products</p>
            </li>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            {categories.map((category, index) => (
              <Accordion
                expanded={expanded === `panel${index + 1}`}
                onChange={handleChange(`panel${index + 1}`)}
                key={category.category_id}
                style={{ backgroundColor: "#FFF" }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index + 1}bh-content`}
                  id={`panel${index + 1}bh-header`}
                >
                  <Typography className="fw-semibold fs-6">
                    {category.category_name}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                    {allProducts
                      .filter((product) => product.category_id === category.category_id)
                      .map((product) => (
                        <p key={product.product_name} className="border">
                          <Link
                            className="nav-link"
                            href={`/ProductDetail/${product.seo_url}`}
                            onClick={() => {
                              handleOnClick(product.product_name);
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
