import { useState, useEffect } from 'react';
import SearchBar from '../layouts/SearchBar.jsx';
import CategoriesHorizontal from '../lists/CategoriesHorizontal.jsx';
import ProductsGrid from '../lists/ProductsGrid.jsx';
import api from '../../services/api.js';

export default function PanelItems({ onBack, onInfo, businessId }) {
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (businessId) {
            fetchCategories();
        }
    }, [businessId]);

    const fetchCategories = async () => {
        try {
            const response = await api.get('/categories', {
                params: { business_id: businessId }
            });
            
            if (response.data.categories) {
                // Filtrar apenas categorias ativas
                const activeCategories = response.data.categories.filter(
                    cat => cat.status === 'active'
                );
                setCategories(activeCategories);
                
                // Selecionar automaticamente a primeira categoria
                if (activeCategories.length > 0 && !selectedCategoryId) {
                    setSelectedCategoryId(activeCategories[0].id);
                }
            }
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        }
    };

    const handleCategorySelect = (category) => {
        setSelectedCategoryId(category.id);
    };

    const handleBack = () => {
        if (onBack) {
            onBack();
        }
    };

    return (
        <div className="h-full w-full flex flex-col bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="flex-shrink-0 px-3 md:px-4 py-2 md:py-3 border-b border-gray-200 flex items-center gap-2 md:gap-3 h-[60px] md:h-[64px]">
                {/* Mobile: Back Button */}
                <div className="flex items-center gap-2 md:hidden flex-shrink-0">
                    <button
                        type="button"
                        onClick={handleBack}
                        className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                </div>

                {/* SearchBar */}
                <SearchBar placeholder="Pesquisar itens..." />
            </div>

            {/* Categorias Horizontais */}
            {businessId && (
                <CategoriesHorizontal 
                    businessId={businessId}
                    onCategorySelect={handleCategorySelect}
                    selectedCategoryId={selectedCategoryId}
                />
            )}

            {/* Content - Listagem de Produtos com rolagem */}
            <div className="flex-1 overflow-y-auto">
                {businessId && selectedCategoryId && (
                    <ProductsGrid 
                        businessId={businessId}
                        categoryId={selectedCategoryId}
                    />
                )}
            </div>

            {/* Bottom */}
            <div className="flex-shrink-0 px-3 md:px-4 py-2 md:py-3 border-t border-gray-200 flex items-center justify-end gap-2">
                {/* Mobile: Information Icon Button */}
                <button
                    type="button"
                    onClick={onInfo}
                    className="md:hidden px-4 py-2 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200"
                    title="Informações"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                </button>
                <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200"
                >
                    Cancelar
                </button>
                <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-200"
                >
                    Salvar
                </button>
            </div>
        </div>
    );
}

