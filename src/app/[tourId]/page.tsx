"use client"

import toursData from "@/data/tours.json"

export default function tourDetails({ params }: { params: { tourId: string }}){

    const tour = toursData.tours.find(tour => {
        return tour.region === params.tourId
    })
    console.log(toursData)
    console.log(tour)

    return (
        <div>
            tour page for {tour?.region}
        </div>
    )
}