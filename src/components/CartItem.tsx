import { ShoppingCartContext } from "@/context/ShoppingCartContext"
import storeItemsData from "@/data/storeItems.json"
import { useContext } from "react"
import Image from 'next/image';

interface CartItemProps {
    id: number;
    quantity: number;
    size?: string;
}

export default function CartItem({ id, quantity, size } : CartItemProps){

    const item = storeItemsData.items.find(item => item.id === id)
    const { removeFromCart } = useContext(ShoppingCartContext)

    if (!item) {
        return null;
    }

    return (
        <div className="flex flex-row gap-6">
            <Image
                src={item?.gallery[0]}
                alt="cart item"
                height={96}
                width={96}
                objectFit="cover"
                className="border border-gray-300 rounded-md"
            />
            {/* <img src={item?.gallery[0]} className="w-24 h-24 object-cover border border-gray-300 rounded-md"/> */}
            <div className="flex flex-col justify-between w-full">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                        <span className="font-semibold">{item?.name}</span>
                        {item.sizes ?
                        <span className="text-gray-500 text-[14px]">{size}</span>
                        : null
                        }
                        
                    </div>
                    <span className="font-semibold">£{item?.price.toFixed(2)}</span>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <span className="text-gray-500 text-[14px]">Qty {quantity}</span>
                    <span className="text-custom-pink text-[14px] cursor-pointer ease-in-out duration-300 hover:opacity-85"
                    onClick={() => removeFromCart(id, size || "")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        removeFromCart(id, size || "");
                      }
                    }}
                    >Remove</span>
                </div>
            </div>
        </div>
    )
}