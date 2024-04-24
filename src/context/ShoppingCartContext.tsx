"use client"

// functional components
import ShoppingCart from '@/components/store/ShoppingCart';

// hooks
import { ReactNode, createContext, useState } from 'react';
import useBodyLockScroll from '@/hooks/useBodyLockScroll';
import useLocalStorage from '@/hooks/useLocalStorage';

// interfaces to ensure type validity
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

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {

    const [isOpen, setIsOpen] = useState(false) // state to track whether cart is open
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping cart", []) // cart items array
    const [toggle] = useBodyLockScroll() // toggle scroll lock

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    function openCart() {
        setIsOpen(true)
        toggle()
    }
    function closeCart() {
        setIsOpen(false)
        toggle()
    }
    function getItemQuantity(id: number, size: string) {
        return cartItems.find(item => item.id === id && item.size === size)?.quantity || 0
    }
    function increaseCartQuantity(id: number, quantity: number, size: string) {
        setCartItems(currItems => {
            const index = currItems.findIndex(item => item.id === id && item.size === size);
            if (index > -1) {
                // Clone the array to avoid direct state mutation
                const newItems = [...currItems];
                // Update the item quantity
                newItems[index] = { ...newItems[index], quantity: newItems[index].quantity + quantity };
                return newItems;
            } else {
                // Item not found, add as new item
                return [...currItems, { id, size, quantity }];
            }
        });
    }
    function decreaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }
    function removeFromCart(id: number, size: string) {
        setCartItems(currItems => {
            return currItems.filter(item => {
                return item.id !== id || item.size !== size
            })
        })
    }

    // entire app wrapped in context and cart component
    return (
        <ShoppingCartContext.Provider value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartItems, cartQuantity, openCart, closeCart }}>
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    )
}