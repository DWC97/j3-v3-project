"use server"

import prisma from "@/lib/prisma"

export default async function addReservation(formData){

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