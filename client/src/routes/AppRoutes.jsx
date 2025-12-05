import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage.jsx';
import Home from '../pages/Home.jsx';
import History from '../pages/History.jsx';
import Kitchen from '../pages/Kitchen.jsx';
import Delivery from '../pages/Delivery.jsx';
import Settings from '../pages/Settings.jsx';
import ServicePoint from '../pages/ServicePoint.jsx';
import Clients from '../pages/management/Clients.jsx';
import Users from '../pages/management/Users.jsx';
import Payments from '../pages/management/Payments.jsx';
import Categories from '../pages/management/Categories.jsx';
import Products from '../pages/management/Products.jsx';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/kitchen" element={<Kitchen />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/service-point/:pointId" element={<ServicePoint />} />
            <Route path="/management/clients" element={<Clients />} />
            <Route path="/management/users" element={<Users />} />
            <Route path="/management/payments" element={<Payments />} />
            <Route path="/management/categories" element={<Categories />} />
            <Route path="/management/products" element={<Products />} />
        </Routes>
    )
}