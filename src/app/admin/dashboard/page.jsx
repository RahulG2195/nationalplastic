'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import {
  Navbar,
  Nav,
  NavItem,
  NavbarBrand,
  Button,
} from "reactstrap";

const Header = () => {
  const handleLogout = async () => {
    console.log("Logout initiated");
    try {
      // Perform any necessary cleanup on the client-side
      console.log("Clearing local storage");
      localStorage.clear();

      // Make a request to the server to handle server-side logout
      console.log("Sending logout request to server");
      await axios.post("/api/logout");

      console.log("Logout successful");
      
      // Redirect to the home page or login page
      console.log("Redirecting to home page");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Navbar color="primary" dark expand="md">
      <NavbarBrand href="/">
        <Image
          src="/logowhite.png"
          width={120}
          height={40}
          alt="logo"
        />
      </NavbarBrand>
      <Nav className="me-auto" navbar>
        <NavItem>
          <Link href="/" className="nav-link">
            Home
          </Link>
        </NavItem>
        {/* Add more NavItems as needed */}
      </Nav>
      <Button color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </Navbar>
  );
};

export default Header;