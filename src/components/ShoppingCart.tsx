"use client"

import { ShoppingCartContext } from "@/context/ShoppingCartContext"
import { useContext } from "react"
import CartItem from "./CartItem"

export default function ShoppingCart(){

    const { cartItems } = useContext(ShoppingCartContext)

    return (
        <div className="z-[10000] w-full h-screen bg-black bg-opacity-70 absolute top-0 left-0 flex flex-row justify-end">
            <div className="w-1/3 bg-white h-full border-y border-gray-100 flex flex-col">
                <div className="w-full flex flex-row justify-between px-8 items-center my-10">
                    <span className="text-[20px] font-medium">Shopping cart</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 16 16"><path fill="gray" d="M7.293 8L3.146 3.854a.5.5 0 1 1 .708-.708L8 7.293l4.146-4.147a.5.5 0 0 1 .708.708L8.707 8l4.147 4.146a.5.5 0 0 1-.708.708L8 8.707l-4.146 4.147a.5.5 0 0 1-.708-.708z"></path></svg>
                </div>
                <div className="px-8">
                    {cartItems.map((item, i) => {
                        return (
                            <CartItem key={i} {...item}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}