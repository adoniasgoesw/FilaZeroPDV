import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage.jsx';
import Home from '../pages/Home.jsx';
import History from '../pages/History.jsx';
import Kitchen from '../pages/Kitchen.jsx';
import Delivery from '../pages/Delivery.jsx';
import Settings from '../pages/Settings.jsx';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/kitchen" element={<Kitchen />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/settings" element={<Settings />} />
        </Routes>
    )
}