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
    try {
      // Perform any necessary cleanup on the client-side
      localStorage.clear();
      signOut();

      // Make a request to the server to handle server-side logout
      await axios.post("/api/logout");
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
      <Button color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </Navbar>
  );
};

export default Header;