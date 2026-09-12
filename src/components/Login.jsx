import { useState } from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login({name}){
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const handleClose = () => {
        setShow(!show);
        reset();
    }
    const apiCall = async (data) => {
        console.log("Entered HandleSubmit")
        // e.preventDefault();
        const reqData = {
            "email": data.email,
            "password": data.password
        };
        try {
        const response = await axios.post('http://localhost:3000/auth/login', reqData); 
        // const data = await response.json();
        // console.log('Success:', data);
        alert('Login successful !');
        navigate("/home")
        } catch (err) {
        console.log('Error sending data:', err);
        }
    };

    return(
        <>
        <button onClick={handleClose}>Sign In</button>
        {show &&
        <div className="absolute m-auto bg-[#8B9A6E]">
            {name} Toolbox
            <p onClick={() => setShow(!show)}>Close</p>
            <form className="flex flex-col text-gray-900" onSubmit={handleSubmit((data) => apiCall(data))}>
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

export default Login;