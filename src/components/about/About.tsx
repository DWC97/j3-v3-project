export default function About(){
    return (
        <div className="w-screen h-screen bg-black flex flex-row px-16 pt-32">
            <div className="flex flex-col w-screen">
                <div className="flex flex-col w-3/5">
                    <h1 className="bg-gradient-to-r from-custom-blue  to-custom-yellow inline-block text-transparent bg-clip-text text-5xl font-semibold tracking-wide">SMALL GROUP PARTY TOURS</h1>
                    <br/>
                    <p className="text-white">
                        Ahoy there! If you’re looking to experience the best nightlife & culture South-East Asia has to offer with a rowdy group of travellers and tick-off bucket-list activities along the way, JR has you covered. We make logistics stress-free so you can focus on having a good time.
                        <br/>
                        <br/>
                        Be warned, we do things a little differently over at JR: 
                        <br/>&nbsp;❌ &nbsp;No couples
                        <br/>&nbsp;&nbsp;🤘&nbsp;&nbsp; 18– 30 only
                        <br/>&nbsp;🍻&nbsp; Be prepared for LOTS of drinking
                    </p>
                    <br/>
                    <div className="h-10 w-full bg-gradient-to-r from-custom-orange to-custom-pink p-[2px] rounded-md cursor-pointer ">
                        <div className="h-full w-full bg-black flex items-center rounded-md hover:bg-opacity-0 duration-300 ease-in-out">
                            <div className="bg-gradient-to-r from-custom-orange  to-custom-pink flex justify-center items-center text-transparent bg-clip-text h-full w-full font-semibold hover:text-white ease-in-out duration-300">
                                SEE FULL TOUR SELECTION
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}