"use client"

import { ReactNode } from "react"
import { ActiveSectionProvider } from "./ActiveSectionContext"
import { ShoppingCartProvider } from "./ShoppingCartContext"
import { useMounted } from "@/hooks/useMounted"

type ProviderProps = {
    children: ReactNode
}

export function Providers({ children }: ProviderProps){
    const mounted = useMounted()
    if (!mounted){
        return (
            <div className="bg-black min-h-screen h-[1080px]" />
        )
    }
    return (
        <ActiveSectionProvider>
            <ShoppingCartProvider>
                {children}
            </ShoppingCartProvider>
        </ActiveSectionProvider>
    )
}