"use client"

// next components
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import Image from 'next/image';

// hooks
import { useRef, useState, useEffect, useContext } from "react";
import { ActiveSectionContext } from '@/context/ActiveSectionContext';
import useBodyLockScroll from '@/hooks/useBodyLockScroll';
import useMobileView from '@/hooks/useMobileView';

// context
import { ShoppingCartContext } from '@/context/ShoppingCartContext';

// animations
import gsap from "gsap"; 
import { useGSAP } from "@gsap/react";


export default function Navbar(){

    const { activeSection, setActiveSection, setScrollAnimation } = useContext(ActiveSectionContext)
    const { openCart, cartQuantity } = useContext(ShoppingCartContext)
    let navbar = useRef<HTMLDivElement>(null)
    const [isShrunk, setIsShrunk] = useState<boolean>(false) // set height of navbar based on scroll distance from top
    const [isFixed, setIsFixed] = useState<boolean>(false) // set fixed position of navbar based on scroll distance from top
    const [isDropdown, setIsDropdown] = useState<boolean>(true) // set the navbar distance from top for a dropdown animation
    const path = usePathname() // find current path
    const [nav, setNav] = useState<boolean>(false) // set mobile nav menu
    const [toggle] = useBodyLockScroll() // toggle scroll lock
    const isMobileView = useMobileView(); 

    // track which navbar tab should be active based on current path
    useEffect(() => {
        if (isMobileView) return
        if (path !== "/"){
            setActiveSection("")
        }
        
        if (path.includes("/store")){
            setActiveSection("store")
        } 
    }, [path, setActiveSection, isMobileView]) 

    // animation for navbar appearing
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
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            setScrollAnimation(false)
        }
        else {
            setScrollAnimation(true)
        }
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
        <div>
            {/* mobile menu */}
            <div className={nav ? `fixed top-0 left-0 z-[1000] h-screen w-full flex flex-col justify-center items-center ease-in-out duration-500 bg-black` : "fixed -top-[100%]"}>   
                <div className={`absolute top-0 left-0 flex justify-center items-center cursor-pointer ml-9 h-20`} onClick={() => {
                    setNav(!nav)
                    toggle()
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 24 24"><path fill="white" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"></path></svg>
                </div>
                <Link href="/#hero" className='w-full flex justify-center items-center' tabIndex={-1} onClick={() => {
                    setNav(!nav)
                    toggle()
                }}>
                    <div className='max-w-[250px] w-1/2 relative'>
                        <Image
                            src="/misc/full.avif"
                            alt="logo"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                </Link>
                <div className='w-full px-10'>
                    <ul className='text-white font-medium text-[18px]'>
                        <li className='border-b border-gray-400 py-4'>
                            <Link href="/#about" tabIndex={-1} onClick={() => {
                            setNav(!nav)
                            toggle()
                            }}>
                                ABOUT
                            </Link>
                        </li>
                        <li className='border-b border-gray-400 py-4'>
                            <Link href="/#tours" tabIndex={-1} onClick={() => {
                                setNav(!nav)
                                toggle()
                            }}>
                                TOURS
                            </Link>
                        </li>
                        <li className='border-b border-gray-400 py-4'>
                            <Link href="/#contact" tabIndex={-1} onClick={() => {
                                setNav(!nav)
                                toggle()
                            }}>
                                CONTACT
                            </Link>
                        </li>   
                        <li className='border-b border-gray-400 py-4'>
                            <Link href="/store" tabIndex={-1} onClick={() => {
                                setNav(!nav)
                                toggle()
                            }}>
                                STORE
                            </Link>
                        </li>    
                    </ul>
                </div>
                
            </div>
            {/* desktop navbar */}
            <div className={`left-0 ${isDropdown ? "top-0" : "-top-20"} z-[45] w-screen ${isShrunk ? "h-16 bg-black bg-opacity-50 backdrop-blur-sm" : "h-20"} ${isFixed ? "fixed ease-in-out duration-300" : "absolute"}`} ref={navbar}>
                {!isMobileView && <Link href="/#hero" tabIndex={-1} >
                    <div className="relative hover:opacity-85 ease-in-out duration-300">
                        <div className={`absolute left-0 right-0 m-auto my-auto ${isShrunk ? "w-16" : "w-20"} mt-2 ease-in-out duration-300`}>
                            <Image
                                src="/misc/logo.webp"
                                alt="logo"
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height: '100%' }}
                            />
                        </div>
                    </div>
                </Link>}
                <div className='flex lg:hidden w-full justify-between h-full px-10'>
                    <div className='flex justify-center items-center -ml-1 cursor-pointer ' onClick={() => {
                        setNav(!nav)
                        toggle()
                    }}>
                        
                        <svg xmlns="http://www.w3.org/2000/svg" width={isShrunk ? 32 : 40} height={isShrunk ? 32 : 40} viewBox="0 0 32 32"><path fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h22M5 16h22M5 24h22"></path></svg>
                    </div>
                    <div className='flex justify-center items-center mr-4 relative cursor-pointer'
                    onClick={() => {
                        openCart()
                    }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width={isShrunk ? 32 : 40} height={isShrunk ? 32 : 40} viewBox="0 0 24 24"><path fill="white" d="M7.308 21.115q-.633 0-1.067-.433q-.433-.434-.433-1.067q0-.632.433-1.066q.434-.434 1.067-.434q.632 0 1.066.434q.434.434.434 1.066q0 .633-.434 1.067q-.434.433-1.066.433m9.384 0q-.632 0-1.066-.433q-.434-.434-.434-1.067q0-.632.434-1.066q.434-.434 1.066-.434q.633 0 1.067.434q.433.434.433 1.066q0 .633-.433 1.067q-.434.433-1.067.433M5.881 5.5l2.669 5.615h6.635q.173 0 .307-.086q.135-.087.231-.24l2.615-4.75q.116-.212.02-.376q-.096-.163-.327-.163zm-.489-1h13.02q.651 0 .98.532q.33.531.035 1.095l-2.858 5.208q-.217.365-.564.573q-.347.207-.763.207H8.1l-1.215 2.231q-.154.23-.01.5t.433.27h10.884v1H7.308q-.875 0-1.306-.738q-.43-.738-.021-1.482l1.504-2.68L3.808 3.5H2v-1h2.442zm3.158 6.615h7z"></path></svg>
                        {cartQuantity > 0 && 
                            <div className='absolute bottom-2 -right-[1rem] w-8 h-8 rounded-full bg-custom-pink text-white font-semibold flex justify-center items-center'>
                                {cartQuantity < 10 ? cartQuantity : "9+" }
                            </div>}
                    </div>
                </div>
                <div className="hidden lg:flex flex-row w-screen h-full ">
                    <div className="w-1/2 h-full flex justify-end text-white">  
                        <span className={`mt-1 h-full  ${activeSection === "about" ? "border-opacity-100" : "border-opacity-0"} hover:border-opacity-100 border-b-2 hover:opacity-85 border-custom-pink w-44 ease-in-out duration-300 out`} >
                            <Link href="/#about" tabIndex={0} className='w-full h-full flex items-center justify-center'>
                                ABOUT
                            </Link>
                        </span>
                        <span className={`mt-1 h-full w-44 ${activeSection === "tours" ? "border-opacity-100" : "border-opacity-0"} hover:border-opacity-100 hover:opacity-85 border-b-2 border-custom-pink ease-in-out duration-300`}>
                            <Link href="/#tours" tabIndex={0} className='w-full h-full flex items-center justify-center'>
                                TOURS
                            </Link>
                        </span>
                        <span className={`mt-1 h-full w-44 mr-24 ${activeSection === "contact" ? "border-opacity-100" : "border-opacity-0"} hover:border-opacity-100 hover:opacity-85 border-b-2 border-custom-pink ease-in-out duration-300`}>
                            <Link href="/#contact" tabIndex={0} className='w-full h-full flex items-center justify-center'>
                                CONTACT
                            </Link>
                        </span>
                    </div>
                    <div className="w-1/2 right-1/2 h-full flex justify-between text-white">   
                        <span className={`mt-1 h-full w-44 ml-24 ${activeSection === "store" ? "border-opacity-100" : "border-opacity-0"} hover:border-opacity-100 hover:opacity-85 border-b-2 border-custom-pink ease-in-out duration-300`}>
                            <Link href={"/store"} tabIndex={0} className='w-full h-full flex items-center justify-center'>
                                STORE
                            </Link>
                        </span>  
                        <div className='flex justify-center items-center w-44 relative cursor-pointer hover:opacity-85 ease-in-out duration-300' tabIndex={0}
                        onClick={() => {
                            openCart()
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter"){
                                openCart()
                            }
                        }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width={isShrunk ? 32 : 40} height={isShrunk ? 32 : 40} viewBox="0 0 24 24"><path fill="white" d="M7.308 21.115q-.633 0-1.067-.433q-.433-.434-.433-1.067q0-.632.433-1.066q.434-.434 1.067-.434q.632 0 1.066.434q.434.434.434 1.066q0 .633-.434 1.067q-.434.433-1.066.433m9.384 0q-.632 0-1.066-.433q-.434-.434-.434-1.067q0-.632.434-1.066q.434-.434 1.066-.434q.633 0 1.067.434q.433.434.433 1.066q0 .633-.433 1.067q-.434.433-1.067.433M5.881 5.5l2.669 5.615h6.635q.173 0 .307-.086q.135-.087.231-.24l2.615-4.75q.116-.212.02-.376q-.096-.163-.327-.163zm-.489-1h13.02q.651 0 .98.532q.33.531.035 1.095l-2.858 5.208q-.217.365-.564.573q-.347.207-.763.207H8.1l-1.215 2.231q-.154.23-.01.5t.433.27h10.884v1H7.308q-.875 0-1.306-.738q-.43-.738-.021-1.482l1.504-2.68L3.808 3.5H2v-1h2.442zm3.158 6.615h7z"></path></svg>
                            {cartQuantity > 0 && 
                            <div className='absolute bottom-2 right-[3.5rem] w-8 h-8 rounded-full bg-custom-pink text-white font-semibold flex justify-center items-center'>
                                {cartQuantity < 10 ? cartQuantity : "9+" }
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}