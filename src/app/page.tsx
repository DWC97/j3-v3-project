"use client"

import Hero from "@/components/home/Hero";
import Navbar from "../components/Navbar";
import About from "@/components/about/About";
import TourSelection from "@/components/tour-selection/TourSelection";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/Footer";
import { useState } from 'react';

export default function Home() {

  const [activeSection, setActiveSection] = useState('');

  return (
    <>
      <header>
        <nav className="relative">
          <Navbar activeSection={activeSection}/>
        </nav>
      </header>

      <main className="overflow-x-hidden">
        <Hero setActiveSection={setActiveSection}/>
        <About setActiveSection={() => setActiveSection('about')}/>
        <TourSelection setActiveSection={setActiveSection}/>
        <Contact setActiveSection={setActiveSection}/>
        <Footer />
      </main>
    </>
    
  );
}
