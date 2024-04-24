// next components
import Image from "next/image";

// component that displays when routes are loading
export default function Loading() {
    return (
        <div className="bg-black  h-screen w-full flex justify-center items-center">
            <div className='max-w-[250px] w-[100px] relative'>
                <Image
                    src="/misc/logo.avif"
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