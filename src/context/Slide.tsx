import { motion, useInView, useAnimation } from "framer-motion"
import { ReactNode, useEffect, useRef } from "react"

interface SlideProps {
    children: ReactNode;
}

export function Slide({ children }: SlideProps){

    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true })
    const slideControls = useAnimation()

    useEffect(() => {
        if (isInView){
            slideControls.start("visible")
        }
    }, [isInView, slideControls])

    return (
        <div
        ref={ref}
        className="">
            <motion.div
                variants={{
                    hidden: { opacity: 0, x: -300 },
                    visible: { opacity: 1, x: 0 }
                }}
                initial="hidden"
                animate={slideControls}
                transition={{ duration: 1, delay: 0.25 }}
            >{children}</motion.div>
        </div>
    )
}