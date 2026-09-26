import { useState } from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Contact({name}){
    const [show, setShow] = useState(false);
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const handleClose = () => {
        setShow(!show);
        reset();
    }
    const apiCall = async (data) => {
        console.log("Entered HandleSubmit")
        // e.preventDefault();
        const reqData = {
            "name": data.name,
            "email": data.email,
            "password": data.password
        };
        try {
        const response = await axios.post('http://localhost:3000/auth/register', reqData); 
        const data = await response.json();
        console.log('Success:', data);
        alert('Registered successfully!');
        } catch (err) {
        console.log('Error sending data:', err);
        }
    };

    return(
        <>
        <button onClick={handleClose} className="hover: text-white hover:scale-110 transition">Contact Us </button>
        {show &&
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
    <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#8B9A6E] rounded-xl p-6 sm:p-8 shadow-xl">

        <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold">
                Contact Us
            </h1>

            <button
                type="button"
                onClick={() => setShow(!show)}
                className="text-2xl font-bold text-gray-800 hover:text-red-700 transition"
            >
                X
            </button>
        </div>

        <form
            className="flex flex-col text-gray-900 gap-3"
            onSubmit={handleSubmit((data) => apiCall(data))}
        >

            <input
                className="w-full bg-white rounded-md p-3 outline-none focus:ring-2 focus:ring-gray-700"
                {...register("name", {
                    required: "Name is required."
                })}
                placeholder="Name"
            />

            <p className="text-red-800 text-sm">
                {errors.name?.message}
            </p>

            <input
                type="email"
                className="w-full bg-white rounded-md p-3 outline-none focus:ring-2 focus:ring-gray-700"
                {...register("email", {
                    required: "Email is required"
                })}
                placeholder="Email"
            />

            <p className="text-red-800 text-sm">
                {errors.email?.message}
            </p>

            <input
                type="text"
                className="w-full bg-white rounded-md p-3 outline-none focus:ring-2 focus:ring-gray-700"
                {...register("description", {
                    required: "Description is required"
                })}
                placeholder="Description"
            />

            <p className="text-red-800 text-sm">
                {errors.description?.message}
            </p>

            <button
                type="submit"
                className="w-full mt-4 bg-white rounded-md py-3 font-semibold hover:bg-gray-100 transition"
            >
                Submit
            </button>

        </form>

    </div>
</div>}
        </>
    )
}

export default Contact;