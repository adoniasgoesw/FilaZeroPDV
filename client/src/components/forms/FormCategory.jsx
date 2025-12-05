import { useState, useEffect } from 'react';
import { Tag, Image as ImageIcon, X } from 'lucide-react';

export default function FormCategory({ onSubmit, initialData, onCancel }) {
    const [formData, setFormData] = useState({
        name: '',
        image: null,
        imagePreview: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                image: null,
                imagePreview: initialData.image || ''
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
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
        const fileInput = document.getElementById('category-image');
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form id="form-category" onSubmit={handleSubmit} className="p-4 md:px-6 md:py-6 space-y-4 md:space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                    Nome da categoria <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <Tag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-sm text-gray-900"
                        placeholder="Ex: Bebidas, Lanches, etc."
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                    Imagem da categoria
                </label>
                <div className="flex flex-col gap-2">
                    <div className="relative w-[100px] h-[100px] border border-gray-200 rounded-xl overflow-hidden bg-white">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            id="category-image"
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
                                htmlFor="category-image"
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

        </form>
    );
}

