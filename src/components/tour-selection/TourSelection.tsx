"use client"

import { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';
import "./SliderStyles.css"
import toursData from "@/data/tours.json"

export default function TourSelection(){
    return (
        <div className="w-full relative h-[1080px] flex justify-center items-center">
            <div className="bg-[url('/tour-selection/beach.jpg')] w-full h-full bg-center bg-no-repeat bg-cover bg-fixed absolute -z-20" />
            <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-custom-blue to-custom-yellow opacity-80 -z-10" />
            <div className="border-2 border-red w-[1000px] h-[600px] flex flex-col justify-between items-center">
                <h2 className="text-[44px] text-white font-semibold tracking-wide">
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
                    depth: 100,
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
                                <SwiperSlide>
                                    <div className='card-container'>
                                        <img src={tour.imageSrc}/>
                                        <div className='card-content'>
                                            <span className='region'>{tour.region}</span>
                                            <span className='title'>{tour.title}</span>
                                            <div className="hidden-content flex flex-col">
                                                <div className='flex flex-row justify-between items-center pb-3'>
                                                    <p className='italic'>{tour.duration} days</p>
                                                    <p className='font-semibold text-xl -mr-4'>£{tour.price}</p>
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
                <p className="text-[20px] text-gray-100">
                    Each tour includes transport, accommodation and activities.
                </p>
            </div>
        </div>
    )
}