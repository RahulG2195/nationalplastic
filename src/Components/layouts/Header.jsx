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
import ProductsAccr from "../ProductsAccor/ProductsAccor";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Navbar.module.css";
import InvestorAccor from "../InvesterAccor/InvesterAccor";
import dynamic from "next/dynamic";
import { PlaceholderBar } from "./Placeholder";
// const BottomBar = dynamic(() => import('./BottomBar'), {
//   loading: () => <PlaceholderBar />,
//   ssr: false // If BottomBar uses browser-only features
// })
import { useDelayedRender } from "@/utils/useDelayedRender";

export default function Header() {
  const shouldRenderBottomBar = useDelayedRender(2000);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [subDropdown, setSubDropdown] = useState(false);

  const [windowSize, setWindowSize] = useState({
    width: undefined,
  });
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [InitialName, setInitialName] = useState("");
  const [hideLayout, setHideLayout] = useState(false);
  // const [count, setCount] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch;
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
  // const counts = useSelector((state) => state.cart || 0);
  // const [count, setCount] = useState(0);
  function check() {}
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

  // get user data to show initial name after login
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const formData = {
          email: userEmail,
          getProfile: true,
        };

        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_BASE_URL}/Users`,
          formData
        );

        const userData = response.data.message[0];
        const { FirstName, LasttName } = userData;
        setFirstName(FirstName);
        setLastName(LasttName);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userEmail]);

  useEffect(() => {
    if (FirstName && LastName) {
      setInitialName(FirstName[0].toUpperCase() + LastName[0].toUpperCase());
    } else {
      setInitialName("N" + "P");
    }
  }, [FirstName, LastName]);

  useEffect(() => {
    const checkHeader = async () => {
      if (router.asPath) {
        const res = await fetch(router.asPath, { method: "HEAD" });
        const isAdmin = res.headers.get("x-admin-access") === "true";
        setHideLayout(isAdmin);
      }
    };
    checkHeader();
  }, [router]);

  // useEffect(async () => {
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
      router.push(`/search/${searchTerm}`);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  const handleShow = (e) => {
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
      });
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { width } = windowSize;

  return (
    <div>
      {!hideLayout ? (
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
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                  </button>
                  <Link href="/">
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
                    placeholder="Search products"
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
                        onClick={isClicked ? handleShow : null}>
                        Home
                      </Link>
                      {/* <div className='border'></div> */}
                    </li>

                    {/* <li className="nav-item brdr">
                      <Link
                        className="nav-link"
                        href="/About"
                        onClick={isClicked ? handleShow : null}
                      >
                        About Us
                      </Link>
                    </li> */}

                    <li
                      className={`nav-item brdr ${styles.navItem}`}
                      onMouseEnter={() => setAboutDropdown(true)}
                      onMouseLeave={() => setAboutDropdown(false)}>
                      <Link
                        className="nav-link"
                        href="/About"
                        onClick={isClicked ? handleShow : null}>
                        About Us
                      </Link>
                      {aboutDropdown && (
                        <ul className={styles.dropdown}>
                          <li className={styles.dropdownItem}>
                            <Link
                              href="/Companyprofile"
                              onClick={isClicked ? handleShow : null}>
                              Company Profile
                            </Link>
                          </li>
                          <li className={styles.dropdownItem}>
                            <Link
                              href="/Infrastructure"
                              onClick={isClicked ? handleShow : null}>
                              Infrastructure
                            </Link>
                          </li>
                          <li className={styles.dropdownItem}>
                            <Link
                               href="#managementBoardCommittees" 
                              onClick={isClicked ? handleShow : null}>
                              Promoters/Directors
                            </Link>
                          </li>

                          <li className={styles.dropdownItem}>
                            <Link
                              href="/Management" 
                              onClick={isClicked ? handleShow : null}>
                              Management and Board Committees
                            </Link>
                          </li>

                          <li className={styles.dropdownItem}>
                            <Link
                              href="/Awards"
                              onClick={isClicked ? handleShow : null}>
                              Awards/Exports
                            </Link>
                          </li>

                          {/* <li className={styles.dropdownItem}>
                            <Link
                              href="#"
                              onClick={isClicked ? handleShow : null}>
                              Introduction
                            </Link>
                          </li> */}

                          <li className={styles.dropdownItem}>
                            <Link
                              href="/Term"
                              onClick={isClicked ? handleShow : null}>
                              Terms & Conditions
                            </Link>
                          </li>
                        </ul>
                      )}
                    </li>
                    {
                      (width <= 991) ? <InvestorAccor handleShow={handleShow} />
                        :
                        <li className={`nav-item brdr ${styles.navItem}`}
                          onMouseEnter={() => setDropdown(true)}
                          onMouseLeave={() => setDropdown(false)}
                        >

                          <Link
                            className="nav-link multidropdown mobHeader"
                            href="#"
                            onClick={isClicked ? handleShow : null}
                          >
                            Investors (Reg. 46)
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
                                      <Link href="/Unaudited" onClick={isClicked ? handleShow : null}>Unaudited Financial Results</Link>
                                    </li>
                                    <li className={styles.subDropdownItem}>
                                      <Link href="/Audited" onClick={isClicked ? handleShow : null}>Audited Financial Results</Link>
                                    </li>
                                    <li className={styles.subDropdownItem}>
                                      <Link href="/Annual" onClick={isClicked ? handleShow : null}>Annual Report</Link>
                                    </li>
                                    <li className={styles.subDropdownItem}>
                                      <Link href="AnnualReturn" onClick={isClicked ? handleShow : null}>Annual Return</Link>
                                    </li>

                                  </ul>
                                )}
                              </li>
                              <li className={styles.dropdownItem}>
                                <Link href="/ShareHolding" onClick={isClicked ? handleShow : null}>Shareholding Pattern</Link>
                              </li>
                              <li className={styles.dropdownItem}>
                                <Link href="/Corporate" onClick={isClicked ? handleShow : null}>Corporate Governance</Link>
                              </li>
                              <li className={styles.dropdownItem}>
                                <Link href="/InvestorContact" onClick={isClicked ? handleShow : null}>Investor Contact</Link>
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
                                      <Link href="/OutcomeAGM" onClick={isClicked ? handleShow : null}>Outcome of AGM</Link>
                                    </li>
                                    <li className={styles.subDropdownItem}>
                                      <Link href="/Notice" onClick={isClicked ? handleShow : null}>Notices</Link>
                                    </li>
                                  </ul>
                                )}
                              </li>
                              <li className={styles.dropdownItem}>
                                <Link href="/TransferShare" onClick={isClicked ? handleShow : null}>Transfer Of Share Notice</Link>
                              </li>
                              <li className={styles.dropdownItem}>
                                <Link href="/OutcomeMeet" onClick={isClicked ? handleShow : null}>Outcome Of Board Meeting</Link>
                              </li>
                              <li className={styles.dropdownItem}>
                                <Link href="/Disclosure" onClick={isClicked ? handleShow : null}>Listing Disclosure</Link>
                              </li>
                              <li className={styles.dropdownItem}>
                                <Link href="/Transaction" onClick={isClicked ? handleShow : null}>Related Party Transaction</Link>
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
                                      <Link href="/Twenty" onClick={isClicked ? handleShow : null}>2020</Link>
                                    </li>
                                    <li className={styles.subDropdownItem}>
                                      <Link href="/TwentyOne" onClick={isClicked ? handleShow : null}>2021</Link>
                                    </li>
                                    <li className={styles.subDropdownItem}>
                                      <Link href="/TwentyTwo" onClick={isClicked ? handleShow : null}>2022</Link>
                                    </li>
                                    <li className={styles.subDropdownItem}>
                                      <Link href="/TwentyThree" onClick={isClicked ? handleShow : null}>2023</Link>
                                    </li>
                                    <li className={styles.subDropdownItem}>
                                      <Link href="/TwentyFour" onClick={isClicked ? handleShow : null}>2024</Link>
                                    </li>
                                  </ul>
                                )}
                              </li>
                              <li className={styles.dropdownItem}>
                                <Link href="/InvestorKYC" onClick={isClicked ? handleShow : null}>Investor KYC</Link>
                              </li>
                              <li className={styles.dropdownItem}>
                                <Link href="/IEPF" onClick={isClicked ? handleShow : null}>IEPF</Link>
                              </li>
                              <li className={styles.dropdownItem}>
                                <Link href="/Advertisements" onClick={isClicked ? handleShow : null}>Advertisements</Link>
                              </li>
                            </ul>
                          )}
                        </li>
                    }

                    <li className="nav-item brdr accr ">
                      <ProductsAccr handleShow={handleShow} />
                    </li>
                    <li className="nav-item brdr">
                      <Link
                        className="nav-link"
                        href="/NewsAndMedia"
                        onClick={isClicked ? handleShow : null}>
                        Media/News
                      </Link>
                    </li>
                    <li className="nav-item brdr">
                      <Link
                        className="nav-link"
                        href="/CSR"
                        onClick={isClicked ? handleShow : null}>
                        CSR
                      </Link>
                    </li>
                    <li className="nav-item brdr bulk_ord px-3">
                      {/* <a href="tel:+912267669922">
                        <Image
                          height={48}
                          width={23}
                          layout="responsive"
                          objectFit="contain"
                          src="/Assets/svg/Path 2.svg"
                          alt="location"
                        />
                      </a> */}
                      <Link
                        className="nav-link mx-1"
                        href="/BulkOrder"
                        onClick={isClicked ? handleShow : null}>
                        Bulk Orders
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="row">
                  <ul className=" d-flex alin-items-center gap-3 side-icons">
                    <li className="nav-item brdr d-none d-md-none d-xl-block">
                      <Link
                        className="nav-link"
                        href="tel:+912267669922"
                        target="_blank"
                        onClick={isClicked ? handleShow : null}
                      >
                        <Image
                          height={100}
                          width={100}
                          layout="responsive"
                          objectFit="contain"
                          src="/Assets/images/image.png"
                          alt="whatsapp icon"
                        />
                        {/* <i class="fa fa-whatsapp fs-2 text-black " aria-hidden="true"></i> */}

                      </Link>
                    </li>
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
                        onClick={isClicked ? handleShow : null}>
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
                          onClick={isClicked ? handleShow : null}>
                          <span className="InitialName">{InitialName}</span>
                          {/* <Image
                        height={100}
                        width={100}
                        layout="responsive"
                        objectFit="contain"
                        src="/Assets/svg/Group 4.svg"
                        alt="location"
                      />
                      <p className="Homeemail">{userEmail}</p> */}
                        </Link>
                      ) : (
                        <Link
                          className="nav-link"
                          href="/Login"
                          onClick={isClicked ? handleShow : null}>
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
                        onClick={isClicked ? handleShow : null}>
                        <Image
                          height={100}
                          width={100}
                          layout="responsive"
                          objectFit="contain"
                          src="/Assets/svg/Group 5.svg"
                          alt="counter"
                        />
                        <div className="cartCount text-center medium">
                          {count}
                        </div>
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
                      <Link href="/">
                        <Image
                          src="/Assets/images/nation_logo.png"
                          className="Image-fluid"
                          alt="Landscape picture"
                          height={34}
                          width={52}
                        // layout="responsive"
                        // objectFit="contain"
                        />
                      </Link>
                    </li>
                    <li>
                      {isLoggedIn ? (
                        <Link href="/ProfilePage">
                          <span className="InitialName">{InitialName}</span>
                          {/* <Image
                        src="/Assets/svg/Group 4.svg"
                        height={50}
                        width={50}
                        layout="responsive"
                        objectFit="contain"
                        alt="Profile"
                        className="footer-icon"
                      />
                      <p className="Homeemail">{userEmail}</p> */}
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
                        <div className="cartCount text-center medium">
                          {count}
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            {shouldRenderBottomBar ? <BottomBar /> : <PlaceholderBar />}
          </div>
        </>
      ) : null}
    </div>
  );
}
