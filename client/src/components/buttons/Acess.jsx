export default function Access({ onClick, type = 'login', disabled = false }) {
    const isLogin = type === 'login';
    const text = isLogin ? 'Login' : 'Criar conta';

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className="w-full px-6 py-4 bg-emerald-600 text-white rounded-4xl hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl"
        >
            {text}
        </button>
    );
}
