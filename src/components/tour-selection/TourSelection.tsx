export default function TourSelection(){
    return (
        <div className="w-full relative h-[1080px] flex justify-center items-center">
            <div className="bg-[url('/tour-selection/beach.jpg')] w-full h-full bg-center bg-no-repeat bg-cover bg-fixed absolute -z-20" />
            <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-custom-blue to-custom-yellow opacity-80 -z-10" />
            <div className="border-2 border-red w-[1000px] h-[600px] flex flex-col justify-between items-center">
                <h2 className="text-[44px] text-white font-semibold tracking-wide">
                    CHECK OUT OUR <span className="text-custom-yellow">UPCOMING TRIPS</span>!
                </h2>
                <p className="text-[20px] text-gray-100">
                    Each tour includes transport, accommodation and activities.
                </p>
            </div>
        </div>
    )
}