import { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const Notification = ({ id, message, type, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => onClose(id), 300); // Aguarda animação de saída
        }, 5000); // Fecha automaticamente após 5 segundos

        return () => clearTimeout(timer);
    }, [id, onClose]);

    const getStyles = () => {
        switch (type) {
            case 'error':
                return {
                    bg: 'bg-red-50',
                    border: 'border-red-200',
                    text: 'text-red-700',
                    icon: <AlertCircle className="w-5 h-5 text-red-600" />
                };
            case 'success':
                return {
                    bg: 'bg-green-50',
                    border: 'border-green-200',
                    text: 'text-green-700',
                    icon: <CheckCircle className="w-5 h-5 text-green-600" />
                };
            case 'warning':
                return {
                    bg: 'bg-yellow-50',
                    border: 'border-yellow-200',
                    text: 'text-yellow-700',
                    icon: <Info className="w-5 h-5 text-yellow-600" />
                };
            default:
                return {
                    bg: 'bg-yellow-50',
                    border: 'border-yellow-200',
                    text: 'text-yellow-700',
                    icon: <Info className="w-5 h-5 text-yellow-600" />
                };
        }
    };

    const styles = getStyles();

    return (
        <div
            className={`${styles.bg} ${styles.border} ${styles.text} border rounded-lg shadow-lg px-4 py-3 mb-3 min-w-[300px] max-w-[400px] flex items-start gap-3 transition-all duration-300 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
            }`}
        >
            <div className="flex-shrink-0 mt-0.5">
                {styles.icon}
            </div>
            <div className="flex-1">
                <p className="text-sm font-medium">{message}</p>
            </div>
            <button
                onClick={() => {
                    setIsVisible(false);
                    setTimeout(() => onClose(id), 300);
                }}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};

export default Notification;



