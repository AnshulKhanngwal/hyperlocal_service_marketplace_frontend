import SignUp from "../components/SignUp";
import Login from "../components/Login";
import Contact from "../components/Contact";

function LandingPage(){
    return (
        <div className="min-h-screen my-auto w-full bg-[#F7F2EB] relative overflow-hidden">
            {/* <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
            >
                 <source src="/background.mp4" type="video/mp4" />
            </video> */}
            <div className="relative z-10">
                <nav className="flex justify-between gap-6 text-2xl px-10 py-4 text-white bg-black/80">
                    <h2>HLSM</h2>
                    <section className="flex justify-end gap-6">
                    <Login />
                    <SignUp />
                    <Contact />
                    </section>
                </nav>
                <h1 className="text-[#8B9A6E] text-center text-7xl font-bold my-100">HyperLocal Service Marketplace</h1>
                <p className="mx-80 my-40 text-white">A platform that connects customers with trusted local service providers in their area. Whether someone needs a plumber, electrician, tutor, cleaner, mechanic, or other professional, they can easily discover and connect with nearby service providers through a single platform.
Service providers can create profiles, showcase their skills and experience, set their availability, and receive service requests from customers nearby. Customers can browse available services, compare providers, request services, and communicate with professionals based on their requirements.
The goal of the platform is to make finding reliable local services faster, easier, and more convenient, while helping local professionals reach more customers and grow their businesses.</p>
            </div>
        </div>
    )
}

export default LandingPage;