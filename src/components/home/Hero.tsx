"use client"

import gsap from "gsap"; 
import { useGSAP } from "@gsap/react";
import SplitType from 'split-type'
import { useContext, useEffect, useRef } from "react";
import "./HeroStyles.css"
import useDetectSection from "@/hooks/useDetectSection";
import { ActiveSectionContext } from "@/context/ActiveSectionContext";
import Lottie from "lottie-react";
import animationData from "@/animations/scroll-animation.json"


export default function Hero(){

    let { setActiveSection } = useContext(ActiveSectionContext)
    let parallaxEl: any[] = []
    let xValue = 0
    let yValue = 0
    let rotateDegree = 0
    let mainHeading = useRef(null)
    let subHeading = useRef(null)
    let foliage = useRef(null)
    const heroRef = useRef(null)
    const [isInView] = useDetectSection(heroRef)

    useEffect(() => {
        if (isInView){
            setActiveSection("contact")
        }
    }, [isInView])

    useEffect(() => {
        parallaxEl = Array.from(
            document.getElementsByClassName('parallax')
        ); 
    }, []);

    useGSAP(() => {
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

    function handleResize(){
        document.location.reload()
    }

    function loadEvents(){
        if (typeof window !== 'undefined') {
            setTimeout(() => {
                window.addEventListener("mousemove", handleMousemove)
            }, 3000)
    
            window.addEventListener("resize", handleResize)
        } 

        // Cleanup function to remove event listener when the component unmounts
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener("mousemove", handleMousemove);
                window.removeEventListener("resize", handleResize);
            }
        };
    }

    loadEvents()

    return (
        <div className="section hero" id="hero" ref={heroRef}>
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
            <div className="absolute w-full bottom-[30vh] left-0 flex justify-center items-center">
                <Lottie animationData={animationData} className="w-16"/>
            </div>
        </div>
    )
}