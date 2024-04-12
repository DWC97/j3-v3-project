import { ActiveSectionContext } from "@/context/ActiveSectionContext"
import useDetectSection from "@/hooks/useDetectSection"
import Link from "next/link"
import { useState, useEffect, useRef, useContext } from "react"
import Swal from 'sweetalert2'
import { Reveal } from "@/context/Reveal"
import { Slide } from "@/context/Slide"
import Image from "next/image"

export default function Contact2(): JSX.Element{

    let { setActiveSection } = useContext(ActiveSectionContext)
    const contactRef = useRef<HTMLDivElement>(null)
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

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>){
    const { name, value } = e.target;

    // group number edge cases
    if (name === "number") {
        const parsedValue = parseInt(value, 10); // Parse value to integer
        if (isNaN(parsedValue)) return; // Ensure parsedValue is a valid number
        if (parsedValue < 1) {
            setFormData({
                ...formData,
                [name]: 1
            });
            return
        }
        if (parsedValue > 4) {
            setFormData({
                ...formData,
                [name]: 4
            });
            return
        }
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

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
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
        <div className="bg-black w-full min-h-[972px] xl:pb-0 pb-28 xl:pt-20 pt-60 flex flex-col-reverse  gap-24 xl:gap-0 xl:flex-row items-center justify-center" id="contact" ref={contactRef}>
            <div className="xl:mr-20 2xl:mr-28 flex flex-col items-center justify-center h-[500px]">
                <Slide>
                    {/* <img src="/contact/Jolly_Roger.jpg" className="w-[300px] sm:w-[360px] "/> */}
                    <div className="w-[300px] sm:w-[360px] aspect-square relative">
                        <Image
                            src="/contact/Jolly_Roger.jpg"
                            alt="JR logo"
                            fill
                            sizes='(width: 100%)'
                            className="object-contain"
                        />
                    </div>
                </Slide>
                <Reveal>
                    <Link href={"/store"} className='flex flex-row items-center justify-center mt-10 hover:opacity-85 ease-in-out duration-300'>
                        <button tabIndex={-1} className='text-white text-[18px]'>Get our merch</button>
                        <svg xmlns="http://www.w3.org/2000/svg" className='pl-3' width={40} height={32} viewBox="0 0 16 16"><path fill="white" fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"></path></svg>
                    </Link>
                </Reveal>
            </div>
            
            <Reveal><div className="flex flex-col justify-between px-10 sm:px-0 sm:w-[500px] md:w-[600px] h-[650px] sm:h-[500px] bg-black bg-opacity-50 rounded-3xl z-30 ">
                <h2 className="font-semibold text-[32px] md:text-[44px] text-white sm:mb-0 mb-8">RESERVE A SPOT</h2>
                <form action="" className="flex flex-col justify-between h-[450px] sm:h-[300px] relative" autoComplete="off">
                    <input type="text" name="name" placeholder="" className={`w-[240px]  text-gray-300 border-b ${!nameValid ? "border-[red]" : "border-white"} ease-in-out duration-300 pl-2 pr-6 pb-2 outline-none !bg-black`}
                        value={formData.name}
                        onChange={handleInputChange}
                    /> 
                    <div className="absolute text-white -top-8">Full name</div>
                    
                    <div className={`absolute top-1 left-56 ${nameValid ? "opacity-0 invisible" : "opacity-100 visible"} transition-opacity ease-in-out duration-300`} title="You haven't entered a valid name">
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><path fill="red" d="M12 17q.425 0 .713-.288T13 16q0-.425-.288-.712T12 15q-.425 0-.712.288T11 16q0 .425.288.713T12 17m-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"></path></svg>
                    </div>
                    
                    <div className={`absolute top-[7rem] sm:top-[5.75rem] left-56 ${emailValid ? "opacity-0 invisible" : "opacity-100 visible"} transition-opacity ease-in-out duration-300`} title="Please include an valid email address">
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><path fill="red" d="M12 17q.425 0 .713-.288T13 16q0-.425-.288-.712T12 15q-.425 0-.712.288T11 16q0 .425.288.713T12 17m-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"></path></svg>
                    </div>
                    
                    <input type="text" name="email" placeholder="" className={`w-[240px] text-gray-300 border-b ${!emailValid ? "border-[red]" : "border-white"} ease-in-out duration-300 pl-2 pr-6 pb-2 mt-2 outline-none bg-black`}
                        value={formData.email}
                        onChange={handleInputChange}
                    />   
                    <div className="absolute text-white top-[5rem] sm:top-[3.75rem]">Email</div>  
                    <div className="flex flex-col gap-12 sm:gap-0 sm:flex-row w-full sm:justify-between sm:items-center">
                        <div className="w-[240px]">
                            <select id="country" name="country" className="block w-full p-2 text-gray-300 bg-black border-white border-b outline-none">
                                <option>Northern Thailand</option>
                                <option>Southern Thailand</option>
                                <option>Vietnam</option>
                                <option>Bali</option>
                                <option>Philippines</option>
                            </select>
                        </div>
                        <input type="number" name="number" min={1} max={4} className="mt-2 sm:mt-0 w-[240px] text-gray-300 border-b border-white p-2 outline-none bg-black"
                            value={formData.number}
                            onChange={handleInputChange}
                        />  
                    </div>
                    <div className="absolute text-white top-[10.5rem] sm:top-[9.25rem]">Destination</div>  
                    <div className="absolute text-white left-0 sm:left-auto top-[17rem] sm:right-[140px] sm:top-[9.25rem]">No. of people</div>  
                    <div className={`${submittable ? "cursor-pointer hover:opacity-85 ease-in-out duration-300" : ""} font-semibold flex justify-center items-center  w-full self-center rounded-md  bg-gradient-to-r from-custom-orange to-custom-pink p-[2px]`}
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter"){
                                handleSubmit(e)
                            }
                        }}
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
                <p className="text-white text-[12px] sm:text-[14px]">
                    Please note. Jolly Roger Tours is currently going through the incorporation and licensing process in the UK and will launch officially in late 2024. 
                </p>
            </div></Reveal>
        
        </div>
    )
}
