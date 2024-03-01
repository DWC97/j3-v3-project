"use client"

import Link from 'next/link'
import toursData from "@/data/tours.json"

export default function tourDetails({ params }: { params: { tourId: string }}){

    const tour = toursData.tours.find(tour => {
        return tour.region === params.tourId
    })

    return (
        <div className="bg-black -z-50">
            <div className="w-full h-[400px] relative flex flex-col justify-end z-0">
                <img src={tour?.imageSrc} className="absolute object-cover object-center w-full h-[400px] -z-10"/>
                <div className="absolute h-[200px] w-full top-0 left-0 bg-gradient-to-b from-black to-transparent opacity-35 z-0"/>
                <div className="absolute h-[200px] w-full bottom-0 left-0 bg-gradient-to-t from-black to-transparent opacity-35 z-0"/>
                <div className="w-full h-1/2 flex flex-col justify-center z-10 pl-10">
                    <h1 className="font-semibold text-[56px] text-white tracking-wide">{tour?.region.toUpperCase().replace("-"," ")}</h1>
                    <h3 className="text-[32px] text-gray-200">{tour?.title.toUpperCase()}</h3>
                </div>
            </div>
            <Link href={"/#tours"} className="ml-10 mt-5 bg-black flex flex-row items-center w-[230px]">
                <span className="text-gray-200 text-[14px] font-semibold">BACK TO TOUR SELECTION</span>
                <svg xmlns="http://www.w3.org/2000/svg" className='pl-3' width={32} height={32} viewBox="0 0 16 16"><path fill="white" fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"></path></svg>
            </Link>
            <div className="w-full flex flex-row relative">
                <div className="flex flex-col">

                </div>
            </div>
        </div>
    )
}