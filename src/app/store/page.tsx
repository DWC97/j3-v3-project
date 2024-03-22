"use client"

import storeItemsData from "@/data/storeItems.json"
import { useState } from "react";

export default function Store(){

    const [sortBy, setSortBy] = useState('popularity');
    const [showSortOptions, setShowSortOptions] = useState(false);

    function handleSortChange(e){
        setSortBy(e.target.value);
    }

    const sortedProducts = storeItemsData.items.sort((a, b) => {
        if (sortBy === 'popularity') {
          return b.popularity - a.popularity;
        } else if (sortBy === 'price') {
          return a.price - b.price;
        }
    });

    return (
        <div className="bg-black min-h-screen w-full px-12 pt-[180px]">
            <div className="w-full h-[180px] border-b border-gray-300 flex flex-col justify-center">
                <h1 className="text-white font-bold text-[40px] mb-2">Merchandise</h1>
                <div className="flex flex-row justify-between items-center relative">
                    <span className="text-gray-300">Join the JR crew early with our custom apparel and accessories for Season 1</span>
                    <div className="flex flex-row justify-between items-center w-[3.5rem] cursor-pointer text-gray-300 hover:text-white"
                    onClick={() => setShowSortOptions(!showSortOptions)}
                    >
                        <span className=" font-semibold ">Sort</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className='rotate-180' width={12} height={12} viewBox="0 0 16 16"><path fill="white" d="m2.931 10.843l4.685-4.611a.546.546 0 0 1 .768 0l4.685 4.61a.55.55 0 0 0 .771 0a.53.53 0 0 0 0-.759l-4.684-4.61a1.65 1.65 0 0 0-2.312 0l-4.684 4.61a.53.53 0 0 0 0 .76a.55.55 0 0 0 .771 0"></path></svg>
                        
                    </div>
                    {showSortOptions && 
                        <ul className="absolute bg-white top-8 right-0 rounded-md overflow-hidden">
                            <li className={`hover:bg-gray-100 cursor-pointer ${sortBy === "popularity" ? "text-black" : "text-gray-500"} p-4`}>Popularity</li>
                            <li className={`hover:bg-gray-100 cursor-pointer ${sortBy === "price" ? "text-black" : "text-gray-500"} p-4`}>Price</li>
                        </ul>
                        }
                </div>
            </div>
            <div className="w-full flex flex-row justify-between py-12">
                <div className="w-1/4 flex flex-col">
                    <div className="w-full flex flex-col">
                        <span className="text-white pb-4">Category</span>
                        <div className="pb-1">
                            <label className="text-gray-300">
                                <input type="checkbox" className="mr-3"/>
                                Tees
                            </label>
                        </div>
                        <div className="pb-1">
                            <label className="text-gray-300">
                                <input type="checkbox" className="mr-3"/>
                                Hoodies
                            </label>
                        </div>
                        <div className="pb-1">
                            <label className="text-gray-300">
                                <input type="checkbox" className="mr-3"/>
                                Wife Beaters
                            </label>
                        </div>
                        <div className="">
                            <label className="text-gray-300">
                                <input type="checkbox" className="mr-3"/>
                                Accesories
                            </label>
                        </div>
                    </div>
                    <div className="w-full flex flex-col mt-12">
                        <span className="text-white pb-4">Color</span>
                        <div className="pb-1">
                            <label className="text-gray-300">
                                <input type="checkbox" className="mr-3"/>
                                Black
                            </label>
                        </div>
                        <div className="pb-1">
                            <label className="text-gray-300">
                                <input type="checkbox" className="mr-3"/>
                                White
                            </label>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-10 w-3/4">
                    {sortedProducts.map(item => {
                        return (
                            <div className="flex flex-col justify-between">
                                <img src={item.gallery[0]} className="w-full aspect-[5/6] object-cover rounded-t-lg"/>
                                <div className="flex flex-row justify-between items-center text-white pt-4 pb-1">
                                    <span>{item.name}</span>
                                    <span className="font-semibold">£{item.price}</span>
                                </div>
                                <span className="text-gray-300">{item.color}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}