import { ActiveSectionContext } from "@/context/ActiveSectionContext"
import useDetectSection from "@/hooks/useDetectSection"
import Link from "next/link"
import { useState, useEffect, useRef, useContext } from "react"
import Swal from 'sweetalert2'
import useBodyLockScroll from '@/hooks/useBodyLockScroll';
import { Reveal } from "@/context/Reveal"
import { Slide } from "@/context/Slide"

export default function Contact2(){

    let { setActiveSection } = useContext(ActiveSectionContext)
    const contactRef = useRef(null)
    const [isInView] = useDetectSection(contactRef)

    useEffect(() => {
        if (isInView){
            setActiveSection("contact")
        }
    }, [isInView])

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        number: 1
    });
    const [nameValid, setNameValid] = useState(true)
    const [emailValid, setEmailValid] = useState(true)
    let submittable = formData.name.length > 0 && formData.email !== "" && formData.email.includes("@") && formData.email.includes(".com")

    function handleInputChange(e){
    const { name, value } = e.target;

    // group number edge cases
    if (name === "number" && value < 1){
        setFormData({
            ...formData,
            [name]: 1
        });
        return
    }
    if (name === "number" && value > 4){
        setFormData({
            ...formData,
            [name]: 4
        });
        return
    }

    if (formData.name.length > 0){
        setNameValid(true)
    }

    if (formData.email !== "" && formData.email.includes("@") && formData.email.includes(".co")){
        setEmailValid(true)
    }

    setFormData({
        ...formData,
        [name]: value
    });
    };

    function handleSubmit(e){
        e.preventDefault()

        if (formData.name === ""){
            setNameValid(false)
        }

        if (formData.email == "" || !formData.email.includes("@") || !formData.email.includes(".com")){
            setEmailValid(false)
        }

        if (!submittable) return


        Swal.fire({
            title: "Submitted!",
            text: "We'll get back to you with details when tours are available for booking.",
            icon: "success",
            timer: 5000,
            timerProgressBar: true,
            showConfirmButton: false,
            scrollbarPadding: false,
        });
        setFormData({
            name: "",
            email: "",
            number: 1
        })
    }

    return (
        <div className="bg-black w-full h-screen min-h-[800px] contact flex flex-row items-center justify-around pt-20" id="contact" ref={contactRef}>
            <div className="-mr-20 flex flex-col items-center justify-center h-[500px]">
                <Slide><img src="/contact/Jolly_Roger.jpg" className="w-[360px] "/></Slide>
                <Reveal>
                    <Link href={"/store"} className='flex flex-row items-center justify-center mt-10'>
                        <button className='text-white text-[18px]'>Get our merch</button>
                        <svg xmlns="http://www.w3.org/2000/svg" className='pl-3' width={40} height={32} viewBox="0 0 16 16"><path fill="white" fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"></path></svg>
                    </Link>
                </Reveal>
            </div>
            
            <Reveal><div className="flex flex-col justify-between w-[500px] md:w-[600px] h-[500px] bg-black bg-opacity-50 rounded-3xl z-30 -ml-20">
                <h2 className="font-semibold text-[44px] text-white">RESERVE A SPOT</h2>
                <form action="" className="flex flex-col justify-between h-[300px] relative" autoComplete="off">
                <input type="text" name="name" placeholder="" className={`w-[240px]  text-gray-300 border-b ${!nameValid ? "border-[red]" : "border-white"} pl-2 pr-6 pb-2 outline-none !bg-black`}
                    value={formData.name}
                    onChange={handleInputChange}
                    /> 
                    <div className="absolute text-white -top-8">Full name</div>
                    {!nameValid &&
                    <div className="absolute top-1 left-56" title="You haven't entered a valid name">
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><path fill="red" d="M12 17q.425 0 .713-.288T13 16q0-.425-.288-.712T12 15q-.425 0-.712.288T11 16q0 .425.288.713T12 17m-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"></path></svg>
                    </div>}
                    {!emailValid &&
                    <div className="absolute top-[5.75rem] left-56" title="Please include an valid email address">
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><path fill="red" d="M12 17q.425 0 .713-.288T13 16q0-.425-.288-.712T12 15q-.425 0-.712.288T11 16q0 .425.288.713T12 17m-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"></path></svg>
                    </div>
                    }
                    
                    <input type="text" name="email" placeholder="" className={`w-[240px] text-gray-300 border-b ${!emailValid ? "border-[red]" : "border-white"} pl-2 pr-6 pb-2 mt-2 outline-none bg-black`}
                    value={formData.email}
                    onChange={handleInputChange}
                    />   
                    <div className="absolute text-white top-[3.75rem]">Email</div>  
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
                        <input type="number" name="number" min={1} max={4} className="w-[240px] text-gray-300 border-b border-white p-2 outline-none bg-black"
                        value={formData.number}
                        onChange={handleInputChange}
                        />  
                    </div>
                    <div className="absolute text-white top-[9.25rem]">Destination</div>  
                    <div className="absolute text-white right-[140px] top-[9.25rem]">No. of people</div>  
                    <div className={`${submittable ? "cursor-pointer" : ""} font-semibold flex justify-center items-center  w-full self-center rounded-md  bg-gradient-to-r from-custom-orange to-custom-pink p-[2px]`}
                    onClick={(e) => handleSubmit(e)}
                    title={submittable ? "" : "Please fill out each field in the form correctly"}
                    >
                        <div className={`w-full h-full rounded-md py-[6px] ${submittable ? "bg-transparent" : "bg-black"}`}>
                            <div className={`w-full flex justify-center items-center ${submittable ? "text-white" : "bg-gradient-to-r from-custom-orange to-custom-pink text-transparent bg-clip-text"}`}>
                                SUBMIT
                            </div>
                        </div>
                    </div>
                    
                </form>
                <p className="text-white text-[14px]">
                    Please note. Jolly Roger Tours is currently going through the incorporation and licensing process in the UK and will launch officially in late 2024. 
                </p>
            </div></Reveal>
        
        </div>
    )
}