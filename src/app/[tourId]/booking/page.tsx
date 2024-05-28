// data
import NotFound from '@/app/not-found';
import toursData from '@/data/tours.json';

// backend
import Stripe from 'stripe';

// functional components
import CheckoutForm from './[components]/CheckoutForm';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function BookingPage({
    params,
}: {
    params: { tourId: string };
}) {
    const tour = toursData.tours.find((tour) => {
        return tour.region === params.tourId;
    }); // find tour in data using search param
    if (tour == null) return NotFound();

    const paymentIntent = await stripe.paymentIntents.create({
        amount: tour.price * 100,
        currency: 'GBP',
        metadata: { tourId: tour.id },
    });

    if (paymentIntent.client_secret == null) {
        throw Error('Stripe failed to create payment intent.');
    }

    return (
        <div className="w-full min-h-[90vh] bg-black flex justify-center items-center">
            <div className="w-[800px]">
                <CheckoutForm
                    tour={tour}
                    clientSecret={paymentIntent.client_secret}
                />
            </div>
        </div>
    );
}
