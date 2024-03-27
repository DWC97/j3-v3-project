"use client"

import ShoppingCart from '@/components/ShoppingCart';
import { ReactNode, createContext, useState } from 'react';

type ShoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: number
    quantity: number
    size: string
}

type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number, size: string) => number
    increaseCartQuantity: (id: number, quantity: number, size: string) => void
    decreaseCartQuantity: (id: number, size: string) => void
    removeFromCart: (id: number, size: string) => void
    cartQuantity: number
    cartItems: CartItem[]
}

export const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps){

    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)
    function getItemQuantity(id: number, size: string){
        return cartItems.find(item => item.id === id && item.size === size)?.quantity || 0
    }
    function increaseCartQuantity(id: number, quantity: number, size: string){
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null){
                return [...currItems, { id, size, quantity }]
            } 
            else if (currItems.find(item => item.id === id && item.size !== size)) {
                return [...currItems, { id, size, quantity }]
            }
            else {
                return currItems.map(item => {
                    if (item.id === id){
                        if (item.size === size){
                            return { ...item, quantity: item.quantity + quantity, size }
                        } else {
                            return item
                        }
                    } else {
                        return item
                    }
                })
            }
        })
    }
    function decreaseCartQuantity(id: number){
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1){
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id){
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }
    function removeFromCart(id: number){
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    return (
        <ShoppingCartContext.Provider value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartItems, cartQuantity, openCart, closeCart }}>
            {children}
            <ShoppingCart isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
    )
}