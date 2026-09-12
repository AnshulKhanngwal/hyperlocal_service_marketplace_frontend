import { useState } from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';

function SignUp({name}){
    const [show, setShow] = useState(false);
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const handleClose = () => {
        setShow(!show);
        reset();
    }
    const apiCall = async (data) => {
        console.log("Entered HandleSubmit", data)
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
        reset()
        setShow(false)
    };

    return(
        <>
        <button onClick={handleClose}>Register</button>
        {show &&
        <div className="absolute m-auto bg-[#8B9A6E]">
            {name} Toolbox
            <p onClick={() => setShow(!show)}>Close</p>
            <form className="flex flex-col text-gray-900" onSubmit={handleSubmit((data) => apiCall(data))}>
                <input {...register("name", {required: "Name is required."})} placeholder="Name"/>
                <p>{errors.name?.message}</p>
                <select {...register("role", {required: "Role is required."})}>
                    <option value="SERVICE_PROVIDER">Service Provider</option>
                    <option value="CUSTOMER">Customer</option>
                </select>
                <p>{errors.role?.message}</p>
                <input {...register("email", {required: "Email is required"})} placeholder="Email"/>
                <p>{errors.email?.message}</p>
                <input {...register("password", {required: "Password is required", minLength: 8})} placeholder="Password"/>
                <p>{errors.password?.message}</p>
                <input type="submit"/>
            </form>
        </div>}
        </>
    )
}

export default SignUp;