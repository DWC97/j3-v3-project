'use server';

import prisma from '@/lib/prisma';

export default async function userBookingExists(email: string, tourId: number) {
    return (
        (await prisma.booking.findFirst({
            where: {
                tourId,
                email,
            },
        })) != null
    );
}
