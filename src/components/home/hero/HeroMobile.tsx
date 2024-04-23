// hooks
import { useEffect, useRef, useContext } from "react";

// context
import { ActiveSectionContext } from "@/context/ActiveSectionContext";

// animations
import Lottie, {LottieRefCurrentProps} from "lottie-react";
import animationData from "@/animations/scroll-animation.json"


export default function HeroMobile(){

    const scrollAnimationRef = useRef<LottieRefCurrentProps>(null)
    let { scrollAnimation, setScrollAnimation } = useContext(ActiveSectionContext)

    // set the animation active after timeout
    useEffect(() => { 
        setTimeout(() => {
            setScrollAnimation(true)
        }, 5000);
    }, [setScrollAnimation]);

    return (
        <div className="w-full h-screen relative flex flex-col justify-center items-center"
        style={{backgroundImage: "url(" + "/hero/full.avif" + ")",
        backgroundSize: "cover",
        backgroundPosition: "55% 50%"
        }}
        >
            <div className={`absolute w-full bottom-[30vh] ${scrollAnimation ? " opacity-100" : "opacity-0"}  left-0 flex justify-center items-center ease-in-out duration-1000`}>
                <Lottie lottieRef={scrollAnimationRef} animationData={animationData} className="w-16" loop={true} />
            </div>
            <div className="w-full px-[20px] h-full flex flex-col items-center justify-center gap-4 mb-8">
                <h1 className="text-white font-bold text-3xl text-center">JOLLY ROGER TOURS</h1>
                <h2 className="text-white text-md font-medium text-center">THE ADVENTURE OF A LIFETIME AWAITS...</h2>
            </div>
            <div className="absolute h-full w-full opacity-40"
            style={{background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 60%, rgba(0,0,0,0.75))"}}
            />
        </div>
    )
}