"use client"

import storeItemsData from "@/data/storeItems.json"
import { useState } from "react"

export default function itemDetails({ params }: { params: { itemId: string }}){
    
    const item = storeItemsData.items.find(item => {
        return item.name === params.itemId.replaceAll("%20", " ")
    })
    const [activeSize, setActiveSize] = useState("XS")
   

    return (
        <div className="w-full min-h-screen bg-black px-12 pt-[180px]">
            <div className="w-full flex flex-row-reverse justify-between">
                <div className="flex flex-col w-1/2 border border-white">
                    <h2 className="text-white font-bold text-[32px]">{item?.name}</h2>
                    <span className="text-white text-[36px]">£{item?.price}</span>
                    <p className="text-gray-300 mt-4 text-[14px]">{item?.description}</p>
                    {item?.sizes &&
                    <div className="flex flex-row w-full gap-3 mt-8">
                        <button className={`w-full ${activeSize === "XS" ? "text-white bg-custom-pink border-custom-pink" : "bg-none border-gray-300 hover:border-custom-pink hover:text-custom-pink"} text-white border  py-3 text-[14px] rounded-md font-semibold`}
                        onClick={() => setActiveSize("XS")}
                        >XS</button>
                        <button className={`w-full ${activeSize === "S" ? "text-white bg-custom-pink border-custom-pink" : "bg-none border-gray-300 hover:border-custom-pink hover:text-custom-pink"} text-white border  py-3 text-[14px] rounded-md font-semibold`}
                        onClick={() => setActiveSize("S")}
                        >S</button>
                        <button className={`w-full ${activeSize === "M" ? "text-white bg-custom-pink border-custom-pink" : "bg-none border-gray-300 hover:border-custom-pink hover:text-custom-pink"} text-white border  py-3 text-[14px] rounded-md font-semibold`}
                        onClick={() => setActiveSize("M")}
                        >M</button>
                        <button className={`w-full ${activeSize === "L" ? "text-white bg-custom-pink border-custom-pink" : "bg-none border-gray-300 hover:border-custom-pink hover:text-custom-pink"} text-white border  py-3 text-[14px] rounded-md font-semibold`}
                        onClick={() => setActiveSize("L")}
                        >L</button>
                        <button className={`w-full ${activeSize === "XL" ? "text-white bg-custom-pink border-custom-pink" : "bg-none border-gray-300 hover:border-custom-pink hover:text-custom-pink"} text-white border  py-3 text-[14px] rounded-md font-semibold`}
                        onClick={() => setActiveSize("XL")}
                        >XL</button>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}