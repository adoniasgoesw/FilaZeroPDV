import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function ActionsButton({ onToggleStatus, onEdit, onDelete }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleAction = (action) => {
        action();
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium flex items-center gap-2 transition-colors"
            >
                Ações
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <button
                        onClick={() => handleAction(onToggleStatus)}
                        className="w-full px-4 py-2 text-left text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Ativar/Desativar
                    </button>
                    <button
                        onClick={() => handleAction(onEdit)}
                        className="w-full px-4 py-2 text-left text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Editar
                    </button>
                    <button
                        onClick={() => handleAction(onDelete)}
                        className="w-full px-4 py-2 text-left text-xs text-red-600 hover:bg-red-50 transition-colors"
                    >
                        Excluir
                    </button>
                </div>
            )}
        </div>
    );
}

