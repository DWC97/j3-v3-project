'use client';

// functional components
import CartItem from './CartItem';

// hooks
import { useClickOutside } from '@/hooks/useClickOutside';
import { useContext, useEffect, useRef } from 'react';

// context
import { ShoppingCartContext } from '@/context/ShoppingCartContext';

// data
import storeItemsData from '@/data/storeItems.json';

// animations
import Swal from 'sweetalert2';

// interfaces to ensure type validity
interface ShoppingCartProps {
    isOpen: boolean;
}

export default function ShoppingCart({ isOpen }: ShoppingCartProps) {
    const { cartItems, closeCart } = useContext(ShoppingCartContext);
    const subtotal = cartItems.reduce(
        (total, currItem) =>
            total +
            currItem.quantity *
                (storeItemsData.items.find((item) => item.id === currItem.id)
                    ?.price || 0),
        0
    ); // reduce method to find subtotals for items in cart
    const cartRef = useRef<HTMLDivElement>(null);
    const checkoutRef = useRef<HTMLButtonElement>(null);

    // close cart when user clicks outside of div
    let domNode = useClickOutside<HTMLDivElement>(() => {
        if (!isOpen) return;
        closeCart();
    });

    function handleSubmit() {
        closeCart();
        Swal.fire({
            title: 'Sorry!',
            text: 'Checkout is currently unavailable while we sort out our payments on the back-end.',
            icon: 'error',
            timer: 5000,
            timerProgressBar: true,
            showConfirmButton: false,
            scrollbarPadding: false,
        });
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
        if (isOpen) {
            if (e.key === 'Tab') {
                e.preventDefault();
                checkoutRef.current?.focus();
            } else if (e.key === 'Enter') {
                handleSubmit();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
            }
        }
    }

    // focus on cart when it's opened
    useEffect(() => {
        if (isOpen) {
            cartRef.current?.focus();
        }
    }, [isOpen]);

    return (
        <div
            ref={cartRef}
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e)}
            className={`${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} z-[10000] overflow-hidden w-full h-screen bg-black bg-opacity-70 fixed top-0 left-0 backdrop-blur-sm transition-opacity ease-in-out duration-700`}
        >
            <div
                className={`w-full md:w-1/2 xl:w-1/3 bg-white h-full absolute  top-0 border-y border-gray-100 flex flex-col z-[10001] ${isOpen ? 'right-0' : '-right-[40vw]'} ease-in-out duration-700`}
                ref={domNode}
            >
                <div className="w-full flex flex-row justify-between px-8 items-center mt-7 pb-8">
                    <span className="text-[20px] font-medium">
                        Shopping cart
                    </span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        className="hover:opacity-100 opacity-70 cursor-pointer ease-in-out duration-300"
                        onClick={() => {
                            closeCart();
                        }}
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                closeCart();
                            }
                        }}
                        viewBox="0 0 16 16"
                    >
                        <path
                            fill="gray"
                            d="M7.293 8L3.146 3.854a.5.5 0 1 1 .708-.708L8 7.293l4.146-4.147a.5.5 0 0 1 .708.708L8.707 8l4.147 4.146a.5.5 0 0 1-.708.708L8 8.707l-4.146 4.147a.5.5 0 0 1-.708-.708z"
                        ></path>
                    </svg>
                </div>
                <div className="px-8 h-full overflow-y-auto">
                    {cartItems.map((item, i) => {
                        return (
                            <div
                                key={i}
                                className="border-t first:border-transparent border-gray-300 pt-8 first:pt-2 mb-8"
                            >
                                <CartItem {...item} />
                            </div>
                        );
                    })}
                </div>
                <div className="flex flex-col justify-self-end justify-around border-t border-gray-300 h-96 w-full px-8">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col">
                            <span className="font-semibold">Subtotal</span>
                            <span className="text-gray-500 text-[14px]">
                                Shipping & taxes calculated at checkout.
                            </span>
                        </div>
                        <span className="font-semibold">
                            £{subtotal.toFixed(2)}
                        </span>
                    </div>
                    <button
                        className="w-full py-3 rounded-md font-semibold bg-custom-pink text-white bg-opacity-85 hover:bg-opacity-100 ease-in-out duration-300"
                        onClick={handleSubmit}
                        ref={checkoutRef}
                    >
                        Checkout
                    </button>
                    <div className="flex flex-row w-full justify-center gap-1 items-center">
                        <span className="text-gray-500 text-[14px]">or</span>
                        <div className="flex flex-row items-center gap-1 cursor-pointer hover:opacity-85 ease-in-out duration-300">
                            <span
                                className="text-custom-pink"
                                onClick={() => {
                                    closeCart();
                                }}
                            >
                                Continue Shopping
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className=""
                                width={12}
                                height={12}
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fill="#ec2aa2"
                                    fillRule="evenodd"
                                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                                ></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
