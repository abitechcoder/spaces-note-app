import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/landing_page";

function RootLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default RootLayout;
