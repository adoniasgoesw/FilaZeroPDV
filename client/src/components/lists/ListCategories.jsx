import { useState, useEffect } from 'react';
import StatusButton from '../buttons/StatusButton.jsx';
import EditButton from '../buttons/EditButton.jsx';
import DeleteButton from '../buttons/DeleteButton.jsx';
import api from '../../services/api.js';

export default function ListCategories({ businessId, onEdit, onDelete, refreshTrigger }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (businessId) {
            fetchCategories();
        }
    }, [businessId, refreshTrigger]);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await api.get('/categories', {
                params: { business_id: businessId }
            });
            
            if (response.data.categories) {
                setCategories(response.data.categories);
            }
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusToggle = async (id) => {
        try {
            const category = categories.find(cat => cat.id === id);
            const newStatus = category.status === 'active' ? 'inactive' : 'active';
            
            await api.put('/categories', {
                id: id,
                business_id: businessId,
                status: newStatus
            });
            
            // Atualizar localmente
            setCategories(categories.map(cat => 
                cat.id === id ? { ...cat, status: newStatus } : cat
            ));
        } catch (error) {
            console.error('Erro ao alterar status:', error);
            alert('Erro ao alterar status. Tente novamente.');
        }
    };

    const handleEdit = (category) => {
        if (onEdit) {
            onEdit(category);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
            try {
                await api.delete(`/categories/${id}`, {
                    params: { business_id: businessId }
                });
                
                // Recarregar lista
                await fetchCategories();
                
                if (onDelete) {
                    onDelete();
                }
            } catch (error) {
                console.error('Erro ao deletar categoria:', error);
                alert('Erro ao deletar categoria. Tente novamente.');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Carregando categorias...</p>
            </div>
        );
    }

    if (categories.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-emerald-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-blue-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                    </svg>
                </div>
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        Nenhuma categoria ainda
                    </h3>
                    <p className="text-sm text-gray-500">
                        Comece organizando seus produtos criando sua primeira categoria!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full relative z-10">
            {/* Mobile: 2 colunas, Tablet: 3-4 colunas, Desktop: 4-5 colunas */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all duration-300 cursor-pointer"
                    >
                        {/* Imagem da categoria */}
                        <div className="w-full aspect-square relative overflow-hidden">
                            {category.image ? (
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                    </svg>
                                </div>
                            )}
                        </div>

                        {/* Nome da categoria */}
                        <div className="p-1.5">
                            <h3 className="text-xs font-semibold text-gray-900 truncate mb-1.5">
                                {category.name}
                            </h3>

                            {/* Botões de ação */}
                            <div className="flex items-center justify-end gap-1.5">
                                <StatusButton
                                    isActive={category.status === 'active'}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleStatusToggle(category.id);
                                    }}
                                />
                                <EditButton onClick={(e) => {
                                    e.stopPropagation();
                                    handleEdit(category);
                                }} />
                                <DeleteButton onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(category.id);
                                }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

