import { useState, useEffect } from 'react';
import EditButton from '../buttons/EditButton.jsx';
import api from '../../services/api.js';

export default function PanelDetails({ identification, onBack, identifier, businessId, children }) {
    const [isEditing, setIsEditing] = useState(false);
    const [namePoint, setNamePoint] = useState('');
    const [loading, setLoading] = useState(false);
    const [itemId, setItemId] = useState(null);

    useEffect(() => {
        if (identifier && businessId) {
            fetchServicePointItem();
        }
    }, [identifier, businessId]);

    const fetchServicePointItem = async () => {
        try {
            const response = await api.get(`/service-point-items/${identifier}`, {
                params: { business_id: businessId }
            });

            if (response.data.servicePointItem) {
                const item = response.data.servicePointItem;
                setNamePoint(item.namePoint || '');
                setItemId(item.id);
            }
        } catch (error) {
            console.error('Erro ao buscar ponto de atendimento:', error);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            await api.put('/service-point-items', {
                id: itemId,
                business_id: businessId,
                identifier: identifier,
                name_point: namePoint
            });
            setIsEditing(false);
            // Recarregar dados
            await fetchServicePointItem();
        } catch (error) {
            console.error('Erro ao salvar nome do ponto:', error);
            alert('Erro ao salvar. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Restaurar valor original
        fetchServicePointItem();
    };

    return (
        <div className="h-full flex flex-col bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="flex-shrink-0 px-3 md:px-4 py-2 md:py-3 border-b border-gray-200 flex items-center justify-between h-[60px] md:h-[64px]">
                <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                    <button
                        type="button"
                        onClick={onBack}
                        className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200 flex-shrink-0"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                    {isEditing ? (
                        <div className="flex-1 min-w-0 relative">
                            <input
                                type="text"
                                value={namePoint}
                                onChange={(e) => setNamePoint(e.target.value)}
                                placeholder="Digite o nome do pedido"
                                className="w-full px-3 pr-16 py-1.5 text-sm bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-gray-900"
                                autoFocus
                            />
                            <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="w-5 h-5 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-all duration-200"
                                    title="Cancelar"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="w-5 h-5 rounded bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Salvar"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <h2 className="text-sm md:text-base font-semibold text-gray-900 truncate">
                            {identification}
                        </h2>
                    )}
                </div>
                {!isEditing && (
                    <div className="flex-shrink-0">
                        <EditButton onClick={handleEdit} />
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                {children}
            </div>
        </div>
    );
}

