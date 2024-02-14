import Image from 'next/image'
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import '../../styles/header.css';
import Link from 'next/link';
export default function Header() {
  return (
    <>
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
            <form className="d-flex nav-search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
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

                    <Link className="nav-link" href="/Investor" >
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
                  <Link className="nav-link" href="/Login">
                    <i className="fa fa-user"></i>
                  </Link>
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
    </>
  );
}
