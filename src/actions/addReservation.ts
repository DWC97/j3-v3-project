"use server"

import prisma from "@/lib/prisma"
import { FormData } from "@/components/home/contact/Contact";

export default async function addReservation(formData: FormData): Promise<void>{

    const {name, email, destination, numberInGroup} = formData;


    try {
        await prisma.reservation.create({
            data: {
                name, 
                email,
                destination,
                numberInGroup
            }
        })
    } catch (e) {
        console.error(e)
        throw new Error("Failed to add reservation");
    }
}