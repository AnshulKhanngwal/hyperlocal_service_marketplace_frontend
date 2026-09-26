import { useContext, useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import { postApiCall } from "../utils/apiCall";

function AddServiceModal({setUser}){
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [category, setCategory] = useState("TUTOR");
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const handleClose = () => {
        setShow(!show);
        reset();
    }
    const apiCall = async (data) => {
        console.log("Entered HandleSubmit")
        const reqData = {
            "category": category,
            "description": data.description
        };
        console.log("Request data in add service", reqData);
        try {
        const response = await postApiCall("service/createService", reqData);
        console.log("This is your response status", response.status);
        setUser(response.data.data);
        handleClose();
        console.log("This is your response", response)
        alert('Created successfully !');
        } catch (err) {
        console.log('Error sending data:', err.response.data.message);
        alert(err.response.data.message);

        }
    };

    return(
        <>
        <button onClick={handleClose} className=" font-black hover: text-black hover:scale-110 transition">Add Service</button>
        {show &&
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
    <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#8B9A6E] rounded-xl p-6 sm:p-8 shadow-xl">

        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
            Add Service
        </h1>

        <form
            className="flex flex-col text-gray-900 gap-3"
            onSubmit={handleSubmit((data) => apiCall(data))}
        >

            <input
                className="w-full bg-white rounded-md p-3 outline-none focus:ring-2 focus:ring-gray-700"
                {...register("description", {
                    required: "Description is required"
                })}
                placeholder="Description"
            />

            <p className="text-red-800 text-sm">
                {errors.description?.message}
            </p>

            <select
                {...register("category", {
                    required: "Category is required."
                })}
                onChange={(e)=> setCategory(e.target.value)}
                className="w-full bg-white rounded-md p-3 outline-none focus:ring-2 focus:ring-gray-700"
            >
                <option value="TUTOR">
                    TUTOR
                </option>
                <option value="ELECTRICIAN">
                    ELECTRICIAN
                </option>
                <option value="PLUMBER">
                    PLUMBER
                </option>
            </select>

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

export default AddServiceModal;