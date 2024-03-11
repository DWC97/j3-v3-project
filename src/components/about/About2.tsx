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

const rotation = [3, -1, 2.5, -4, -2, -5, 1, -3.5, -2.5, -0.5]

export function About2(){

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
        <div className="flex flex-row bg-black h-[1080px]">
                <div className='flex h-full w-1/2 justify-center items-center '>
                    <p className='text-white'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui asperiores, aperiam aliquam rem deserunt non eveniet sapiente minus. Libero beatae unde dolorum voluptate minima quod ipsam sapiente cupiditate tempora minus!</p>
                </div>
                <div className="gallery ml-[11%] pl-[2%]" ref={gallery}>
                    <div className="galleryWrapper">
                        <Column images={[images[0], images[1], images[2], images[3], images[4], images[5]]} y={y}/>
                        <Column images={[images[4], images[5], images[6], images[7], images[8], images[9]]} y={y2}/>
                        {/* <Column images={[images[0], images[1], images[2], images[3]]} y={y3}/>
                        <Column images={[images[4], images[5], images[6], images[7]]} y={y4}/> */}
                        
                    </div>
                </div>
        </div>
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
                        style={{ transform: `rotate(${rotation[i]}deg)`}}
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