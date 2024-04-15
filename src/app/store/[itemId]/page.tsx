"use client"

import storeItemsData from "@/data/storeItems.json"
import Link from "next/link"
import { useContext, useEffect, useRef, useState } from "react"
import Lottie, {LottieRefCurrentProps} from "lottie-react";
import animationData from "@/animations/success.json"
import { ShoppingCartContext } from "@/context/ShoppingCartContext";
import NotFound from "@/app/not-found";
import Image from 'next/image';


export default function ItemDetails({ params }: { params: { itemId: string }}){
    
    const item = storeItemsData.items.find(item => {
        return item.name === params.itemId.replaceAll("%20", " ")
    })
    const { increaseCartQuantity } = useContext(ShoppingCartContext)
    const [activeSize, setActiveSize] = useState<string>("XS")
    const [quantity, setQuantity] = useState<number>(1)
    const [activeSlide, setActiveSlide] = useState<number>(0)
    const [submitted, setSubmitted] = useState<boolean>(false)
    const [notification, setNotification] = useState<boolean>(false)
    const scrollAnimationRef = useRef<LottieRefCurrentProps>(null) 

    useEffect(() => {
        if (notification == true){
            setTimeout(() => {
                setNotification(false)
            }, 3000);
        }
    }, [notification, setNotification])

    return (
        <div>
            {item ? 
            <div className="w-full min-h-screen bg-black px-8 md:px-12 xl:px-20 2xl:px-60 pt-[120px] relative">
                <div className={`z-50 fixed w-72 md:w-96 h-20 bg-white top-24 right-8 rounded-md flex flex-row ${notification ? "opacity-100 visible" : "opacity-0 invisible"} transition-opacity ease-in-out duration-500`}>
                    {/* <img src={item.gallery[0]} className="object-cover"/> */}
                    <Image
                        src={item.gallery[0]}
                        alt="cart item"
                        height={80}
                        width={80}
                        className="p-1"
                    />
                    <div className="w-full flex flex-col justify-center">
                        <span className="font-semibold md:text-[16px] text-[14px]">Successfully added!</span>
                        <span className="text-[12px] md:text-[14px] text-gray-700">{item.name}</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} className="hover:opacity-100 opacity-70 cursor-pointer ease-in-out duration-300 absolute right-4 top-4" 
                    onClick={() => {
                        setNotification(false)
                    }}
                    viewBox="0 0 16 16"><path fill="gray" d="M7.293 8L3.146 3.854a.5.5 0 1 1 .708-.708L8 7.293l4.146-4.147a.5.5 0 0 1 .708.708L8.707 8l4.147 4.146a.5.5 0 0 1-.708.708L8 8.707l-4.146 4.147a.5.5 0 0 1-.708-.708z"></path></svg>
                </div>
                <Link href={"/store"} className="mb-[40px] flex flex-row items-center w-48 hover:opacity-85 ease-in-out duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className='pl-3 rotate-180' width={32} height={32} viewBox="0 0 16 16"><path fill="white" fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"></path></svg>
                    <span className="text-gray-200 text-[14px] font-semibold">BACK TO PRODUCTS</span>
                </Link>
                <div className="w-full flex flex-col md:flex-row-reverse justify-between pb-12 gap-16 md:gap-8 border-b border-gray-300">
                    <div className="flex flex-col w-full md:w-1/2">
                        <h2 className="text-white font-bold text-[32px]">{item?.name}</h2>
                        <span className="text-white text-[36px]">£{item?.price}</span>
                        <p className="text-gray-300 mt-4 text-[14px]">{item?.description}</p>
                        {item?.sizes &&
                        <div className="flex flex-row w-full gap-3 mt-8">
                            <button className={`w-full ${activeSize === "XS" ? "text-white bg-custom-pink border-custom-pink" : "bg-none border-gray-300 hover:border-custom-pink hover:text-custom-pink"} text-white border  py-3 text-[14px] rounded-md font-semibold ease-in-out duration-300`}
                            onClick={() => setActiveSize("XS")}
                            tabIndex={0}
                            onFocus={() => setActiveSize("XS")}
                            >XS</button>
                            <button className={`w-full ${activeSize === "S" ? "text-white bg-custom-pink border-custom-pink" : "bg-none border-gray-300 hover:border-custom-pink hover:text-custom-pink"} text-white border  py-3 text-[14px] rounded-md font-semibold ease-in-out duration-300`}
                            onClick={() => setActiveSize("S")}
                            tabIndex={0}
                            onFocus={() => setActiveSize("S")}
                            >S</button>
                            <button className={`w-full ${activeSize === "M" ? "text-white bg-custom-pink border-custom-pink" : "bg-none border-gray-300 hover:border-custom-pink hover:text-custom-pink"} text-white border  py-3 text-[14px] rounded-md font-semibold ease-in-out duration-300`}
                            onClick={() => setActiveSize("M")}
                            tabIndex={0}
                            onFocus={() => setActiveSize("M")}
                            >M</button>
                            <button className={`w-full ${activeSize === "L" ? "text-white bg-custom-pink border-custom-pink" : "bg-none border-gray-300 hover:border-custom-pink hover:text-custom-pink"} text-white border  py-3 text-[14px] rounded-md font-semibold ease-in-out duration-300`}
                            onClick={() => setActiveSize("L")}
                            tabIndex={0}
                            onFocus={() => setActiveSize("L")}
                            >L</button>
                            <button className={`w-full ${activeSize === "XL" ? "text-white bg-custom-pink border-custom-pink" : "bg-none border-gray-300 hover:border-custom-pink hover:text-custom-pink"} text-white border  py-3 text-[14px] rounded-md font-semibold ease-in-out duration-300`}
                            onClick={() => setActiveSize("XL")}
                            tabIndex={0}
                            onFocus={() => setActiveSize("XL")}
                            >XL</button>
                        </div>
                        }
                        <span className="text-white mt-8 text-[14px] mb-2">Material & Care</span>
                        <ul className="">
                            {item?.["fabric-care"].map((point, i) => {
                                return (
                                    <li key={i} className="text-gray-300 text-[14px] mt-1 pl-2">&#8226;&nbsp;&nbsp;{point}</li>
                                )
                            })}
                        </ul>
                        <div className="w-full flex flex-row justify-between items-center mt-8">
                            <div className={`w-1/2 lg:w-2/3 py-3 flex flex-row justify-center items-center rounded-md font-semibold ${submitted ? "bg-white" : "bg-custom-pink hover:opacity-85 ease-in-out duration-300 cursor-pointer"} ease-in-out duration-300`}
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter"){
                                    if (submitted) return
                                    else {
                                        if (item.sizes){
                                            increaseCartQuantity(item.id, quantity, activeSize)
                                        } else {
                                            increaseCartQuantity(item.id, quantity, "NA")
                                        }
                                        setSubmitted(true)
                                    }
                                }
                            }}
                            onClick={() => {
                                if (submitted) return
                                else {
                                    if (item.sizes){
                                        increaseCartQuantity(item.id, quantity, activeSize)
                                    } else {
                                        increaseCartQuantity(item.id, quantity, "NA")
                                    }
                                    setSubmitted(true)
                                }
                            }}
                            >
                                {submitted ? 
                                <div className="flex flex-row justify-center items-center gap-4">
                                    <span className="text-[#00c853]">Adding</span>
                                    <Lottie lottieRef={scrollAnimationRef} animationData={animationData} className="w-6" loop={false} 
                                    onComplete={() => {
                                        setSubmitted(false)
                                        setNotification(true)
                                        setQuantity(1)
                                    }}
                                    />
                                </div>
                                : 
                                <span className="text-white">Add to cart</span>
                                }
                            </div>
                            <div className="w-1/3 flex flex-row justify-end gap-4 lg:gap-8 items-center h-full ml-4">
                                <span className="text-white">Quantity:</span>
                                <input type="number" value={quantity} min={1} max={9} className="w-12 text-center rounded-md flex h-8"
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    if (value > 9) {
                                      setQuantity(9);
                                    } else if (value < 1) {
                                      setQuantity(1);
                                    } else {
                                      setQuantity(value);
                                    }
                                  }}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row w-full gap-4 xl:gap-8 mt-8">
                            <div className="flex flex-col justify-center items-center w-full border border-gray-300 rounded-md h-28">
                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 32 32"><path fill="#e0e0e0" d="M16 28a5.326 5.326 0 0 1-.671-.044A21.786 21.786 0 0 1 12.033 17H29.95c.024-.331.05-.663.05-1a14 14 0 1 0-14 14Zm11.95-13h-5.987A24.325 24.325 0 0 0 19.21 4.45A12.012 12.012 0 0 1 27.95 15M16.67 4.044A21.786 21.786 0 0 1 19.967 15h-7.934A21.786 21.786 0 0 1 15.33 4.044a5.159 5.159 0 0 1 1.342 0m-3.881.405A24.328 24.328 0 0 0 10.037 15H4.05a12.013 12.013 0 0 1 8.74-10.55M4.05 17h5.987a24.328 24.328 0 0 0 2.753 10.55A12.013 12.013 0 0 1 4.05 17"></path><path fill="#e0e0e0" fillRule="evenodd" d="m25 25l5 2v-2l-5-2.5V20a1 1 0 0 0-2 0v2.5L18 25v2l5-2v3.5L21 30v1l3-1l3 1v-1l-2-1.5Z"></path></svg>
                                <span className="text-white text-[14px] my-1 text-center">International delivery</span>
                                <span className="text-gray-300 text-[14px] text-center">Get your order in 2 weeks</span>
                            </div>
                            <div className="flex flex-col justify-center items-center w-full border border-gray-300 rounded-md h-28">
                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><g fill="none" stroke="#e0e0e0" strokeWidth={1.5}><circle cx={12} cy={12} r={10}></circle><path strokeLinecap="round" d="M12 6v12m3-8.5C15 8.12 13.657 7 12 7S9 8.12 9 9.5s1.343 2.5 3 2.5s3 1.12 3 2.5s-1.343 2.5-3 2.5s-3-1.12-3-2.5"></path></g></svg>
                                <span className="text-white text-[14px] my-1 text-center">Loyalty rewards</span>
                                <span className="text-gray-300 text-[14px] text-center">Earn store credit with purchases</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full md:w-1/2 relative">
                        {/* <img src={item?.gallery[activeSlide]} className="w-full "/> */}
                        <div className="w-full overflow-hidden mb-8 rounded-lg relative aspect-square">
                            <Image
                                src={item?.gallery[activeSlide]}
                                alt="cart item"
                                fill
                                sizes='(width: 100%)'
                                className=""
                                priority
                            />
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 w-full gap-6">
                            {item?.gallery.map((img, i) => {
                                return (
                                    <div key={i} className={`w-full object-contain rounded-md overflow-hidden cursor-pointer ease-in-out duration-300 ${activeSlide === i ? "border-2 border-custom-pink" : "border-2 border-transparent  hover:opacity-85"}`}
                                    onClick={() => setActiveSlide(i)}
                                    >
                                        {/* <img src={img}/> */}
                                        <div className="w-full overflow-hidden relative aspect-square">
                                            <Image
                                                src={img}
                                                alt="cart item"
                                                fill
                                                sizes='(width: 100%)'
                                                className=""
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col mt-20 pb-16">
                    <span className="text-white font-semibold text-[20px]">Customers also viewed</span>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-10 w-full mt-8">
                        {storeItemsData.items.filter(i => i.id !== item.id).slice(0, 4).map(item => {
                            return (
                                <div key={item.id} className="flex flex-col">
                                    <div className="relative w-full object-contain rounded-lg overflow-hidden">
                                        {/* <img src={item.gallery[0]}/> */}
                                        <div className="w-full overflow-hidden relative aspect-square">
                                            <Image
                                                src={item.gallery[0]}
                                                alt="cart item"
                                                fill
                                                sizes='(width: 100%)'
                                                className=""
                                            />
                                        </div>
                                        <div className="absolute w-full h-1/2 bottom-0 left-0 bg-gradient-to-t from-black to-transparent opacity-70" />
                                        <span className="absolute text-white text-[20px] bottom-4 right-4">£{item.price}</span>
                                    </div>
                                    <span className="text-white mt-4">{item.name}</span>
                                    <span className="text-[14px] text-gray-300 mt-1">{item.color}</span>
                                    <Link href={`/store/${item.name}`} className="mt-6 w-full text-gray-300 hover:text-white hover:border-white py-2 border border-gray-300 rounded-md font-medium ease-in-out duration-300 text-center">Find out more</Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            :
            <NotFound />    
            }
        </div>
    )
}
