import { useState, useEffect } from 'react';
import { Package, Image as ImageIcon, DollarSign, Clock, Box, X } from 'lucide-react';
import Dropdown from './Dropdown.jsx';
import api from '../../services/api.js';

export default function FormProduct({ onSubmit, initialData, businessId }) {
    const [formData, setFormData] = useState({
        name: '',
        image: null,
        imagePreview: '',
        purchasePrice: '',
        salePrice: '',
        stock: '',
        preparationTime: '',
        categoryId: ''
    });
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                image: null,
                imagePreview: initialData.image || '',
                purchasePrice: initialData.purchasePrice || initialData.purchase_price || '',
                salePrice: initialData.salePrice || initialData.sale_price || '',
                stock: initialData.stock || '',
                preparationTime: initialData.preparationTime || initialData.preparation_time || '',
                categoryId: initialData.categoryId || initialData.category_id || ''
            });
        } else {
            // Reset form when no initial data
            setFormData({
                name: '',
                image: null,
                imagePreview: '',
                purchasePrice: '',
                salePrice: '',
                stock: '',
                preparationTime: '',
                categoryId: ''
            });
        }
    }, [initialData]);

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
                setCategories(response.data.categories);
            }
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        } finally {
            setLoading(false);
        }
    };

    const categoryOptions = categories.map(cat => ({
        value: cat.id,
        label: cat.name
    }));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCategoryChange = (value) => {
        setFormData(prev => ({
            ...prev,
            categoryId: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                image: file,
                imagePreview: URL.createObjectURL(file)
            }));
        }
    };

    const handleRemoveImage = () => {
        setFormData(prev => ({
            ...prev,
            image: null,
            imagePreview: ''
        }));
        // Reset file input
        const fileInput = document.getElementById('product-image');
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form id="form-product" onSubmit={handleSubmit} className="p-4 md:px-6 md:py-6 space-y-4 md:space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                    Nome do produto <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <Package className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-sm text-gray-900"
                        placeholder="Nome do produto"
                    />
                </div>
            </div>

            <div>
                {loading ? (
                    <div className="text-sm text-gray-500">Carregando categorias...</div>
                ) : (
                    <Dropdown
                        label="Categoria"
                        options={categoryOptions}
                        value={formData.categoryId}
                        onChange={handleCategoryChange}
                        placeholder="Selecione a categoria"
                        required
                    />
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                    Imagem do produto
                </label>
                <div className="flex flex-col gap-2">
                    <div className="relative w-[100px] h-[100px] border border-gray-200 rounded-xl overflow-hidden bg-white">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            id="product-image"
                        />
                        
                        {formData.imagePreview ? (
                            <div className="relative w-full h-full">
                                <img 
                                    src={formData.imagePreview} 
                                    alt="Preview" 
                                    className="w-full h-full object-cover" 
                                />
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ) : (
                            <label
                                htmlFor="product-image"
                                className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors p-2"
                            >
                                <ImageIcon className="w-6 h-6 text-gray-400 mb-1" />
                                <span className="text-xs text-gray-500 text-center leading-tight">Selecionar imagem</span>
                            </label>
                        )}
                    </div>
                    
                    {!formData.imagePreview && (
                        <p className="text-xs text-gray-500">
                            Recomendação: 500x500, JPG, PNG, WEBP, máximo 5MB
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                        Preço de compra
                    </label>
                    <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="number"
                            name="purchasePrice"
                            value={formData.purchasePrice}
                            onChange={handleChange}
                            step="0.01"
                            min="0"
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-sm text-gray-900"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                        Preço de venda <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="number"
                            name="salePrice"
                            value={formData.salePrice}
                            onChange={handleChange}
                            step="0.01"
                            min="0"
                            required
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-sm text-gray-900"
                            placeholder="0.00"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                        Estoque
                    </label>
                    <div className="relative">
                        <Box className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            min="0"
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-sm text-gray-900"
                            placeholder="0"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                        Tempo de preparo (min)
                    </label>
                    <div className="relative">
                        <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="number"
                            name="preparationTime"
                            value={formData.preparationTime}
                            onChange={handleChange}
                            min="0"
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-sm text-gray-900"
                            placeholder="0"
                        />
                    </div>
                </div>
            </div>

        </form>
    );
}

