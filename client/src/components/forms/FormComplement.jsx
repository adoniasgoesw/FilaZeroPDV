import { useState } from 'react';
import { Package, DollarSign } from 'lucide-react';

export default function FormComplement({ onSubmit, initialData }) {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        purchasePrice: initialData?.purchasePrice || '',
        salePrice: initialData?.salePrice || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form id="form-complement" onSubmit={handleSubmit} className="p-4 md:px-6 md:py-6 space-y-4 md:space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                    Nome do complemento <span className="text-red-500">*</span>
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
                        placeholder="Nome do complemento"
                    />
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

        </form>
    );
}

