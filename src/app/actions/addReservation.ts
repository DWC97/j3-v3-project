"use server"

import prisma from "@/lib/prisma"

interface ReservationFormData {
    name: string;
    email: string;
    destination: string;
    numberInGroup: string;  
  }

export default async function addReservation(formData: ReservationFormData){

    const {name, email, destination, numberInGroup} = formData;
    const intNumberInGroup = parseInt(numberInGroup, 10);

    try {
        await prisma.reservation.create({
            data: {
                name, 
                email,
                destination,
                numberInGroup: intNumberInGroup
            }
        })
    } catch (e) {
        console.error(e)
    }
}