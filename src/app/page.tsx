"use client"

import Hero from "@/components/home/Hero";
import TourSelection from "@/components/tour-selection/TourSelection";
import About2 from "@/components/about/About2";
import Contact2 from "@/components/contact/Contact2";

import HeroMobile from "@/components/home/HeroMobile";
import useMobileView from "@/hooks/useMobileView";


export default function Home() {

  const isMobileView = useMobileView();

  
  return (
      <>
        {isMobileView ? <HeroMobile /> : <Hero/>}
        <About2 />
        <TourSelection />
        <Contact2 />
      </>
  );
}
