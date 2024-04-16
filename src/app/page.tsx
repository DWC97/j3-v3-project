"use client"

import Hero from "@/components/home/Hero";
import TourSelection from "@/components/tour-selection/TourSelection";
import About2 from "@/components/about/About2";
import Contact2 from "@/components/contact/Contact2";
import { useMounted } from "@/hooks/useMounted";


export default function Home() {

  const mounted = useMounted()
  
  return (
      <>
        <Hero/>
        {mounted ? 
        <About2 />
        :
        <div className="bg-black min-h-screen h-[1080px]"/>
        }
        <TourSelection />
        <Contact2 />
      </>
  );
}
