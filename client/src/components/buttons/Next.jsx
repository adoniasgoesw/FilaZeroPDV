export default function Next({ onClick, variant = 'text', disabled = false, children }) {
    if (variant === 'icon') {
        return (
            <button
                type="button"
                onClick={onClick}
                disabled={disabled}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
            </button>
        );
    }

    // Text only version
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
        >
            {children || 'Próximo'}
        </button>
    );
}
