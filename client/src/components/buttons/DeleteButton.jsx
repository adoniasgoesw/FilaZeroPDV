import { Trash2 } from 'lucide-react';

export default function DeleteButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="w-8 h-8 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 flex items-center justify-center transition-all duration-200"
            title="Excluir"
        >
            <Trash2 className="w-4 h-4" />
        </button>
    );
}

