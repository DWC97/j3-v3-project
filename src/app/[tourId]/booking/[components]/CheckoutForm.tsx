'use client';

import userBookingExists from '@/actions/userBookingExists';
import { formatNumber } from '@/lib/Utils';
import {
    Elements,
    LinkAuthenticationElement,
    PaymentElement,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

type CheckoutFormProps = {
    tour: {
        imageSrc: string;
        region: string;
        title: string;
        price: number;
        duration: number;
        id: number;
    };
    clientSecret: string;
};

type Appearance = {
    theme?: 'stripe' | 'night' | 'flat';
    labels?: 'floating' | 'above';
    variables?: {
        colorPrimary?: string;
        colorText?: string;
        colorBackground?: string;
        fontFamily?: string;
        colorDanger?: string;
        [key: string]: string | undefined;
    };
};

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

const appearance: Appearance = {
    theme: 'stripe',
    labels: 'floating',
    variables: {
        colorPrimary: '#ec2aa2',
        colorText: '#ffffff',
        colorBackground: '#000000',
        fontFamily: 'Poppins, system-ui, sans-serif',
        colorDanger: '#d32f2f',
    },
};

export default function CheckoutForm({
    tour,
    clientSecret,
}: CheckoutFormProps) {
    return (
        <div className="pb-28 px-10">
            <Link
                href={`/${tour.region}`}
                className="mt-24 mb-10 bg-black flex flex-row items-center w-[230px] hover:opacity-85 ease-in-out duration-300"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="pl-3 rotate-180"
                    width={32}
                    height={32}
                    viewBox="0 0 16 16"
                >
                    <path
                        fill="white"
                        fillRule="evenodd"
                        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                    ></path>
                </svg>
                <span className="text-gray-200 text-[14px] font-semibold">
                    BACK TO TOUR INFO PAGE
                </span>
            </Link>
            <div className="w-full h-[180px] hidden sm:flex bg-gradient-to-r from-custom-orange to-custom-pink p-[2px] rounded-2xl">
                <div className="bg-black w-full h-full rounded-2xl flex flex-row overflow-hidden">
                    <div className="h-full w-[240px] md:w-[400px] relative">
                        <Image
                            src={tour?.imageSrc}
                            alt="destination bg"
                            fill
                            sizes="(height: 100%)"
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="flex flex-row justify-between w-full">
                        <div className="flex flex-col justify-center ml-8">
                            <h1 className="text-white text-[24px] md:text-[28px] font-semibold">
                                {tour.region
                                    .split('-')
                                    .map(
                                        (word) =>
                                            word.charAt(0).toUpperCase() +
                                            word.slice(1).toLowerCase()
                                    )
                                    .join(' ')}
                            </h1>
                            <h2 className="text-gray-200 text-[18px]">
                                {tour.title
                                    .split(' ')
                                    .map(
                                        (word) =>
                                            word.charAt(0).toUpperCase() +
                                            word.slice(1).toLowerCase()
                                    )
                                    .join(' ')}
                            </h2>
                            <span className="text-gray-300 italic mt-10">
                                {tour.duration} nights
                            </span>
                        </div>
                        <div className="flex flex-col  pt-8 mr-8">
                            <Link
                                href={`/${tour.region}`}
                                className=" bg-black  flex-row items-center hover:opacity-85 ease-in-out duration-300 flex"
                            >
                                <span className="text-gray-200 text-[12px] font-semibold ">
                                    Tour info
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="pl-3"
                                    width={32}
                                    height={32}
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        fill="white"
                                        fillRule="evenodd"
                                        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                                    ></path>
                                </svg>
                            </Link>
                            <span className="text-white text-[29px] font-bold mt-12 ">
                                {formatNumber(tour.price)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="text-[28px] font-semibold text-white mt-10 mb-4">
                Checkout
            </h1>
            <Elements
                options={{ clientSecret, appearance }}
                stripe={stripePromise}
            >
                <Form price={tour.price} tourId={tour.id} />
            </Elements>
        </div>
    );
}

function Form({ price, tourId }: { price: number; tourId: number }) {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [email, setEmail] = useState<string>();

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (stripe == null || elements == null || email == null) return;

        setIsLoading(true);

        const bookingExists = await userBookingExists(email, tourId);

        if (bookingExists) {
            setErrorMessage(
                'You have already booked this tour. Use a different email if you would like to book another spot.'
            );
            setIsLoading(false);
            return;
        }

        stripe
            .confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success`,
                },
            })
            .then(({ error }) => {
                if (
                    error.type === 'card_error' ||
                    error.type === 'validation_error'
                ) {
                    setErrorMessage(error.message);
                } else {
                    setErrorMessage('An unknown error occurred');
                }
            })
            .finally(() => setIsLoading(false));
    }

    return (
        <form onSubmit={handleSubmit} className="">
            {errorMessage && (
                <p className="text-red-600 font-semibold mb-2">
                    {errorMessage}
                </p>
            )}
            <PaymentElement />
            <div className="mt-4">
                <LinkAuthenticationElement
                    onChange={(e) => setEmail(e.value.email)}
                />
            </div>
            <button
                className={`font-semibold mt-8 text-white w-full py-2 rounded-md bg-gradient-to-r from-custom-orange to-custom-pink ${isLoading ? 'opacity-70 hover:opacity-70' : 'hover:opacity-85'}  ease-in-out duration-300`}
                disabled={stripe == null || elements == null || isLoading}
            >
                {isLoading ? 'Purchasing...' : `Purchase - £${price}`}
            </button>
        </form>
    );
}
