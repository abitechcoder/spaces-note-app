import React from "react";
import { Outlet, useLocation} from "react-router-dom";
import { Navbar} from "../components/landing_page";

function RootLayout() {
  const location = useLocation();
  return (
    <>
      <section className="p-4 lg:p-0">
      <Navbar currentLocation={location.pathname} />
      </section>
      <Outlet />
    </>
  );
}

export default RootLayout;
