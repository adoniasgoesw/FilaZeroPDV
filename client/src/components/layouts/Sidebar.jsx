import { Home, Clock, ChefHat, Truck, Settings, Zap } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import LogoutButton from '../buttons/LogoutButton.jsx';

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { icon: Home, label: 'Home', path: '/home' },
        { icon: Clock, label: 'Histórico', path: '/history' },
        { icon: ChefHat, label: 'Cozinha', path: '/kitchen' },
        { icon: Truck, label: 'Delivery', path: '/delivery' },
        { icon: Settings, label: 'Configurações', path: '/settings' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('businessId');
        localStorage.removeItem('userName');
        navigate('/');
    };

    return (
        <div className="w-20 h-screen bg-white flex flex-col items-center py-6 fixed left-0 top-0 z-50 border-r border-gray-200">
            {/* Logo */}
            <div className="mb-8">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                </div>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col gap-2 w-full px-2 flex-1">
                {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                        <button
                            key={index}
                            onClick={() => navigate(item.path)}
                            className={`w-full flex items-center justify-center py-3 rounded-xl transition-all duration-200 group ${
                                isActive 
                                    ? 'bg-blue-50' 
                                    : 'hover:bg-gray-50'
                            }`}
                            title={item.label}
                        >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                isActive 
                                    ? 'bg-blue-50' 
                                    : ''
                            }`}>
                                <Icon className={`w-5 h-5 transition-all duration-200 ${
                                    isActive 
                                        ? 'text-blue-600' 
                                        : 'text-gray-500 group-hover:text-gray-700'
                                }`} />
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Logout Button */}
            <div className="mt-auto w-full px-2">
                <LogoutButton onClick={handleLogout} />
            </div>
        </div>
    );
}
