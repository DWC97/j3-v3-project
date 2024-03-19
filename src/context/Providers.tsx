"use client"

import { useState } from "react"
import { ActiveSectionContext } from "./ActiveSectionContext"
import SmoothScrolling from "./SmoothScrolling"


export function Providers({ children }){

    const [activeSection, setActiveSection] = useState("")
    const [scrollAnimation, setScrollAnimation] = useState(false)

    return (
        <ActiveSectionContext.Provider value={{ activeSection, setActiveSection, scrollAnimation, setScrollAnimation }}>
            {/* <SmoothScrolling> */}
                {children}
            {/* </SmoothScrolling> */}
        </ActiveSectionContext.Provider>
    )
}