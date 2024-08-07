'use client';
import React from "react";
import { Container } from "reactstrap";
import Sidebar from "./sidebars/vertical/page";
import Header from "./Header/page";
import "../../../styles/style.scss"
import "../../../styles/_variables.css"
import "../../../styles/layout/_sidebar.css";
import "../../../styles/layout/_container.css";
// import Header from "./header/Header";
// import Sidebar from "./sidebars/vertical/Sidebar";

const Admin = ({ children}) => {
  const [open, setOpen] = React.useState(false);
  const showMobilemenu = () => {
    setOpen(!open);
  };

  return (
    <main>
      <div className="pageWrapper d-md-block d-lg-flex">
        {/******** Sidebar **********/}
        <aside
          className={`sidebarArea shadow bg-white ${
            !open ? "" : "showSidebar"
          }`}
        >
          <Sidebar showMobilemenu={() => showMobilemenu()} />
        </aside>
        {/********Content Area**********/}

        <div className="contentArea">
          {/********header**********/}
          <Header showMobmenu={() => showMobilemenu()} />

          {/********Middle Content**********/}
          <Container className="p-4 wrapper" fluid>
            <div>{children}</div>
            {/* <Component {...pageProps} /> */}
          </Container>
        </div>
      </div>
    </main>
  );
};

export default Admin;
