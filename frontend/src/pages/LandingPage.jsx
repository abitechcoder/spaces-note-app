// import React from "react";
import {
  Navbar,
  Features,
  Testimonials,
  ContactUs,
  Downloads,
  Hero,
  Footer,
} from "../components/landing_page";
import { useLocation } from "react-router-dom";

function LandingPage() {
  const location = useLocation();
  return (
    <main className="bg-white">
      <section className="p-4 lg:p-0">
        <Navbar currentLocation={location.pathname} />
      </section>
      <Hero />
      <Features />
      <Testimonials />
      <ContactUs />
      <Downloads />
      <Footer />
    </main>
  );
}

export default LandingPage;
