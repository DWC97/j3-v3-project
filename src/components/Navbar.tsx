export default function Navbar(){
    return (
        <div className="absolute left-0 top-0 z-[1000] w-screen h-20">
            <div className="relative">
                <img src="/logo.png" className="absolute left-0 right-0 m-auto my-auto w-20 mt-2"/>
            </div>
            <div className="flex flex-row w-screen h-full ">
                <div className="w-1/2 h-full flex justify-end text-white">
                    <span className="h-full flex items-center justify-center  w-44">ABOUT</span>
                    <span className="h-full flex items-center justify-center  w-44">TOURS</span>
                    <span className="h-full flex items-center justify-center  w-44 mr-24">CONTACT</span>
                </div>
                <div className="w-1/2 right-1/2 h-full flex justify-between text-white">
                    <span className="h-full flex items-center justify-center  w-44 ml-24">STORE</span>
                    <div className='flex justify-center items-center w-44'>
                        <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 24 24"><path fill="white" d="M7.308 21.115q-.633 0-1.067-.433q-.433-.434-.433-1.067q0-.632.433-1.066q.434-.434 1.067-.434q.632 0 1.066.434q.434.434.434 1.066q0 .633-.434 1.067q-.434.433-1.066.433m9.384 0q-.632 0-1.066-.433q-.434-.434-.434-1.067q0-.632.434-1.066q.434-.434 1.066-.434q.633 0 1.067.434q.433.434.433 1.066q0 .633-.433 1.067q-.434.433-1.067.433M5.881 5.5l2.669 5.615h6.635q.173 0 .307-.086q.135-.087.231-.24l2.615-4.75q.116-.212.02-.376q-.096-.163-.327-.163zm-.489-1h13.02q.651 0 .98.532q.33.531.035 1.095l-2.858 5.208q-.217.365-.564.573q-.347.207-.763.207H8.1l-1.215 2.231q-.154.23-.01.5t.433.27h10.884v1H7.308q-.875 0-1.306-.738q-.43-.738-.021-1.482l1.504-2.68L3.808 3.5H2v-1h2.442zm3.158 6.615h7z"></path></svg>
                    </div>
                </div>
            </div>
            
        </div>
    )
}