'use server';

import { NextRequest, NextResponse } from 'next/server';
import toursData from '@/data/tours.json';

// backend
import Stripe from 'stripe';
import prisma from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
    const event = await stripe.webhooks.constructEvent(
        await req.text(),
        req.headers.get('stripe-signature') as string,
        process.env.STRIPE_WEBHOOK_SECRET as string
    );

    if (event.type === 'charge.succeeded') {
        const charge = event.data.object;
        const tourId = parseInt(charge.metadata.tourId);
        const email = charge.billing_details.email;
        const price = charge.amount;
        const id = charge.id;

        const tour = toursData.tours.find((tour) => {
            return tour.id === tourId;
        });
        if (tour == null || email == null) {
            return new NextResponse('Bad request', { status: 400 });
        }

        try {
            await prisma.booking.create({
                data: {
                    id,
                    tourId,
                    email,
                    destination: tour.region,
                    price,
                },
            });
        } catch (e) {
            console.error(e);
            throw new Error('Failed to add booking to database');
        }
    }

    return new NextResponse();
}
