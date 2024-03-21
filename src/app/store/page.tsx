

export default function Store(){

    return (
        <div className="bg-black min-h-screen w-full px-12 pt-[180px]">
            <div className="w-full h-[180px] border-b border-gray-300 flex flex-col justify-center">
                <h1 className="text-white font-bold text-[40px] mb-2">Merchandise</h1>
                <div className="flex flex-row justify-between items-center">
                    <span className="text-gray-300">Join the JR crew early with our custom apparel and accessories for Season 1</span>
                    <div className="flex flex-row justify-between items-center w-16">
                        <span className="text-gray-300 font-semibold">Sort</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className='rotate-180' width={20} height={20} viewBox="0 0 16 16"><path fill="white" d="m2.931 10.843l4.685-4.611a.546.546 0 0 1 .768 0l4.685 4.61a.55.55 0 0 0 .771 0a.53.53 0 0 0 0-.759l-4.684-4.61a1.65 1.65 0 0 0-2.312 0l-4.684 4.61a.53.53 0 0 0 0 .76a.55.55 0 0 0 .771 0"></path></svg>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-row justify-between py-12">
                <div className="w-1/4 flex flex-col">
                    <div className="w-full flex flex-col">
                        <span className="text-white pb-4">Category</span>
                        <div className="pb-1">
                            <label className="text-gray-300">
                                <input type="checkbox" className="mr-3"/>
                                Tees
                            </label>
                        </div>
                        <div className="pb-1">
                            <label className="text-gray-300">
                                <input type="checkbox" className="mr-3"/>
                                Hoodies
                            </label>
                        </div>
                        <div className="pb-1">
                            <label className="text-gray-300">
                                <input type="checkbox" className="mr-3"/>
                                Wife Beaters
                            </label>
                        </div>
                        <div className="">
                            <label className="text-gray-300">
                                <input type="checkbox" className="mr-3"/>
                                Accesories
                            </label>
                        </div>
                    </div>
                    <div className="w-full flex flex-col mt-12">
                        <span className="text-white pb-4">Color</span>
                        <div className="pb-1">
                            <label className="text-gray-300">
                                <input type="checkbox" className="mr-3"/>
                                Black
                            </label>
                        </div>
                        <div className="pb-1">
                            <label className="text-gray-300">
                                <input type="checkbox" className="mr-3"/>
                                White
                            </label>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-10 w-3/4">
                    <div className="flex flex-col justify-between">
                        <img src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg" className="w-full aspect-[5/6] object-cover rounded-t-lg"/>
                        <div className="flex flex-row justify-between items-center text-white pt-4 pb-1">
                            <span>Basic Tee</span>
                            <span className="font-semibold">£25</span>
                        </div>
                        <span className="text-gray-300">Black</span>
                    </div>
                    <div className="flex flex-col justify-between">
                        <img src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg" className="w-full aspect-[5/6] object-cover"/>
                        <div className="flex flex-row justify-between items-center text-white pt-4 pb-1">
                            <span>Basic Tee</span>
                            <span className="font-semibold">£25</span>
                        </div>
                        <span className="text-gray-300">Black</span>
                    </div>
                    <div className="flex flex-col justify-between">
                        <img src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg" className="w-full aspect-[5/6] object-cover"/>
                        <div className="flex flex-row justify-between items-center text-white pt-4 pb-1">
                            <span>Basic Tee</span>
                            <span className="font-semibold">£25</span>
                        </div>
                        <span className="text-gray-300">Black</span>
                    </div>
                    <div className="flex flex-col justify-between p">
                        <img src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg" className="w-full aspect-[5/6] object-cover"/>
                        <div className="flex flex-row justify-between items-center text-white pt-4 pb-1">
                            <span>Basic Tee</span>
                            <span className="font-semibold">£25</span>
                        </div>
                        <span className="text-gray-300">Black</span>
                    </div>
                </div>
            </div>
        </div>
    )
}