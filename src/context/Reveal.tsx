import { motion, useInView, useAnimation } from "framer-motion"
import { ReactNode, useEffect, useRef } from "react"

interface RevealProps {
    children: ReactNode;
}

// reveal animation
export function Reveal({ children }: RevealProps) {

    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true })
    const mainControls = useAnimation()

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible")
        }
    }, [isInView, mainControls])

    return (
        <div
            ref={ref}
            className="">
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 1, delay: 0.25 }}
            >{children}</motion.div>
        </div>
    )
}