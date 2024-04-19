"use client"

import gsap from "gsap"; 
import { useGSAP } from "@gsap/react";
import SplitType from 'split-type'
import { useContext, useEffect, useRef, useState, MouseEvent as ReactMouseEvent } from "react";
import "./HeroStyles.css"
import useDetectSection from "@/hooks/useDetectSection";
import { ActiveSectionContext } from "@/context/ActiveSectionContext";
import Lottie, {LottieRefCurrentProps} from "lottie-react";
import animationData from "@/animations/scroll-animation.json"
import HeroMobile from "./HeroMobile";
import Image from "next/image";

type ParallaxElement = HTMLImageElement & { 
    dataset: { 
        speedx: string
        speedy: string
        speedz: string
        rotation: string
    } }
    

export default function Hero(){

    const { setActiveSection, scrollAnimation, setScrollAnimation } = useContext(ActiveSectionContext);
    const mainHeading = useRef<HTMLHeadingElement>(null);
    const subHeading = useRef<HTMLHeadingElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const [isInView] = useDetectSection(heroRef);
    const scrollAnimationRef = useRef<LottieRefCurrentProps>(null);
    const [mobileView, setMobileView] = useState(false); // State to keep track of mobile view

    // Set mobileView based on window size
    useEffect(() => {
        function updateSize() {
            setMobileView(window.innerWidth < 500);
        }
        window.addEventListener('resize', updateSize);
        updateSize(); // Initialize the state at mount
        return () => window.removeEventListener('resize', updateSize); // Cleanup listener
    }, []);

    useEffect(() => {
        if (isInView){
            setActiveSection("hero")
        }
    }, [isInView, setActiveSection])

    useEffect(() => {
        const parallaxElements: ParallaxElement[] = Array.from(document.getElementsByClassName('parallax')) as ParallaxElement[];
        setTimeout(() => {
            setScrollAnimation(true);
        }, 5000);
    }, [setScrollAnimation]);

    useGSAP(() => {
        if (mobileView) return

        const ourText = new SplitType(mainHeading.current!, { types: 'chars' })
        const chars = ourText.chars

        gsap.fromTo(
            chars,
            { 
              y: -300,
              opacity: 0
            },
            {
              y: 0,
              opacity: 1,
              stagger: 0.05,
              duration: 2,
              ease: 'power4.out',
            }
        )

        gsap.fromTo(
            subHeading.current,
            { 
              y: 50,
              opacity: 0
            },
            {
              y: 0,
              opacity: 1,
              stagger: 0.05,
              duration: 3,
              delay: 2,
              ease: 'power4.out',
            }
        )
    })

    function handleMousemove(e: MouseEvent) {
        const xValue = e.clientX - window.innerWidth / 2;
        const yValue = e.clientY - window.innerHeight / 2;
        const rotateDegree = (xValue / (window.innerWidth / 2)) * 25;

        const parallaxElements: ParallaxElement[] = Array.from(document.getElementsByClassName('parallax')) as ParallaxElement[];
        parallaxElements.forEach(el => {
            const { speedx, speedy, speedz, rotation } = el.dataset;
            let isInLeft = (parseFloat(getComputedStyle(el).left) < window.innerWidth / 2) ? 1 : -1
            let zValue = (e.clientX - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.06
            el.style.transform = `translateX(calc(-50% + ${-xValue * parseFloat(speedx)}px)) translateY(calc(-50% + ${yValue * parseFloat(speedy)}px))  translateZ(${zValue * parseFloat(speedz)}px) rotateY(${rotateDegree * parseFloat(rotation)}deg)`;
        });
    }



      
    function loadEvents(){
        if (typeof window !== 'undefined') {
            setTimeout(() => {
                window.addEventListener("mousemove", handleMousemove)
            }, 3000)
    

        } 

        // Cleanup function to remove event listener when the component unmounts
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener("mousemove", handleMousemove);

            }
        };
    }

    loadEvents()

    return (
        <div ref={heroRef} className="h-screen w-full bg-black">
            {!mobileView ? 
            <div className="section hero" id="hero">
                <div className="wrapper">
                    <div className="vignette"></div>
                    <img src="/hero/sky6.avif" loading="eager" alt="sky" className="sky parallax" data-speedx="0.08" data-speedy="0.075" data-speedz="0" data-rotation="0"/>
                    <div className="sea parallax" data-speedx="0.045" data-speedy="0.04" data-speedz="0" data-rotation="0">
                    <Image
                            src="/hero/sea3.webp"
                            alt="sea"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: '100%', height: '100%' }}
                            priority
                        />
                    </div>
                    <img src="/hero/left-cliff.png" alt="left cliff" className="left-cliff parallax" data-speedx="0.05" data-speedy="0.045" data-speedz="0.6" data-rotation="0.15"/>
                    <img src="/hero/right-cliff.png" alt="right cliff" className="right-cliff parallax" data-speedx="0.05" data-speedy="0.043" data-speedz="0.5" data-rotation="0.13"/>
                    <img src="/hero/middle-cliff.png" alt="middle cliff" className="middle-cliff parallax" data-speedx="0.05" data-speedy="0.042" data-speedz="0.55" data-rotation="0.14"/>
                    <div className="text parallax w-full" data-speedx="0.05" data-speedy="0.05" data-speedz="0.55" data-rotation="0.14" >
                        <h1 className="font-semibold main-heading" ref={mainHeading}>JOLLY ROGER TOURS</h1>
                        <h2 className="tracking-widest font-medium sub-heading" ref={subHeading}>THE ADVENTURE OF A LIFETIME AWAITS...</h2>
                    </div>
                    <img src="/hero/big-ship.png" alt="ship" className="big-ship parallax" data-speedx="0.038" data-speedy="0.038" data-speedz="0.8" data-rotation="0.2"/>
                    <img src="/hero/boat1.png" alt="boat1" className="boat1 parallax" data-speedx="0.04" data-speedy="0.04" data-speedz="0.82" data-rotation="0.21"/>
                    <img src="/hero/boat2.png" alt="boat2" className="boat2 parallax" data-speedx="0.04" data-speedy="0.04" data-speedz="0.83" data-rotation="0.22"/>
                    <img src="/hero/boat3.png" alt="boat3" className="boat3 parallax " data-speedx="0.04" data-speedy="0.04" data-speedz="0.84" data-rotation="0.23"/>
                    <img src="/hero/foliage.png" alt="foliage" className="foliage parallax" data-speedx="0.01" data-speedy="0.01" data-speedz="0.8" data-rotation="0.25"/>
                </div>
                <div className={`absolute w-full bottom-[30vh] ${scrollAnimation ? " opacity-100" : "opacity-0"}  left-0 flex justify-center items-center ease-in-out duration-1000`}>
                    <Lottie lottieRef={scrollAnimationRef} animationData={animationData} className="w-16" loop={true} />
                </div>
            </div>
            :
            <HeroMobile />
            }
        </div>
    )
}