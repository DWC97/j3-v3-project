// data
import NotFound from "@/app/not-found"
import toursData from "@/data/tours.json"

// backend
import Stripe from "stripe"

// functional components
import CheckoutForm from "./[components]/CheckoutForm"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export default async function BookingPage({ params }: { params: { tourId: string } }){

    const tour = toursData.tours.find(tour => {
        return tour.region === params.tourId
    }) // find tour in data using search param
    if (tour == null) return NotFound()

    const paymentIntent = await stripe.paymentIntents.create({
        amount: tour.price * 100,
        currency: "GBP",
        metadata: { tourId: tour.id }
    })

    if (paymentIntent.client_secret == null){
        throw Error("Stripe failed to create payment intent.")
    }

    return (
        <div className="w-full min-h-[90vh] bg-black ">
            <div className="w-full h-[250px] bg-black text-white font-bold text-[32px] md:text-[40px] px-10 xl:px-20 2xl:px-60 flex items-end mb-10">
                <h1 className="pb-4">{tour.region.toUpperCase().replace("-", " ")} - {tour.title.toUpperCase()}</h1>
            </div>
            <div className="px-10 xl:px-20 2xl:px-60">
                <CheckoutForm tour={tour} clientSecret={paymentIntent.client_secret}/>
            </div>
        </div>
    )
}