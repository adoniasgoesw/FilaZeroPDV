import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/layouts/Sidebar.jsx';
import { ChefHat } from 'lucide-react';

export default function Kitchen() {
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const businessId = localStorage.getItem('businessId');

        if (!userId || !businessId) {
            navigate('/');
            return;
        }
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 flex">
            <Sidebar />
            <div className="flex-1 ml-20">
                <div className="px-6 py-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                            <ChefHat className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

