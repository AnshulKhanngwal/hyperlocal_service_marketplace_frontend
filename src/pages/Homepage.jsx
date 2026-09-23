import React, { useEffect, useContext, useState } from 'react'
import SideNav from '../components/SideNav'
import UserContext from '../components/UserContext'
import { SideNavElements } from '../utils/SideNavElements'
import Profile from '../components/Profile'
import Notification from '../components/Notification'
import Users from '../components/Users'
import Booking from '../components/Booking'


const Homepage = () => {
  // const [content, setContent] = useState(sideTitle.`${user.role}`)
   const [open, setOpen] = useState(false);
   const user = useContext(UserContext);
   const currentElements = user.role == "ADMIN" ? SideNavElements.ADMIN : user.role == "CUSTOMER" ? SideNavElements.CUSTOMER : SideNavElements.PROVIDER;
   const [content, setContent] = useState(0)
   const Component = currentElements[content].component;
    useEffect(() => { 
        console.log("User in Homepage", user);
    }, []);
  return (
    <>
      {/* <div>
        <nav className="flex justify-between gap-6 text-2xl px-10 py-4 text-white bg-black/80">
            <h2>HLSM</h2>
            <section className="flex justify-end gap-6">
            <Notification/>
            <Profile/>
            </section>
        </nav>
      </div> */}
      <div>
          <nav className="fixed top-0 left-0 w-full z-50 flex justify-between gap-6 text-2xl sm:px-10 py-4 text-white bg-black">
            <div className="flex flex-row gap-3 text-left">
              <button className="sm:hidden"
                  onClick={() => {setOpen(!open)}}>
                  <svg class="w-8 h-8 text-gray-800 pl-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                  </svg>
              </button>
              <h2>HLSM</h2>
              </div>
              <section className="flex justify-end gap-6">
                  {/* <Notification /> */}
                  <Profile />
              </section>
          </nav>
      </div>
      <div className="flex flex-row mt-15">
      <div>
        <SideNav titles={currentElements} setContent={setContent} open={open}/>
      </div>
      <div className="sm:ml-66 mt-2 border -1 w-screen rounded-lg">
        <Component/>
      </div>
      </div>
    </>
  )
}

export default Homepage