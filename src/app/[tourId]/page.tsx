"use client"

import Link from 'next/link'
import toursData from "@/data/tours.json"
import { formatNumber } from '@/utilities/Utils';
import { useState } from 'react';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import useBodyLockScroll from '@/hooks/useBodyLockScroll';

export default function tourDetails({ params }: { params: { tourId: string }}){

    const tour = toursData.tours.find(tour => {
        return tour.region === params.tourId
    })
    const [answersVisible, setAnswersVisible] = useState({})
    const [gallery, setGallery] = useState({ image: "", i: 0 })
    const [toggle] = useBodyLockScroll() // toggle scroll lock

    // Function to toggle visibility of answer for a specific heading
    function toggleAnswer(heading){
        setAnswersVisible(prevState => ({
        ...prevState,
        [heading]: !prevState[heading]
        }));
    };

    function viewImage(image, i){
        setGallery({ image, i })
        toggle()
        console.log(gallery)
    }

    function colorGenerator(val){
        if (val === 10){
            return "#0CEEE0"
        }
        if (val >= 8){
            return "#A0E515"
        }
        else {
            return "#FFDD57"
        }
    }

    return (
        <div className="bg-black -z-50 pb-8">
        {gallery.image && 
            <div className='fixed top-0 left-0 h-screen w-full z-30 bg-black opacity-70 overflow-hidden flex flex-col justify-center items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => {
                    setGallery({ image: "", i: 0 })
                    toggle()
                }} className='absolute top-5 right-5 cursor-pointer' width={40} height={40} viewBox="0 0 24 24"><path fill="white" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"></path></svg>
                <div className='w-full flex flex-row justify-around items-center z-50'>
                    <svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} viewBox="0 0 1024 1024"><path fill="white" d="M609.408 149.376L277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0a30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688a29.12 29.12 0 0 0-41.728 0"></path></svg>
                    <img src={gallery.image} className='z-[999]'/>
                    <svg xmlns="http://www.w3.org/2000/svg" className='rotate-180' width={60} height={60} viewBox="0 0 1024 1024"><path fill="white" d="M609.408 149.376L277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0a30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688a29.12 29.12 0 0 0-41.728 0"></path></svg>
                </div>
            </div>
        }
            <div className="w-full h-[400px] relative flex flex-col justify-end z-0">
                <img src={tour?.imageSrc} className="absolute object-cover object-center w-full h-[400px] -z-10"/>
                <div className="absolute h-[200px] w-full top-0 left-0 bg-gradient-to-b from-black to-transparent opacity-35 z-0"/>
                <div className="absolute h-[200px] w-full bottom-0 left-0 bg-gradient-to-t from-black to-transparent opacity-35 z-0"/>
                <div className="w-full h-1/2 flex flex-col justify-center z-10 pl-10">
                    <h1 className="font-semibold text-[56px] text-white tracking-wide">{tour?.region.toUpperCase().replace("-"," ")}</h1>
                    <h3 className="text-[32px] text-gray-200">{tour?.title.toUpperCase()}</h3>
                </div>
            </div>
            <div className='mx-10'>
                <Link href={"/#tours"} className="mt-5 mb-10 bg-black flex flex-row items-center w-[230px]">
                    <span className="text-gray-200 text-[14px] font-semibold">BACK TO TOUR SELECTION</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className='pl-3' width={32} height={32} viewBox="0 0 16 16"><path fill="white" fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"></path></svg>
                </Link>
                <div className="w-full flex flex-row justify-between relative ">
                    <div className="flex flex-col mr-10">
                        <div className='text-white'>
                            <p className='text-[20px] font-medium mb-4'>{tour?.tagline}</p>
                            <p className='text-[18px]  mb-4'>{tour?.description1}</p>
                            <p className='text-[18px] '>{tour?.description2}</p>
                        </div>
                        <img src={tour?.mapUrl} className='mt-10 mb-16 w-full'/>
                        <div className={`w-full flex flex-col border-b border-gray-300 pb-4 `} >
                            <div className='w-full flex flex-row items-center relative cursor-pointer' 
                            onClick={() => toggleAnswer('activities')}>
                                <h2 className='font-semibold text-[36px] text-white'>Activities</h2>
                                <span className='text-[14px] text-gray-200 ml-10'>{answersVisible['activities'] ? "(close)" : "(open)"}</span>  
                                <svg xmlns="http://www.w3.org/2000/svg" className={`absolute right-0 ${answersVisible['activities'] && "rotate-180"}`} width={32} height={32} viewBox="0 0 24 24"><g fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}><circle cx={12} cy={12} r={9}></circle><path d="m15 13l-3-3l-3 3"></path></g></svg>
                            </div> 
                            <div className={`my-4 text-gray-200 text-[18px] -py-1 ${answersVisible['activities'] ? undefined : "hidden"}`}>
                                {tour?.activities?.map((activity, i) => {
                                    return (
                                        <p key={i} className='py-1'>{activity}</p>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='w-full flex flex-col border-b border-gray-300 pb-4 mt-16'>
                            <div className='w-full flex flex-row items-center relative cursor-pointer'
                            onClick={() => toggleAnswer('included')}>
                                <h2 className='font-semibold text-[36px] text-white'>What's included?</h2>
                                <span className='text-[14px] text-gray-200 ml-10'>{answersVisible['included'] ? "(close)" : "(open)"}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`absolute right-0 ${answersVisible['included'] && "rotate-180"}`} width={32} height={32} viewBox="0 0 24 24"><g fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}><circle cx={12} cy={12} r={9}></circle><path d="m15 13l-3-3l-3 3"></path></g></svg>
                            </div>
                            <div className={`my-4 text-gray-200 text-[18px] -py-1 ${answersVisible['included'] ? undefined : "hidden"}`}>
                                <h3 className='font-semibold text-[20px] mb-2'>TRAVEL</h3>
                                {tour?.included?.travel.map((activity, i) => {
                                    return (
                                        <p key={i} className='py-1'>{activity}</p>
                                    )
                                })}
                                <h3 className='font-semibold text-[20px] mt-6 mb-2'>ACCOMODATION</h3>
                                {tour?.included?.accomodation.map((activity, i) => {
                                    return (
                                        <p key={i} className='py-1'>{activity}</p>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='w-full flex flex-col border-b border-gray-300 pb-4 mt-16'>
                            <div className='w-full flex flex-row items-center relative cursor-pointer'
                            onClick={() => toggleAnswer('needed')}>
                                <h2 className='font-semibold text-[36px] text-white'>What do you need to join us?</h2>
                                <span className='text-[14px] text-gray-200 ml-10'>{answersVisible['needed'] ? "(close)" : "(open)"}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`absolute right-0 ${answersVisible['needed'] && "rotate-180"}`} width={32} height={32} viewBox="0 0 24 24"><g fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}><circle cx={12} cy={12} r={9}></circle><path d="m15 13l-3-3l-3 3"></path></g></svg>
                            </div>
                            <p className={`my-4 text-gray-200 text-[18px] ${answersVisible['needed'] ? undefined : "hidden"}`}>{tour?.needed}</p>
                        </div>
                        <div className='mt-16'>
                            <h2 className='font-semibold text-[36px] text-white mb-8'>Gallery</h2>
                            <div className='w-full  overflow-hidden'>
                            <ResponsiveMasonry
                                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
                            >
                                <Masonry columnsCount={3} gutter="15px">
                                    {tour?.gallery.map((image, i) => (
                                        <img
                                            key={i}
                                            src={image}
                                            style={{width: "100%", display: "block", cursor: "pointer"}}
                                            onClick={() => viewImage(image, i)}
                                        />
                                    ))}
                                </Masonry>
                            </ResponsiveMasonry>
                            </div>
                        </div>
                    </div>
                    <div className=' min-w-[400px] h-[815px] flex flex-col justify-between sticky -top-[220px] tall:-top-[80px] vtall:top-[60px]'>
                        <div className='min-h-[700px] w-full border border-gray-300 rounded-lg relative overflow-hidden'>
                            <img src="/tour-page/info-card.png" className='absolute object-cover object-center h-full -z-20'/>
                            <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50 -z-10'/>
                            <div className='flex flex-col w-full p-5 h-[700px] justify-between'>
                                <h3 className='font-semibold text-[36px] text-white'>Overview</h3>
                                <ul className='w-full h-[450px] flex flex-col justify-between'>
                                    <li className='w-full flex flex-row justify-between text-[20px]'>
                                        <span className='font-medium  text-gray-200'>Duration</span>
                                        <span className='font-semibold text-white '>{tour?.duration} days</span>
                                    </li>
                                    <li className='w-full flex flex-row justify-between text-[20px]'>
                                        <span className='font-medium text-gray-200 '>Group Size</span>
                                        <span className='font-semibold text-white'>{tour?.['group-size']}</span>
                                    </li>
                                    <li className='w-full flex flex-row justify-between text-[20px]'>
                                        <span className='font-medium  text-gray-200'>Dates</span>
                                        <span className='font-semibold text-white '>{tour?.dates}</span>
                                    </li>
                                    <li className='w-full flex flex-row justify-between text-[20px]'>
                                        <span className='font-medium  text-gray-200'>Starts</span>
                                        <span className='font-semibold text-white'>{tour?.starts}</span>
                                    </li>
                                    <li className='w-full flex flex-row justify-between text-[20px]'>
                                        <span className='font-medium  text-gray-200'>Finishes</span>
                                        <span className='font-semibold text-white'>{tour?.finishes}</span>
                                    </li>
                                    {Object.entries(tour?.scores).map(([key, val], i)=> {
                                            return (
                                                <li key={i} className='w-full flex flex-row justify-between text-[20px] relative'>
                                                    <span className='font-medium text-gray-200 '>{key}</span>
                                                    <span className='font-semibold' style={{ color: colorGenerator(val) }}>{val}</span>
                                                    <div className='absolute w-[150px] left-[145px] top-[10px] h-[12px] rounded-r-md'
                                                    style={{backgroundColor: colorGenerator(val),
                                                            width: `${(150/10) * val}px`
                                                    }}
                                                    />
                                                </li>
                                            )
                                    })}
                                </ul>
                                <div className='w-full h-[90px] flex flex-row justify-between'>
                                    <span className='font-medium text-[20px] text-gray-200'>Price</span>
                                    <span className='font-semibold text-[52px] text-white tracking-wide'>{formatNumber(tour?.price)}</span>
                                </div>
                            </div>
                        </div>
                        <button className='font-semibold  text-white w-full py-4 rounded-md bg-gradient-to-r from-custom-orange to-custom-pink text-[24px]'>BOOK NOW</button>
                    </div>
                </div>
            </div>
        </div>
    )
}