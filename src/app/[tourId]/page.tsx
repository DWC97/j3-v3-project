"use client"

import toursData from "@/data/tours.json"

export default function tourDetails({ params }: { params: { tourId: string }}){

    const tour = toursData.tours.find(tour => {
        return tour.region === params.tourId
    })

    return (
        <div>
            <div className="w-full h-[400px] relative">
                <img src={tour?.imageSrc} className="absolute object-cover object-center w-full h-[400px]" />
            </div>
        </div>
    )
}