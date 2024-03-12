"use client"

import { useState } from "react"
import { ActiveSectionContext } from "./ActiveSectionContext"
import SmoothScrolling from "./SmoothScrolling"


export function Providers({ children }){

    const [activeSection, setActiveSection] = useState("")

    return (
        <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
            <SmoothScrolling>
                {children}
            </SmoothScrolling>
        </ActiveSectionContext.Provider>
    )
}