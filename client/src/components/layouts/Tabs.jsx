export default function Tabs({ tabs, activeTab, onTabChange }) {
    return (
        <div className="flex gap-2 mb-4">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        activeTab === tab.id
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}

