"use client"

import Hero from "@/components/home/Hero";
import TourSelection from "@/components/tour-selection/TourSelection";
import About2 from "@/components/about/About2";
import Contact2 from "@/components/contact/Contact2";

export default function Home() {

  return (
      <div className="">
        <Hero/>
        <About2 />
        <TourSelection />
        <Contact2 />
      </div>
  );
}
