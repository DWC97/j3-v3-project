"use client"

import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

type CheckoutFormProps = {
    tour: {},
    clientSecret: string
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)

const appearance = {
    theme: 'stripe',
    labels: 'floating',
    variables: {
        colorPrimary: '#ec2aa2',
        colorText: '#ffffff',
        colorBackground: '#000000',
        fontFamily: 'Poppins, system-ui, sans-serif'
        
      }
  };

export default function CheckoutForm({ tour, clientSecret }: CheckoutFormProps){
    return (
        <Elements options={{ clientSecret, appearance }} stripe={stripePromise}>
            <Form />
        </Elements>
    )
}

function Form(){
    const stripe = useStripe()
    const elements = useElements()

    return (
        <PaymentElement />
    )
}