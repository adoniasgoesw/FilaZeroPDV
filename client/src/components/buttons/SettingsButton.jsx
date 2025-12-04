import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SettingsButton() {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate('/settings')}
            className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200"
            title="Configurações"
        >
            <Settings className="w-5 h-5 text-gray-600" />
        </button>
    );
}

