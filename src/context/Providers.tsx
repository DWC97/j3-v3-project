"use client"

import { ReactNode } from "react"
import { ActiveSectionProvider } from "./ActiveSectionContext"
import { ShoppingCartProvider } from "./ShoppingCartContext"
import { useMounted } from "@/hooks/useMounted"
import Loading from "@/app/loading"

type ProviderProps = {
    children: ReactNode
}

export function Providers({ children }: ProviderProps){
    const mounted = useMounted()
    if (!mounted){
        return (
            <Loading />  
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