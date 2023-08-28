import React from "react";
import { Outlet, useLocation} from "react-router-dom";
import { Navbar, FooterList } from "../components/landing_page";

function RootLayout() {
  const location = useLocation();
  return (
    <>
      <section className="p-4 lg:p-0">
      <Navbar currentLocation={location.pathname} />
      </section>
      <Outlet />
      <FooterList/>
    </>
  );
}

export default RootLayout;
