// src/components/LandingPage.jsx
import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ParticleBackground from "../components/ParticleBackground";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <ParticleBackground />
      <Navbar />
      <main>
        <HeroSection />
      </main>
    </div>
  );
};

export default LandingPage;
