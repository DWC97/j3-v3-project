"use client"

import { ActiveSectionProvider } from "./ActiveSectionContext"

export function Providers({ children }){
    return (
        <ActiveSectionProvider>

                {children}

        </ActiveSectionProvider>
    )
}