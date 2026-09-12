// import './App.css'
import LandingPage from './pages/LandingPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<Homepage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;