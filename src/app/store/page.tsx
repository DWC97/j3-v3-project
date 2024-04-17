"use client"

import storeItemsData from "@/data/storeItems.json"
import { Suspense, useState } from "react";
import { useClickOutside } from '@/hooks/useClickOutside';
import Link from 'next/link'
import Image from "next/image";

interface StoreItem {
    id: number;
    name: string;
    type: string;
    color: string;
    price: number;
    popularity: number;
    gallery: string[];
}

export default function Store(){

    const [sortBy, setSortBy] = useState<string>('popularity');
    const [showSortOptions, setShowSortOptions] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    const filteredItems: StoreItem[] = storeItemsData.items.filter(item => {
        if (selectedCategory && selectedCategory !== item.type) {
            return false
        }
        if (selectedColor && selectedColor !== item.color) {
            return false
        }
        return true
    })

    const sortedItems: StoreItem[] = filteredItems.sort((a, b) => {
        if (sortBy === 'popularity') {
            return b.popularity - a.popularity;
        } else if (sortBy === 'price') {
            return a.price - b.price;
        }
        else {
            return b.price - a.price;
        }
    });

    let domNode = useClickOutside<HTMLUListElement>(() => {
        setShowSortOptions(false)
    })

    const handleCategoryChange = (category: string) => {
        if (selectedCategory === category) {
            setSelectedCategory(null);
        } else {
            setSelectedCategory(category);
        }
    };
    
    const handleColorChange = (color: string) => {
        if (selectedColor === color) {
            setSelectedColor(null);
        } else {
            setSelectedColor(color);
        }
    };

    return (
        <div className="bg-black min-h-[90vh] w-full px-12 pt-[120px]">
            <div className="w-full h-[180px] border-b border-gray-300 flex flex-col justify-center">
                <h1 className="text-white font-bold text-[32px] md:text-[40px] mb-2">Merchandise</h1>
                <div className="flex flex-row justify-between items-center relative">
                    <span className="text-gray-300 pr-8 md:text-[16px] text-[14px]">Join the JR crew early with our custom apparel and accessories for Season 1</span>
                    <div className="flex flex-row justify-between items-center w-[3.5rem] cursor-pointer text-white hover:opacity-85 ease-in-out duration-300"
                    onClick={() => setShowSortOptions(!showSortOptions)}
                    tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter"){
                                        setShowSortOptions(!showSortOptions)
                                    }
                                }}
                    >
                        <span className=" font-semibold ">Sort</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className='rotate-180' width={12} height={12} viewBox="0 0 16 16"><path fill="white" d="m2.931 10.843l4.685-4.611a.546.546 0 0 1 .768 0l4.685 4.61a.55.55 0 0 0 .771 0a.53.53 0 0 0 0-.759l-4.684-4.61a1.65 1.65 0 0 0-2.312 0l-4.684 4.61a.53.53 0 0 0 0 .76a.55.55 0 0 0 .771 0"></path></svg>
                        
                    </div>
                    {showSortOptions && 
                        <ul className="absolute bg-white top-8 right-0 rounded-md overflow-hidden z-40" ref={domNode}>
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
                            <li className={`hover:bg-gray-100 cursor-pointer ${sortBy === "price-high" ? "text-black" : "text-gray-500"} p-3`}
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
                <div className="w-1/4 flex flex-col min-w-[120px]">
                    <div className="w-full flex flex-col">
                        <span className="text-white pb-4">Category</span>
                        <div className="pb-1">
                            <label className="text-gray-300 hover:opacity-85 cursor-pointer ease-in-out duration-300">
                                <input type="checkbox" 
                                className="mr-3"
                                checked={selectedCategory === 't-shirt'}
                                onChange={() => handleCategoryChange('t-shirt')}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter"){
                                        handleCategoryChange('t-shirt')
                                    }
                                }}
                                />
                                Tees
                            </label>
                        </div>
                        <div className="pb-1">
                            <label className="text-gray-300 hover:opacity-85 cursor-pointer ease-in-out duration-300">
                                <input type="checkbox" 
                                className="mr-3"
                                checked={selectedCategory === 'hoodie'}
                                onChange={() => handleCategoryChange('hoodie')}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter"){
                                        handleCategoryChange('hoodie')
                                    }
                                }}
                                />
                                Hoodies
                            </label>
                        </div>
                        <div className="pb-1">
                            <label className="text-gray-300 hover:opacity-85 cursor-pointer ease-in-out duration-300">
                                <input type="checkbox" 
                                className="mr-3"
                                checked={selectedCategory === 'tank-top'}
                                onChange={() => handleCategoryChange('tank-top')}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter"){
                                        handleCategoryChange('tank-top')
                                    }
                                }}
                                />
                                Tank Tops
                            </label>
                        </div>
                        <div className="">
                            <label className="text-gray-300 hover:opacity-85 cursor-pointer ease-in-out duration-300">
                                <input type="checkbox" 
                                className="mr-3"
                                checked={selectedCategory === 'accessory'}
                                onChange={() => handleCategoryChange('accessory')}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter"){
                                        handleCategoryChange('accessory')
                                    }
                                }}
                                />
                                Accesories
                            </label>
                        </div>
                    </div>
                    <div className="w-full flex flex-col mt-12">
                        <span className="text-white pb-4">Color</span>
                        <div className="pb-1">
                            <label className="text-gray-300 hover:opacity-85 cursor-pointer ease-in-out duration-300">
                                <input type="checkbox" 
                                className="mr-3"
                                checked={selectedColor === 'Black'}
                                onChange={() => handleColorChange('Black')}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter"){
                                        handleColorChange('Black')
                                    }
                                }}
                                />
                                Black
                            </label>
                        </div>
                        <div className="pb-1">
                            <label className="text-gray-300 hover:opacity-85 cursor-pointer ease-in-out duration-300">
                                <input type="checkbox" 
                                className="mr-3"
                                checked={selectedColor === 'White'}
                                onChange={() => handleColorChange('White')}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter"){
                                        handleColorChange('White')
                                    }
                                }}
                                />
                                White
                            </label>
                        </div>
                    </div>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10 w-3/4 sm:pl-0 pl-4">
                    {sortedItems.length > 0 ? sortedItems.map(item => {
                        return (
                            <Suspense fallback={<ItemCardSkeleton />} key={item.id}>
                                <ItemCard item={item} />
                            </Suspense>
                            
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

interface ItemCardProps {
    item: StoreItem; 
}

function ItemCard({ item }: ItemCardProps){

    return (
        <Link href={`/store/${item.name}`} className="flex flex-col justify-between hover:opacity-85 ease-in-out duration-300">
            <Suspense fallback={<div className="w-full aspect-[5/6] rounded-t-lg relative overflow-hidden bg-custom-pink" />}>
                <div className="w-full aspect-[5/6] rounded-t-lg relative overflow-hidden">
                    <Image
                        src={item.gallery[0]}
                        alt="store item"
                        fill
                        sizes='(width: 100%)'
                        className="object-cover"
                        priority
                    />
                </div>
            </Suspense>
            <div className="flex flex-row justify-between items-center text-white pt-4 pb-1">
                <span>{item.name}</span>
                <span className="font-semibold">£{item.price}</span>
            </div>
            <span className="text-gray-300">{item.color}</span>
        </Link>
    )
}

function ItemCardSkeleton(){
    return (
        <div className="flex flex-col justify-between">
            <div className="w-full aspect-[5/6] rounded-t-lg relative overflow-hidden bg-custom-pink" />
            <div className="flex flex-row justify-between items-center text-white pt-4 pb-1">
                <div className="w-1/2 h-4 bg-custom-pink" />
                <div className="w-8 h-4 bg-custom-pink" />
            </div>
            <div className="w-16 h-4 bg-custom-pink" />
        </div>
    )
}