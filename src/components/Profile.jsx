import React from 'react'
import { useState } from 'react';
import Contact from './Contact';

const Profile = ({user}) => {
    const [open, setOpen] = useState(false);
  return (
    <>
    <div className="relative w-10 h-10 overflow-hidden bg-neutral-secondary-medium rounded-full" onClick={()=>{setOpen(!open)}}>
        {user.role === "CUSTOMER" ?// Customer
        (<svg
            className="w-12 h-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5.121 17.804A9 9 0 0112 15a9 9 0 016.879 2.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
            />
        </svg>) : user.role === "SERVICE_PROVIDER" ?
        // Provider
        (<svg
            className="w-12 h-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.7 6.3a4 4 0 00-5.4 5.4L4 17a2 2 0 102.8 2.8l5.3-5.3a4 4 0 005.4-5.4l-2.5 2.5-2.8-.7-.7-2.8 2.5-2.5z"
            />
        </svg>): (
        // Admin
        <svg
            className="w-12 h-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
            />
        </svg>)}
    </div>
    {/* <div>
    {open && 
        (
            <div className="fixed inset-0 h-50 w-50">
                <Contact name={"Support"}/>
                <button onClick={() => {setOpen(!open)}}></button>
            </div>
        )
    }
    </div> */}
    </>
  )
}

export default Profile