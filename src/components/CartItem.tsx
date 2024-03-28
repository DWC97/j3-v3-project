import storeItemsData from "@/data/storeItems.json"

export default function CartItem({ id, quantity, size }){

    const item = storeItemsData.items.find(item => item.id === id)

    return (
        <div className="flex flex-row gap-6">
            <img src={item?.gallery[0]} className="w-24 h-24 object-cover border border-gray-300 rounded-md"/>
            <div className="flex flex-col justify-between w-full">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                        <span className="font-semibold">{item?.name}</span>
                        <span className="text-gray-500 text-[14px]">{size}</span>
                    </div>
                    <span className="font-semibold">£{item?.price}.00</span>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <span className="text-gray-500 text-[14px]">Qty {quantity}</span>
                    <span className="text-custom-pink text-[14px] cursor-pointer ease-in-out duration-300 hover:opacity-85">Remove</span>
                </div>
            </div>
        </div>
    )
}