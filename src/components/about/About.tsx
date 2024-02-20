export default function About(){
    return (
        <div className="overflow-hidden">
            <div className="w-full h-[624px] bg-black flex flex-row px-16">
                <div className="flex flex-row w-screen items-center max-h-[402px] mt-40">
                    <div className="flex flex-col min-h-[402px] justify-between">
                        <h2 className="bg-gradient-to-r from-custom-blue  to-custom-yellow inline-block text-transparent bg-clip-text text-[44px] font-semibold tracking-wide">SMALL GROUP PARTY TOURS</h2>
                        <p className="text-white text-[16px] leading-7">
                            Ahoy there! If you’re looking to experience the best nightlife & culture South-East Asia has to offer with a rowdy group of travellers and tick-off bucket-list activities along the way, JR has you covered. We make logistics stress-free so you can focus on having a good time.
                        </p>
                        <p className="text-white text-[16px] leading-7">    
                            Be warned, we do things a little differently over at JR: 
                            <br/>&nbsp;❌ &nbsp;No couples
                            <br/>&nbsp;&nbsp;🤘&nbsp;&nbsp; 18– 30 only
                            <br/>&nbsp;🍻&nbsp; Be prepared for LOTS of drinking
                        </p>
                        <div className="h-10 w-full bg-gradient-to-r from-custom-orange to-custom-pink p-[2px] rounded-md cursor-pointer mt-8">
                            <div className="h-full w-full bg-black flex items-center rounded-md hover:bg-opacity-0 duration-300 ease-in-out">
                                <div className="bg-gradient-to-r from-custom-orange  to-custom-pink flex justify-center items-center text-transparent bg-clip-text h-full w-full font-semibold hover:text-white ease-in-out duration-300">
                                    SEE FULL TOUR SELECTION
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center ml-12">
                        <img src="/about/jagged2.png" className="min-w-[430px]"/>
                    </div>
                </div>
            </div>
            <div className="flex flex-row bg-black w-full px-16 h-[456px]">
                <div className="w-1/2 flex flex-row justify-around -mt-20">
                    <img src="/about/pirate-polaroid.png" className="w-[250px] -rotate-6 object-contain	"/>
                    <img src="/about/tubing-polaroid.png" className="w-[250px] rotate-12 object-contain	"/>
                </div>
                <div className="w-1/2 flex flex-row justify-around -mt-20">
                    <img src="/about/waterpark-polaroid.png" className="w-[250px] -rotate-4 object-contain	"/>
                    <img src="/about/muaythai-polaroid.png" className="w-[250px] -rotate-12 object-contain	"/>
                </div>
                {/* <div className="w-1/2 flex flex-row justify-around">
                    <img src="/about/waterpark-polaroid.png" className="w-[250px] -rotate-6"/>
                    <img src="/about/muaythai-polaroid.png" className="w-[250px] rotate-12"/>
                </div> */}
            </div>
        </div>
    )
}