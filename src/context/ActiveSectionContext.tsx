"use client"

import { createContext, useState } from 'react';

export const ActiveSectionContext = createContext("");

export function ActiveSectionProvider({ children }){

    const [activeSection, setActiveSection] = useState("")
    const [scrollAnimation, setScrollAnimation] = useState(false)

    return (
        <ActiveSectionContext.Provider value={{ activeSection, setActiveSection, scrollAnimation, setScrollAnimation }}>
                {children}
        </ActiveSectionContext.Provider>
    )
}