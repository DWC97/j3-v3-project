export default function About(){
    return (
        <div className="overflow-hidden relative bg-black">
            {/* <div className="absolute bottom-0 left-0 w-full h-[250px] bg-gradient-to-b from-black to-custom-blue opacity-60"></div> */}
            <div className="w-full lg:h-[624px] flex flex-row px-8 md:px-16 ">
                <div className="flex flex-col lg:flex-row w-screen items-center justify-center lg:max-h-[402px] mt-48 border-2 border-red-500 mb-16 lg:mb-0">
                    <div className="flex flex-col h-[400px] mb-12 md:mb-16 lg:mb-0 max-w-[850px] lg:min-h-[402px] justify-between">
                        <h2 className="bg-gradient-to-r from-custom-blue  to-custom-yellow inline-block text-transparent bg-clip-text text-[28px] md:text-[44px] lg:text-[36px] xl:text-[44px] font-semibold tracking-wide min-[1366px]:text-[48px] 2xl:text-[56px] max-[480px]:text-[24px] max-[416px]:text-[20px] lg:text-left text-center">SMALL GROUP PARTY TOURS</h2>
                        <p className="text-white text-[16px] xl:text-[18px] max-[480px]:text-[14px]">
                            Ahoy there! If you’re looking to experience the best nightlife & culture South-East Asia has to offer with a rowdy group of travellers and tick-off bucket-list activities along the way, JR has you covered. We make logistics stress-free so you can focus on having a good time.
                        </p>
                        <p className="text-white text-[16px] xl:text-[18px]  z-10 max-[480px]:text-[14px]">    
                            Be warned, we do things a little differently over at JR: 
                            <br/>&nbsp;❌ &nbsp;No couples
                            <br/>&nbsp;&nbsp;🤘&nbsp;&nbsp; 18– 30 only
                            <br/>&nbsp;🍻&nbsp; Be prepared for LOTS of drinking
                        </p>
                        <div className="h-10 w-full bg-gradient-to-r from-custom-orange to-custom-pink p-[2px] rounded-md cursor-pointer mt-8 z-10">
                            <div className="h-full w-full bg-black flex items-center rounded-md hover:bg-opacity-0 duration-300 ease-in-out">
                                <div className="bg-gradient-to-r from-custom-orange  to-custom-pink flex justify-center items-center text-transparent bg-clip-text h-full w-full font-semibold hover:text-white ease-in-out duration-300 xl:text-[18px] max-[480px]:text-[14px]">
                                    SEE FULL TOUR SELECTION
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center lg:ml-12 lg:max-w-[430px] w-full z-10 border-2 border-pink-500">
                        <img src="/about/jagged2.png" className="lg:max-w-[430px] lg:min-w-[430px] lg:max-h-[402px] w-full"/>
                    </div>
                </div>
            </div>
            {/* <div className="w-full flex justify-center">
                <div className="flex flex-row w-full px-16 h-[456px] max-w-[1400px]">
                    <div className="w-1/2 flex flex-row justify-around -mt-28">
                        <img src="/about/pirate-polaroid.png" className="w-[250px] -rotate-6 object-contain"/>
                        <img src="/about/tubing-polaroid.png" className="w-[250px] rotate-12 object-contain	"/>
                    </div>
                    <div className="w-1/2 flex flex-row justify-around -mt-28">
                        <img src="/about/waterpark-polaroid.png" className="w-[250px] -rotate-4 object-contain z-10"/>
                        <img src="/about/muaythai-polaroid.png" className="w-[250px] -rotate-12 object-contain"/>
                    </div>
                </div>
            </div>       */}
        </div>
    )
}