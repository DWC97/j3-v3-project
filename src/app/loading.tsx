import Image from "next/image";

export default function Loading(){
    return (
        <div className="bg-black fixed h-screen w-full flex justify-center items-center text-white z-[100000]">
            <div className='max-w-[250px] w-[100px] relative'>      
                <Image
                    src="/logo.jpg"
                    alt="logo"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: '100%' }}
                    priority
                    className=" spin"
                />
            </div>
        </div>
    )
}