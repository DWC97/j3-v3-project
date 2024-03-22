"use client"

import storeItemsData from "@/data/storeItems.json"
import { useState } from "react";
import { useClickOutside } from '@/hooks/useClickOutside';

export default function Store(){

    const [sortBy, setSortBy] = useState('popularity');
    const [showSortOptions, setShowSortOptions] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);

    const filteredItems = storeItemsData.items.filter(item => {
        if (selectedCategory && selectedCategory !== item.type) {
            return false
        }
        if (selectedColor && selectedColor !== item.color) {
            return false
        }
        return true
    })

    const sortedItems = filteredItems.sort((a, b) => {
        if (sortBy === 'popularity') {
            return b.popularity - a.popularity;
        } else if (sortBy === 'price') {
            return a.price - b.price;
        }
        else {
            return b.price - a.price;
        }
    });

    let domNode = useClickOutside(() => {
        setShowSortOptions(false)
    })

    const handleCategoryChange = (category) => {
        if (selectedCategory === category) {
            setSelectedCategory(null);
        } else {
            setSelectedCategory(category);
        }
    };
    
    const handleColorChange = (color) => {
        if (selectedColor === color) {
            setSelectedColor(null);
        } else {
            setSelectedColor(color);
        }
    };

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
                        <ul className="absolute bg-white top-8 right-0 rounded-md overflow-hidden" ref={domNode}>
                            <li className={`hover:bg-gray-100 cursor-pointer ${sortBy === "popularity" ? "text-black" : "text-gray-500"} p-3`}
                            onClick={() => {
                                setSortBy("popularity")
                                setShowSortOptions(!showSortOptions)
                            }}
                            >Most Popular</li>
                            <li className={`hover:bg-gray-100 cursor-pointer ${sortBy === "price" ? "text-black" : "text-gray-500"} p-3`}
                            onClick={() => {
                                setSortBy("price")
                                setShowSortOptions(!showSortOptions)
                            }}
                            >Price: Low to High</li>
                            <li className={`hover:bg-gray-100 cursor-pointer ${sortBy === "price" ? "text-black" : "text-gray-500"} p-3`}
                            onClick={() => {
                                setSortBy("price-high")
                                setShowSortOptions(!showSortOptions)
                            }}
                            >Price: High to Low</li>
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
                                <input type="checkbox" 
                                className="mr-3"
                                checked={selectedCategory === 't-shirt'}
                                onChange={() => handleCategoryChange('t-shirt')}
                                />
                                Tees
                            </label>
                        </div>
                        <div className="pb-1">
                            <label className="text-gray-300">
                                <input type="checkbox" 
                                className="mr-3"
                                checked={selectedCategory === 'hoodie'}
                                onChange={() => handleCategoryChange('hoodie')}
                                />
                                Hoodies
                            </label>
                        </div>
                        <div className="pb-1">
                            <label className="text-gray-300">
                                <input type="checkbox" 
                                className="mr-3"
                                checked={selectedCategory === 'tank-top'}
                                onChange={() => handleCategoryChange('tank-top')}
                                />
                                Tank Tops
                            </label>
                        </div>
                        <div className="">
                            <label className="text-gray-300">
                                <input type="checkbox" 
                                className="mr-3"
                                checked={selectedCategory === 'accessory'}
                                onChange={() => handleCategoryChange('accessory')}
                                />
                                Accesories
                            </label>
                        </div>
                    </div>
                    <div className="w-full flex flex-col mt-12">
                        <span className="text-white pb-4">Color</span>
                        <div className="pb-1">
                            <label className="text-gray-300">
                                <input type="checkbox" 
                                className="mr-3"
                                checked={selectedColor === 'Black'}
                                onChange={() => handleColorChange('Black')}
                                />
                                Black
                            </label>
                        </div>
                        <div className="pb-1">
                            <label className="text-gray-300">
                                <input type="checkbox" 
                                className="mr-3"
                                checked={selectedColor === 'White'}
                                onChange={() => handleColorChange('White')}
                                />
                                White
                            </label>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-10 w-3/4">
                    {sortedItems.length > 0 ? sortedItems.map(item => {
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
                    })
                    :
                    <div className="text-white text-[20px]">
                        No results found...
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}