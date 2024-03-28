"use client"

import Hero from "@/components/home/Hero";
import Navbar from "../components/Navbar";
import About from "@/components/about/About";
import TourSelection from "@/components/tour-selection/TourSelection";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/Footer";
import { useEffect, useState } from 'react';
import { About2 } from "@/components/about/About2";
import Contact2 from "@/components/contact/Contact2";

export default function Home() {

  return (
      <div className="overflow-x-hidden">
        <Hero/>
        <About2 />
        <TourSelection />
        <Contact2 />
      </div>
  );
}
