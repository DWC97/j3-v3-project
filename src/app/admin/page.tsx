import prisma from '@/lib/prisma';
import DeleteReservationButton from './[components]/DeleteReservationButton';

// Define the Reservation type
interface Reservation {
    id: string;
    name: string;
    email: string;
    destination: string;
    numberInGroup: number;
    createdAt: Date;
}

async function getReservations(): Promise<Reservation[]> {
    const reservations = await prisma.reservation.findMany();
    return reservations;
}

export default async function Admin() {
    const reservations = await getReservations();

    return (
        <div className="min-h-[90vh] w-full bg-black text-white flex flex-col items-center">
            <div className="flex flex-col items-center">
                <h1 className="font-semibold text-xl mt-20">RESERVATIONS</h1>
                {reservations.map((reservation) => {
                    return (
                        <div
                            key={reservation.id}
                            className="border border-black p-4 m-2"
                        >
                            <h2 className="font-bold">
                                {reservation.destination} for{' '}
                                {reservation.numberInGroup}
                            </h2>
                            <p>{reservation.email}</p>
                            <h3 className="italic">-{reservation.name}</h3>
                            <DeleteReservationButton id={reservation.id} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
