"use client"

import { ReactNode } from "react"
import { ActiveSectionProvider } from "./ActiveSectionContext"
import { ShoppingCartProvider } from "./ShoppingCartContext"
import { useMounted } from "@/hooks/useMounted"
import Loading from "@/app/loading"
import nProgress from "nprogress"

type ProviderProps = {
    children: ReactNode
}

export function Providers({ children }: ProviderProps) {

    const mounted = useMounted()

    nProgress.configure({ 
        showSpinner: false,
        minimum: 0.1
     })

    // return loading screen while app mounts
    if (!mounted) {
        nProgress.start()
        return (
            <Loading />
        )
    } else {
        nProgress.done()
    }

    return (
        <ActiveSectionProvider>
            <ShoppingCartProvider>
                {children}
            </ShoppingCartProvider>
        </ActiveSectionProvider>
    )
}