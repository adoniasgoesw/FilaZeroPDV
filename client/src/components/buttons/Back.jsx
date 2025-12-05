export default function Back({ onClick, variant = 'text', disabled = false, children }) {
    if (variant === 'icon') {
        return (
            <button
                type="button"
                onClick={onClick}
                disabled={disabled}
                className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
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
            className="px-3 md:px-6 py-2 md:py-3 bg-gray-200 text-gray-900 rounded-lg md:rounded-xl hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-xs md:text-base"
        >
            {children || 'Anterior'}
        </button>
    );
}
