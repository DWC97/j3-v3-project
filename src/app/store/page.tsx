

export default function Store(){

    return (
        <div className="bg-black h-[1500px] w-full px-12 pt-[180px]">
            <div className="w-full h-[180px] border-b border-gray-300 flex flex-col justify-center">
                <h1 className="text-white font-bold text-[40px] mb-2">Merchandise</h1>
                <div className="flex flex-row justify-between items-center">
                    <span className="text-gray-300">Join the JR crew early with our custom apparel and accessories for season 1</span>
                    <div className="flex flex-row justify-between items-center w-16">
                        <span className="text-gray-300 font-semibold">Sort</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className='rotate-180' width={20} height={20} viewBox="0 0 16 16"><path fill="white" d="m2.931 10.843l4.685-4.611a.546.546 0 0 1 .768 0l4.685 4.61a.55.55 0 0 0 .771 0a.53.53 0 0 0 0-.759l-4.684-4.61a1.65 1.65 0 0 0-2.312 0l-4.684 4.61a.53.53 0 0 0 0 .76a.55.55 0 0 0 .771 0"></path></svg>
                    </div>
                </div>
            </div>
        </div>
    )
}