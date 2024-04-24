"use client"

// functional components
import Hero from "@/components/home/hero/Hero";
import HeroMobile from "@/components/home/hero/HeroMobile";
import TourSelection from "@/components/home/tour-selection/TourSelection";
import About from "@/components/home/about/About";
import AboutMobile from "@/components/home/about/AboutMobile";
import Contact from "@/components/home/contact/Contact";

// hooks
import useMobileView from "@/hooks/useMobileView";

// home page
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
          <Hero />
          <About />
        </>
      }
      <TourSelection />
      <Contact />
    </>
  );
}
