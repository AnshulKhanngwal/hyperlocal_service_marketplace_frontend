import { useContext, useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import UserContext from "./UserContext";

function SignUp({setUser}){
    const user = useContext(UserContext);
    const [show, setShow] = useState(false);
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const handleClose = () => {
        setShow(!show);
        reset();
    }
    useEffect(() => {
        console.log(user);
    }, [setUser]);
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
        // const data = await response.json();
        // console.log('Success:', data);
        setUser(data);
        alert('Registered successfully!');
        } catch (err) {
        console.log('Error sending data:', err);
        }
        reset()
        setShow(false)
    };

    return(
        <>
        <button onClick={handleClose} className="hover: text-white hover:scale-110 transition">Register</button>
        {show &&
        <div className="absolute m-auto bg-[#8B9A6E]">
            Toolbox
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