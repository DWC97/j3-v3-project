"use client"

import Link from 'next/link'
import toursData from "@/data/tours.json"
import { formatNumber } from '@/utilities/Utils';
import { useEffect, useRef, useState } from 'react';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import useBodyLockScroll from '@/hooks/useBodyLockScroll';
import { useClickOutside } from '@/hooks/useClickOutside';
import { Reveal } from '@/context/Reveal';
import { Slide } from '@/context/Slide';
import NotFound from '../not-found';
import Swal from 'sweetalert2'
import Image from 'next/image';

interface Gallery {
    image: string;
    i: number;
}
  
interface AnswersVisible {
[key: string]: boolean;
}

export default function TourDetails({ params }: { params: { tourId: string }}){

    const tour = toursData.tours.find(tour => {
        return tour.region === params.tourId
    })
    const [answersVisible, setAnswersVisible] = useState<AnswersVisible>({})
    const [gallery, setGallery] = useState<Gallery>({ image: "", i: 0 })
    const [toggle] = useBodyLockScroll() // toggle scroll lock
    const prevArrowRef = useRef<HTMLDivElement>(null)
    const nextArrowRef = useRef<HTMLDivElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)
    const [isOverlayActive, setIsOverlayActive] = useState(false)
    const [focusedArrow, setFocusedArrow] = useState("")
    // let mobileView = window.innerWidth < 640

    let domNode = useClickOutside(() => {
        if (!gallery.image) return
        setGallery({ image: "", i: 0 })
        toggle()
        setIsOverlayActive(false)
    })

    // Function to toggle visibility of answer for a specific heading
    function toggleAnswer(heading: string): void{
        setAnswersVisible(prevState => ({
        ...prevState,
        [heading]: !prevState[heading]
        }));
    };

    function viewImage(image: string, i: number): void {
        if (window.innerWidth < 640) return
        setGallery({ image, i })
        toggle()
        setIsOverlayActive(true)
    }

    function colorGenerator(val: number): string {
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

    function handleSubmit(){
        Swal.fire({
            title: "Sorry!",
            text: "Booking is currently unavailable while we sort out our licensing.",
            icon: "error",
            timer: 5000,
            footer: '<a className="text-custom-pink" href="#contact">Click here to reserve a spot</a>',
            timerProgressBar: true,
            showConfirmButton: false,
            scrollbarPadding: false,
        });
    }

    function handlePrev(): void {
        if (!tour) return;  // This guard remains the same
        const lastIndex = tour?.gallery?.length? - 1 ?? 0;
        const newIndex = gallery.i === 0 ? lastIndex : gallery.i - 1;
        if (tour?.gallery) {
            setGallery({ image: tour.gallery[newIndex], i: newIndex });
        }
    }
      
    function handleNext(): void {
        if (!tour) return;  // This guard remains the same
        const lastIndex = tour?.gallery?.length? - 1 ?? 0;
        const newIndex = gallery.i === lastIndex ? 0 : gallery.i + 1;
        if (tour?.gallery) {
            setGallery({ image: tour.gallery[newIndex], i: newIndex });
        }
    }
        
    function handleKeyDown(e: KeyboardEvent): void {

        if (!isOverlayActive) return;
        
        switch (e.key) {
            case "Tab":
            e.preventDefault();
            if (focusedArrow === "" || focusedArrow === "prev") {
                nextArrowRef.current?.focus();
            } else {
                prevArrowRef.current?.focus();
            }
            break;
            case "Enter":
            if (focusedArrow === "" || focusedArrow === "next") {
                handleNext();
            } else {
                handlePrev();
            }
            break;
            case "ArrowLeft":
            handlePrev();
            prevArrowRef.current?.focus();
            break;
            case "ArrowRight":
            handleNext();
            nextArrowRef.current?.focus();
            break;
            case "Escape":
            setGallery({ image: "", i: 0 });
            toggle();
            setIsOverlayActive(false);
            break;
            default:
            break;
        }
    }

    useEffect(() => {
        if (gallery.image){
            overlayRef.current?.focus()
        }
        
    }, [isOverlayActive, gallery.image])

    return (
        <div>
            {tour ? 
            <div className="bg-black -z-50 pb-8">
            {gallery.image && 
                <div className='fixed overflow-hidden top-0 left-0 h-screen w-full z-50 flex flex-col justify-center items-center focus:outline-none'
                tabIndex={0}
                ref={overlayRef}
                onKeyDown={(e) => handleKeyDown(e)}
                >
                    <div className='absolute bg-black opacity-70 z-[50] h-screen w-full'/>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => {
                        setGallery({ image: "", i: 0 })
                        toggle()
                        setIsOverlayActive(false)
                    }} className='absolute top-5 right-5 cursor-pointer z-[900] hover:opacity-85 ease-in-out duration-300' width={40} height={40} viewBox="0 0 24 24"><path fill="white" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"></path></svg>
                    <div ref={domNode} className='relative flex flex-row justify-center items-center z-50 h-[80%] max-w-[80%]  pb-16 mt-16'>
                        <div className='w-[80px] h-full bg-black ease-in-out duration-300 cursor-pointer bg-opacity-0 hover:bg-opacity-80 focus:bg-opacity-80 flex justify-center items-center focus:outline-none' tabIndex={0} ref={prevArrowRef} 
                        onClick={handlePrev}
                        onFocus={() => setFocusedArrow("prev")}>
                            <svg xmlns="http://www.w3.org/2000/svg"  className='' width={60} height={60} viewBox="0 0 1024 1024"><path fill="white" d="M609.408 149.376L277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0a30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688a29.12 29.12 0 0 0-41.728 0"></path></svg>
                        </div>
                        <div className='h-full max-w-full relative'>
                            <div className='w-[80vh] aspect-square relative'>
                                <Image
                                    src={gallery.image} 
                                    alt="gallery image"
                                    fill
                                    sizes='(height: 100%)'
                                    className="object-contain"
                                />
                            </div>
                            {/* <img src={gallery.image}  className='object-contain h-full max-w-full'/> */}
                            <span className='absolute bottom-0 py-2 flex justify-center items-center text-gray-200 text-[16px] w-full bg-black bg-opacity-60'>{tour.captions[gallery.i]}</span>
                        </div>
                        
                        <div className='w-[80px] h-full bg-black ease-in-out duration-300 cursor-pointer bg-opacity-0 hover:bg-opacity-80 focus:bg-opacity-80 flex justify-center items-center focus:outline-none ' tabIndex={0} ref={nextArrowRef} 
                        onClick={handleNext}
                        onFocus={() => setFocusedArrow("next")}>
                            <svg xmlns="http://www.w3.org/2000/svg"  className='rotate-180' width={60} height={60} viewBox="0 0 1024 1024"><path fill="white" d="M609.408 149.376L277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0a30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688a29.12 29.12 0 0 0-41.728 0"></path></svg>
                        </div>
                        <div className='absolute bottom-5 left-50 flex flex-row justify-center items-center z-[60]'>
                        {tour?.gallery?.map((image, i) => {
                            if (gallery.i === i){
                                return (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 16 16"><circle cx={8} cy={8} r={4} fill="white"></circle></svg>
                                )
                            }
                            else {
                                return (
                                    <svg key={i} onClick={() => {
                                        setGallery({ image: tour.gallery[i], i: i})
                                    }} xmlns="http://www.w3.org/2000/svg" className='z-[90] cursor-pointer ease-in-out duration-300' width={20} height={20} viewBox="0 0 16 16"><path fill="white" d="M4 8a4 4 0 1 1 8 0a4 4 0 0 1-8 0m4-2.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5"></path></svg>
                                )
                            } 
                        })}
                    </div>
                    </div>
                    
                </div>
            }
                <div className="w-full h-[400px] relative flex flex-col justify-end z-0">
                    <div className='absolute object-center w-full h-[400px] -z-10'>
                        <Image
                            src={tour?.imageSrc}
                            alt="destination bg"
                            fill
                            sizes='(height: 100%)'
                            className="object-cover"
                            priority
                        />
                    </div>
                    {/* <img src={tour?.imageSrc} className="absolute object-cover object-center w-full h-[400px] -z-10"/> */}
                    <div className="absolute h-[200px] w-full top-0 left-0 bg-gradient-to-b from-black to-transparent opacity-35 z-0"/>
                    <div className="absolute h-[200px] w-full bottom-0 left-0 bg-gradient-to-t from-black to-transparent opacity-35 z-0"/>
                    <div className="w-full h-1/2 flex flex-col justify-center z-10 px-10 xl:px-20 2xl:px-60">
                        <Reveal>
                            <h1 className="font-bold text-[40px] md:text-[56px] text-white tracking-wide">{tour?.region.toUpperCase().replace("-"," ")}</h1>
                        </Reveal>
                        <Reveal>
                            <h3 className="text-[28px] md:text-[32px] text-gray-200 font-medium">{tour?.title.toUpperCase()}</h3>
                        </Reveal>
                    </div>
                </div>
                <div className='px-10 xl:px-20 2xl:px-60'>
                    <Link href={"/#tours"} className="mt-5 mb-10 bg-black flex flex-row items-center w-[230px] hover:opacity-85 ease-in-out duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className='pl-3 rotate-180' width={32} height={32} viewBox="0 0 16 16"><path fill="white" fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"></path></svg>
                        <span className="text-gray-200 text-[14px] font-semibold">BACK TO TOUR SELECTION</span>    
                    </Link>
                    <div className="w-full flex md:gap-0 gap-20 flex-col-reverse md:flex-row justify-between relative ">
                        <div className="flex flex-col md:mr-10">
                            <div className='text-white'>
                                <p className='text-[20px] font-medium mb-4'>{tour?.tagline}</p>
                                <p className='text-[18px] text-gray-100 mb-4'>{tour?.description1}</p>
                                <p className='text-[18px] text-gray-100'>{tour?.description2}</p>
                            </div>
                            <Slide>
                                <div className={`mt-10 mb-16 w-full  relative`}>
                                    <Image
                                        src={tour?.mapUrl ?? ""}
                                        alt="tour map"
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </div>
                                {/* <img src={tour?.mapUrl} className='mt-10 mb-16 w-full'/> */}
                            </Slide>
                            <div className={`w-full flex flex-col border-b border-gray-300 pb-4 `} >
                                <div className='w-full flex flex-row items-center relative cursor-pointer hover:opacity-85 ease-in-out duration-300' 
                                onClick={() => toggleAnswer('activities')}
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter"){
                                        toggleAnswer('activities')
                                    }
                                }}
                                >
                                    <h2 className='font-semibold text-[28px] sm:text-[36px] text-white'>Activities</h2>
                                    <span className='text-[14px] text-gray-200 ml-10 hidden lg:block'>{answersVisible['activities'] ? "(close)" : "(open)"}</span>  
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`absolute right-0 ${answersVisible['activities'] && "rotate-180"} `} width={32} height={32} viewBox="0 0 24 24"><g fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}><circle cx={12} cy={12} r={9}></circle><path d="m15 13l-3-3l-3 3"></path></g></svg>
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
                                <div className='w-full flex flex-row items-center relative cursor-pointer hover:opacity-85 ease-in-out duration-300'
                                onClick={() => toggleAnswer('included')}
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter"){
                                        toggleAnswer('included')
                                    }
                                }}
                                >
                                    <h2 className='font-semibold text-[28px] sm:text-[36px] text-white pr-8'>What&apos;s included?</h2>
                                    <span className='text-[14px] hidden lg:block text-gray-200 ml-10'>{answersVisible['included'] ? "(close)" : "(open)"}</span>
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
                                <div className='w-full flex flex-row items-center relative cursor-pointer hover:opacity-85 ease-in-out duration-300'
                                onClick={() => toggleAnswer('needed')}
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter"){
                                        toggleAnswer('needed')
                                    }
                                }}
                                >
                                    <h2 className='font-semibold text-[28px] sm:text-[36px] text-white pr-8'>What do you need to join us?</h2>
                                    <span className='text-[14px] text-gray-200 ml-10 hidden lg:block'>{answersVisible['needed'] ? "(close)" : "(open)"}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`absolute right-0 ${answersVisible['needed'] && "rotate-180"}`} width={32} height={32} viewBox="0 0 24 24"><g fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}><circle cx={12} cy={12} r={9}></circle><path d="m15 13l-3-3l-3 3"></path></g></svg>
                                </div>
                                <p className={`my-4 text-gray-200 text-[18px] ${answersVisible['needed'] ? undefined : "hidden"}`}>{tour?.needed}</p>
                            </div>
                            <div className='mt-16'>
                                <h2 className='font-semibold text-[28px] sm:text-[36px] text-white mb-8'>Gallery</h2>
                                <div className='w-full  overflow-hidden '>
                                <ResponsiveMasonry
                                    columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
                                >
                                    <Masonry columnsCount={3} gutter="15px">
                                        {tour?.gallery?.map((image, i) => (
                                            <div className='relative w-full h-full overflow-hidden hover:opacity-70 ease-in-out duration-300 cursor-pointer' key={i} onClick={() => {
                                                viewImage(image, i)
                                            }}>
                                                {/* <img
                                                src={image}
                                                style={{width: "100%", display: "block", cursor: "pointer"}}
                                                onClick={() => {
                                                    viewImage(image, i)
                                                }}
                                                /> */}
                                                <Image
                                                    src={image}
                                                    alt="gallery image"
                                                    width={0}
                                                    height={0}
                                                    sizes="100vw"
                                                    style={{ width: '100%', height: '100%' }}
                                                />
                                            </div>
                                        ))}
                                    </Masonry>
                                </ResponsiveMasonry>
                                </div>
                            </div>
                        </div>
                        <div className='w-full md:w-[280px] lg:min-w-[400px] h-[815px] flex flex-col justify-between md:sticky -top-[220px] tall:-top-[80px] vtall:top-[60px]'>
                            <div className='min-h-[700px] w-full border border-gray-500 rounded-lg relative overflow-hidden z-0'
                            style={{backgroundImage: "url(" + tour.cardSrc + ")",
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                            }}
                            >
                                {/* <img src={tour?.cardSrc} className='w-full absolute object-cover object-center h-full -z-20'/> */}
                                <div className='absolute top-0 left-0 w-full h-full bg-black opacity-30 z-[1]'/>
                                <div className='flex flex-col w-full p-5 h-[700px] justify-between '>
                                    <h3 className='font-semibold text-[36px] text-white z-30'>Overview</h3>
                                    <ul className='w-full h-[450px] flex flex-col justify-between'>
                                        <li className='w-full flex flex-row justify-between text-[20px] lg:text-[20px] md:text-[16px] z-30'>
                                            <span className='font-medium  text-white'>Duration</span>
                                            <span className='font-semibold text-white '>{tour?.duration} days</span>
                                        </li>
                                        <li className='w-full flex flex-row justify-between text-[20px] lg:text-[20px] md:text-[16px] z-30'>
                                            <span className='font-medium text-white '>Group Size</span>
                                            <span className='font-semibold text-white'>{tour?.['group-size']}</span>
                                        </li>
                                        <li className='w-full flex flex-row justify-between text-[20px] lg:text-[20px] md:text-[16px] z-30'>
                                            <span className='font-medium  text-white'>Dates</span>
                                            <span className='font-semibold text-white '>{tour?.dates}</span>
                                        </li>
                                        <li className='w-full flex flex-row justify-between text-[20px] lg:text-[20px] md:text-[16px] z-30'>
                                            <span className='font-medium  text-white'>Starts</span>
                                            <span className='font-semibold text-white'>{tour?.starts}</span>
                                        </li>
                                        <li className='w-full flex flex-row justify-between text-[20px] lg:text-[20px] md:text-[16px] z-30'>
                                            <span className='font-medium  text-white'>Finishes</span>
                                            <span className='font-semibold text-white'>{tour?.finishes}</span>
                                        </li>
                                        {Object.entries(tour?.scores ?? {}).map(([key, val], i)=> {
                                                return (
                                                    <li key={i} className=' w-full flex flex-row justify-between text-[20px] lg:text-[20px] md:text-[16px] relative z-30'>
                                                        <span className='font-medium text-white '>{key}</span>
                                                        <span className='font-semibold' style={{ color: colorGenerator(val) }}>{val}</span>
                                                        <div className='hidden sm:block md:hidden lg:block absolute w-[150px] sm:left-[250px] lg:left-[145px] top-[10px] h-[12px] rounded-r-md'
                                                        style={{backgroundColor: colorGenerator(val),
                                                                width: `${(150/10) * val}px`
                                                        }}
                                                        />
                                                    </li>
                                                )
                                        })}
                                    </ul>
                                    <div className='w-full h-[90px] flex flex-row justify-between'>
                                        <span className='font-medium text-[20px] lg:text-[20px] md:text-[16px] text-white z-30'>Price</span>
                                        <span className='font-semibold text-[36px]  lg:text-[52px] text-white tracking-wide pt-8 lg:pt-0 z-30'>{tour && formatNumber(tour?.price)}</span>
                                    </div>
                                </div>
                            </div>
                            <button className='font-semibold  text-white w-full py-4 rounded-md bg-gradient-to-r from-custom-orange to-custom-pink text-[24px] hover:opacity-85 ease-in-out duration-300'
                            onClick={handleSubmit} 
                            onKeyDown={(e) => {
                                if (e.key === "Enter"){
                                    handleSubmit()
                                }
                            }}
                            >BOOK NOW</button>
                        </div>
                    </div>
                </div>
            </div>
            :
            <NotFound />    
            }
        </div>
    )
}