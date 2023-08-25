import React from "react";
import { Outlet, useLocation} from "react-router-dom";
import { Navbar } from "../components/landing_page";

function RootLayout() {
  const location = useLocation();
  return (
    <>
      <Navbar currentLocation={location.pathname} />
      <Outlet />
    </>
  );
}

export default RootLayout;
