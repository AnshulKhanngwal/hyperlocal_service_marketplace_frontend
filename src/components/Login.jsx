import { useContext, useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import UserContext from "./UserContext";

function Login({setUser}){
    const navigate = useNavigate();
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
            "email": data.email,
            "pass": data.password
        };
        try {
        const response = await axios.post('http://localhost:3000/auth/login', reqData); 
        // const data = await response.json();
        // console.log('Success:', data);
        console.log("This is your response status", response.status);
        // if(response.status == 200)
        setUser(response.data.data);
        console.log("This is your response", response)
        const token = response.data.accessToken;
        localStorage.setItem("token", token);
        alert('Login successful !');
        navigate("/home")
        } catch (err) {
        console.log('Error sending data:', err.response.data.message);
        alert(err.response.data.message);

        }
    };

    return(
        <>
        <button onClick={handleClose} className="hover: text-white hover:scale-110 transition">Sign In</button>
        {show &&
        <div className="fixed inset-0 w-200 h-150 sm:w-autoh-auto m-auto p-20 bg-[#8B9A6E] rounded-xl">
            <h1 className="text-4xl font-bold text-center mb-10">Sign In</h1>
            <form className="flex flex-col text-gray-900 gap-6" onSubmit={handleSubmit((data) => apiCall(data))}>
                <input className="outline bg-white rounded p-2" {...register("email", {required: "Email is required"})} placeholder="Email"/>
                <p className="text-red-800">{errors.email?.message}</p>
                <input type="password" className="outline bg-white rounded p-2" {...register("password", {required: "Password is required", minLength: 8})} placeholder="Password"/>
                <p className="text-red-800">{errors.password?.message}</p>
                <button type="submit" className="outline bg-white rounded">Submit</button>
                <button type="button" onClick={()=>{setShow(!show)}} className="outline bg-white rounded">Close</button>
            </form>
            <button onClick={() => navigate("/home")}>Redirect</button>
        </div>}
        </>
    )
}

export default Login;