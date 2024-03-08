"use client";
import Image from "next/image";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import "../../styles/header.css";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // const [suggestions, setSuggestions] = useState([]);
  // console.log("suggestions are here ", suggestions)
  console.log("here is searched result", searchResults);

  // console.log("here is result ", searchResults)
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
  const handleSearchChange = async (e) => {
    setSearchTerm(e.target.value);

    if (!searchTerm) {
      // setSuggestions([]);
      setSearchResults([]);
      return;
    }
    try {
      // const response = await axios.get(`/api/search?query=${searchTerm}`);
      // setSuggestions(response.data.products);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      // setIsLoading(false);
      // Set loading state to false regardless of success or error
    }
  };

  // Search Function
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setSearchResults([]); // Clear search results before fetching new results
    try {
      const response = await axios.get(
        `http://localhost:3000/api/search?query=${searchTerm}`
      );
      setSearchResults(response.data.products);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  //

  return (
    <>
      {/* {searchResults.map((product) => (
        <div key={product.id}>
          <p>{product.product_name}</p>
          Add other product details here
        </div>
      ))} */}
      <div className="container-fluid header">
        <TopBar />
        <nav className="navbar navbar-expand-lg main_header">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <Image
                src="/Assets/images/nation_logo.png"
                className="img-fluid"
                alt="Landscape picture"
                width={800}
                height={500}
              />
            </a>
            <form onSubmit={handleSearchSubmit} className="d-flex nav-search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </form>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" href="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/About">
                    About Us
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  {/* <a 
                    className="nav-link dropdown-toggle"
                    href="/Investor"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  /> */}
                  <Link className="nav-link" href="/Investor">
                    Investors
                  </Link>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/NewsAndMedia">
                    Media/News
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/CSR">
                    CSR
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link bulk_ord" href="/BulkOrder">
                    Bulk Orders
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/ContactUs">
                    <i className="fa fa-phone"></i>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/Wishlist">
                    <i className="fa fa-heart-o"></i>
                  </Link>
                </li>
                <li className="nav-item">
                  {isLoggedIn ? (
                    <Link className="nav-link" href="/ProfilePage">
                      <i className="">Profile</i>
                    </Link>
                  ) : (
                    <Link className="nav-link" href="/Login">
                      <i className="fa fa-user"></i>
                    </Link> 
                  )}
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/AddToCart">
                    <i className="fa fa-cart-arrow-down"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <BottomBar />
      </div>
      {/* Conditionally render search results only if they exist and search term is not empty */}
      {/* {searchResults.length > 0 && !!searchTerm && (
        <div id="suggestions-list">
          <ul>
            {searchResults.map((product) => (
              <li className="text-danger" key={product.id}>
                {product.product_name}
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </>
  );
}