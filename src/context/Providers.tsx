"use client"

import { useState } from "react"
import { ActiveSectionContext } from "./ActiveSectionContext"

export function Providers({ children }){

    const [activeSection, setActiveSection] = useState("")

    return (
        <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
            {children}
        </ActiveSectionContext.Provider>
    )
}