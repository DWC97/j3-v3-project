import { ActiveSectionContext } from "@/context/ActiveSectionContext"
import useDetectSection from "@/hooks/useDetectSection"
import Link from "next/link"
import { useState, useEffect, useRef, useContext } from "react"

export default function Contact2(){

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
        <div className="bg-black w-full h-screen contact flex flex-row items-center justify-around pt-20" id="contact" ref={contactRef}>
            <div className="-mr-20 flex flex-col items-center justify-between h-[420px]">
                <img src="/contact/Jolly_Roger.jpg" className="w-[360px] "/>
                <Link href={"/store"} className='flex flex-row items-center justify-center'>
                    <button className='text-white text-[18px]'>Get our merch</button>
                    <svg xmlns="http://www.w3.org/2000/svg" className='pl-3' width={40} height={32} viewBox="0 0 16 16"><path fill="white" fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"></path></svg>
                </Link>
            </div>
           
            <div className="flex flex-col justify-between w-[500px] md:w-[600px] h-[420px] bg-black bg-opacity-50 rounded-3xl z-30 -ml-20">
                
                <h2 className="font-semibold text-[44px] text-white">RESERVE A SPOT</h2>
                <form action="" className="flex flex-col justify-between h-[250px]">
                    <input type="text" placeholder="Your name*" className="w-[240px] placeholder-gray-300 text-white bg-transparent border-b border-white p-2 focus:outline-none"
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
                <p className="text-white text-[14px] mt-10">
                    Please note. Jolly Roger Tours is currently going through the incorporation and licensing process in the UK and will launch officially in late 2024. 
                </p>
            </div>
        </div>
    )
}