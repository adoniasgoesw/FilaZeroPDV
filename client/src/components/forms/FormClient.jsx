import { useState } from 'react';
import { User, Phone, CreditCard, Mail, MapPin } from 'lucide-react';

export default function FormClient({ onSubmit, initialData }) {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        whatsapp: initialData?.whatsapp || '',
        cpf: initialData?.cpf || '',
        email: initialData?.email || '',
        address: initialData?.address || ''
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
        <form id="form-client" onSubmit={handleSubmit} className="p-4 md:px-6 md:py-6 space-y-4 md:space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                    Nome <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-sm text-gray-900"
                        placeholder="Nome completo"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                    WhatsApp <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="tel"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-sm text-gray-900"
                        placeholder="(00) 00000-0000"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                    CPF <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-sm text-gray-900"
                        placeholder="000.000.000-00"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                    E-mail
                </label>
                <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-sm text-gray-900"
                        placeholder="email@exemplo.com"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                    Endereço
                </label>
                <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-sm text-gray-900"
                        placeholder="Rua, número, bairro, cidade"
                    />
                </div>
            </div>

        </form>
    );
}

