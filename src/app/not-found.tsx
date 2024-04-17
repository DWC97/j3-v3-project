import Image from "next/image";
import Link from "next/link";

export default function NotFound(){
    return (
        <div className="w-full h-[90vh] bg-black relative flex justify-center items-center">
            {/* <img src="/404-bg.jpg" className="w-full h-full object-cover absolute top-0 left-0"/> */}
            <div className="w-full h-full absolute top-0 left-0 overflow-hidden">
                <Image
                    src="/404-bg.avif" 
                    alt="404 background"
                    fill
                    sizes='(height: 100%)'
                    className="object-cover"
                    priority
                />
            </div>
            <div className="w-full h-1/2 absolute top-0 left-0 bg-gradient-to-b from-black to-transparent opacity-30" />
            <div className="z-10 -mt-20 flex flex-col items-center justify-center gap-2">
                <span className="text-white font-medium">404</span>
                <h1 className="text-white font-bold text-[40px] leading-snug">Page not found</h1>
                <span className="text-gray-300 px-10 text-center">Sorry, we couldn&apos;t find the page you&apos;re looking for.</span>
                <Link href={"/"} className="mt-8 flex flex-row items-center hover:opacity-85 ease-in-out duration-300 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className='rotate-180' width={20} height={20} viewBox="0 0 16 16"><path fill="white" fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"></path></svg>
                    <span className="text-gray-200 text-[14px] font-semibold">BACK TO HOME</span>
                </Link>
            </div>
        </div>
    )
}