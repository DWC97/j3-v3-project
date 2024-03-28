"use client"

import { ReactNode } from "react"
import { ActiveSectionProvider } from "./ActiveSectionContext"
import { ShoppingCartProvider } from "./ShoppingCartContext"

type ProviderProps = {
    children: ReactNode
}

export function Providers({ children }: ProviderProps){
    return (
        <div className="overflow-hidden">
            <ActiveSectionProvider>
                <ShoppingCartProvider>
                    {children}
                </ShoppingCartProvider>
            </ActiveSectionProvider>
        </div>
        
    )
}