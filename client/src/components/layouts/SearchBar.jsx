import { Search } from 'lucide-react';
import { useState } from 'react';

export default function SearchBar({ placeholder = "Pesquisar...", onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (onSearch) {
            onSearch(value);
        }
    };

    return (
        <div className="flex-1 flex items-center gap-3 bg-white rounded-xl border border-gray-200 px-4 py-3 h-12 shadow-sm focus-within:shadow-md focus-within:border-blue-300 transition-all">
            <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder={placeholder}
                className="flex-1 outline-none text-sm text-gray-900 placeholder-gray-400 bg-transparent"
            />
        </div>
    );
}

