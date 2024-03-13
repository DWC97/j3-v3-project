'use client';

import { useEffect, useRef, useState, useContext } from 'react';
import { ActiveSectionContext } from "@/context/ActiveSectionContext"
import useDetectSection from "@/hooks/useDetectSection"
import { useTransform, useScroll, motion } from 'framer-motion';
import './AboutStyles.css'
import Image from 'next/image';
import Lenis from '@studio-freight/lenis'
import Link from 'next/link';


const imageData = [
    {
        "id": 1,
        "src": "/about/maya-polaroid.png",
        "rotation": 3
    },
    {
        "id": 2,
        "src": "/about/tubing-polaroid.png",
        "rotation": -3
    },
    {
        "id": 3,
        "src": "/about/joe-polaroid.png",
        "rotation": 1
    },
    {
        "id": 4,
        "src": "/about/lagoon-polaroid.png",
        "rotation": 2
    },
    {
        "id": 5,
        "src": "/about/pirate-polaroid.png",
        "rotation": -2.5
    },
    {
        "id": 6,
        "src": "/about/maya-polaroid.png",
        "rotation": 5
    },
    {
        "id": 7,
        "src": "/about/waterpark-polaroid.png",
        "rotation": -4
    },
    {
        "id": 8,
        "src": "/about/muaythai-polaroid.png",
        "rotation": 1
    },
    {
        "id": 9,
        "src": "/about/elephant-polaroid.png",
        "rotation": -2.5
    },
    {
        "id": 10,
        "src": "/about/market-polaroid.png",
        "rotation": -1
    },
    {
        "id": 11,
        "src": "/about/phuket-polaroid.png",
        "rotation": 3
    },
    {
        "id": 12,
        "src": "/about/waterpark-polaroid.png",
        "rotation": -3
    }
]

export function About2(){

    let { setActiveSection } = useContext(ActiveSectionContext)
    const aboutRef = useRef(null)
    const [isInView] = useDetectSection(aboutRef)

    useEffect(() => {
        if (isInView){
            setActiveSection("about")
        }
        else {
            setActiveSection("")
        }
    }, [isInView])

    const gallery = useRef(null);
    const [dimension, setDimension] = useState({width:0, height:0});

    const { scrollYProgress } = useScroll({

        target: gallery,
        offset: ['start end', 'end start']

    })

    const { height } = dimension;
    const y = useTransform(scrollYProgress, [0, 1], [0, height * -0.8])
    const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3])

    useEffect( () => {
        const resize = () => {
            setDimension({width: window.innerWidth, height: window.innerHeight})
        }
      
        window.addEventListener("resize", resize)
      
        resize();
      
        return () => {
            window.removeEventListener("resize", resize);
        }
      }, [])

    return (
        <div className="flex flex-row bg-black h-[1080px] relative" id="about" ref={aboutRef}>
            {/* <div className='z-0 absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-b from-transparent to-custom-blue opacity-20' />
            <div className='z-0 absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-br from-transparent to-custom-blue opacity-10' /> */}
            <div className='z-10 flex flex-col h-full w-3/5 justify-center px-[7%] -pr-10'>
                <h3 className='text-custom-blue text-[20px] font-bold mb-2'>JR SEASON 1</h3>
                <h2 className='text-white font-bold text-[40px] leading-snug mb-4'>Small group party tours starting in 2025</h2>
                <p className='text-white text-[16px] leading-relaxed mb-2'>Ahoy there! If you’re looking to experience the best nightlife & culture South-East Asia has to offer with a rowdy group of travellers and tick-off bucket-list activities along the way, JR has you covered. We make logistics stress-free so you can focus on having a good time. Be warned, we do things a little differently over at JR:</p>
                <div className='flex flex-row items-center'>
                    <span className='text-[20px] mr-4'>❌</span>
                    <span className='font-semibold text-white text-[16px]'>No couples</span>
                </div>
                <div className='flex flex-row items-center'>
                    <span className='text-[20px] mr-4'>&nbsp;🤘&nbsp;</span>
                    <span className='font-semibold text-white text-[16px]'>18 – 30 only</span>
                </div>
                <div className='flex flex-row items-center mb-10'>
                    <span className='text-[20px] mr-4'>🍻</span>
                    <span className='font-semibold text-white text-[16px]'>Be prepared for LOTS of drinking...</span>
                </div>
                <div className='flex flex-row items-center'>   
                    <Link href={"/#tours"} className='z-[1000] w-1/2 mr-16 cursor-pointer font-semibold text-center text-white  py-2 rounded-md bg-gradient-to-r from-custom-blue to-custom-yellow text-[18px] '
                    >Learn more</Link>
                    <Link href={"/#contact"} className='flex flex-row items-center justify-center'>
                        <button className='text-white text-[18px]'>Get in touch</button>
                        <svg xmlns="http://www.w3.org/2000/svg" className='pl-3' width={40} height={32} viewBox="0 0 16 16"><path fill="white" fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"></path></svg>
                    </Link>
                </div> 
            </div>
            <div className="gallery pl-10" ref={gallery}>
                <div className="galleryWrapper">
                    <Column imagesData={[imageData[0], imageData[1], imageData[2], imageData[3], imageData[4], imageData[5]]} y={y}/>
                    <Column imagesData={[imageData[6], imageData[7], imageData[8], imageData[9], imageData[10], imageData[11]]} y={y2}/>                 
                </div>
            </div>
        </div>
    )
}

const Column = ({imagesData, y}) => {
    return (
        <motion.div 
        className="column"
        style={{y}}
        >
            <div 
            className="column"
            >
                {
                imagesData.map( (image) => {
                    return <div key={image.id} className="imageContainer">
                    <Image 
                        src={image.src}
                        style={{ transform: `rotate(${image.rotation}deg)`}}
                        alt='image'
                        fill
                        sizes='height: 360px)'
                    />
                    </div>
                })
                }
            </div>
      </motion.div>
    )
  }