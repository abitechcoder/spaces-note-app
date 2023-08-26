import React from "react";
import { FooterList, Features, Testimonials } from "../components/landing_page";

function LandingPage() {
  return (
    <main className="bg-white">
      <section className="h-screen">
        <div className="container mx-auto py-6 lg:px-8">
          <h1>Hero Section</h1>
        </div>
      </section>
      <section>
        <div className="container mx-auto py-12 lg:px-8">
          <Features />
        </div>
      </section>
      <section className="bg-black text-white h-[300px]">
        <div className="container mx-auto p-6 lg:px-8">
          <h1>Testimonial Section</h1>
        </div>
      </section>
      <section className="h-[500px]">
        <div className="container mx-auto p-6 lg:px-8">
          <h1>Faq Section</h1>
        </div>
      </section>
      <section className="bg-black text-white h-[300px]">
        <div className="container mx-auto p-6 lg:px-8">
          <h1>Download Section</h1>
        </div>
      </section>

      <section className="pt-16 lg:px-8">
        <FooterList />
      </section>
    </main>
  );
}

export default LandingPage;
