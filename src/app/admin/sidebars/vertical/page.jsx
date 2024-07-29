'use client';
import { Button, Nav, NavItem } from "reactstrap";
// import Logo from "../../../../../public/assets/images/logo/logo_alt.png";
import Link from "next/link";
import { useRouter } from "next/navigation";

const navigation = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Basic Info",
    href: "/admin/basicInfo",
    icon: "bi bi-speedometer2",
  },
  {
    type: "accordion",
    title: "Home Page",
    items: [
      {
        title: "Hero Section",
        href: "/admin/homepage/herosection",
      },
      {
        title: "Cards Section",
        href: "/admin/homepage/cards",
      },
      {
        title: "Offer Banner",
        href: "/admin/homepage/offersection",
      },
      {
        title: "house section",
        href: "/admin/homepage/house section",
      },
    ],
    icon: "bi bi-hdd-stack",
  },
  {
    type: "accordion",
    title: "Investors Pages",
    items: [
      {
        title: "General Disclosure",
        href: "/admin/Investor/General",
      },
      {
        title: "Financial",
        href: "/admin/Investor/Finance",
      },
      {
        title: "AGM Compliances",
        href: "/admin/Investor/AGM",
      },
      {
        title: "house section",
        href: "/admin/homepage/house section",
      },
      {
        title: "house section",
        href: "/admin/homepage/house section",
      },
      {
        title: "Advertisements",
        href: "/admin/Investor/Advertisements",
      },
    ],
    icon: "bi bi-hdd-stack",
  },
  {
    type: "accordion",
    title: "About us",
    items: [
      {
        title: "CompanyProfile Section",
        href: "/admin/aboutus/company",
      },
      {
        title: "Commite and Management Section",
        href: "/admin/aboutus/committee",
      },
      {
        title: "Infrastructure",
        href: "/admin/aboutus/infrastructure",
      },
      {
        title: "Awards",
        href: "/admin/aboutus/awards",
      },
      {
        title: "Promotors",
        href: "/admin/aboutus/promotors",
      },
    ],
    icon: "bi bi-hdd-stack",
  },
  {
    title: "Products",
    href: "/admin/product",
    icon: "bi bi-p-square",
  },
  {
    title: "category",
    href: "/admin/category",
    icon: "bi bi-c-square",
  },
  {
    title: "Coupon Code",
    href: "/admin/CouponList",
    icon: "bi bi-patch-check",
  },
  {
    title: "Order List",
    href: "/admin/OrderList",
    icon: "bi bi-card-text",
  },
  {
    title: "News and Media ", //news and media page of NP
    href: "/admin/newsMedia",
    icon: "bi bi-layout-split",
  },
  {
    type: "accordion",
    title: "News and Media",
    items: [
      {
        title: "edit Hero banner",
        href: "/admin/newsMedia/heroBanner",
      },
      {
        title: "edit content",
        href: "/admin/newsMedia",
      },
    
    ],
    icon: "bi bi-hdd-stack",
  },
  {
    type: "accordion",
    title: "CSR",
    items: [
      {
        title: "edit Hero banner",
        href: "/admin/csr/heroBanner",
      },
      {
        title: "edit content",
        href: "/admin/csr",
      },
    
    ],
    icon: "bi bi-hdd-stack",
  },
  {
    type: "accordion",
    title: "Bulk Order",
    items: [
      {
        title: "edit Hero banner",
        href: "/admin/bulkOrder/heroBanner",
      }
    
    ],
    icon: "bi bi-hdd-stack",
  },

  {
    title: "Table",
    href: "/ui/tables",
    icon: "bi bi-layout-split",
  },
];

const Sidebar = ({ showMobilemenu }) => {
  let curl = useRouter();
  const location = curl.pathname;

  return (
    <div className="p-3">
      <div className="d-flex align-items-center" style={{ justifyContent:"center"}}>
        <img src="/Assets/images/nation_logo.png" alt="REMO" />
        <div className="ms-auto d-lg-none"> 
          <Button
            close
            size="sm"
            className="ms-auto d-lg-none"
            onClick={showMobilemenu}
          ></Button>
        </div>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => {
            if (navi.type === "accordion") {
              return (
                <div className="accordion accordion-flush" id={`accordionFlushExample${index}`} key={index}>
                  <div className="accordion-item">
                    <div
                      className="accordion-button collapsed p-3"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#flush-collapse${index}`}
                      aria-expanded="false"
                      aria-controls={`flush-collapse${index}`}
                    >
                      <i className={navi.icon}></i>
                      <span className="ms-3 d-inline-block">{navi.title}</span>
                    </div>
                    <ul
                      id={`flush-collapse${index}`}
                      className="accordion-collapse collapse"
                      aria-labelledby={`flush-heading${index}`}
                      data-bs-parent={`#accordionFlushExample${index}`}
                    >
                      {navi.items.map((item, subIndex) => (
                        <li className="nav-item" key={subIndex}>
                          <Link href={item.href} className="nav-link">
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            }
            return (
              <NavItem key={index} className="sidenav-bg">
                <Link href={navi.href} className={
                  location === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }>
                  <i className={navi.icon}></i>
                  <span className="ms-3 d-inline-block">{navi.title}</span>
                </Link>
              </NavItem>
            );
          })}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;