import { Pencil } from 'lucide-react';

export default function EditButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 flex items-center justify-center transition-all duration-200"
            title="Editar"
        >
            <Pencil className="w-4 h-4" />
        </button>
    );
}

