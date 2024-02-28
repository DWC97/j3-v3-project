"use client"

import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef, useState, useEffect } from "react"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';
import "./SliderStyles.css"

import toursData from "@/data/tours.json"
import { formatNumber } from '@/utilities/Utils';

export default function TourSelection({ setActiveSection }){

    const toursRef = useRef(null)
    const [isInView, setIsInView] = useState(false)

    const checkInView = () => {
        const rect = toursRef.current.getBoundingClientRect();
        setIsInView(
            rect.top < (window.innerHeight / 2) && rect.bottom >= (window.innerHeight / 2)
        );
        
    };
    
    useEffect(() => {
        document.addEventListener("scroll", checkInView);
        return () => {
            document.removeEventListener("scroll", checkInView);
        };
    }, []);

    useEffect(() => {
        if (isInView){
            setActiveSection("tours")
        }
    }, [isInView])

    return (
        <div className="section w-full relative h-[1080px] flex justify-center items-center overflow-hidden" id='tours' ref={toursRef}>
            <div className="bg-[url('/tour-selection/beach.jpg')] w-full h-full bg-center bg-no-repeat bg-cover bg-fixed absolute -z-20" />
            <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-custom-blue to-custom-yellow opacity-80 -z-10" />
            <div className=" w-[1000px] h-[570px] flex flex-col justify-between items-center">
                <h2 className="w-screen px-2 text-center text-[24px] min-[450px]:text-[24px] min-[550px]:text-[28px] md:text-[36px] lg:text-[44px] text-white font-semibold tracking-wide">
                    CHECK OUT OUR <span className="text-custom-yellow">UPCOMING TRIPS</span>!
                </h2>
                <div className='w-full flex justify-center items-center'>
                    <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    loop={true}
                    speed={1000}
                    slidesPerView={3}
                    coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 108,
                    modifier: 3.5,
                    }}
                    pagination={{ el: '.swiper-pagination', clickable: true }}
                    navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    }}
                    modules={[EffectCoverflow, Pagination, Navigation]}
                    className="swiper_container"
                    >
                        {toursData.tours.map(tour => {
                            return (
                                <SwiperSlide key={tour.id}>
                                    <div className='card-container'>
                                        <img src={tour.imageSrc}/>
                                        <div className='card-content'>
                                            <span className='region'>{tour.region}</span>
                                            <span className='title'>{tour.title}</span>
                                            <div className="hidden-content flex flex-col">
                                                {tour.available ? 
                                                <div className='flex flex-row items-center justify-between'>
                                                    <p className='text-sm text-gray-200'>Learn more</p>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className='-mr-4' width={20} height={20} viewBox="0 0 16 16"><path fill="white" fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"></path></svg>
                                                </div> : 
                                                <div className='flex flex-row items-center justify-between'>
                                                    <p className='text-sm text-gray-200'>Currently unavailable</p>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className='-mr-4' width={20} height={20} viewBox="0 0 21 21"><g fill="none" fillRule="evenodd" stroke="white" strokeLinecap="round" strokeLinejoin="round" transform="translate(2 2)"><circle cx={8.5} cy={8.5} r={8}></circle><path d="M14 3L3 14"></path></g></svg>
                                                </div>
                                                }
                                                
                                                <div className='flex flex-row justify-between items-center pb-3'>
                                                    <p className='italic'>{tour.duration} days</p>
                                                    <p className='font-semibold text-xl -mr-4'>£{formatNumber(tour.price)}</p>
                                                </div>
                                            </div>
                                        </div>    
                                    </div> 
                                </SwiperSlide>
                            )
                        })}
                        <div className="slider-controler">
                            <div className="swiper-button-prev slider-arrow">
                            </div>
                            <div className="swiper-button-next slider-arrow">
                            </div>
                            <div className="swiper-pagination"></div>
                        </div>
                    </Swiper>
                </div>
                <p className="w-screen text-[16px] md:text-[18px] lg:text-[20px] text-gray-100 text-center px-2">
                    Each tour includes transport, accommodation and activities.
                </p>
            </div>
        </div>
    )
}