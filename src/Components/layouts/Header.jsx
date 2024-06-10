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
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Navbar.module.css";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [subDropdown, setSubDropdown] = useState(false);
  // const [count, setCount] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch;
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
  // const counts = useSelector((state) => state.cart || 0);
  // const [count, setCount] = useState(0);
  function check() { }
  const userState = useSelector((state) => state.userData.isLoggedIn);
  const userEmail = useSelector((state) => state.userData.email);

  const productCount = useSelector((state) => {

    let who;

    if (!userState) {
      who = "temp";
    } else {
      who = "cart";
    }
    const cart = state[who] || {};
    // return cart.products?.reduce((acc, product) => acc + product.quantity, 0);
    return cart.products?.length || 0;
  });

  // Use useState to manage local product count and update function
  const [count, setCount] = useState(productCount); // Initialize with initial value

  // Use useEffect to keep local count in sync with Redux state
  useEffect(() => {
    setCount(productCount); // Update localCount whenever productCount changes
  }, [productCount]);

  // useEffect(async () => {
  //   const userDataString = localStorage.getItem("userData");
  //   const userData = JSON.parse(userDataString) || {};
  //   const customerId = userData.customer_id || {};

  //   const check = await axios.post("/api/UserCart", {
  //     customer_id: customerId,
  //   });
  //   if (
  //     check &&
  //     check.data &&
  //     check.data.products &&
  //     Array.isArray(check.data.products)
  //   ) {
  //     length = check.data.products.length;
  //     setCount(length);
  //   } else {
  //     length = 0;
  //   }
  //   // setCount(data);
  // }, [dispatch]);

  const handleSearchChange = async (e) => {
    setSearchTerm(e.target.value);

    if (!searchTerm) {
      setSearchResults([]);
      return;
    }
    try {
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
      const searchTerm2 = e.target.querySelector(".HeadSearch").value;
      // console.log("searchTerm2", searchTerm2);
      // console.log("header", searchTerm);

      router.push(`/search/${searchTerm}`);
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
        <nav className="navbar navbar-expand-lg main_header px-3">
          <div className="container-fluid ">
            <div className="navbar-brand">
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
              <Link href="/#/">
                <Image
                  src="/Assets/images/nation_logo.png"
                  className="Image-fluid"
                  alt="Landscape picture"
                  height={100}
                  width={100}
                  layout="responsive"
                  objectFit="contain"
                />
              </Link>
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

            <div
              className={`${isClicked
                ? " collapse navbar-collapse show menubg"
                : "menuhide "
                }`}
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav homeNav mb-2 mb-lg-0">
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
                <li className={`nav-item brdr ${styles.navItem}`}
                  onMouseEnter={() => setDropdown(true)}
                  onMouseLeave={() => setDropdown(false)}
                >
                  <Link
                    className="nav-link multidropdown"
                    href="!#"
                    onClick={isClicked ? handleShow : null}
                  >
                    Investors
                  </Link>
                  {dropdown && (
                    <ul className={styles.dropdown}>
                      <li
                        className={styles.dropdownItem}
                        onMouseEnter={() => setSubDropdown(true)}
                        onMouseLeave={() => setSubDropdown(false)}
                      >
                        <Link href="#">Financials</Link>
                        {subDropdown && (
                          <ul className={styles.subDropdown}>
                            <li className={styles.subDropdownItem}>
                              <Link href="/Unaudited">Unaudited Financial Results</Link>
                            </li>
                            <li className={styles.subDropdownItem}>
                              <Link href="/Audited">Audited Financial Results</Link>
                            </li>
                            <li className={styles.subDropdownItem}>
                              <Link href="/Annual">Annual Report</Link>
                            </li>
                            <li className={styles.subDropdownItem}>
                              <Link href="AnnualReturn">Annual Return</Link>
                            </li>

                          </ul>
                        )}
                      </li>
                      <li className={styles.dropdownItem}>
                        <Link href="/ShareHolding">Shareholding Pattern</Link>
                      </li>
                      <li className={styles.dropdownItem}>
                        <Link href="/Corporate">Corporate Governance</Link>
                      </li>
                      <li className={styles.dropdownItem}>
                        <Link href="/InvestorContact">Investor Contact</Link>
                      </li>
                      <li
                        className={styles.dropdownItem}
                        onMouseEnter={() => setSubDropdown(true)}
                        onMouseLeave={() => setSubDropdown(false)}
                      >
                        <a href="#">AGM Compliance </a>
                        {subDropdown && (
                          <ul className={styles.subDropdown}>
                            <li className={styles.subDropdownItem}>
                              <Link href="/OutcomeAGM">Outcome of AGM</Link>
                            </li>
                            <li className={styles.subDropdownItem}>
                              <Link href="/Notice">Notices</Link>
                            </li>
                          </ul>
                        )}
                      </li>
                      <li className={styles.dropdownItem}>
                        <Link href="/TransferShare">Transfer Of Share Notice</Link>
                      </li>
                      <li className={styles.dropdownItem}>
                        <Link href="/OutcomeMeet">Outcome Of Board Meeting</Link>
                      </li>
                      <li className={styles.dropdownItem}>
                        <Link href="/Disclosure">Listing Disclosure</Link>
                      </li>
                      <li className={styles.dropdownItem}>
                        <Link href="/Transaction">Related Party Transaction</Link>
                      </li>
                      <li
                        className={styles.dropdownItem}
                        onMouseEnter={() => setSubDropdown(true)}
                        onMouseLeave={() => setSubDropdown(false)}
                      >
                        <a href="#" className="dropArrow">General Disclosure</a>
                        {subDropdown && (
                          <ul className={styles.subDropdown}>
                            <li className={styles.subDropdownItem}>
                              <Link href="/Twenty">2020</Link>
                            </li>
                            <li className={styles.subDropdownItem}>
                              <Link href="/TwentyOne">2021</Link>
                            </li>
                            <li className={styles.subDropdownItem}>
                              <Link href="/TwentyTwo">2022</Link>
                            </li>
                            <li className={styles.subDropdownItem}>
                              <Link href="/TwentyThree">2023</Link>
                            </li>
                            <li className={styles.subDropdownItem}>
                              <Link href="/TwentyFour">2024</Link>
                            </li>
                          </ul>
                        )}
                      </li>
                      <li className={styles.dropdownItem}>
                        <Link href="/InvestorKYC">Investor KYC</Link>
                      </li>
                      <li className={styles.dropdownItem}>
                        <Link href="/IEPF">IEPF</Link>
                      </li>
                      <li className={styles.dropdownItem}>
                        <Link href="/Advertisements">Advertisements</Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li className="nav-item brdr accr ">
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
              </ul>
            </div>

            <div className="row">
              <ul class=" d-flex side-icons">
                <li className="nav-item brdr d-none d-md-none d-xl-block">
                  <Link
                    className="nav-link"
                    href="/ContactUs"
                    onClick={isClicked ? handleShow : null}
                  >
                    <Image
                      height={100}
                      width={100}
                      layout="responsive"
                      objectFit="contain"
                      src="/Assets/svg/Path 2.svg"
                      alt="location"
                    />
                  </Link>
                </li>
                <li className="nav-item brdr d-none d-md-none d-xl-block">
                  <Link
                    className="nav-link"
                    href="/Wishlist"
                    onClick={isClicked ? handleShow : null}
                  >
                    <Image
                      height={100}
                      width={100}
                      layout="responsive"
                      objectFit="contain"
                      src="/Assets/svg/Path 3.svg"
                      alt="location"
                    />
                  </Link>
                </li>
                <li className="nav-item brdr d-none d-md-none d-xl-block">
                  {isLoggedIn ? (
                    <Link
                      className="nav-link position-relative profile"
                      href="/ProfilePage"
                      onClick={isClicked ? handleShow : null}
                    >
                      <Image
                        height={100}
                        width={100}
                        layout="responsive"
                        objectFit="contain"
                        src="/Assets/svg/Group 4.svg"
                        alt="location"
                      />
                      <p className="Homeemail">{userEmail}</p>
                    </Link>
                  ) : (
                    <Link
                      className="nav-link"
                      href="/Login"
                      onClick={isClicked ? handleShow : null}
                    >
                      <Image
                        height={100}
                        width={100}
                        layout="responsive"
                        objectFit="contain"
                        src="/Assets/svg/Group 4.svg"
                        alt="group"
                      />
                    </Link>
                  )}
                </li>
                <li className="nav-item brdr d-none d-md-block d-xl-block">
                  <Link
                    className="nav-link AddToCartNav-link  position-relative"
                    href="/AddToCart"
                    onClick={isClicked ? handleShow : null}
                  >
                    <Image
                      height={100}
                      width={100}
                      layout="responsive"
                      objectFit="contain"
                      src="/Assets/svg/Group 5.svg"
                      alt="counter"
                    />
                    <div className="cartCount text-center medium">{count}</div>
                  </Link>
                </li>
              </ul>
            </div>

            {/* footer menu */}
            <div className="lower-mobile-menu">
              <ul className="list-unstyled">
                <li>
                  <Link href="/#">
                    <Image
                      src="Assets/images/home-icon-silhouette_69524.svg"
                      height={50}
                      width={50}
                      layout="responsive"
                      objectFit="contain"
                      alt="Home"
                      className="footer-icon"
                    />
                  </Link>
                </li>
                <li>
                  <Link href="/Wishlist">
                    <Image
                      src="/Assets/svg/Path 3.svg"
                      height={50}
                      width={50}
                      layout="responsive"
                      objectFit="contain"
                      alt="Wishlist"
                      className="footer-icon"
                    />
                  </Link>
                </li>
                <li>
                  {isLoggedIn ? (
                    <Link href="/ProfilePage">
                      <Image
                        src="/Assets/svg/Group 4.svg"
                        height={50}
                        width={50}
                        layout="responsive"
                        objectFit="contain"
                        alt="Profile"
                        className="footer-icon"
                      />
                      <p className="Homeemail">{userEmail}</p>
                    </Link>
                  ) : (
                    <Link href="/Login">
                      <Image
                        src="/Assets/svg/Group 4.svg"
                        height={50}
                        width={50}
                        layout="responsive"
                        objectFit="contain"
                        alt="Profile"
                        className="footer-icon"
                      />
                    </Link>
                  )}
                </li>
                <li>
                  <Link href="/AddToCart">
                    <Image
                      src="/Assets/svg/Group 5.svg"
                      height={50}
                      width={50}
                      layout="responsive"
                      objectFit="contain"
                      alt="Cart"
                      className="footer-icon"
                    />
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
