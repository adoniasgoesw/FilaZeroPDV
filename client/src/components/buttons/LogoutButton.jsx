import { LogOut } from 'lucide-react';

export default function LogoutButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center justify-center py-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
            title="Sair"
        >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <LogOut className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-all duration-200" />
            </div>
        </button>
    );
}

