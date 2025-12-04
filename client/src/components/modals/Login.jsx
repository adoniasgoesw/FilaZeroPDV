import { useState } from 'react';
import { CreditCard, Lock, Eye, EyeOff } from 'lucide-react';
import Access from '../buttons/Acess.jsx';
import api from '../../services/api.js';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../layouts/LoadingScreen.jsx';
import { useNotification } from '../../contexts/NotificationContext.jsx';

export default function Login({ onSwitchToSignUp, onClose }) {
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showLoadingScreen, setShowLoadingScreen] = useState(false);
    const navigate = useNavigate();
    const { showNotification } = useNotification();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validações
        if (!cpf || !password) {
            showNotification('Por favor, preencha todos os campos', 'error');
            return;
        }

        setIsLoading(true);

        try {
            const response = await api.post('/login', {
                cpf,
                password
            });

            // Salvar no localStorage
            localStorage.setItem('userId', response.data.user.id);
            localStorage.setItem('businessId', response.data.user.businessId);
            localStorage.setItem('userName', response.data.user.fullName);
            localStorage.setItem('userCpf', response.data.user.cpf);
            localStorage.setItem('userRole', response.data.user.role);
            localStorage.setItem('businessName', response.data.user.business.name);
            localStorage.setItem('businessCnpj', response.data.user.business.cnpj || '');

            // Só mostrar a tela verde após login bem-sucedido
            setIsLoading(false);
            setShowLoadingScreen(true);

            // Aguardar um pouco para mostrar a tela de loading e depois redirecionar
            setTimeout(() => {
                navigate('/home');
            }, 1500);

        } catch (err) {
            console.error('Erro ao fazer login:', err);
            const errorMessage = err.response?.data?.error || 'Erro ao fazer login. Tente novamente.';
            
            // Determinar tipo de notificação baseado na mensagem
            if (errorMessage.includes('CPF') || errorMessage.includes('senha') || errorMessage.includes('incorret')) {
                showNotification('CPF ou senha incorretos', 'error');
            } else {
                showNotification(errorMessage, 'error');
            }
            
            setIsLoading(false);
            setShowLoadingScreen(false);
        }
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        console.log('Forgot password for:', cpf);
    };

    if (showLoadingScreen) {
        return <LoadingScreen />;
    }

    if (showForgotPassword) {
        return (
            <div className="bg-white rounded-3xl shadow-2xl w-full h-[600px] flex flex-col overflow-hidden absolute -top-10 right-0 z-50">
                <div className="p-8 flex-1 flex flex-col">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-900">Esqueceu senha</h2>
                </div>
                    <form onSubmit={handleForgotPassword} className="flex-1 flex flex-col">
                        <div className="space-y-6 flex-1 flex flex-col">
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-3">
                                    CPF
                                </label>
                                <div className="relative">
                                    <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        value={cpf}
                                        onChange={(e) => setCpf(e.target.value)}
                                        required
                                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none transition-all text-gray-900"
                                        placeholder="000.000.000-00"
                                    />
                                </div>
                            </div>
                            <div className="pt-2">
                                <Access type="login" onClick={handleForgotPassword} />
                            </div>
                            <div className="text-center pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowForgotPassword(false)}
                                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    Voltar ao login
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-3xl shadow-2xl w-full h-[600px] flex flex-col overflow-hidden absolute -top-10 right-0 z-50">
            <div className="p-8 flex-1 flex flex-col">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo de volta!</h2>
                    <p className="text-gray-600 text-sm">Faça login para acessar o sistema.</p>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                    <div className="space-y-5 flex-1 flex flex-col">
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-3">
                                    CPF
                                </label>
                                <div className="relative">
                                    <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        value={cpf}
                                        onChange={(e) => setCpf(e.target.value)}
                                        required
                                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none transition-all text-gray-900 placeholder-gray-400"
                                        placeholder="000.000.000-00"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-3">
                                    Senha
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full pl-12 pr-12 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none transition-all text-gray-900 placeholder-gray-400"
                                        placeholder="Digite sua senha"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-emerald-600 focus:ring-2"
                                    />
                                    <span className="ml-2 text-sm text-gray-600">Lembrar-me</span>
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setShowForgotPassword(true)}
                                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    Esqueceu a senha?
                                </button>
                            </div>
                        </div>
                        <div className="pt-2">
                            <Access type="login" onClick={handleSubmit} disabled={isLoading} />
                        </div>
                        <div className="text-center pt-2">
                            <span className="text-sm text-gray-600">Não possui conta? </span>
                            <button
                                type="button"
                                onClick={onSwitchToSignUp}
                                className="text-sm text-gray-900 font-medium hover:underline"
                            >
                                Criar conta
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
