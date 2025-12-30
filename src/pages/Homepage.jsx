import React from "react";
import HomeHero from "../components/home/Hero";
import { CarsSection } from "../components/home/CarSection";
import { ToursSection } from "../components/home/TourSection";
import { AboutSection } from "../components/home/AboutSection";
import { ContactSection } from "../components/home/ContactSection";
import TestimonialsSection from "../components/home/TestimonialSection";

const Homepage = () => {
  return (
    <>
      <main>
        <HomeHero />
        <CarsSection />
        <div className="h-[0.05rem] w-full bg-[#e4e2dc]"></div>
        {/* <TestimonialsSection/> */}
        <ToursSection />
        <div className="h-[0.05rem] w-full bg-[#e4e2dc]"></div>
        <AboutSection />
        <ContactSection />
      </main>
    </>
  );
};

export default Homepage;
