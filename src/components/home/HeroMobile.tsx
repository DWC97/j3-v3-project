import Lottie, {LottieRefCurrentProps} from "lottie-react";
import animationData from "@/animations/scroll-animation.json"
import { useEffect, useRef, useContext } from "react";
import { ActiveSectionContext } from "@/context/ActiveSectionContext";
import Image from "next/image";

export default function HeroMobile(){

    const scrollAnimationRef = useRef<LottieRefCurrentProps>(null)
    let { scrollAnimation, setScrollAnimation } = useContext(ActiveSectionContext)

    useEffect(() => { 
        setTimeout(() => {
            setScrollAnimation(true)
        }, 5000);
    }, []);

    return (
        <div className="w-full h-screen relative flex flex-col justify-center items-center"
        style={{backgroundImage: "url(" + "/hero/full.png" + ")",
        backgroundSize: "cover",
        backgroundPosition: "55% 50%"
        }}
        >
            <div className={`absolute w-full bottom-[30vh] ${scrollAnimation ? " opacity-100" : "opacity-0"}  left-0 flex justify-center items-center ease-in-out duration-1000`}>
                <Lottie lottieRef={scrollAnimationRef} animationData={animationData} className="w-16" loop={true} />
            </div>
            <div className="w-full px-[20px] h-1/2 flex flex-col items-center mb-[15vh]">
                {/* <img src="/logo.png" className="w-[40vw]"/> */}
                <div className="relative aspect-square w-[40vw]">
                    <Image
                        src="/logo.png"
                        alt="JR logo"
                        fill
                        sizes='(width: 100%)'
                        className="object-contain"
                    />
                </div>
                <h1 className="text-white font-bold text-3xl text-center mt-10 mb-4">JOLLY ROGER TOURS</h1>
                <h3 className="text-white text-md font-medium text-center">THE ADVENTURE OF A LIFETIME AWAITS...</h3>
            </div>
            <div className="absolute h-full w-full opacity-40"
            style={{background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 60%, rgba(0,0,0,0.75))"}}
            />
        </div>
    )
}