import { useContext, useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import UserContext from "./UserContext";

function SignUp({setUser}){
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [location, setLocation] = useState({"lat": "", "long": ""});
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const handleClose = () => {
        setShow(!show);
        reset();
    }
    useEffect(() => {
        fetchLocation();
        console.log("These are your co-ordinates", location);
    }, [])
    const fetchLocation = () => {
    if (!navigator.geolocation) {
        console.log("Geolocation is not supported by this browser.");
        return;
    }
    console.log("Geolocation is supported by this browser.");
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({
                "lat":latitude,
                "long":longitude
            });
        },
        (error) => {
            console.error("Error fetching location:", error.message);
        }
    );
};
    const apiCall = async (data) => {
        console.log("Entered HandleSubmit")
        const reqData = {
            "name": data.name,
            "email": data.email,
            "phone": data.phone,
            "password": data.password,
            "latitude": location.lat,
            "longitude": location.long
        };
        try {
        const response = await axios.post('http://localhost:3000/auth/register', reqData);
        console.log("This is your response status", response.status);
        setUser(response.data.data);
        console.log("This is your response after signup", response.data)
        const token = response.data.token;
        localStorage.setItem("token", token);
        alert('SignUp successful !');
        navigate("/home")
        } catch (err) {
        console.log('Error sending data:', err.response.data.message);
        alert(err.response.data.message);

        }
    };

    return(
        <>
        <button onClick={handleClose} className="hover: text-white hover:scale-110 transition">Sign Up</button>
        {show &&
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
    <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#8B9A6E] rounded-xl p-6 sm:p-8 shadow-xl">

        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
            Sign Up
        </h1>

        <form
            className="flex flex-col text-gray-900 gap-3"
            onSubmit={handleSubmit((data) => apiCall(data))}
        >

            <input
                className="w-full bg-white rounded-md p-3 outline-none focus:ring-2 focus:ring-gray-700"
                {...register("name", {
                    required: "Name is required"
                })}
                placeholder="Name"
            />
            <p className="text-red-800 text-sm">
                {errors.name?.message}
            </p>

            <select
                className="w-full bg-white rounded-md p-3 outline-none focus:ring-2 focus:ring-gray-700"
                {...register("role", {
                    required: "Role is required."
                })}
            >
                <option value="SERVICE_PROVIDER">
                    Service Provider
                </option>
                <option value="CUSTOMER">
                    Customer
                </option>
            </select>

            <p className="text-red-800 text-sm">
                {errors.role?.message}
            </p>

            <input
                className="w-full bg-white rounded-md p-3 outline-none focus:ring-2 focus:ring-gray-700"
                {...register("phone", {
                    required: "Phone is required"
                })}
                placeholder="Phone"
            />
            <p className="text-red-800 text-sm">
                {errors.phone?.message}
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
                type="password"
                className="w-full bg-white rounded-md p-3 outline-none focus:ring-2 focus:ring-gray-700"
                {...register("password", {
                    required: "Password is required",
                    minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters"
                    }
                })}
                placeholder="Password"
            />
            <p className="text-red-800 text-sm">
                {errors.password?.message}
            </p>

            <div className="flex gap-3 mt-4">
                <button
                    type="submit"
                    className="flex-1 bg-white rounded-md py-3 font-semibold hover:bg-gray-100 transition"
                >
                    Submit
                </button>

                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="flex-1 bg-white rounded-md py-3 font-semibold hover:bg-gray-100 transition"
                >
                    Close
                </button>
            </div>

        </form>
    </div>
</div>}
        </>
    )
}

export default SignUp;