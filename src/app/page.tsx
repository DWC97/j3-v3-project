"use client"

import Hero from "@/components/home/hero/Hero";
import TourSelection from "@/components/home/tour-selection/TourSelection";
import About from "@/components/home/about/About";
import Contact from "@/components/home/contact/Contact";

import HeroMobile from "@/components/home/hero/HeroMobile";
import useMobileView from "@/hooks/useMobileView";
import AboutMobile from "@/components/home/about/AboutMobile";


export default function Home() {

  const isMobileView = useMobileView();

  return (
      <>
        {isMobileView ? 
        <>
          <HeroMobile />
          <AboutMobile />
        </> 
        : 
        <>
          <Hero/>
          <About />
        </>
        }
        <TourSelection />
        <Contact />
      </>
  );
}
