export default function SaveButton({ onClick, disabled = false, label = 'Salvar' }) {
    return (
        <button
            type="submit"
            onClick={onClick}
            disabled={disabled}
            className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-sm shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {label}
        </button>
    );
}

