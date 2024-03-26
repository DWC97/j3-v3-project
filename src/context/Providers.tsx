"use client"

import { useState } from "react"
import { ActiveSectionProvider } from "./ActiveSectionContext"
import SmoothScrolling from "./SmoothScrolling"


export function Providers({ children }){
    return (
        <ActiveSectionProvider>

                {children}

        </ActiveSectionProvider>
    )
}