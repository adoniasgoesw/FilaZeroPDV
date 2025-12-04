import { useState } from 'react';
import { User, Mail, Phone, Building, MapPin, FileText, Lock, Eye, EyeOff } from 'lucide-react';
import Next from '../buttons/Next.jsx';
import Back from '../buttons/Back.jsx';
import Access from '../buttons/Acess.jsx';
import api from '../../services/api.js';
import { useNotification } from '../../contexts/NotificationContext.jsx';

export default function SignUp({ onSwitchToLogin, onClose }) {
    const [step, setStep] = useState(1);
    
    // Step 1: User data
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    
    // Step 2: Establishment data
    const [establishmentName, setEstablishmentName] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [address, setAddress] = useState('');
    
    // Step 3: Access data
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { showNotification } = useNotification();

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar confirmação de senha
        if (password !== confirmPassword) {
            showNotification('As senhas não coincidem', 'error');
            return;
        }

        // Validar senha mínima
        if (password.length < 6) {
            showNotification('A senha deve ter no mínimo 6 caracteres', 'error');
            return;
        }

        setIsLoading(true);

        try {
            const response = await api.post('/register', {
                fullName,
                email,
                whatsapp,
                establishmentName,
                cnpj: cnpj || null,
                address,
                cpf,
                password
            });

            showNotification('Conta criada com sucesso!', 'success');
            console.log('Conta criada com sucesso:', response.data);
            
            // Aguardar um pouco antes de fechar/redirecionar
            setTimeout(() => {
                if (onClose) {
                    onClose();
                }
                if (onSwitchToLogin) {
                    onSwitchToLogin();
                }
            }, 1000);
        } catch (err) {
            console.error('Erro ao criar conta:', err);
            const errorMessage = err.response?.data?.error || 'Erro ao criar conta. Tente novamente.';
            
            // Determinar tipo de notificação baseado na mensagem
            if (errorMessage.includes('email') && errorMessage.includes('já')) {
                showNotification('Este email já está cadastrado', 'warning');
            } else if (errorMessage.includes('CPF') && errorMessage.includes('já')) {
                showNotification('Este CPF já está cadastrado', 'warning');
            } else {
                showNotification(errorMessage, 'error');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const stepTitles = {
        1: 'Dados do usuário',
        2: 'Dados do estabelecimento',
        3: 'Dados de acesso'
    };

    return (
        <div className="bg-white rounded-3xl shadow-2xl w-full h-[600px] flex flex-col overflow-hidden absolute -top-10 right-0 z-50">
            <div className="p-8 flex-1 flex flex-col">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Criar conta</h2>
                    <p className="text-gray-600 text-sm">{stepTitles[step]}</p>
                </div>

                {/* Progress indicator */}
                <div className="flex gap-2 mb-6">
                    {[1, 2, 3].map((s) => (
                        <div
                            key={s}
                            className={`h-2 flex-1 rounded-full transition-all ${
                                s <= step ? 'bg-emerald-600' : 'bg-gray-200'
                            }`}
                        />
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                    {/* Step 1: User Data */}
                    {step === 1 && (
                        <div className="space-y-5 flex-1 flex flex-col">
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-3">
                                        Nome completo
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            required
                                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none transition-all text-gray-900 placeholder-gray-400"
                                            placeholder="Digite seu nome completo"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-3">
                                        E-mail
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none transition-all text-gray-900 placeholder-gray-400"
                                            placeholder="seu@email.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-3">
                                        WhatsApp
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="tel"
                                            value={whatsapp}
                                            onChange={(e) => setWhatsapp(e.target.value)}
                                            required
                                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none transition-all text-gray-900 placeholder-gray-400"
                                            placeholder="(00) 00000-0000"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="pt-2">
                                <Next onClick={(e) => { e.preventDefault(); handleNext(); }} />
                            </div>
                            <div className="text-center pt-2">
                                <span className="text-sm text-gray-600">Já possui conta? </span>
                                <button
                                    type="button"
                                    onClick={onSwitchToLogin}
                                    className="text-sm text-gray-900 font-medium hover:underline"
                                >
                                    Fazer login
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Establishment Data */}
                    {step === 2 && (
                        <div className="space-y-5 flex-1 flex flex-col">
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-3">
                                        Nome do estabelecimento
                                    </label>
                                    <div className="relative">
                                        <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            value={establishmentName}
                                            onChange={(e) => setEstablishmentName(e.target.value)}
                                            required
                                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none transition-all text-gray-900 placeholder-gray-400"
                                            placeholder="Nome do seu estabelecimento"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-3">
                                        CNPJ do estabelecimento <span className="text-gray-500 text-xs font-normal">(opcional)</span>
                                    </label>
                                    <div className="relative">
                                        <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            value={cnpj}
                                            onChange={(e) => setCnpj(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none transition-all text-gray-900 placeholder-gray-400"
                                            placeholder="00.000.000/0000-00"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-3">
                                        Endereço completo
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            required
                                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none transition-all text-gray-900 placeholder-gray-400"
                                            placeholder="Digite o endereço completo"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <Back onClick={(e) => { e.preventDefault(); handleBack(); }} />
                                <div className="flex-1" />
                                <Next onClick={(e) => { e.preventDefault(); handleNext(); }} />
                            </div>
                        </div>
                    )}

                    {/* Step 3: Access Data */}
                    {step === 3 && (
                        <div className="space-y-5 flex-1 flex flex-col">
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-3">
                                        CPF
                                    </label>
                                    <div className="relative">
                                        <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-3">
                                        Confirmar senha
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            className="w-full pl-12 pr-12 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none transition-all text-gray-900 placeholder-gray-400"
                                            placeholder="Confirme sua senha"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <Back onClick={(e) => { e.preventDefault(); handleBack(); }} />
                                <div className="flex-1">
                                    <Access 
                                        type="register" 
                                        onClick={handleSubmit} 
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
