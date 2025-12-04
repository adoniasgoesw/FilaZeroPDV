import { Plus } from 'lucide-react';

export default function AddButton({ onClick, label }) {
    return (
        <>
            {/* Mobile: apenas ícone */}
            <button
                onClick={onClick}
                className="md:hidden w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 flex-shrink-0"
                title={label}
            >
                <Plus className="w-6 h-6" />
            </button>

            {/* Tablet/Desktop: apenas texto */}
            <button
                onClick={onClick}
                className="hidden md:flex h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 flex-shrink-0"
            >
                <span className="text-sm font-semibold">{label}</span>
            </button>
        </>
    );
}
