import { motion, useInView, useAnimation } from "framer-motion"
import { useEffect, useRef } from "react"

export function Reveal({ children }: JSX.Element){

    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const mainControls = useAnimation()

    useEffect(() => {
        if (isInView){
            mainControls.start("visible")
        }
    }, [isInView])

    return (
        <div
        ref={ref}
        className="relative overflow-hidden">
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 125 },
                    visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 1, delay: 0.25 }}
            >{children}</motion.div>
        </div>
    )
}