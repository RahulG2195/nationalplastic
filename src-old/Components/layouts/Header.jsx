import Image from 'next/image'
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import '../../styles/header.css';

export default function Header() {
  return (
    <>
      <div className="container-fluid header">
        <TopBar />
        <nav className="navbar navbar-expand-lg main_header">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <Image
                src="/assets/images/nation_logo.png"
                className="img-fluid"
                alt="Landscape picture"
                width={800}
                height={500}
              />
            </a>
            <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                {/* <button className="btn btn-outline-success" type="submit">
                  Search
                </button> */}
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
                  <a className="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                   About Us
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Investors
                  </a>
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
                  <a className="nav-link" href="#">
                  Media/News
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                  CSR
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link bulk_ord" href="#">
                  Bulk Orders
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                  <i className="fa fa-phone"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                  <i className="fa fa-heart-o"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                  <i className="fa fa-user"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                  <i className="fa fa-cart-arrow-down"></i>
                  </a>
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
