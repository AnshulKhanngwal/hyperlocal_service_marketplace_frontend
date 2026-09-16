// import './App.css'
import LandingPage from './pages/LandingPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import { useState } from 'react';
import UserContext from './components/UserContext';

function App() {
    const [user, setUser] = useState(null)
    return (
        <UserContext.Provider value={{user, setUser}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/home" element={<Homepage />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;