import NotFound from "@/app/not-found";
import Image from "next/image";
import Link from "next/link";
import toursData from "@/data/tours.json"
import storeItemsData from "@/data/storeItems.json"

// backend
import Stripe from "stripe"
import { formatNumber } from "@/lib/Utils";
import prisma from "@/lib/prisma"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export default async function SuccessPage({ searchParams }: { searchParams: { payment_intent: string }}){

    const paymentIntent = await stripe.paymentIntents.retrieve(searchParams.payment_intent)

    if (paymentIntent.metadata.tourId == null) return NotFound()

    const tour = toursData.tours.find(tour => {
        return tour.id === parseInt(paymentIntent.metadata.tourId)
    }) // find tour in data using payment intent metadata

    if (tour == null) return NotFound()

    const isSuccess = paymentIntent.status === "succeeded"

    let booking = null
    if (typeof paymentIntent.latest_charge === "string") {
        booking = await prisma.booking.findUnique({
            where: {
                id: paymentIntent.latest_charge,
            },
        })
    }
    
    return (
        <div className="w-full min-h-[90vh] bg-black flex justify-center">
            <div className="px-10 pt-40">
                <div className=" flex flex-row items-center">
                    <h1 className="font-bold text-white text-[32px] md:text-[40px]">{isSuccess ? "Booking Successful!" : "Error!"}</h1>
                    {isSuccess ? <svg xmlns="http://www.w3.org/2000/svg" className="ml-4" width={32} height={32} viewBox="0 0 20 20">
                        <path fill="green" d="M10 20a10 10 0 0 1 0-20a10 10 0 1 1 0 20m-2-5l9-8.5L15.5 5L8 12L4.5 8.5L3 10z"></path>
                    </svg> :
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-4" width={32} height={32} viewBox="0 0 24 24">
                        <path fill="#e53935" d="M12 17q.425 0 .713-.288T13 16t-.288-.712T12 15t-.712.288T11 16t.288.713T12 17m-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"></path>
                    </svg>}
                </div>
                {isSuccess ? <p className="text-white text-[16px] mb-10 mt-4">You&apos;re all set! A booking confirmation has been sent to <span className="underline">{booking?.email}</span></p> :
                <p className="text-white text-[16px] mb-10 mt-4">Looks like something went wrong... Click <Link className="text-custom-pink underline" href={`/${tour.region}/booking`}>here</Link> to try again.</p> }
                <div className="w-full h-[180px] hidden sm:flex bg-gradient-to-r from-custom-orange to-custom-pink p-[2px] rounded-2xl">
                    <div className="bg-black w-full h-full rounded-2xl flex flex-row overflow-hidden">
                        <div className="h-full w-[240px] md:w-[400px] relative">
                            <Image
                                src={tour?.imageSrc}
                                alt="destination bg"
                                fill
                                sizes='(height: 100%)'
                                className="object-cover"
                                priority
                            />
                        </div>
                        <div className="flex flex-row justify-between w-full">
                            <div className="flex flex-col justify-center ml-8">
                                <h1 className="text-white text-[24px] md:text-[28px] font-semibold">{tour.region.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}</h1>
                                <h2 className="text-gray-200 text-[18px]">{tour.title.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}</h2>
                                <span className="text-gray-300 italic mt-10">{tour.duration} nights</span>
                            </div>
                            <div className="flex flex-col  pt-8 mr-8">
                                <Link href={`/${tour.region}`} className=" bg-black  flex-row items-center hover:opacity-85 ease-in-out duration-300 flex">
                                    <span className="text-gray-200 text-[12px] font-semibold ">Tour info</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className='pl-3' width={32} height={32} viewBox="0 0 16 16"><path fill="white" fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"></path></svg>
                                </Link>
                                <span className="text-white text-[29px] font-bold mt-12 ">{formatNumber(tour.price)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col mt-20 pb-16">
                    <span className="text-white font-semibold text-[20px]">Make sure you grab some of our merch for the trip!</span>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-10 w-full mt-8">
                        {storeItemsData.items.slice(0, 3).map(item => {
                            return (
                                <div key={item.id} className="flex flex-col">
                                    <div className="relative w-full object-contain rounded-lg overflow-hidden">
                                        <div className="w-full overflow-hidden relative aspect-square">
                                            <Image
                                                src={item.gallery[0]}
                                                alt="cart item"
                                                fill
                                                sizes='(width: 100%)'
                                                priority
                                            />
                                        </div>
                                        <div className="absolute w-full h-1/2 bottom-0 left-0 bg-gradient-to-t from-black to-transparent opacity-70" />
                                        <span className="absolute text-white text-[20px] bottom-4 right-4">£{item.price}</span>
                                    </div>
                                    <span className="text-white mt-4">{item.name}</span>
                                    <span className="text-[14px] text-gray-300 mt-1">{item.color}</span>
                                    <Link href={`/store/${item.name}`} className="mt-6 w-full text-gray-300 hover:text-white hover:border-white py-2 border border-gray-300 rounded-md font-medium ease-in-out duration-300 text-center">Find out more</Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}