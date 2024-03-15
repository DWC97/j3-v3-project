import { ActiveSectionContext } from "@/context/ActiveSectionContext"
import useDetectSection from "@/hooks/useDetectSection"
import Link from "next/link"
import { useState, useEffect, useRef, useContext } from "react"
import Swal from 'sweetalert2'
import useBodyLockScroll from '@/hooks/useBodyLockScroll';

export default function Contact2(){

    let { setActiveSection } = useContext(ActiveSectionContext)
    const contactRef = useRef(null)
    const [isInView] = useDetectSection(contactRef)
    const [toggle] = useBodyLockScroll() // toggle scroll lock

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
        ...formData,
        [name]: value
    });
    };


    useEffect(() => {
        if (isInView){
            setActiveSection("contact")
        }
    }, [isInView])

    function handleSubmit(e){
        e.preventDefault()


        Swal.fire({
            title: "Submitted!",
            text: "We'll get back to you with details when tours are available for booking.",
            icon: "success",
            timer: 5000,
            timerProgressBar: true,
            showConfirmButton: false,
            scrollbarPadding: false,
        });
    }

    return (
        <div className="bg-black w-full h-screen min-h-[800px] contact flex flex-row items-center justify-around pt-20" id="contact" ref={contactRef}>
            <div className="-mr-20 flex flex-col items-center justify-center h-[500px]">
                <img src="/contact/Jolly_Roger.jpg" className="w-[360px] "/>
                <Link href={"/store"} className='flex flex-row items-center justify-center mt-10'>
                    <button className='text-white text-[18px]'>Get our merch</button>
                    <svg xmlns="http://www.w3.org/2000/svg" className='pl-3' width={40} height={32} viewBox="0 0 16 16"><path fill="white" fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"></path></svg>
                </Link>
            </div>
           
            <div className="flex flex-col justify-between w-[500px] md:w-[600px] h-[500px] bg-black bg-opacity-50 rounded-3xl z-30 -ml-20">
                
                <h2 className="font-semibold text-[44px] text-white">RESERVE A SPOT</h2>
                <form action="" className="flex flex-col justify-between h-[300px] relative">
                    <input type="text" placeholder="Full name*" className="w-[240px] placeholder-gray-300 text-white bg-transparent border-b border-white p-2 focus:outline-none"
                    /> 
                    <div className="absolute text-[red] -top-6">Name is required</div>  
                    <div className="absolute top-24 left-56" title="Please include an '@' in the email address">
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><path fill="red" d="M12 17q.425 0 .713-.288T13 16q0-.425-.288-.712T12 15q-.425 0-.712.288T11 16q0 .425.288.713T12 17m-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"></path></svg>
                    </div>
                    <input type="text" placeholder="Email*" className="w-[240px] placeholder-gray-300 text-white bg-transparent border-b border-white p-2 focus:outline-none"
                    />   
                    <div className="absolute text-[red] top-16">Enter a valid email</div>  
                    <div className="flex flex-row w-full justify-between items-center">
                        <div className="w-[240px]">
                            <select id="country" name="country" className="block w-full p-2 text-gray-300 bg-black border-white border-b outline-none">
                                <option>Northern Thailand</option>
                                <option>Southern Thailand</option>
                                <option>Vietnam</option>
                                <option>Bali</option>
                                <option>Philippines</option>
                            </select>
                        </div>
                        {/* <input type="text" placeholder="Destination*" className="w-[240px] placeholder-gray-300 text-white bg-transparent border-b border-white p-2 focus:outline-none"/>   */}
                        <input type="number" min={1} max={4} defaultValue={1} className="w-[240px] placeholder-gray-300 text-white bg-transparent border-b border-white p-2 focus:outline-none"/>  
                    </div>
                    <div className="absolute text-white top-[9.5rem]">Destination</div>  
                    <div className="absolute text-white right-[140px] top-[9.5rem]">No. of people</div>  
                    <button className="font-semibold  text-white w-full self-center py-2 rounded-md  bg-gradient-to-r from-custom-orange to-custom-pink "
                    onClick={(e) => handleSubmit(e)}
                    >
                        SUBMIT
                    </button>
                </form>
                <p className="text-white text-[14px]">
                    Please note. Jolly Roger Tours is currently going through the incorporation and licensing process in the UK and will launch officially in late 2024. 
                </p>
            </div>
        </div>
    )
}