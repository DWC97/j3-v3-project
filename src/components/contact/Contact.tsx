export default function Contact(){
    return (
        <div className="h-[984px] w-full flex justify-center items-center relative">
            <div className="bg-[url('/contact/contact-bg.jpg')] w-full h-full bg-center bg-no-repeat bg-cover absolute -z-20" />
            <div className="absolute w-full h-[375px] top-0 left-0 bg-gradient-to-b from-black to-transparent" />
            <div className="absolute w-full h-[300px] bottom-0 left-0 bg-gradient-to-t from-black to-transparent" />
        </div>
    )
}