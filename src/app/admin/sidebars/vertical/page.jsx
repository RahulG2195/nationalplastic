'use client';
import { Button, Nav, NavItem } from "reactstrap";
// import Logo from "../../../../../public/assets/images/logo/logo_alt.png";
import Link from "next/link";
import { useRouter } from "next/navigation";

const navigation = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: "bi bi-clipboard-data",
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
        title: "Youtube Section",
        href: "/admin/homepage/youtubeSection",
      },
      {
        title: "Basic Info",
        href: "/admin/basicInfo",
      },
    ],
    icon: "bi bi-hdd-stack",
  },
  {
    type: "accordion",
    title: "Investors Pages",
    items: [
      {
        title: "Shareholdings",
        href: "/admin/Investor/Shareholding",
      },
      {
        title: "Corporate Policies & Compliance",
        href: "/admin/Investor/CorporateReport",
      },
      {
        title: "Corporate Quarterly  Compliance Report",
        href: "/admin/Investor/CorporateGov",
      },

      {
        title: "General Disclosure",
        href: "/admin/Investor/General",
      },
      {
        title: "Transfer Of Shares",
        href: "/admin/Investor/Transfer",
      },
      {
        title: "Investor contact",
        href: "/admin/Investor/investorContact",
      },
      {
        title: "Investors KYC",
        href: "/admin/Investor/investorKYC",
      },
      {
        title: "Outcome of board meet",
        href: "/admin/Investor/outcomes",
      },
      {
        title: "Related Party Transactions",
        href: "/admin/Investor/Transaction",
      },
      {
        title: "Listing Disclousures",
        href: "/admin/Investor/Disclousures",
      },
      {
        title: "Advertisements",
        href: "/admin/Investor/Advertisements",
      },
      {
        title: "IEPF",
        href: "/admin/Investor/IEPF",
      },

    ],
    icon: "bi bi-bank",
  },
  {
    type: "accordion",
    title: "Financial",
    items: [
      {
        title: "Unaudited",
        href: "/admin/Investor/Finance/Unaudited",
      },
      {
        title: "Audited",
        href: "/admin/Investor/Finance/Audited",
      },
      {
        title: "Annual Report & Returns",
        href: "/admin/Investor/Finance/AnnualReport",
      },
    ],
    icon: "bi bi-bank2",
  },
  {
    type: "accordion",
    title: "AGM Compilance",
    items: [
      {
        title: "Outcome Of Agm",
        href: "/admin/Investor/OutcomeAGMcms",
      },
      {
        title: "Notice",
        href: "/admin/Investor/Notice",
      },
    ],
    icon: "bi bi-bank2",
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
    icon: "bi bi-file-person",
  },
  {
    type: "accordion",
    title: "News and Media",
    items: [
      {
        title: "Editing Newsmedia Hero banner",
        href: "/admin/newsMedia/heroBanner",
      },
      {
        title: "Edit content",
        href: "/admin/newsMedia",
      },

    ],
    icon: "bi bi-newspaper",
  },
  {
    type: "accordion",
    title: "CSR",
    items: [
      {
        title: "Editing CSR Hero banner",
        href: "/admin/csr/heroBanner",
      },
      {
        title: "EDiting CSR content",
        href: "/admin/csr",
      },

    ],
    icon: "bi bi-globe",
  },
  {
    type: "accordion",
    title: "Career",
    items: [
      {
        title: "Career Hero banner",
        href: "/admin/career/heroBanner",
      },
      {
        title: "hiring process",
        href: "/admin/career/hiringProces",
      },
      {
        title: "Jobs",
        href: "/admin/career/jobs",
      },

    ],
    icon: "bi bi-briefcase",
  },
  {
    type: "accordion",
    title: "Catalogue",
    items: [
      {
        title: "Catalogue Hero banner",
        href: "/admin/catalogue/heroBanner",
      },
      {
        title: "brochures",
        href: "/admin/catalogue/brochures",
      },

    ],
    icon: "bi bi-ui-checks-grid",
  },
  {
    type: "accordion",
    title: "Products and Categories",
    items: [
      {
        title: "Products",
        href: "/admin/product",
      },
      {
        title: "category",
        href: "/admin/category",
      },
      {
        title: "Tag",
        href: "/admin/tag",
      },
      {
        title: "Order List",
        href: "/admin/OrderList",
      },
      {
        title: "Coupon Code",
        href: "/admin/CouponList",
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
    icon: "bi bi-p-square",
  },
  {
    type: "accordion",
    title: "website Data",
    items: [
      {
        title: "User  List",
        href: "/admin/userData",
      },
      {
        title: "NL subscribers",
        href: "/admin/newsletterCMS",
      },
      {
        title: "Newsletter data ..",
        href: "/admin/newsletterCMS",
      },
      {
        title: "Reviews List",
        href: "/admin/reviews",
      },
      {
        title: "F A Q",
        href: "/admin/faqs",
      },
      {
        title: "Policies",
        href: "/admin/TermsandconditionCMS",
      },
    ],
    icon: "bi bi-database",
  },
  {
    title: "Bulk Order Banner",
    href: "/admin/bulkOrder/heroBanner",
    icon: "bi bi-basket3",
  },
];

const Sidebar = ({ showMobilemenu }) => {
  let curl = useRouter();
  const location = curl.pathname;

  return (
    <div className="p-3">
      <div className="d-flex align-items-center" style={{ justifyContent: "center" }}>
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



