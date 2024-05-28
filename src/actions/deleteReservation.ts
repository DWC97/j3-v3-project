'use server';

import prisma from '@/lib/prisma';

export default async function deleteReservation(id: string): Promise<void> {
    try {
        await prisma.reservation.delete({
            where: { id },
        });
    } catch (e) {
        console.error(e);
        throw new Error('Failed to delete reservation');
    }
}
