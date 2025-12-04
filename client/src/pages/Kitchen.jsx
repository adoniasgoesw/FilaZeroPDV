import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/layouts/Sidebar.jsx';
import Footer from '../components/layouts/Footer.jsx';
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
        <div className="safe-viewport bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 flex overflow-hidden">
            <Sidebar />
            <div className="flex-1 mobile-ml-0 max-w-[1920px] mx-auto w-full mobile-pb-20 overflow-y-auto h-full page-content">
                <div className="px-4 md:px-6 py-4 md:py-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                            <ChefHat className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

