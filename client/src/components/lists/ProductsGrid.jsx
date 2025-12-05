import { useState, useEffect } from 'react';
import api from '../../services/api.js';

export default function ProductsGrid({ businessId, categoryId }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (businessId && categoryId) {
            fetchProducts();
        } else {
            setProducts([]);
            setLoading(false);
        }
    }, [businessId, categoryId]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await api.get('/products', {
                params: { business_id: businessId }
            });
            
            if (response.data.products) {
                // Filtrar produtos da categoria selecionada e apenas ativos
                const filteredProducts = response.data.products.filter(
                    product => (product.categoryId === categoryId || product.category_id === categoryId) && product.status === 'active'
                );
                setProducts(filteredProducts);
            }
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (value) => {
        if (!value) return 'R$ 0,00';
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    if (loading) {
        return (
            <div className="p-4 md:p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="bg-gray-200 rounded-xl aspect-square animate-pulse"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="p-4 md:p-6">
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-emerald-100">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-blue-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.75 7.5h16.5M10 11.25v-6m4 6v-6" />
                        </svg>
                    </div>
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            Nenhum produto encontrado
                        </h3>
                        <p className="text-sm text-gray-500">
                            Nenhum produto encontrado nesta categoria
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all duration-300 cursor-pointer"
                    >
                        {/* Imagem do produto */}
                        <div className="w-full aspect-square bg-white relative overflow-hidden p-2">
                            {product.image ? (
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover rounded-xl"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 rounded-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                    </svg>
                                </div>
                            )}
                        </div>

                        {/* Nome e preço */}
                        <div className="p-2 md:p-3">
                            <h3 className="text-xs md:text-sm font-semibold text-gray-900 truncate mb-1">
                                {product.name}
                            </h3>
                            <p className="text-xs md:text-sm font-bold text-blue-600">
                                {formatCurrency(product.salePrice)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

