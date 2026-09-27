import { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from './UserContext';

function Login({ setUser }) {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [location, setLocation] = useState({ lat: '', long: '' });
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const handleClose = () => {
        setShow(!show);
        reset();
    };
    useEffect(() => {
        fetchLocation();
    }, []);
    const fetchLocation = () => {
        if (!navigator.geolocation) {
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({
                    lat: latitude,
                    long: longitude,
                });
            },
            (error) => {
                console.error('Error fetching location:', error.message);
            }
        );
    };
    const apiCall = async (data) => {
        const reqData = {
            email: data.email,
            pass: data.password,
            lat: location.lat,
            long: location.long,
        };
        try {
            const response = await axios.post(
                'http://localhost:3000/auth/login',
                reqData
            );
            setUser(response.data.data);
            const token = response.data.accessToken;
            localStorage.setItem('token', token);
            alert('Login successful !');
            navigate('/home');
        } catch (err) {
            alert(err.response.data.message);
        }
    };

    return (
        <>
            <button
                onClick={handleClose}
                className="hover: text-white hover:scale-110 transition"
            >
                Sign In
            </button>
            {show && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#8B9A6E] rounded-xl p-6 sm:p-8 shadow-xl">
                        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
                            Sign In
                        </h1>

                        <form
                            className="flex flex-col text-gray-900 gap-3"
                            onSubmit={handleSubmit((data) => apiCall(data))}
                        >
                            <input
                                type="email"
                                className="w-full bg-white rounded-md p-3 outline-none focus:ring-2 focus:ring-gray-700"
                                {...register('email', {
                                    required: 'Email is required',
                                })}
                                placeholder="Email"
                            />

                            <p className="text-red-800 text-sm">
                                {errors.email?.message}
                            </p>

                            <input
                                type="password"
                                className="w-full bg-white rounded-md p-3 outline-none focus:ring-2 focus:ring-gray-700"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 8,
                                        message:
                                            'Password must be at least 8 characters',
                                    },
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
                </div>
            )}
        </>
    );
}

export default Login;
