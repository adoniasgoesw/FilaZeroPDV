import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Sidebar from '../components/layouts/Sidebar.jsx';
import Footer from '../components/layouts/Footer.jsx';
import PanelDetails from '../components/panels/PanelDetails.jsx';
import PanelItems from '../components/panels/PanelItems.jsx';
import api from '../services/api.js';

export default function ServicePoint() {
    const navigate = useNavigate();
    const location = useLocation();
    const { pointId: paramPointId } = useParams();
    const { pointId: statePointId, identification, type } = location.state || {};
    
    const pointId = statePointId || paramPointId;
    const [loading, setLoading] = useState(true);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const businessId = localStorage.getItem('businessId');

        if (!userId || !businessId) {
            navigate('/');
            return;
        }

        if (!pointId || !identification) {
            navigate('/home');
            return;
        }

        // Criar item de ponto de atendimento ao abrir
        createServicePointItem(businessId, identification);
    }, [navigate, pointId, identification]);

    const createServicePointItem = async (businessId, identifier) => {
        try {
            setLoading(true);
            await api.post('/service-point-items', {
                business_id: businessId,
                identifier: identifier,
                name_point: null,
                status: 'open'
            });
        } catch (error) {
            console.error('Erro ao criar ponto de atendimento:', error);
            // Se já existe, não é erro crítico
            if (error.response?.status !== 400) {
                console.error('Erro ao criar item:', error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="safe-viewport bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 flex overflow-hidden">
            <Sidebar />
            <div className="flex-1 mobile-ml-0 max-w-[1920px] mx-auto w-full mobile-pb-20 overflow-hidden h-full page-content flex flex-col">
                <div className="flex-1 px-2 sm:px-3 md:px-6 py-2 sm:py-3 md:py-6 flex flex-col md:flex-row gap-2 sm:gap-3 md:gap-6 overflow-hidden min-h-0">
                    {/* Painel Details - 30% em desktop, 100% em mobile quando showDetails */}
                    <div className={`${showDetails ? 'flex' : 'hidden'} md:flex w-full md:w-[30%] flex-shrink-0 h-full`}>
                        <PanelDetails
                            identification={identification || 'Ponto de Atendimento'}
                            onBack={() => {
                                if (showDetails) {
                                    setShowDetails(false);
                                } else {
                                    navigate('/home');
                                }
                            }}
                            identifier={identification}
                            businessId={localStorage.getItem('businessId')}
                        >
                            <div className="p-4 md:p-6">
                                <p className="text-gray-500">Conteúdo do painel Details será implementado aqui.</p>
                            </div>
                        </PanelDetails>
                    </div>

                    {/* Painel Itens - 100% do espaço restante (70% em desktop, 100% em mobile) */}
                    <div className={`${showDetails ? 'hidden' : 'flex'} md:flex flex-1 w-full h-full min-w-0`}>
                        <PanelItems
                            onBack={() => navigate('/home')}
                            onInfo={() => setShowDetails(!showDetails)}
                            businessId={localStorage.getItem('businessId')}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

