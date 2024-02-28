"use client"

import Link from 'next/link'
import gsap from "gsap"; 
import { useGSAP } from "@gsap/react";
import { useRef, useState, useEffect } from "react";

export default function Navbar({ activeSection }){

    let navbar = useRef(null)
    const [isShrunk, setIsShrunk] = useState(false) // set height of navbar based on scroll distance from top
    const [isFixed, setIsFixed] = useState(false) // set fixed position of navbar based on scroll distance from top
    const [isDropdown, setIsDropdown] = useState(true) // set the navbar distance from top for a dropdown animation

    useGSAP(() => {
        gsap.fromTo(
            navbar.current,
            { 
              y: -50,
              opacity: 0
            },
            {
              y: 0,
              opacity: 1,
              stagger: 0.05,
              duration: 3,
              delay: 2,
              ease: 'power4.out',
            }
        )
    })
    
    // managing navbar height and visibility based on scroll position from top of home page
    function scrollHandle(){
        if (document.body.scrollTop > (window.innerHeight - 10) || document.documentElement.scrollTop > (window.innerHeight - 10)) {
            setIsDropdown(true)
            setIsFixed(true)
            setIsShrunk(true)
        }
        else {
            setIsFixed(false)
            setIsShrunk(false)
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200){
                setIsDropdown(false)
            }
            else {
                setIsDropdown(true)
            }
        }
    }

    function loadEvents(){
        if (typeof window !== 'undefined') {
                window.onscroll = function() {
                    scrollHandle()
                }
            } 
        };

    loadEvents()

    return (
        <div className={`left-0 ${isDropdown ? "top-0" : "-top-20"} z-[1000] w-screen ${isShrunk ? "h-16 bg-black bg-opacity-50" : "h-20"} ${isFixed ? "fixed ease-in-out duration-300" : "absolute"}`} ref={navbar}>
            <Link href="#hero">
                <div className="relative">
                    <img src="/logo.png" className={`absolute left-0 right-0 m-auto my-auto ${isShrunk ? "w-16" : "w-20"} mt-2 ease-in-out duration-300`}/>
                </div>
            </Link>
            <div className="flex flex-row w-screen h-full ">
                <div className="w-1/2 h-full flex justify-end text-white">
                    <Link href="/#about">
                        <span className={`mt-1 h-full flex items-center justify-center ${activeSection === "about" ? "border-opacity-100" : "border-opacity-0"} hover:border-opacity-100 border-b-2 border-custom-pink w-44 ease-in-out duration-300`}>
                            ABOUT
                        </span>
                    </Link>
                    
                    <Link href="/#tours">
                        <span className={`mt-1 h-full flex items-center justify-center w-44 ${activeSection === "tours" ? "border-opacity-100" : "border-opacity-0"} hover:border-opacity-100 border-b-2 border-custom-pink ease-in-out duration-300`}>
                            TOURS
                        </span>
                    </Link>
                    <Link href="/#contact">
                        <span className={`mt-1 h-full flex items-center justify-center w-44 mr-24 ${activeSection === "contact" ? "border-opacity-100" : "border-opacity-0"} hover:border-opacity-100 border-b-2 border-custom-pink ease-in-out duration-300`}>
                            CONTACT
                        </span>
                    </Link>
                </div>
                <div className="w-1/2 right-1/2 h-full flex justify-between text-white">
                    <span className="mt-1 h-full flex items-center justify-center w-44 ml-24 border-opacity-0 hover:border-opacity-100 border-b-2 border-custom-pink ease-in-out duration-300">STORE</span>
                    <div className='flex justify-center items-center w-44'>
                        <svg xmlns="http://www.w3.org/2000/svg" width={isShrunk ? 32 : 40} height={isShrunk ? 32 : 40} viewBox="0 0 24 24"><path fill="white" d="M7.308 21.115q-.633 0-1.067-.433q-.433-.434-.433-1.067q0-.632.433-1.066q.434-.434 1.067-.434q.632 0 1.066.434q.434.434.434 1.066q0 .633-.434 1.067q-.434.433-1.066.433m9.384 0q-.632 0-1.066-.433q-.434-.434-.434-1.067q0-.632.434-1.066q.434-.434 1.066-.434q.633 0 1.067.434q.433.434.433 1.066q0 .633-.433 1.067q-.434.433-1.067.433M5.881 5.5l2.669 5.615h6.635q.173 0 .307-.086q.135-.087.231-.24l2.615-4.75q.116-.212.02-.376q-.096-.163-.327-.163zm-.489-1h13.02q.651 0 .98.532q.33.531.035 1.095l-2.858 5.208q-.217.365-.564.573q-.347.207-.763.207H8.1l-1.215 2.231q-.154.23-.01.5t.433.27h10.884v1H7.308q-.875 0-1.306-.738q-.43-.738-.021-1.482l1.504-2.68L3.808 3.5H2v-1h2.442zm3.158 6.615h7z"></path></svg>
                    </div>
                </div>
            </div>
            
        </div>
    )
}