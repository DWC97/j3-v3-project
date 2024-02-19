export default function Navbar(){
    return (
        <div className="absolute left-0 top-0 z-[1000] w-screen h-20 bg-black">
            <div className="relative">
                <img src="/logo.png" className="absolute left-0 right-0 m-auto my-auto w-20 mt-2"/>
            </div>
            <div className="w-1/2 h-full flex justify-end text-red-500">
                <span className="h-full flex items-center justify-center border-4 border-red-500 w-44">ABOUT</span>
                <span className="h-full flex items-center justify-center border-4 border-red-500 w-44">TOURS</span>
                <span className="h-full flex items-center justify-center border-4 border-red-500 w-44 mr-24">CONTACT</span>
            </div>
        </div>
    )
}