// next components
import Link from "next/link"
import Image from "next/image"

// hooks
import useDetectSection from "@/hooks/useDetectSection"
import { useState, useEffect, useRef, useContext, FormEvent } from "react"
import useMobileView from "@/hooks/useMobileView";

// context
import { ActiveSectionContext } from "@/context/ActiveSectionContext"

// animations
import Swal from 'sweetalert2'
import { Reveal } from "@/context/Reveal"
import { Slide } from "@/context/Slide"
import { FloatingLabel } from "flowbite-react";

// styles
import "./ContactStyles.css"

const destinations = ["Northern Thailand", "Southern Thailand", "Bali", "Philippines", "Vietnam"]

export default function Contact(): JSX.Element {

    let { setActiveSection } = useContext(ActiveSectionContext)
    const contactRef = useRef<HTMLDivElement>(null)
    const [isInView] = useDetectSection(contactRef) // detect whether section is in view
    const isMobileView = useMobileView();
    const initFormData = {
        name: "",
        email: "",
        destination: "Northern Thailand",
        numberInGroup: 1
    }
    const [formData, setFormData] = useState<{
        name: string;
        email: string;
        destination: string;
        numberInGroup: number;
    }>(initFormData)
    const [formErrors, setFormErrors] = useState({ name: "", email: "" });
    const [submittable, setSubmittable] = useState(false);

    // set active section when it's in view
    useEffect(() => {
        if (isMobileView) return
        if (isInView) {
            setActiveSection("contact")
        }
    }, [isInView, setActiveSection, isMobileView])

    useEffect(() => {
        const isValid = !Object.values(formErrors).some(error => error !== "") &&
                        formData.name !== "" &&
                        formData.email !== "";
        setSubmittable(isValid);
    }, [formErrors, formData.name, formData.email]);

    const validateName = (name: string) => {
        if (name.trim() === "") {
            return "Name is required";
        }
        return "";
    };

    const validateEmail = (email: string) => {
        if (email.trim() === "") {
            return "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return "Please enter a valid email address";
        }
        return "";
    };
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value: rawValue } = e.target;
        let value: string | number = rawValue;

        // Validate inputs
        let error = "";
        if (name === "name") {
            error = validateName(value);
        } else if (name === "email") {
            error = validateEmail(value);
        }

        setFormErrors(prevErrors => ({ ...prevErrors, [name]: error }));

        if (name === "numberInGroup") {
            value = parseInt(rawValue);
            if (isNaN(value)) {
                value = 1;  // Default to 1 if conversion fails
            }
            value = Math.max(1, Math.min(value, 4));  // Ensure value stays between 1 and 4
        }
    
        setFormData((preState) => ({
          ...preState,
          [name]: value,
        }));
      };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        
        
        if (!submittable) {
            const nameError = validateName(formData.name);
            const emailError = validateEmail(formData.email);
            setFormErrors({ name: nameError, email: emailError });
            return; // Prevent submission if form is not submittable
        }

        try{
            // addPost(formData)
            Swal.fire({
                title: "Submitted!",
                text: "We'll get back to you with details when tours are available for booking.",
                icon: "success",
                timer: 5000,
                timerProgressBar: true,
                showConfirmButton: false,
                scrollbarPadding: false,
            });
        } catch (error){
            console.error(error)
            Swal.fire({
                title: "Error!",
                text: "Looks like something stopped that reservation from sending...",
                icon: "error",
                timer: 5000,
                timerProgressBar: true,
                showConfirmButton: false,
                scrollbarPadding: false,
            });
        }

        setFormData(initFormData)
    };

    return (
        <div className="bg-black w-full min-h-[972px] xl:pb-0 pb-28 xl:pt-20 pt-60 flex flex-col-reverse  gap-24 xl:gap-0 xl:flex-row items-center justify-center" id="contact" ref={contactRef}>
            {/* logo */}
            <div className="xl:mr-20 2xl:mr-28 flex flex-col items-center justify-center h-[500px]">
                <Slide>
                    <div className="w-[300px] sm:w-[360px] aspect-square relative">
                        <Image
                            src="/contact/Jolly_Roger.avif"
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
            {/* form */}
            <Reveal><div className='flex flex-col px-10 sm:px-0 sm:w-[500px] md:w-[600px] h-[600px] sm:h-[500px]'>
                <h1 className="font-semibold text-[32px] md:text-[44px] text-white mb-4">RESERVE A SPOT</h1>
                <form onSubmit={handleSubmit} className='flex flex-col justify-around h-[600px] sm:h-[500px]'>
                    <div className='flex flex-col relative w-full sm:w-[220px] md:w-[260px]'>
                        <FloatingLabel 
                            variant="filled" 
                            label="Your name"  
                            type="text"
                            id="name"
                            name='name'
                            autoComplete='off'
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full ${formErrors.name ? "border-[red]" : "border-gray-300"}  bg-black text-gray-300 focus:border-custom-pink ease-in-out duration-300 outline-none transition peer-focus:text-white pr-6`}
                        />
                        
                        <div className={`${formErrors.name ? "opacity-100" : "opacity-0"} ease-in-out duration-300 transition-opacity absolute right-0 top-5 z-10`} title={formErrors.name}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><path fill="red" d="M12 17q.425 0 .713-.288T13 16q0-.425-.288-.712T12 15q-.425 0-.712.288T11 16q0 .425.288.713T12 17m-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"></path></svg>
                        </div>
                        
                        <span className={`${formErrors.name ? "opacity-100" : "opacity-0"} ease-in-out duration-300 transition-opacity absolute text-[red] text-[12px] left-[0.75rem] top-[3.75rem]`}>{formErrors.name}</span>
                    </div>
                    <div className='flex flex-col relative w-full sm:w-[220px] md:w-[260px]'>
                        <FloatingLabel 
                            variant="filled" 
                            label="Email"  
                            type="text"
                            id="email"
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete='off'
                            className={`w-full ${formErrors.email ? "border-[red]" : "border-gray-300"}  bg-black text-gray-300 focus:border-custom-pink ease-in-out duration-300 outline-none transition peer-focus:text-white pr-6`}
                        />
                        <div className={`${formErrors.email ? "opacity-100" : "opacity-0"} ease-in-out duration-300 transition-opacity absolute right-0 top-5 z-10`} title={formErrors.email}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><path fill="red" d="M12 17q.425 0 .713-.288T13 16q0-.425-.288-.712T12 15q-.425 0-.712.288T11 16q0 .425.288.713T12 17m-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"></path></svg>
                        </div>
                        
                        <span className={`${formErrors.email ? "opacity-100" : "opacity-0"} ease-in-out duration-300 transition-opacity absolute text-[red] text-[12px] left-[0.75rem] top-[3.75rem]`}>{formErrors.email}</span>
                    </div>
                    
                    <div className='flex flex-col sm:gap-0 gap-10 sm:flex-row justify-between '>
                        <div className='flex flex-col w-full sm:w-[220px] md:w-[260px]'>
                            <label htmlFor="destination" className='text-white text-sm pl-2'>Choose your destination:</label>
                            <select 
                                name="destination" 
                                id="destination"
                                value={formData.destination}
                                onChange={handleChange}
                                className='w-fullpy-2 mt-2 outline-none focus:outline-none bg-transparent border-b border-gray-300 text-gray-300 input'
                            >
                                {destinations.map(destination => (
                                    <option key={destination} value={destination} className='bg-black'>{destination}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flex flex-col w-full sm:w-[220px] md:w-[260px]'>
                            <label htmlFor="numberInGroup" className='text-white text-sm pl-2'>Number in Group:</label>
                            <input
                                type="number"
                                name="numberInGroup"
                                id="numberInGroup"
                                min="1"
                                max="4"
                                value={formData.numberInGroup}
                                onChange={handleChange}
                                className='w-full py-2 mt-2 outline-none bg-transparent border-b border-gray-300 text-gray-300 input'
                            />
                        </div>
                    </div>
                    {/* <button type="submit" className='text-white py-4 '>Submit</button> */}
                    <button type="submit" className={`${submittable ? "hover:opacity-85 ease-in-out duration-300" : ""} font-semibold flex justify-center items-center  w-full self-center rounded-md  bg-gradient-to-r from-custom-orange to-custom-pink p-[2px] my-2`}
                    title={submittable ? "" : "Please fill out each field in the form correctly"}
                    >
                        <div className={`w-full h-full rounded-md py-[6px] ${submittable ? "bg-transparent" : "bg-black"}`}>
                            <div className={`w-full flex justify-center items-center ${submittable ? "text-white" : "bg-gradient-to-r from-custom-orange to-custom-pink text-transparent bg-clip-text"}`}>
                                SUBMIT
                            </div>
                        </div>
                    </button>
                    <p className="text-white text-[12px] sm:text-[14px]">
                    Please note. Jolly Roger Tours is currently going through the incorporation and licensing process in the UK and will launch officially in late 2024.
                    </p>
                </form>
            </div></Reveal>

        </div>
    )
}
