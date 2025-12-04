import { Power } from 'lucide-react';

export default function StatusButton({ isActive, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                isActive 
                    ? 'bg-orange-100 text-orange-600 hover:bg-orange-200' 
                    : 'bg-green-100 text-green-600 hover:bg-green-200'
            }`}
            title={isActive ? 'Desativar' : 'Ativar'}
        >
            <Power className={`w-4 h-4 ${isActive ? 'stroke-[3]' : ''}`} />
        </button>
    );
}

