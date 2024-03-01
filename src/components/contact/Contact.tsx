"use client"

import { ActiveSectionContext } from "@/context/ActiveSectionContext"
import useDetectSection from "@/hooks/useDetectSection"
import { useState, useEffect, useRef, useContext } from "react"

export default function Contact(){

    let { setActiveSection } = useContext(ActiveSectionContext)
    const [name, setName] = useState("")
    const contactRef = useRef(null)
    const [isInView] = useDetectSection(contactRef)

    useEffect(() => {
        if (isInView){
            setActiveSection("contact")
        }
    }, [isInView])

    return (
        <div className=" section h-[984px] w-full flex justify-center items-center relative" id="contact" ref={contactRef}>
            <div className="bg-[url('/contact/contact-bg.jpg')] w-full h-full bg-center bg-no-repeat bg-cover absolute -z-20" />
            <div className="absolute w-full h-[375px] top-0 left-0 bg-gradient-to-b from-black to-transparent" />
            <div className="absolute w-full h-[300px] bottom-0 left-0 bg-gradient-to-t from-black to-transparent" />
            <div className="flex flex-col justify-between w-[500px] md:w-[600px] h-[500px] bg-black bg-opacity-50 mt-20 rounded-3xl border border-gray-300 p-10 z-30">
                <p className="text-white text-[14px] mb-4">
                    Please note. Jolly Roger Tours is currently going through the incorporation and licensing process in the UK and will launch officially in late 2024. 
                </p>
                <h2 className="font-semibold text-[44px] text-white">RESERVE A SPOT</h2>
                <form action="" className="flex flex-col justify-between h-[250px]">
                    <input type="text" placeholder="Your name*" className="w-[240px] placeholder-gray-300 text-white bg-transparent border-b border-white p-2 focus:outline-none"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />   
                    <input type="text" placeholder="Email*" className="w-[240px] placeholder-gray-300 text-white bg-transparent border-b border-white p-2 focus:outline-none"
                    />   
                    <div className="flex flex-row w-full justify-between">
                        <input type="text" placeholder="Destination*" className="w-[240px] placeholder-gray-300 text-white bg-transparent border-b border-white p-2 focus:outline-none"/>  
                        <input type="text" placeholder="No. of people*" className="w-[240px] placeholder-gray-300 text-white bg-transparent border-b border-white p-2 focus:outline-none"/>  
                    </div>
                    <button className="font-semibold  text-white w-full self-center py-2 rounded-md mt-8 bg-gradient-to-r from-custom-orange to-custom-pink ">
                        SUBMIT
                    </button>
                </form>
            </div>
        </div>
    )
}