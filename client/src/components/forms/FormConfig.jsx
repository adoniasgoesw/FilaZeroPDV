import { useState, useEffect } from 'react';
import { Store, Table, ShoppingCart } from 'lucide-react';
import api from '../../services/api.js';

export default function FormConfig({ onSubmit, businessId }) {
    const [formData, setFormData] = useState({
        enableCounters: false,
        counterQuantity: 0,
        enableTables: false,
        tableQuantity: 0,
        enableOrders: false,
        orderQuantity: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (businessId) {
            fetchServicePoints();
        }
    }, [businessId]);

    const fetchServicePoints = async () => {
        try {
            setLoading(true);
            const response = await api.get('/service-points', {
                params: { business_id: businessId }
            });

            if (response.data.servicePoints) {
                const data = response.data.servicePoints;
                setFormData({
                    enableCounters: data.countersEnabled || false,
                    counterQuantity: data.countersQuantity || 0,
                    enableTables: data.tablesEnabled || false,
                    tableQuantity: data.tablesQuantity || 0,
                    enableOrders: data.orderSlipsEnabled || false,
                    orderQuantity: data.orderSlipsQuantity || 0
                });
            }
        } catch (error) {
            console.error('Erro ao buscar pontos de atendimento:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleToggle = (field) => {
        setFormData(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await api.put('/service-points', {
                business_id: businessId,
                counters_enabled: formData.enableCounters,
                counters_quantity: formData.counterQuantity,
                tables_enabled: formData.enableTables,
                tables_quantity: formData.tableQuantity,
                order_slips_enabled: formData.enableOrders,
                order_slips_quantity: formData.orderQuantity
            });

            // Buscar dados atualizados
            await fetchServicePoints();
            
            if (onSubmit) {
                onSubmit(response.data.servicePoints);
            }
        } catch (error) {
            console.error('Erro ao salvar pontos de atendimento:', error);
            alert('Erro ao salvar configuração. Tente novamente.');
        }
    };

    if (loading) {
        return (
            <div className="p-4 md:px-6 md:py-6 flex items-center justify-center">
                <p className="text-gray-500">Carregando...</p>
            </div>
        );
    }

    return (
        <form id="form-config" onSubmit={handleSubmit} className="p-4 md:px-6 md:py-6 space-y-4 md:space-y-6">
            {/* Habilitar Balcões */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                            <Store className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-900">
                                Habilitar Balcões
                            </label>
                            <p className="text-xs text-gray-500">Ativar pontos de atendimento em balcões</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => handleToggle('enableCounters')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            formData.enableCounters ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                formData.enableCounters ? 'translate-x-6' : 'translate-x-1'
                            }`}
                        />
                    </button>
                </div>
                
                {formData.enableCounters && (
                    <div className="ml-14">
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            Quantidade de Balcões
                        </label>
                        <input
                            type="number"
                            name="counterQuantity"
                            value={formData.counterQuantity}
                            onChange={handleChange}
                            min="0"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-sm text-gray-900"
                            placeholder="0"
                        />
                    </div>
                )}
            </div>

            {/* Habilitar Mesas */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                            <Table className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-900">
                                Habilitar Mesas
                            </label>
                            <p className="text-xs text-gray-500">Ativar pontos de atendimento em mesas</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => handleToggle('enableTables')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            formData.enableTables ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                formData.enableTables ? 'translate-x-6' : 'translate-x-1'
                            }`}
                        />
                    </button>
                </div>
                
                {formData.enableTables && (
                    <div className="ml-14">
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            Quantidade de Mesas
                        </label>
                        <input
                            type="number"
                            name="tableQuantity"
                            value={formData.tableQuantity}
                            onChange={handleChange}
                            min="0"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-sm text-gray-900"
                            placeholder="0"
                        />
                    </div>
                )}
            </div>

            {/* Habilitar Comandos */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                            <ShoppingCart className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-900">
                                Habilitar Comandos
                            </label>
                            <p className="text-xs text-gray-500">Ativar pontos de atendimento em comandos</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => handleToggle('enableOrders')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            formData.enableOrders ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                formData.enableOrders ? 'translate-x-6' : 'translate-x-1'
                            }`}
                        />
                    </button>
                </div>
                
                {formData.enableOrders && (
                    <div className="ml-14">
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            Quantidade de Comandos
                        </label>
                        <input
                            type="number"
                            name="orderQuantity"
                            value={formData.orderQuantity}
                            onChange={handleChange}
                            min="0"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-sm text-gray-900"
                            placeholder="0"
                        />
                    </div>
                )}
            </div>
        </form>
    );
}

