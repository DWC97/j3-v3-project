"use client"

import storeItemsData from "@/data/storeItems.json"

export default function itemDetails({ params }: { params: { itemId: string }}){
    
    const item = storeItemsData.items.find(item => {
        return item.name === params.itemId.replaceAll("%20", " ")
    })
   

    return (
        <div>
            welcome to the item page for {item?.name}
        </div>
    )
}