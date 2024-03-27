"use client"

import { ShoppingCartContext } from "@/context/ShoppingCartContext"
import { useContext } from "react"
import CartItem from "./CartItem"

export default function ShoppingCart(){

    const { cartItems } = useContext(ShoppingCartContext)

    return (
        <div className="z-[10000] w-full h-screen bg-black bg-opacity-70 absolute top-0 left-0 flex flex-row justify-end backdrop-blur-sm">
            <div className="w-1/3 bg-white h-full border-y border-gray-100 flex flex-col relative">
                <div className="w-full flex flex-row justify-between px-8 items-center mt-7 mb-2">
                    <span className="text-[20px] font-medium">Shopping cart</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="hover:opacity-100 opacity-70 cursor-pointer ease-in-out duration-300" viewBox="0 0 16 16"><path fill="gray" d="M7.293 8L3.146 3.854a.5.5 0 1 1 .708-.708L8 7.293l4.146-4.147a.5.5 0 0 1 .708.708L8.707 8l4.147 4.146a.5.5 0 0 1-.708.708L8 8.707l-4.146 4.147a.5.5 0 0 1-.708-.708z"></path></svg>
                </div>
                <div className="px-8">
                    {cartItems.map((item, i) => {
                        return (
                            <CartItem key={i} {...item}/>
                        )
                    })}
                </div>
                <div className="absolute flex flex-col justify-around border-t border-gray-300 bottom-0 left-0 h-48 w-full px-8">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col">
                            <span className="font-semibold">Subtotal</span>
                            <span className="text-gray-500 text-[14px]">Shipping & taxes calculated at checkout.</span>
                        </div>
                        <span className="font-semibold">£262.00</span>
                    </div>
                    <button className="w-full py-3 rounded-md font-semibold bg-custom-pink text-white bg-opacity-85 hover:bg-opacity-100 ease-in-out duration-300">Checkout</button>
                    <div className="flex flex-row w-full justify-center gap-1 items-center">
                        <span className="text-gray-500 text-[14px]">or</span>
                        <div className="flex flex-row items-center gap-1 cursor-pointer hover:opacity-85 ease-in-out duration-300">
                            <span className="text-custom-pink">Continue Shopping</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className='' width={12} height={12} viewBox="0 0 16 16"><path fill="#ec2aa2" fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"></path></svg>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}