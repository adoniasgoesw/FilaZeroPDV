import { useState } from 'react';
import { CreditCard, DollarSign, Percent } from 'lucide-react';
import Dropdown from './Dropdown.jsx';

export default function FormPayment({ onSubmit, initialData }) {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        type: initialData?.type || '',
        bankAccount: initialData?.bankAccount || '',
        fee: initialData?.fee || ''
    });

    const paymentTypes = [
        { value: 'cash', label: 'Dinheiro' },
        { value: 'debit', label: 'Cartão de Débito' },
        { value: 'credit', label: 'Cartão de Crédito' },
        { value: 'pix', label: 'PIX' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleTypeChange = (value) => {
        setFormData(prev => ({
            ...prev,
            type: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form id="form-payment" onSubmit={handleSubmit} className="p-4 md:px-6 md:py-6 space-y-4 md:space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                    Nome do pagamento <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-sm text-gray-900"
                        placeholder="Ex: Pagamento em dinheiro"
                    />
                </div>
            </div>

            <div>
                <Dropdown
                    label="Tipo de pagamento"
                    options={paymentTypes}
                    value={formData.type}
                    onChange={handleTypeChange}
                    placeholder="Selecione o tipo"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                    Conta bancária
                </label>
                <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        name="bankAccount"
                        value={formData.bankAccount}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-sm text-gray-900"
                        placeholder="Nome da conta bancária"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                    Taxa (%)
                </label>
                <div className="relative">
                    <Percent className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="number"
                        name="fee"
                        value={formData.fee}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        max="100"
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-sm text-gray-900"
                        placeholder="0.00"
                    />
                </div>
            </div>

        </form>
    );
}

