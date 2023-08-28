// import React from "react";
import { Features, Testimonials, ContactUs, Downloads, Hero } from "../components/landing_page";

function LandingPage() {
  return (
    <main className="bg-white">
      <Hero/>
      <Features />
      <Testimonials />
      <ContactUs />
      <Downloads/>
    </main>
  );
}

export default LandingPage;
