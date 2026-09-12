import React from 'react'
import Contact from '../components/Contact'
import SideNav from '../components/SideNav'


const Homepage = () => {
  // const [content, setContent] = useState(sideTitle.`${user.role}`)
    const sideTitle = {
      "CUSTOMER": ["Service", "Bookings", "Feedback"],
      "Admin": ["Customers", "Service Providers", "Reports"]
    }
  return (
    <>
      <div>
        <nav className="flex justify-between gap-6 text-2xl px-10 py-4 text-white bg-black/80">
            <h2>HLSM</h2>
            <section className="flex justify-end gap-6">
            <Contact />
            </section>
        </nav>
      </div>
      <div>
        <SideNav titles={sideTitle}/>
      </div>
    </>
  )
}

export default Homepage