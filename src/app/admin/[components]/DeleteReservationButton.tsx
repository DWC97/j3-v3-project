"use client"

import { useRouter } from 'next/navigation';
import deleteReservation from '@/app/actions/deleteReservation';

interface DeleteReservationButtonProps {
    id: string; 
}

export default function DeleteReservationButton({ id }: DeleteReservationButtonProps){

    const router = useRouter()

    async function handleClick(){
        try{
            await deleteReservation(id)
            router.refresh()
        } catch (error){
            console.error(error)
        }
    }

    return (
        <button onClick={handleClick} className="text-red-600 outline-red-600">Delete post</button>
    )
}