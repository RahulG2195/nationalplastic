'use client';
import React from "react";
import Link from "next/link";
import axios from "axios";
import {
  Navbar,
  Nav,
  NavItem,
  NavbarBrand,
  Button,
} from "reactstrap";
import { signOut } from "next-auth/react";
const Header = () => {
  const handleLogout = async () => {
    console.log("Logout initiated");
    try {
      // Perform any necessary cleanup on the client-side
      console.log("Clearing local storage");
      localStorage.clear();
      signOut();

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
        {/* <img src="/assets/images/logo/main-logo.png" alt="logo" /> */}
      </NavbarBrand>
      <Nav className="me-auto" navbar>
        <NavItem>
          <Link href="/" className="nav-link">
            Starter
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/about" className="nav-link">
            About
          </Link>
        </NavItem>
      </Nav>
      <Button color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </Navbar>
  );
};

export default Header;