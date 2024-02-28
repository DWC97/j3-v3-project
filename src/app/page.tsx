"use client"

import Hero from "@/components/home/Hero";
import Navbar from "../components/Navbar";
import About from "@/components/about/About";
import TourSelection from "@/components/tour-selection/TourSelection";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/Footer";
import { useState } from 'react';

export default function Home() {

  const [activeSection, setActiveSection] = useState("")

  return (
    <>
      

      <main className="overflow-x-hidden">
        <Hero/>
        <About setActiveSection={setActiveSection}/>
        <TourSelection setActiveSection={setActiveSection}/>
        <Contact setActiveSection={setActiveSection}/>
      </main>
    </>
    
  );
}
