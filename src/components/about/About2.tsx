'use client';

import { useEffect, useRef, useState } from 'react';
import { useTransform, useScroll, motion } from 'framer-motion';
import './AboutStyles.css'
import Image from 'next/image';
import Lenis from '@studio-freight/lenis'


const imageData = [
    {
        "id": 1,
        "src": "/about/maya-polaroid.png",
        "rotation": 3
    },
    {
        "id": 2,
        "src": "/about/tubing-polaroid.png",
        "rotation": 3
    },
    {
        "id": 3,
        "src": "/about/joe-polaroid.png",
        "rotation": 3
    },
    {
        "id": 4,
        "src": "/about/lagoon-polaroid.png",
        "rotation": 3
    },
    {
        "id": 5,
        "src": "/about/pirate-polaroid.png",
        "rotation": 3
    },
    {
        "id": 6,
        "src": "/about/maya-polaroid.png",
        "rotation": 3
    },
    {
        "id": 7,
        "src": "/about/waterpark-polaroid.png",
        "rotation": 3
    },
    {
        "id": 8,
        "src": "/about/muaythai-polaroid.png",
        "rotation": 3
    },
    {
        "id": 9,
        "src": "/about/elephant-polaroid.png",
        "rotation": 3
    },
    {
        "id": 10,
        "src": "/about/market-polaroid.png",
        "rotation": 3
    },
    {
        "id": 11,
        "src": "/about/phuket-polaroid.png",
        "rotation": 3
    },
    {
        "id": 12,
        "src": "/about/waterpark-polaroid.png",
        "rotation": 3
    }
]

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
        <div className="flex flex-row bg-black h-[1080px] relative">
                <div className='flex h-full w-1/2 justify-center items-center '>
                    <p className='text-white'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui asperiores, aperiam aliquam rem deserunt non eveniet sapiente minus. Libero beatae unde dolorum voluptate minima quod ipsam sapiente cupiditate tempora minus!</p>
                </div>
                <div className="gallery ml-[11%] pl-[2%]" ref={gallery}>
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