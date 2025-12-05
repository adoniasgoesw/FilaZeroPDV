import { Settings } from 'lucide-react';

export default function SettingsButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center justify-center w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200"
            title="Configurações"
        >
            <Settings className="w-6 h-6 text-gray-600" />
        </button>
    );
}



