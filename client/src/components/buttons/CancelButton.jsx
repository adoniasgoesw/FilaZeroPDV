export default function CancelButton({ onClick, disabled = false, label = 'Cancelar' }) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {label}
        </button>
    );
}

