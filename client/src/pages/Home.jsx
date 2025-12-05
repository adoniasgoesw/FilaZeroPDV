import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/layouts/Sidebar.jsx';
import Footer from '../components/layouts/Footer.jsx';
import { Home as HomeIcon } from 'lucide-react';
import SettingsButton from '../components/buttons/SettingsButton.jsx';
import ModalBase from '../components/modals/ModalBase.jsx';
import FormConfig from '../components/forms/FormConfig.jsx';
import ListServicePoints from '../components/lists/ListServicePoints.jsx';

export default function Home() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [businessId, setBusinessId] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const businessIdFromStorage = localStorage.getItem('businessId');

        if (!userId || !businessIdFromStorage) {
            navigate('/');
            return;
        }

        setBusinessId(businessIdFromStorage);
    }, [navigate]);

    // Atualizar lista quando voltar da página ServicePoint
    useEffect(() => {
        if (location.pathname === '/home') {
            setRefreshKey(prev => prev + 1);
        }
    }, [location.pathname]);

    const handleOpenConfig = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (data) => {
        console.log('Dados da configuração:', data);
        setIsModalOpen(false);
        // Forçar atualização da lista
        setRefreshKey(prev => prev + 1);
    };

    return (
        <div className="safe-viewport bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 flex overflow-hidden">
            <Sidebar />
            <div className="flex-1 mobile-ml-0 max-w-[1920px] mx-auto w-full mobile-pb-20 overflow-y-auto h-full page-content">
                <div className="px-4 md:px-6 py-4 md:py-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                                <HomeIcon className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                        <SettingsButton onClick={handleOpenConfig} />
                    </div>
                    
                    {/* Lista de Pontos de Atendimento */}
                    {businessId && (
                        <ListServicePoints key={refreshKey} businessId={businessId} />
                    )}
                </div>
            </div>
            <Footer />
            
            {/* Modal de Configuração */}
            {businessId && (
                <ModalBase 
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    title="Configurar Pontos de Atendimento"
                >
                    <FormConfig onSubmit={handleSubmit} businessId={businessId} />
                </ModalBase>
            )}
        </div>
    );
}

