import Hero from "@/components/home/Hero";
import Navbar from "../components/Navbar";
import About from "@/components/about/About";
import TourSelection from "@/components/tour-selection/TourSelection";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <header>
        <nav className="relative">
          <Navbar />
        </nav>
      </header>

      <main className="overflow-x-hidden">
        <Hero />
        <About />
        <TourSelection />
        <Contact />
        <Footer />
      </main>
    </>
    
  );
}
