'use client';

import { useEffect, useRef, useState, useContext } from 'react';
import { ActiveSectionContext } from "@/context/ActiveSectionContext"
import useDetectSection from "@/hooks/useDetectSection"
import { useTransform, useScroll, motion } from 'framer-motion';
import './AboutStyles.css'
import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/context/Reveal';

interface ImageData {
    id: number;
    src: string;
    rotation: number;
}

const imageData: ImageData[] = [
    {
        "id": 1,
        "src": "/about/maya-polaroid.webp",
        "rotation": 3
    },
    {
        "id": 2,
        "src": "/about/tubing-polaroid.webp",
        "rotation": -3
    },
    {
        "id": 3,
        "src": "/about/joe-polaroid.webp",
        "rotation": 1
    },
    {
        "id": 4,
        "src": "/about/lagoon-polaroid.webp",
        "rotation": 2
    },
    {
        "id": 5,
        "src": "/about/pirate-polaroid.webp",
        "rotation": -2.5
    },
    {
        "id": 6,
        "src": "/about/maya-polaroid.webp",
        "rotation": 5
    },
    {
        "id": 7,
        "src": "/about/waterpark-polaroid.webp",
        "rotation": -4
    },
    {
        "id": 8,
        "src": "/about/muaythai-polaroid.webp",
        "rotation": 1
    },
    {
        "id": 9,
        "src": "/about/elephant-polaroid.webp",
        "rotation": -2.5
    },
    {
        "id": 10,
        "src": "/about/market-polaroid.webp",
        "rotation": -1
    },
    {
        "id": 11,
        "src": "/about/phuket-polaroid.webp",
        "rotation": 3
    },
    {
        "id": 12,
        "src": "/about/waterpark-polaroid.webp",
        "rotation": -3
    }
]

export default function About2(){

    let { setActiveSection } = useContext(ActiveSectionContext)
    const aboutRef = useRef<HTMLDivElement>(null)
    const [isInView] = useDetectSection(aboutRef)

    useEffect(() => {
        if (isInView){
            setActiveSection("about")
        }
        else {
            setActiveSection("")
        }
    }, [isInView, setActiveSection])

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
        <div className="flex flex-row bg-black min-h-screen h-[1080px] relative" id="about" ref={aboutRef}>
            <div className={`z-10 flex flex-col h-full lg:w-3/5 sm:w-4/5 w-full justify-center px-10 sm:px-[7%] 2xl:pl-[15%] -pr-10 `}>
                <Reveal>
                    <h3 className='text-custom-blue text-[20px] font-bold mb-2'>JR SEASON 1</h3>
                    <h2 className='text-white font-bold md:text-[40px] text-[32px] leading-snug mb-6'>Small group party tours starting in 2025</h2>
                    <p className='text-white text-[16px] leading-relaxed mb-2'>Ahoy there! If you&apos;re looking to experience the best nightlife & culture South-East Asia has to offer with a rowdy group of travellers and tick-off bucket-list activities along the way, JR has you covered. We make logistics stress-free so you can focus on having a good time. Be warned, we do things a little differently over at JR:</p>
                    <div className='flex flex-row items-center'>
                        <span className='text-[20px] mr-4'>❌</span>
                        <span className='font-medium text-white text-[16px]'>No couples</span>
                    </div>
                    <div className='flex flex-row items-center'>
                        <span className='text-[20px] mr-4'>&nbsp;🤘&nbsp;</span>
                        <span className='font-medium text-white text-[16px]'>18 to 30 only</span>
                    </div>
                    <div className='flex flex-row items-center mb-10'>
                        <span className='text-[20px] mr-4'>🍻</span>
                        <span className='font-medium text-white text-[16px]'>Be prepared for LOTS of drinking...</span>
                    </div>
                    <div className='flex flex-col sm:flex-row items-center gap-8 md:gap-16'>   
                        <Link href={"/#tours"} className='z-[1000] w-full sm:w-1/2 cursor-pointer font-semibold text-center text-white  py-2 rounded-md bg-gradient-to-r from-custom-blue to-custom-yellow text-[18px] hover:opacity-85 ease-in-out duration-300'
                        >Learn more</Link>
                        <Link href={"/#contact"} className='flex flex-row items-center justify-center hover:opacity-85 ease-in-out duration-300'>
                            <button tabIndex={-1} className='text-white text-[18px]'>Get in touch</button>
                            <svg xmlns="http://www.w3.org/2000/svg" className='pl-3' width={40} height={32} viewBox="0 0 16 16"><path fill="white" fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"></path></svg>
                        </Link>
                    </div> 
                </Reveal>
                
            </div>
            <div className="gallery px-10 hidden sm:flex" ref={gallery}>
                
                    {window.innerWidth > 1024 ? 
                    <div className="galleryWrapper">
                        <div className="column column1">
                        <Column  imagesData={[imageData[0], imageData[1], imageData[2], imageData[3], imageData[4], imageData[5]]} y={y}/>
                        </div>
                        <div className="column column2">
                        <Column   imagesData={[imageData[6], imageData[7], imageData[8], imageData[9], imageData[10], imageData[11]]} y={y2}/> 
                        </div>
                        
                    </div>  
                    :
                    <Column imagesData={[imageData[0], imageData[1], imageData[2], imageData[3], imageData[4], imageData[5], imageData[6], imageData[7], imageData[8], imageData[9], imageData[10], imageData[11]]} y={y}/>
                    }              
            
            </div>
        </div>
    )
}

const Column: React.FC<{ imagesData: ImageData[], y: any }> = ({ imagesData, y }) => {
    return (
        <motion.div
            className="column relative"
            style={{ y }}
        >
            <div
                className="column relative"
            >
                {
                    imagesData.map((image) => {
                        return <div key={image.id} className="imageContainer">
                            <Image
                                src={image.src}
                                alt='polaroid'
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height: '100%', transform: `rotate(${image.rotation}deg)` }}
                                priority

                            />
                        </div>
                    })
                }
            </div>
        </motion.div>
    )
}