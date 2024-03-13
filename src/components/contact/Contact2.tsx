export default function Contact2(){
    return (
        <div className="bg-black w-full h-screen contact flex flex-row items-center justify-around pt-20">
            <img src="/contact/Jolly_Roger.jpg" className="w-[430px] -mr-20"/>
            <div className="flex flex-col justify-between w-[500px] md:w-[600px] h-[400px] bg-black bg-opacity-50 rounded-3xl z-30 -ml-20">
                <p className="text-white text-[14px] mb-4">
                    Please note. Jolly Roger Tours is currently going through the incorporation and licensing process in the UK and will launch officially in late 2024. 
                </p>
                <h2 className="font-semibold text-[44px] text-white">RESERVE A SPOT</h2>
                <form action="" className="flex flex-col justify-between h-[250px]">
                    <input type="text" placeholder="Your name*" className="w-[240px] placeholder-gray-300 text-white bg-transparent border-b border-white p-2 focus:outline-none"
                    />   
                    <input type="text" placeholder="Email*" className="w-[240px] placeholder-gray-300 text-white bg-transparent border-b border-white p-2 focus:outline-none"
                    />   
                    <div className="flex flex-row w-full justify-between">
                        <input type="text" placeholder="Destination*" className="w-[240px] placeholder-gray-300 text-white bg-transparent border-b border-white p-2 focus:outline-none"/>  
                        <input type="text" placeholder="No. of people*" className="w-[240px] placeholder-gray-300 text-white bg-transparent border-b border-white p-2 focus:outline-none"/>  
                    </div>
                    <button className="font-semibold  text-white w-full self-center py-2 rounded-md mt-8 bg-gradient-to-r from-custom-orange to-custom-pink ">
                        SUBMIT
                    </button>
                </form>
            </div>
        </div>
    )
}