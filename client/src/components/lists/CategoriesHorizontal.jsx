import { useState, useEffect } from 'react';
import api from '../../services/api.js';

export default function CategoriesHorizontal({ businessId, onCategorySelect, selectedCategoryId }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (businessId) {
            fetchCategories();
        }
    }, [businessId]);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await api.get('/categories', {
                params: { business_id: businessId }
            });
            
            if (response.data.categories) {
                // Filtrar apenas categorias ativas
                const activeCategories = response.data.categories.filter(
                    cat => cat.status === 'active'
                );
                setCategories(activeCategories);
            }
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex-shrink-0 px-3 md:px-4 py-3 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-200 animate-pulse"></div>
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-200 animate-pulse"></div>
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-200 animate-pulse"></div>
                </div>
            </div>
        );
    }

    if (categories.length === 0) {
        return null;
    }

    return (
        <div className="flex-shrink-0 px-3 md:px-4 py-3">
            <div className="overflow-x-auto">
                <div className="flex items-center gap-4 min-w-max pb-1">
                    {categories.map((category) => {
                        const isSelected = selectedCategoryId === category.id;
                        return (
                        <button
                            key={category.id}
                            onClick={() => onCategorySelect && onCategorySelect(category)}
                            className="flex flex-col items-center gap-2 flex-shrink-0 transition-transform hover:scale-105 active:scale-95"
                        >
                            {/* Imagem redonda com borda azul */}
                            <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full border-[3px] ${isSelected ? 'border-blue-600' : 'border-gray-400'} overflow-hidden bg-gray-100 flex items-center justify-center transition-all`}>
                                {category.image ? (
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10 text-gray-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                    </svg>
                                )}
                            </div>
                            
                            {/* Nome da categoria */}
                            <span className={`text-xs md:text-sm font-medium text-center max-w-[80px] md:max-w-[100px] truncate ${isSelected ? 'text-blue-600' : 'text-gray-900'}`}>
                                {category.name}
                            </span>
                        </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

