"use client"

import gsap from "gsap"; 
import { useGSAP } from "@gsap/react";
import SplitType from 'split-type'
import { useContext, useEffect, useRef, useState } from "react";
import "./HeroStyles.css"
import useDetectSection from "@/hooks/useDetectSection";
import { ActiveSectionContext } from "@/context/ActiveSectionContext";
import Lottie, {LottieRefCurrentProps} from "lottie-react";
import animationData from "@/animations/scroll-animation.json"
import HeroMobile from "./HeroMobile";

function debounce(fn, ms) {
    let timer
    return _ => {
      clearTimeout(timer)
      timer = setTimeout(_ => {
        timer = null
        fn.apply(this, arguments)
      }, ms)
    };
  }

export default function Hero(){

    let { activeSection, setActiveSection, scrollAnimation, setScrollAnimation } = useContext(ActiveSectionContext)
    let parallaxEl: any[] = []
    let xValue = 0
    let yValue = 0
    let rotateDegree = 0
    let mainHeading = useRef(null)
    let subHeading = useRef(null)
    let foliage = useRef(null)
    const heroRef = useRef(null)
    const [isInView] = useDetectSection(heroRef)
    const scrollAnimationRef = useRef<LottieRefCurrentProps>(null)
    let mobileView = window.innerWidth < 500
    const [needsReloading, setNeedsReloading] = useState(false)

    useEffect(() => {
        if (isInView){
            setActiveSection("hero")
            if (needsReloading){
                document.location.reload()
                setNeedsReloading(false)
            }
        }
    }, [isInView])

    useEffect(() => {
        parallaxEl = Array.from(
            document.getElementsByClassName('parallax')
        ); 

        setTimeout(() => {
            setScrollAnimation(true)
        }, 5000);
    }, []);

    useGSAP(() => {
        if (mobileView) return

        const ourText = new SplitType(mainHeading.current, { types: 'chars' })
        const chars = ourText.chars

        gsap.from(
            foliage.current, 
            {
            bottom: "calc(50% - 1100px)",
            duration: 3.5,
            ease: "power3.out"
            }
        )

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

    function handleMousemove(e){
        xValue = e.clientX - window.innerWidth / 2
        yValue = e.clientY - window.innerHeight / 2

        rotateDegree = (xValue / (window.innerWidth / 2)) * 25

        parallaxEl.forEach(el => {
            let speedx = el.dataset.speedx
            let speedy = el.dataset.speedy
            let speedz = el.dataset.speedz
            let rotation = el.dataset.rotation

            let isInLeft = (parseFloat(getComputedStyle(el).left) < window.innerWidth / 2) ? 1 : -1
            let zValue = (e.clientX - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.06
            
            el.style.transform = `translateX(calc(-50% + ${-xValue * speedx}px)) translateY(calc(-50% + ${yValue * speedy}px)) perspective(2300px) translateZ(${zValue * speedz}px) rotateY(${rotateDegree * rotation}deg)`
        })
    }


    const debouncedHandleResize = debounce(function handleResize() {

        if (!mobileView){
            if (activeSection !== "hero"){
                setNeedsReloading(true)
            } else {
                document.location.reload()
            }
        }
        
      }, 1000)
      
    function loadEvents(){
        if (typeof window !== 'undefined') {
            setTimeout(() => {
                window.addEventListener("mousemove", handleMousemove)
            }, 3000)
    
            window.addEventListener("resize", debouncedHandleResize)
        } 

        // Cleanup function to remove event listener when the component unmounts
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener("mousemove", handleMousemove);
                window.removeEventListener("resize", debouncedHandleResize);
            }
        };
    }

    loadEvents()

    return (
        <div ref={heroRef} className="h-screen w-full">
            {!mobileView ? 
            <div className="section hero" id="hero">
                <div className="wrapper">
                    <div className="vignette"></div>
                    <img src="/hero/sky6.png" className="sky parallax" data-speedx="0.08" data-speedy="0.075" data-speedz="0" data-rotation="0"/>
                    <img src="/hero/sea3.png" className="sea parallax" data-speedx="0.045" data-speedy="0.04" data-speedz="0" data-rotation="0"/>
                    <img src="/hero/left-cliff.png" className="left-cliff parallax" data-speedx="0.05" data-speedy="0.045" data-speedz="0.6" data-rotation="0.15"/>
                    <img src="/hero/right-cliff.png" className="right-cliff parallax" data-speedx="0.05" data-speedy="0.043" data-speedz="0.5" data-rotation="0.13"/>
                    <img src="/hero/middle-cliff.png" className="middle-cliff parallax" data-speedx="0.05" data-speedy="0.042" data-speedz="0.55" data-rotation="0.14"/>
                    <div className="text parallax w-full" data-speedx="0.05" data-speedy="0.05" data-speedz="0.55" data-rotation="0.14" >
                        <h1 className="font-semibold main-heading" ref={mainHeading}>JOLLY ROGER TOURS</h1>
                        <h5 className="tracking-widest font-medium sub-heading" ref={subHeading}>THE ADVENTURE OF A LIFETIME AWAITS...</h5>
                    </div>
                    <img src="/hero/big-ship.png" className="big-ship parallax" data-speedx="0.038" data-speedy="0.038" data-speedz="0.8" data-rotation="0.2"/>
                    <img src="/hero/boat1.png" className="boat1 parallax" data-speedx="0.04" data-speedy="0.04" data-speedz="0.82" data-rotation="0.21"/>
                    <img src="/hero/boat2.png" className="boat2 parallax" data-speedx="0.04" data-speedy="0.04" data-speedz="0.83" data-rotation="0.22"/>
                    <img src="/hero/boat3.png" className="boat3 parallax " data-speedx="0.04" data-speedy="0.04" data-speedz="0.84" data-rotation="0.23"/>
                    <img src="/hero/foliage.png" className="foliage parallax" data-speedx="0.01" data-speedy="0.01" data-speedz="0.8" data-rotation="0.25" ref={foliage}/>
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