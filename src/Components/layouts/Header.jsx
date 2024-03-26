"use client";
import Image from "next/image";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import "../../styles/header.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ProductsAccr from "../ProductsAccor/ProductsAccr";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useDispatch } from "react-redux";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [count, setCount] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch;
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
  console.log("AAAAAAAAAAAAAAAAAAAAA", isLoggedIn);

  useEffect(async () => {
    const userDataString = localStorage.getItem("userData");
    const userData = JSON.parse(userDataString);
    const customerId = userData.customer_id;

    const check = await axios.post("http://13.234.238.29:3000/api/UserCart", {
      customer_id: customerId,
    });
    if (
      check &&
      check.data &&
      check.data.products &&
      Array.isArray(check.data.products)
    ) {
      length = check.data.products.length;
      setCount(length);
    } else {
      length = 0;
    }
    // setCount(data);
  }, [dispatch]);

  const handleSearchChange = async (e) => {
    setSearchTerm(e.target.value);

    if (!searchTerm) {
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
    }
  };

  // Search Function
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setSearchResults([]);
    try {
      router.push(`/Search?query=${searchTerm}`);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  const handleShow = (e) => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <div className="container-fluid  header menbg">
        <TopBar />
        <nav className="navbar navbar-expand-lg main_header px-5">
          <div className="container-fluid ">
            <div className="navbar-brand">
              <Image
                src="/Assets/images/nation_logo.png"
                className="img-fluid"
                alt="Landscape picture"
                width={100}
                height={100}
              />
            </div>
            <form onSubmit={handleSearchSubmit} className="d-flex nav-search">
              <input
                className="form-control text-center HeadSearch fw-semibold"
                type="search"
                placeholder="Search 5000+ products"
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </form>

            <button
              onClick={handleShow}
              id="navei"
              className="navbar-toggler "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="true"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className={`${
                isClicked
                  ? " collapse navbar-collapse show menubg"
                  : "menuhide "
              }`}
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item brdr">
                  {/* <div className='border'></div> */}
                  <Link
                    className="nav-link"
                    aria-current="page"
                    href="/"
                    onClick={isClicked ? handleShow : null}
                  >
                    Home
                  </Link>
                  {/* <div className='border'></div> */}
                </li>
                <li className="nav-item brdr">
                  <Link
                    className="nav-link"
                    href="/About"
                    onClick={isClicked ? handleShow : null}
                  >
                    About Us
                  </Link>
                </li>
                <li className="nav-item brdr">
                  <Link
                    className="nav-link"
                    href="/Investor"
                    onClick={isClicked ? handleShow : null}
                  >
                    Investors
                  </Link>
                </li>
                <li className="nav-item brdr accr">
                  <ProductsAccr handleShow={handleShow} />
                </li>
                <li className="nav-item brdr">
                  <Link
                    className="nav-link"
                    href="/NewsAndMedia"
                    onClick={isClicked ? handleShow : null}
                  >
                    Media/News
                  </Link>
                </li>
                <li className="nav-item brdr">
                  <Link
                    className="nav-link"
                    href="/CSR"
                    onClick={isClicked ? handleShow : null}
                  >
                    CSR
                  </Link>
                </li>
                <li className="nav-item brdr">
                  <Link
                    className="nav-link bulk_ord px-4"
                    href="/BulkOrder"
                    onClick={isClicked ? handleShow : null}
                  >
                    Bulk Orders
                  </Link>
                </li>
                <li className="nav-item brdr ">
                  <Link
                    className="nav-link"
                    href="/ContactUs"
                    onClick={isClicked ? handleShow : null}
                  >
                    <img src="/Assets/svg/Path 2.svg" alt="" />
                  </Link>
                </li>
                <li className="nav-item brdr">
                  <Link
                    className="nav-link"
                    href="/Wishlist"
                    onClick={isClicked ? handleShow : null}
                  >
                    <img src="/Assets/svg/Path 3.svg" alt="" />
                  </Link>
                </li>
                <li className="nav-item brdr">
                  {isLoggedIn ? (
                    <Link
                      className="nav-link position-relative profile"
                      href="/ProfilePage"
                      onClick={isClicked ? handleShow : null}
                    >
                      <img src="/Assets/svg/Group 4.svg" alt="" />
                      <p className="Homeemail">{"data.email"}</p>
                    </Link>
                  ) : (
                    <Link
                      className="nav-link"
                      href="/Login"
                      onClick={isClicked ? handleShow : null}
                    >
                      <img src="/Assets/svg/Group 4.svg" alt="" />
                    </Link>
                  )}
                </li>
                <li className="nav-item brdr">
                  <Link
                    className="nav-link position-relative"
                    href="/AddToCart"
                    onClick={isClicked ? handleShow : null}
                  >
                    <img src="/Assets/svg/Group 5.svg" alt="" />
                    <div className="cartCount text-center medium">{count}</div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <BottomBar />
      </div>
    </>
  );
}
