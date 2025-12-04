import { Home, Clock, ChefHat, Truck, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Footer() {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { icon: Home, label: 'Home', path: '/home' },
        { icon: Clock, label: 'Histórico', path: '/history' },
        { icon: ChefHat, label: 'Cozinha', path: '/kitchen' },
        { icon: Truck, label: 'Delivery', path: '/delivery' },
        { icon: Settings, label: 'Configurações', path: '/settings' },
    ];

    return (
        <div className="mobile-show fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-gray-200 items-center justify-center z-50 safe-area-bottom">
            <div className="flex items-center justify-around w-full px-4 max-w-md mx-auto">
                {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                        <button
                            key={index}
                            onClick={() => navigate(item.path)}
                            className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200 ${
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
                                        : 'text-gray-500'
                                }`} />
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

