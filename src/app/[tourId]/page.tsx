"use client"

import toursData from "@/data/tours.json"

export default function tourDetails({ params }: { params: { tourId: string }}){

    const tour = toursData.tours.find(tour => {
        return tour.region === params.tourId
    })

    return (
        <div>
            <div className="w-full h-[400px] relative flex flex-col justify-end">
                <img src={tour?.imageSrc} className="absolute object-cover object-center w-full h-[400px] -z-30"/>
                <div className="absolute h-[200px] w-full top-0 left-0 bg-gradient-to-b from-black to-transparent opacity-35 z-0"/>
                <div className="absolute h-[200px] w-full bottom-0 left-0 bg-gradient-to-t from-black to-transparent opacity-35 z-0"/>
                <div className="w-full h-1/2 flex flex-col justify-center z-10 pl-10">
                    <h1 className="font-semibold text-[56px] text-white tracking-wide">{tour?.region.toUpperCase().replace("-"," ")}</h1>
                    <h3 className="text-[32px] text-gray-200">{tour?.title.toUpperCase()}</h3>
                </div>
            </div>
        </div>
    )
}