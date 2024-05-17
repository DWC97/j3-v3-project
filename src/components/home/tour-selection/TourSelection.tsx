"use client"

// next components
import Link from 'next/link'
import Image from 'next/image';

// hooks
import { useRef, useEffect, useContext } from "react"
import useMobileView from "@/hooks/useMobileView";
import useDetectSection from '@/hooks/useDetectSection';

// swiper modules
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';
import "./SliderStyles.css"

// data
import toursData from "@/data/tours.json"

// utilities
import { formatNumber } from '@/lib/Utils';

// context
import { ActiveSectionContext } from '@/context/ActiveSectionContext';

// animations
import { Reveal } from '@/context/Reveal';
import { Slide } from '@/context/Slide';
import Swal from 'sweetalert2'

// interfaces to ensure type validity
interface Tour {
    id: number;
    region: string;
    title: string;
    imageSrc: string;
    available: boolean;
    duration: number;
    price: number;
}

export default function TourSelection() {

    let { setActiveSection } = useContext(ActiveSectionContext)
    const toursRef = useRef<HTMLDivElement>(null)
    const [isInView] = useDetectSection(toursRef) // detect whether section is in view
    const isMobileView = useMobileView();

    // set active section when it's in view
    useEffect(() => {
        if (isMobileView) return
        if (isInView) {
            setActiveSection("tours")
        }
    }, [isInView, setActiveSection, isMobileView])

    return (
        <div className="section w-full relative min-h-screen h-[1080px] flex justify-center items-center overflow-hidden" id='tours' ref={toursRef}
        >
            <div className="w-full min-h-screen h-[1080px] bg-center bg-no-repeat bg-cover bg-fixed absolute -z-20" style={{ backgroundImage: "url('/tour-selection/beach.avif')" }} />
            <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-custom-blue to-custom-yellow opacity-80 -z-10" />
            <div className="w-full min-w-[1000px] h-[530px] 2xl:-mt-20 flex flex-col justify-between items-center">
                <Reveal>
                    <h1 className="w-screen px-10 text-center text-[32px] md:text-[44px] text-white font-bold  ">
                        CHECK OUT OUR <span className="text-custom-yellow">UPCOMING TRIPS</span>!
                    </h1>
                </Reveal>
                <Slide><div className='w-full flex justify-center items-center'>
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
                        {toursData.tours.map((tour: Tour) => {
                            return (
                                <SwiperSlide key={tour.id}>

                                    <Link className='card-container' href={tour.available ? `/${tour.region}` : "#"} onClick={(e) => {
                                        if (tour.available) return
                                        e.preventDefault()
                                        Swal.fire({
                                            title: "Sorry!",
                                            text: "Information for this tour is currently unavailable.",
                                            icon: "error",
                                            timer: 5000,
                                            timerProgressBar: true,
                                            showConfirmButton: false,
                                            scrollbarPadding: false,
                                        });
                                    }}>
                                        <div className='image'>
                                            <Image
                                                src={tour.imageSrc}
                                                alt="location"
                                                fill
                                                sizes='(height: 100%)'
                                                className="image"
                                            />
                                        </div>
                                        <div className='card-content'>
                                            <span className='region'>{tour.region.toUpperCase().replace("-", " ")}</span>
                                            <span className='title'>{tour.title.toUpperCase()}</span>
                                            <div className="hidden-content flex flex-col">
                                                {tour.available ?
                                                    (<div className='flex flex-row items-center justify-between'>
                                                        <p className='text-sm text-gray-200'>Learn more</p>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className='-mr-4' width={20} height={20} viewBox="0 0 16 16"><path fill="white" fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"></path></svg>
                                                    </div>) :
                                                    (<div className='flex flex-row items-center justify-between'>
                                                        <p className='text-sm text-gray-200'>Currently unavailable</p>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className='-mr-4' width={20} height={20} viewBox="0 0 21 21"><g fill="none" fillRule="evenodd" stroke="red" strokeLinecap="round" strokeLinejoin="round" transform="translate(2 2)"><circle cx={8.5} cy={8.5} r={8}></circle><path d="M14 3L3 14"></path></g></svg>
                                                    </div>)
                                                }

                                                <div className='flex flex-row justify-between items-center pb-3'>
                                                    <p className='italic'>{tour.duration} days</p>
                                                    <p className='font-semibold text-xl -mr-4'>{formatNumber(tour.price)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
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
                </div></Slide>
                <Reveal>
                    <p className="w-screen text-[18px] lg:text-[20px] text-white text-center px-10">
                        Each tour includes transport, accommodation and activities.
                    </p>
                </Reveal>
            </div>
        </div>
    )
}