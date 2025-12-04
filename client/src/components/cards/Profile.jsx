import { Building, User, CreditCard, Briefcase, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Profile() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [businessData, setBusinessData] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const businessId = localStorage.getItem('businessId');
        const userName = localStorage.getItem('userName');

        if (userId && businessId) {
            setUserData({
                id: userId,
                name: userName || '--',
                cpf: localStorage.getItem('userCpf') || '--',
                role: localStorage.getItem('userRole') || 'administrator'
            });
            setBusinessData({
                id: businessId,
                name: localStorage.getItem('businessName') || '--',
                cnpj: localStorage.getItem('businessCnpj') || '--'
            });
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('businessId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userCpf');
        localStorage.removeItem('userRole');
        localStorage.removeItem('businessName');
        localStorage.removeItem('businessCnpj');
        navigate('/');
    };

    const getRoleLabel = (role) => {
        const roles = {
            'administrator': 'Administrador',
            'manager': 'Gerente',
            'employee': 'Funcionário'
        };
        return roles[role] || role;
    };

    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-3 md:p-4 w-full max-w-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {/* Estabelecimento */}
                <div className="col-span-1 sm:col-span-2">
                    <div className="flex items-center gap-2 mb-1">
                        <Building className="w-4 h-4 text-blue-600" />
                        <p className="text-xs font-medium text-gray-500">Estabelecimento</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 truncate">
                        {businessData?.name || '--'}
                    </p>
                </div>

                {/* CNPJ */}
                <div className="col-span-1 sm:col-span-2">
                    <div className="flex items-center gap-2 mb-1">
                        <CreditCard className="w-4 h-4 text-gray-600" />
                        <p className="text-xs font-medium text-gray-500">CNPJ</p>
                    </div>
                    <p className="text-sm text-gray-900 truncate">
                        {businessData?.cnpj || '--'}
                    </p>
                </div>

                {/* Nome do Usuário */}
                <div className="col-span-1 sm:col-span-2">
                    <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-emerald-600" />
                        <p className="text-xs font-medium text-gray-500">Nome do Usuário</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 truncate">
                        {userData?.name || '--'}
                    </p>
                </div>

                {/* CPF */}
                <div className="col-span-1 sm:col-span-1">
                    <div className="flex items-center gap-2 mb-1">
                        <CreditCard className="w-4 h-4 text-gray-600" />
                        <p className="text-xs font-medium text-gray-500">CPF</p>
                    </div>
                    <p className="text-sm text-gray-900 truncate">
                        {userData?.cpf || '--'}
                    </p>
                </div>

                {/* Cargo */}
                <div className="col-span-1 sm:col-span-1">
                    <div className="flex items-center gap-2 mb-1">
                        <Briefcase className="w-4 h-4 text-purple-600" />
                        <p className="text-xs font-medium text-gray-500">Cargo</p>
                    </div>
                    <p className="text-sm text-gray-900 truncate">
                        {userData ? getRoleLabel(userData.role) : '--'}
                    </p>
                </div>

                {/* Logout Button */}
                <div className="col-span-1 sm:col-span-2 pt-2 border-t border-gray-200">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all duration-200 text-sm font-medium"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Sair</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

