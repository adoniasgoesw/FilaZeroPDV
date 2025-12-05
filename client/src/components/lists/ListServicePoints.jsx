import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, DollarSign, Clock, CheckCircle2, AlertCircle, Unlock, Hand } from 'lucide-react';
import api from '../../services/api.js';

const statusConfig = {
    available: {
        label: 'Disponível',
        color: 'bg-gray-100 text-gray-700',
        cardBg: 'bg-white',
        icon: CheckCircle2,
        iconColor: 'text-gray-500'
    },
    open: {
        label: 'Aberto',
        color: 'bg-blue-100 text-blue-700',
        cardBg: 'bg-blue-50',
        icon: Unlock,
        iconColor: 'text-blue-500'
    },
    occupied: {
        label: 'Ocupado',
        color: 'bg-green-100 text-green-700',
        cardBg: 'bg-green-50',
        icon: CheckCircle2,
        iconColor: 'text-green-500'
    },
    in_service: {
        label: 'Em Atendimento',
        color: 'bg-purple-100 text-purple-700',
        cardBg: 'bg-purple-50',
        icon: AlertCircle,
        iconColor: 'text-purple-500'
    }
};

export default function ListServicePoints({ businessId }) {
    const navigate = useNavigate();
    const [servicePoints, setServicePoints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [clickedPoint, setClickedPoint] = useState(null);

    useEffect(() => {
        if (businessId) {
            fetchServicePoints();
        }
    }, [businessId]);

    // Recarregar quando a página voltar ao foco (quando voltar do ServicePoint)
    useEffect(() => {
        const handleFocus = () => {
            if (businessId) {
                fetchServicePoints();
            }
        };

        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, [businessId]);

    const fetchServicePoints = async () => {
        try {
            setLoading(true);
            
            // Buscar configuração de pontos
            const configResponse = await api.get('/service-points/list', {
                params: { business_id: businessId }
            });

            // Buscar itens abertos
            const itemsResponse = await api.get('/service-point-items', {
                params: { business_id: businessId }
            });

            if (configResponse.data.servicePoints) {
                const points = configResponse.data.servicePoints;
                const items = itemsResponse.data?.servicePointItems || [];

                // Criar mapa de itens por identifier
                const itemsMap = {};
                items.forEach(item => {
                    itemsMap[item.identifier] = item;
                });

                // Mesclar pontos configurados com itens do banco
                const mergedPoints = points.map(point => {
                    const item = itemsMap[point.identification];
                    if (item) {
                        return {
                            ...point,
                            name: item.namePoint || null,
                            status: item.status,
                            itemId: item.id
                        };
                    }
                    return point;
                });

                setServicePoints(mergedPoints);
            }
        } catch (error) {
            console.error('Erro ao buscar pontos de atendimento:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const formatTime = (minutes) => {
        if (minutes === 0) return '0 min';
        if (minutes < 60) return `${minutes} min`;
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
    };

    const getStatusConfig = (status) => {
        return statusConfig[status] || statusConfig.available;
    };

    const handlePointClick = (point) => {
        // Se está aberto, clicar uma vez já abre
        if (point.status === 'open') {
            navigate(`/service-point/${encodeURIComponent(point.id)}`, {
                state: {
                    pointId: point.id,
                    identification: point.identification,
                    type: point.type
                }
            });
            return;
        }

        // Se está disponível, precisa de duplo clique
        if (point.status === 'available') {
            if (clickedPoint === point.id) {
                // Segundo clique - abrir página
                navigate(`/service-point/${encodeURIComponent(point.id)}`, {
                    state: {
                        pointId: point.id,
                        identification: point.identification,
                        type: point.type
                    }
                });
                setClickedPoint(null);
            } else {
                // Primeiro clique - mostrar "Toque para abrir"
                setClickedPoint(point.id);
                // Resetar após 3 segundos se não clicar novamente
                setTimeout(() => {
                    setClickedPoint(null);
                }, 3000);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Carregando pontos de atendimento...</p>
            </div>
        );
    }

    if (servicePoints.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Nenhum ponto de atendimento configurado</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Mobile: 2 colunas, Tablet: 3 colunas, Desktop: 4 colunas */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {servicePoints.map((point) => {
                    const status = getStatusConfig(point.status);
                    const StatusIcon = status.icon;
                    const displayName = point.name || 'Aguardando cliente';

                    const isClicked = clickedPoint === point.id && point.status === 'available';
                    const isClickable = point.status === 'available' || point.status === 'open';
                    
                    return (
                        <div
                            key={point.id}
                            onClick={() => handlePointClick(point)}
                            className={`${status.cardBg} rounded-xl shadow-sm border border-gray-200 p-4 transition-all relative ${
                                isClickable ? 'cursor-pointer hover:shadow-md active:scale-95' : ''
                            } ${isClicked ? 'ring-2 ring-blue-500' : ''}`}
                        >
                            {/* Status no canto superior direito */}
                            <div className="absolute top-3 right-3">
                                {/* Mobile: apenas ícone */}
                                <div className={`md:hidden flex items-center justify-center w-8 h-8 rounded-lg ${status.color}`}>
                                    <StatusIcon className={`w-4 h-4 ${status.iconColor}`} />
                                </div>
                                {/* Tablet/Desktop: ícone + texto */}
                                <div className={`hidden md:flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium ${status.color}`}>
                                    <StatusIcon className={`w-3 h-3 ${status.iconColor}`} />
                                    <span>{status.label}</span>
                                </div>
                            </div>

                            {/* Identificação no canto superior esquerdo */}
                            <div className="mb-3 pr-12 md:pr-20">
                                <h3 className="text-base font-semibold text-gray-900 break-words">
                                    {point.identification}
                                </h3>
                            </div>

                            {/* Nome do ponto com ícone de usuário */}
                            <div className="flex items-center gap-2 mb-3">
                                <User className="w-4 h-4 text-gray-400" />
                                <p className="text-sm text-gray-600 truncate">
                                    {displayName}
                                </p>
                            </div>

                            {/* Valor total com ícone de cifrão verde */}
                            <div className="flex items-center gap-2 mb-3">
                                <DollarSign className="w-4 h-4 text-green-600" />
                                <p className="text-sm font-medium text-gray-900">
                                    {formatCurrency(point.totalValue || 0)}
                                </p>
                            </div>

                            {/* Tempo de atividade com ícone de relógio */}
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <p className="text-xs text-gray-600">
                                    {formatTime(point.activityTime || 0)}
                                </p>
                            </div>

                            {/* Overlay "Toque para abrir" quando clicado */}
                            {isClicked && (
                                <div className="absolute inset-0 bg-blue-500/90 rounded-xl flex flex-col items-center justify-center gap-3 z-10 animate-pulse">
                                    <Hand className="w-12 h-12 text-white animate-bounce" />
                                    <p className="text-white font-semibold text-base">Toque para abrir</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

