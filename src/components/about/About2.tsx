'use client';

import { useEffect, useRef, useState } from 'react';
import { useTransform, useScroll, motion } from 'framer-motion';
import './AboutStyles.css'
import Image from 'next/image';
import Lenis from '@studio-freight/lenis'

const images = [
    "/about/pirate-polaroid.png",
    "/about/tubing-polaroid.png",
    "/about/waterpark-polaroid.png",
    "/about/muaythai-polaroid.png",
    "/about/pirate-polaroid.png",
    "/about/tubing-polaroid.png",
    "/about/waterpark-polaroid.png",
    "/about/muaythai-polaroid.png",
    "/about/pirate-polaroid.png",
    "/about/tubing-polaroid.png",
    "/about/waterpark-polaroid.png",
    "/about/muaythai-polaroid.png"
]

export function About2(){

    const gallery = useRef(null);
    const [dimension, setDimension] = useState({width:0, height:0});

    const { scrollYProgress } = useScroll({

        target: gallery,

        offset: ['start end', 'end start']

    })

    const { height } = dimension;
    const y = useTransform(scrollYProgress, [0, 1], [0, height * -2])
    const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 2])
    const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25])

  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3])

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
        <main className="main">
            {/* <div className='h-screen w-full bg-green-200' /> */}
                <div className="gallery" ref={gallery}>
                    <div className="galleryWrapper">
                        <Column images={[images[0], images[1], images[2], images[3]]} y={y}/>
                        <Column images={[images[4], images[5], images[6], images[7]]} y={y2}/>
                        {/* <Column images={[images[0], images[1], images[2], images[3]]} y={y3}/>
                        <Column images={[images[4], images[5], images[6], images[7]]} y={y4}/> */}
                        
                    </div>
                </div>
            {/* <div className='h-screen w-full bg-green-200' /> */}
        </main>
    )
}

const Column = ({images, y}) => {
    return (
        <motion.div 
        className="column"
        style={{y}}
        >
            <div 
            className="column"
            >
                {
                images.map( (src, i) => {
                    return <div key={i} className="imageContainer">
                    <Image 
                        src={src}
                        alt='image'
                        fill
                    />
                    </div>
                })
                }
            </div>
      </motion.div>
    )
  }