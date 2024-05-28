// next components
import Link from 'next/link';

// hooks
import { useRef } from 'react';

// animations
import { Reveal } from '@/context/Reveal';

export default function AboutMobile() {
    const aboutRef = useRef<HTMLDivElement>(null);

    return (
        <div
            className="flex flex-row bg-black min-h-screen h-[1080px] relative"
            id="about"
            ref={aboutRef}
        >
            <div
                className={`z-10 flex flex-col h-full lg:w-3/5 sm:w-4/5 w-full justify-center px-10 sm:px-[7%] 2xl:pl-[15%] -pr-10 `}
            >
                <Reveal>
                    <h2 className="text-custom-blue text-[20px] font-bold mb-2">
                        JR SEASON 1
                    </h2>
                    <h1 className="text-white font-bold md:text-[40px] text-[32px] leading-snug mb-6">
                        Small group party tours starting in 2025
                    </h1>
                    <p className="text-white text-[16px] leading-relaxed mb-2">
                        Ahoy there! If you&apos;re looking to experience the
                        best nightlife & culture South-East Asia has to offer
                        with a rowdy group of travellers and tick-off
                        bucket-list activities along the way, JR has you
                        covered. We make logistics stress-free so you can focus
                        on having a good time. Be warned, we do things a little
                        differently over at JR:
                    </p>
                    <div className="flex flex-row items-center">
                        <span className="text-[20px] mr-4">❌</span>
                        <span className="font-medium text-white text-[16px]">
                            No couples
                        </span>
                    </div>
                    <div className="flex flex-row items-center">
                        <span className="text-[20px] mr-4">🤘</span>
                        <span className="font-medium text-white text-[16px]">
                            18 to 30 only
                        </span>
                    </div>
                    <div className="flex flex-row items-center mb-10">
                        <span className="text-[20px] mr-4">🍻</span>
                        <span className="font-medium text-white text-[16px]">
                            Be prepared for LOTS of drinking...
                        </span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-8 md:gap-16">
                        <Link
                            href={'/#tours'}
                            className="z-[1000] w-full sm:w-1/2 cursor-pointer font-semibold text-center text-white  py-2 rounded-md bg-gradient-to-r from-custom-blue to-custom-yellow text-[18px] hover:opacity-85 ease-in-out duration-300"
                        >
                            Learn more
                        </Link>
                        <Link
                            href={'/#contact'}
                            className="flex flex-row items-center justify-center hover:opacity-85 ease-in-out duration-300"
                        >
                            <button
                                tabIndex={-1}
                                className="text-white text-[18px]"
                            >
                                Get in touch
                            </button>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="pl-3"
                                width={40}
                                height={32}
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fill="white"
                                    fillRule="evenodd"
                                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                                ></path>
                            </svg>
                        </Link>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}
